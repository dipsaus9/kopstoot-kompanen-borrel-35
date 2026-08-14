# Kompaan archetypes — Borrel 35

> The final, named archetypes for the Borrel 35 site. Each one is a human reading
> of a cluster produced by the build-time clustering prototype (**BORREL-2.5**,
> `scripts/archetypes/cluster.ts`). The typed source of truth is
> `content/archetypes/index.ts`; this document is the human-readable companion.
>
> **Scope of this story (BORREL-2.6):** named archetypes + descriptions only.
> Promo imagery was **deferred to a follow-up story** by owner decision
> (2026-08-14).

## Read this first — built on mock data, count pinned

The clustering that produced these archetypes currently runs on the **mock** CSV
(`data/responses.csv`, 40 seeded rows). Those rows are drawn from a **uniform
random pick per question**, so they carry no latent structure: at every cluster
count the clusters are **barely separated** (silhouette ≈ **0.03**, essentially
noise). Because silhouette can't meaningfully choose, the cluster count is
**pinned at `k = 6`** by design (`DEFAULT_K` in `cluster.ts`; override with
`ARCHETYPE_K`), not selected by the data. See `docs/archetype-approach.md` →
*Retuning on real data*.

So treat everything below as a **template**, not a finding. The giraffe voice and
the shape of each profile are the deliverable; the specific dominant answers (the
percentages) — and possibly the right number of archetypes — **must be
re-derived** once the real Google-Form responses land. Rerun `bun run archetypes`,
then update the traits and, if needed, the names in
`content/archetypes/index.ts` and this file.

Because the clusters are noise, some mix contradictory answers; each name leans
on that cluster's **most coherent, defining signals** and ignores the rest. Each
archetype maps 1:1 to a cluster in `scripts/archetypes/archetypes.json` (`k = 6`).
The percentages cited under *Defining traits* are the share of that cluster's
members giving the dominant answer to the question.

---

## De Parkborrelprofessional

_Cluster 0 · 7 respondents_

Regelt de borrel alsof het een gala is: locatie in het groen, terras geclaimd,
draaiboek in de hand. Torent kalm boven de chaos uit en overziet alles vanaf de
zijlijn — spontaan is voor andere dieren.

**Defining traits**

- Natuurmens in hart en nieren (**100%** Natuur boven Stad).
- Plant álles (**71%**) en is dé organisator van het gezelschap (**57%**).
- Terraskoning (**71%**) met een zwak voor een gala (**42%**).
- Danst vanaf de zijlijn (**57%**) en gaat verantwoord naar huis (**57%**).

---

## De Festival-Flamingo

_Cluster 1 · 6 respondents_

Lange poten, fel aanwezig, en op elk festival als eerste op de dansvloer. Roept
dat-ie eraan komt, duikt spontaan op bij elke themaborrel en sluit de avond af
met een hap eten.

**Defining traits**

- Festivalbeest (**100%** Festival) en staat altijd op de dansvloer (**83%**).
- Spontaan (**66%**) en gek op een themaborrel (**66%**).
- Het "ik-kom-eraan"-liegbeest in de groepsapp (**50%**).
- Sluit de avond af met eten (**66%**).

---

## De Salmari-Soldaat

_Cluster 2 · 4 respondents_

Marcheert de stad in, recht de dansvloer op, en gaat door op shots en "nog even
één drankje". Meester van de verdwijntruc: het ene moment middenin het feest, het
volgende spoorloos.

**Defining traits**

- Altijd op de dansvloer (**100%**) en echt een stadsmens (**100%**).
- Meester van de verdwijntruc (**75%**) en door en door spontaan (**75%**).
- Shots (**50%**) en het klassieke "nog even één drankje" (**50%**).
- Kiest terras boven festival als het even kan (**100%**).

---

## De Lange Nachtbraker

_Cluster 3 · 9 respondents_

Avondmens tot in de tenen: begint pas los te komen als de rest al gaapt, en
houdt het bij "nog even één drankje" tot diep in de nacht. Plant zijn avonden
strak, maar danst het liefst vanaf de zijlijn.

**Defining traits**

- Onverbeterlijke avondmens (**88%**).
- Blijft hangen voor "nog even één drankje" (**77%**).
- Plant zijn avond strak (**77%**) en danst vanaf de zijlijn (**77%**).
- Festivalganger als het uitkomt (**66%**).

---

## De Verantwoordelijke Kompaan

_Cluster 4 · 6 respondents_

De trouwe kompaan van de vaste kliek: komt voor de gezelligheid, gaat op tijd
verantwoord naar huis en ligt vroeg op één oor. Een feestborrel in het groen,
maar wel met een oogje op de klok.

**Defining traits**

- Vroeg naar bed (**83%**) en gaat verantwoord naar huis (**66%**).
- Trouw aan de vaste kliek (**50%**).
- Natuurmens (**83%**) met een voorliefde voor de feestborrel (**66%**).
- De stille ghost in de groepsapp (**66%**).

---

## De Bedtijd-Baron

_Cluster 5 · 8 respondents_

Brengt de sfeer, schenkt de wijn en maakt de kroegborrel — maar heerst met
ijzeren hand over de eigen bedtijd. Om twaalf uur verandert deze pompoen resoluut
in een uitgeruste ochtendmens.

**Defining traits**

- Onwrikbaar vroeg naar bed (**100%**).
- Ochtendmens (**62%**) die tóch de sfeermaker is (**37%**).
- Houdt van een kroegborrel (**37%**) met een glas wijn (**37%**).
- Danst het liefst vanaf de zijlijn (**62%**).
