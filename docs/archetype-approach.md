# Archetype clustering — chosen approach (Borrel 35)

> Decision record for **BORREL-2.5** (spike). It settles the algorithm, feature
> encoding and cluster count so the downstream archetype-generation story
> (**BORREL-2.6**) builds against a fixed method instead of guessing. The
> prototype lives under `scripts/archetypes/`; the committed output is
> `scripts/archetypes/archetypes.json`.
>
> **Status of the data:** clustering currently runs on the *mock* CSV
> (`data/responses.csv`, 40 seeded rows). The mock rows are drawn from a uniform
> random pick per question, so they carry **no latent structure** — expect a
> near-zero silhouette until the real Google-Form responses land. The method,
> not the mock numbers, is what this spike freezes. See *Retuning on real data*.

## 1. What gets clustered (and what never does)

Clustering uses **only the 18 closed questions whose analytic role is
`cluster`** in `lib/data/schema.ts` (`role: "cluster"`, all `type: "single"`).
The module derives that set programmatically (`CLUSTER_FIELDS` in
`scripts/archetypes/encode.ts`), so schema is the single source of truth and the
two sets can never drift.

Explicitly **excluded**, by construction:

- **Open free-text / showcase questions** — `kompaanIfSentence`,
  `ultimateKompaanTrait`, `heightRemark`. These are quote material only and are
  **never** fed into clustering.
- **Identity** — `name`.
- **Aggregate stats** — `age`, `heightCm`, `province`, `borrelCount`, `rsvp`,
  `headBump`. These belong to the "average Kompaan" profile, not the archetype
  axes. (`rsvp` is tagged `encoding: "none"` precisely to keep it out.)

Filtering on `role === "cluster"` means only closed questions can ever enter the
feature matrix — no open answer can leak in even if a role were mis-tagged,
because open questions are `type: "open"`, not `"single"`.

## 2. Feature encoding

Each closed answer becomes numeric features according to the `encoding` tag the
schema already carries per question:

| Encoding  | Dimensions           | Rule |
|-----------|----------------------|------|
| `binary`  | 1                    | first option → `0`, second → `1` |
| `ordinal` | 1                    | rank index scaled to `[0, 1]` — preserves order (e.g. *Dagelijks → Nooit*) |
| `nominal` | one per option (one-hot) | chosen option's column = `1/√2`; all others `0` |

**Why `1/√2` for one-hot.** With Euclidean distance, two respondents who chose
*different* categories of a nominal question sit at distance
`√((1/√2)² + (1/√2)²) = 1` — the same gap a `binary` flip (`0`↔`1`) produces, and
comparable to the maximum gap of an `ordinal` question. This keeps every closed
question contributing on a similar scale regardless of how many options it has,
so a 6-option question doesn't silently dominate a 2-option one. The scale is a
**documented default, a tuning knob** (see §5), not a data-model invariant.

The mock dataset yields **61 feature dimensions** across the 18 questions.

## 3. Algorithm: seeded k-means (k-means++)

**Chosen:** k-means with k-means++ seeding, implemented from scratch in
`scripts/archetypes/kmeans.ts` — **no runtime dependency**.

Justification:

- **Reproducibility is a hard requirement.** Assignments are computed at build
  time, committed, and consumed by BORREL-2.6. A hand-rolled, seeded
  implementation gives byte-identical output for a fixed dataset + seed. The
  PRNG is `mulberry32` (the same generator the mock-data script uses); it drives
  k-means++ seeding and a fixed number of restarts (10), keeping the
  lowest-inertia solution. Nothing touches wall-clock time or unordered
  iteration. Verified: two consecutive runs produce an identical JSON file.
- **No dependency to vet or pin.** A ~150-line k-means avoids adding an npm
  package (and a `bun.lock` churn) for a build-time script, and sidesteps the
  reproducibility risk of a black-box library's own seeding.
- **Fits the data size.** ~40 respondents (a few hundred at most on real data)
  over a handful of clusters is trivial for plain Lloyd's iteration; silhouette
  is affordable to compute on every candidate `k`.

**Alternatives considered.**

- **k-modes** (categorical-native, matches on modes). More principled for pure
  nominal data, but it discards the ordinal ordering the schema deliberately
  encodes, and needs its own implementation or dependency for no measurable win
  at this scale. Reconsider if one-hot k-means proves unstable on real data.
- **Hierarchical / agglomerative.** Nice dendrogram for *exploring* cluster
  count, but no seeded, incremental build-time story benefit over k-means, and
  `O(n²)`–`O(n³)`. Useful as an offline sanity check, not the build path.
- **DBSCAN.** Density-based; awkward on high-dimensional one-hot data and
  requires ε tuning per dataset — poor fit for an unattended build step.

## 4. Cluster count

The prototype **sweeps `k ∈ {3, 4, 5, 6}`** and selects the `k` with the highest
mean **silhouette coefficient** (ties → smallest `k`, favouring fewer, more
distinct archetypes). The sweep and the winner are written into
`archetypes.json` (`kSweep`, `selectedK`, `selectedSilhouette`) so the choice is
auditable, not hidden.

On the current mock data every `k` scores a silhouette near `0` (≈0.03–0.05),
because the mock answers are independent uniform draws with no real groups — so
the selection is effectively arbitrary there and lands on `k=3`. **This is the
expected, honest result for structureless data** and is exactly why the story is
tagged mock-only. The bounds `{3..6}` reflect the product intent (a handful of
nameable giraffe archetypes, not dozens); widen or narrow them once real data
shows genuine separation.

## 5. Naming clusters (human-friendly archetypes)

Clusters come out numbered (`0..k-1`). Giving each a Kompaan-flavoured name is a
**human step**, driven by the data the prototype already emits:

1. Each cluster in `archetypes.json` carries a **`signature`**: the *dominant
   answer* (and its `share`) for every cluster question among that cluster's
   members. Read the high-share, high-signal questions first — `borrelRole`,
   `appGroupRole`, `idealBorrel`, `drink`, `planSpontaneous` /
   `festivalTerrace` / `danceSideline` — to see what makes the group distinctive.
2. Coin a short Dutch archetype name in the giraffe/borrel voice from that
   profile (e.g. a cluster whose signature is *De organisator* + *De planner* +
   *Plannen* + *Verantwoord naar huis* → something like **"De Regelgiraf"**).
3. Write the chosen name back into the cluster's `name` field (currently `null`,
   a deliberate placeholder) — or, preferably, maintain the number→name map in
   BORREL-2.6 so re-clustering never clobbers curated names.

Naming is intentionally **not** automated: it is editorial/brand work and needs
a human's eye. The prototype's job is to hand that human a clean signature per
cluster.

## 6. Retuning on real data

When the real Google-Form CSV replaces `data/responses.csv`:

1. **Re-run** `bun run archetypes` — nothing in the pipeline is hard-coded to
   the mock rows; it reads whatever `getResponses()` returns.
2. **Read the silhouette sweep** in `archetypes.json`. Real data should separate
   better than the mock's ≈0. Pick the `k` at the silhouette peak; adjust the
   `K_CANDIDATES` range in `cluster.ts` if the peak sits at an edge.
3. **Revisit encoding weights** (§2) if one question dominates: the `1/√2`
   one-hot scale and the ordinal `[0,1]` scale are the knobs. Down-weighting a
   noisy/low-signal question (e.g. `cuisine`, flagged *low weight / droppable*
   in the schema) or dropping it from `CLUSTER_FIELDS` is a one-line change.
4. **Re-derive names** (§5) from the new signatures — real archetypes may differ
   from anything the mock suggested.
5. **Keep the seed fixed** (`SEED` in `cluster.ts`) so a given dataset stays
   reproducible across CI runs; only change it deliberately if you want to
   reshuffle tie-broken assignments.

The schema comment in `lib/data/schema.ts` already flags that only the option
tuples and `QUESTIONS` registry change when real data lands — the clustering
code follows automatically from that registry.

## 7. Files

| File | Role |
|------|------|
| `scripts/archetypes/encode.ts` | schema-driven feature encoding (closed questions only) |
| `scripts/archetypes/kmeans.ts` | dependency-free seeded k-means + k-means++ + silhouette |
| `scripts/archetypes/cluster.ts` | orchestrator: load → encode → sweep k → emit JSON |
| `scripts/archetypes/archetypes.json` | committed output: assignments + per-cluster signatures |
| `package.json` → `archetypes` script | `bun run archetypes` regenerates the JSON |
