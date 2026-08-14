# Build-epic roadmap — Borrel 35

> The launch plan for the Borrel 35 site. It enumerates the **four build epics**
> that turn the committed foundation (data schema, clustering, named archetypes,
> design system) into the shippable product, and freezes each epic's scope,
> foundation dependencies and launch boundaries so a future session can run
> `backlog-plan` per epic **without re-deciding direction**.
>
> Written as **BORREL-2.4**, the last planning artifact of the `BORREL-2`
> foundation epic. Everything below builds on decisions already locked — read the
> next section before changing anything here.

## Locked decisions this roadmap is built on

These are settled (BORREL-2 foundation planning, 2026-08-14). No build epic may
quietly reverse one; a change here is a new planning decision, not an
implementation detail.

- **Static CSV explorer, no backend.** The whole site is a **build-time renderer
  of one committed Google-Form CSV** (`data/responses.csv`). There is **no
  on-site quiz, no live submission, no runtime database.** The quiz lives in an
  external Google Form; a data refresh = re-export the CSV → recommit →
  redeploy. Every epic below reads data through the build-time loader
  `getResponses()` (`lib/data/index.ts`), never a request-time fetch.
- **Real, open names.** Individuals are shown with their **real names** on the
  public Vercel URL — an owner call. No auth gate unless explicitly asked.
- **Build-time, data-driven clustering.** Archetypes come from clustering the
  closed questions at build time (BORREL-2.5), then human naming (BORREL-2.6).
  The two open "showcase" questions are **never clustered** — quotes only.
- **Mock data until the real CSV lands.** Everything currently runs on a **40-row
  mock CSV** whose rows are uniform-random, so aggregates and clusters carry no
  real signal yet. Build against the *shape* of the data; the numbers become real
  when the Google-Form export is committed. See the "Mock-data caveat" each epic
  carries.
- **Playful, bold, vertical giraffe motif** layered on the shadcn base theme —
  the shared look every epic renders in (BORREL-2.3, design system).
- **Deadline: Borrel 35 — 2026-08-29, 15:00, Griftpark.** Tight. Keep every epic
  **lean**: ship the four core views, defer everything else (see each epic's
  *Out for launch*).

## Foundation artifacts (what each epic depends on)

The build epics consume these, all produced by the `BORREL-2` foundation epic.
They are the stable contracts — an epic depends on the artifact, not on
re-deriving it.

| Artifact | Story | Where it lives | What it gives an epic |
|---|---|---|---|
| Typed schema + question registry | BORREL-2.2 | `lib/data/schema.ts` (`QUESTIONS`, `SurveyResponse`, roles `identity`/`stat`/`cluster`/`showcase`) | The field contract: which questions exist, their types, option tuples and analytic role |
| Mock CSV + validating loader | BORREL-2.2 | `data/responses.csv`, `lib/data/index.ts` (`getResponses`, `getResponseCount`) | Build-time, memoised, typed access to every response — the single data door |
| Clustering output | BORREL-2.5 | `scripts/archetypes/archetypes.json` (+ `cluster.ts`, `encode.ts`, `kmeans.ts`); method in `docs/archetype-approach.md` | Per-respondent cluster assignments + each cluster's dominant-answer signature, `k = 6` |
| Named archetypes | BORREL-2.6 | `content/archetypes/index.ts` (`ARCHETYPES`), human companion `docs/archetypes.md` | Six giraffe-voiced archetypes with `id`, `name`, `description`, `definingTraits`, `sourceClusterId` |
| Design system | BORREL-2.3 *(in flight)* | `app/theme/*`, `docs/design-system.md` *(not yet on `main`)* | Giraffe/borrel tokens + primitives layered on shadcn — the shared visual language |

Cross-references: survey question contract `docs/survey-final-questions.md`
(BORREL-2.1); clustering method `docs/archetype-approach.md` (BORREL-2.5);
archetype readings `docs/archetypes.md` (BORREL-2.6).

---

## Epic 1 — Average Kompaan profile

**Scope.** The landing view: the site's centrepiece, a single "Jan Kompaan
Modaal" card that renders the whole club as **one average member**. It aggregates
every `stat`-role answer across all responses — average height and age, most
common province, median borrel count — alongside the most-picked fun answers
(ideal borrel, plane seat, how the night ends, drink, app-group role, dance vs.
sideline). The output is **visual and playful, never "38% picked this"**: big
giraffe-styled tiles, a headline number, a portrait of the composite Kompaan.
This is the first thing a visitor sees and the reference profile the
Find-yourself epic compares people against.

**Foundation dependencies.**
- **BORREL-2.2** — reads all responses via `getResponses()` (`lib/data/index.ts`);
  aggregates the `stat`- and `cluster`-role questions defined in `QUESTIONS`
  (`lib/data/schema.ts`). Number fields (age, height, borrel count) average
  directly; single-choice fields reduce to a mode over their option tuple.
- **BORREL-2.3** — renders in the giraffe/borrel design tokens and stat-tile
  primitives (`docs/design-system.md`).
- Independent of clustering/archetypes — this epic is pure aggregation.

**In for launch.** One aggregate profile over the full dataset; averages for the
numeric stats; modal answer for each closed question; a curated selection of the
"fun" MC answers as visual tiles; responsive giraffe-themed layout.

**Out for launch.** No per-segment averages (by province, age bracket, gender);
no distributions/histograms or "38%" breakdowns; no time trends; no filtering.
Those are post-launch enrichments once real data justifies them.

**Mock-data caveat.** On the mock CSV the "average" is meaningless noise (uniform
random). Build and style against the shape; the composite becomes real when the
Google-Form CSV is committed — no code change, just a data swap and redeploy.

---

## Epic 2 — Find-yourself lookup

**Scope.** The personal view: a visitor picks their **name** from the committed
responses and gets *their* card — their own answers, **their "% gemiddelde
Kompaan"** score ("Jij bent 87% gemiddelde Kompaan" / "3 van de 12 kenmerken van
de gemiddelde Kompaan"), and **their archetype**. The percentage is computed by
comparing that person's answers against the Average Kompaan profile from Epic 1
(share of tracked traits that match the modal answer); the archetype comes from
their cluster assignment. It is the self-comparison hook — playful, about
belonging to the group, deliberately **not** matchmaking or dating (tone
constraint from the vision).

**Foundation dependencies.**
- **BORREL-2.2** — the per-row identity: name (`identity` role) as the lookup key,
  and the individual's answers via `getResponses()`.
- **Epic 1's aggregate** — the baseline the "% average" is measured against
  (reuse Epic 1's aggregation, don't recompute independently).
- **BORREL-2.5 / BORREL-2.6** — maps the person → their cluster
  (`scripts/archetypes/archetypes.json`) → their named archetype
  (`content/archetypes/index.ts`) for the archetype badge on the card.
- **BORREL-2.3** — the card + score design.

**In for launch.** Name-based lookup over the committed responses; a personal card
with the person's own answers; a single "% gemiddelde Kompaan" score with a short
matched-traits readout; the person's archetype badge linking to its gallery
entry. **Real names shown openly** (locked decision).

**Out for launch.** No person-to-person matching or "who is most like me" (that
drifts toward the fixborrel/dating corner the vision rules out); no auth/private
links; no editing answers on-site; no share-image export.

**Mock-data caveat.** Mock names are seeded placeholders and the % score is noise;
the real roster and real scores arrive with the committed Google-Form CSV.

---

## Epic 3 — Archetypes gallery

**Scope.** The typetjes view: a gallery of the **six named Kompaan archetypes** —
De Parkborrelprofessional, De Festival-Flamingo, De Salmari-Soldaat, De Lange
Nachtbraker, De Verantwoordelijke Kompaan, De Bedtijd-Baron — each rendered as a
giraffe-voiced character card with its name, description, defining traits and (as
data allows) how many members it holds and who they are. It turns the clustering
output into the site's most shareable, personality-driven surface and is the
destination the Find-yourself archetype badge links into.

**Foundation dependencies.**
- **BORREL-2.6** — the display source of truth: `ARCHETYPES` in
  `content/archetypes/index.ts` (names, descriptions, `definingTraits`,
  `sourceClusterId`); human companion `docs/archetypes.md`.
- **BORREL-2.5** — cluster membership + sizes from
  `scripts/archetypes/archetypes.json` (via `sourceClusterId`) to list each
  archetype's respondents and counts.
- **BORREL-2.2** — resolves cluster members back to real people (names/answers)
  via `getResponses()`.
- **BORREL-2.3** — the character-card visual language.

**In for launch.** All six archetypes as cards; name, description and defining
traits per card; member list/count per archetype; deep-link target for the
Find-yourself badge.

**Out for launch.** No promo/hero imagery per archetype — **explicitly deferred to
a follow-up story** by owner decision (`docs/archetypes.md`); no per-archetype
detail sub-pages beyond the card; no re-running clustering from the UI (clustering
is build-time only, `bun run archetypes`).

**Mock-data caveat.** The six names/traits are a **template derived from the mock
CSV** (silhouette ≈ 0.03, `k` pinned at 6 by design, not chosen by the data). On
real data, rerun `bun run archetypes` and retune traits — and possibly the count
— in `content/archetypes/index.ts` and `docs/archetypes.md`. Build the gallery to
render `ARCHETYPES` as data so a retune needs no layout change.

---

## Epic 4 — Superlatives / leaderboards

**Scope.** The playful-records view: a set of **superlative tiles and small
leaderboards** that celebrate extremes and fun cuts of the dataset — tallest /
shortest Kompaan, most borrels on their name, earliest/latest arriver, the
head-bump champion, most spontaneous, and showcase quotes ("Je weet dat je een
Kompaan bent als…"). It is the light, browsable closer: named people against
playful categories, driven entirely by the committed answers, keeping the club —
not statistics — the star.

**Foundation dependencies.**
- **BORREL-2.2** — the whole dataset via `getResponses()`; ranks over `stat`- and
  `cluster`-role numeric/ordinal fields (height, borrel count, head-bump
  frequency, arrival time) and surfaces the `showcase`-role open answers
  (`kompaanIfSentence`, `ultimateKompaanTrait`, `heightRemark`) as quote tiles.
  Names come from the `identity` field.
- **BORREL-2.3** — leaderboard + quote tile design.
- Independent of clustering/archetypes.

**In for launch.** A curated set of superlative categories (numeric extremes +
ordinal rankings); a short top-N per leaderboard with **real names**; a showcase
strip of open-answer quotes. Categories chosen for fun, not statistical rigour.

**Out for launch.** No user-submitted or votable superlatives (no backend); no
exhaustive per-question leaderboards; no filtering/search across records; no
moderation UI for the open-answer quotes (curate the category list, and the CSV
is committed and reviewable before deploy).

**Mock-data caveat.** Mock extremes and quotes are placeholders; the leaderboards
become real — and worth curating for tone — once the Google-Form CSV is committed.

---

## Planning notes for the per-epic `backlog-plan` runs

- **Suggested launch order:** Epic 1 (Average Kompaan) first — it establishes the
  aggregate that Epic 2's "% average" reuses. Epic 3 (Archetypes gallery) can run
  in parallel; Epic 2 (Find-yourself) depends on both Epic 1's aggregate and the
  archetype mapping; Epic 4 (Superlatives) is independent and can slot in anywhere.
- **Every epic reads data one way:** through `getResponses()` at build time. No
  epic introduces a runtime data path — that would break the static-explorer
  decision.
- **All four render in the BORREL-2.3 design system.** It is in flight; treat
  `docs/design-system.md` and `app/theme/*` as the shared dependency once merged.
- **Data is mock everywhere.** No epic waits on real data to build — each ships
  against the mock CSV and lights up for real when the Google-Form export is
  committed and redeployed, before the **2026-08-29** deadline.
