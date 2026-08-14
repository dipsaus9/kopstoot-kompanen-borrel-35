# Kompaan archetypes — Borrel 35

> The final, named archetypes for the Borrel 35 site. Each one is a human reading
> of a cluster produced by the build-time clustering prototype (**BORREL-2.5**,
> `scripts/archetypes/cluster.ts`). The typed source of truth is
> `content/archetypes/index.ts`; this document is the human-readable companion.
>
> **Scope of this story (BORREL-2.6):** named archetypes + descriptions only.
> Promo imagery was **deferred to a follow-up story** by owner decision
> (2026-08-14).

## Read this first — built on mock data

The clustering that produced these archetypes currently runs on the **mock** CSV
(`data/responses.csv`, 40 seeded rows). Those rows are drawn from a **uniform
random pick per question**, so they carry no latent structure: the three
clusters are only **weakly separated** (silhouette ≈ **0.05**, essentially
noise). See `docs/archetype-approach.md` → *Retuning on real data*.

So treat everything below as a **template**, not a finding. The giraffe voice and
the shape of each profile are the deliverable; the specific dominant answers
(the percentages) **must be re-derived** once the real Google-Form responses
land. Rerun `bun run archetypes`, then update the traits and, if needed, the
names in `content/archetypes/index.ts` and this file.

Each archetype maps 1:1 to a cluster in `scripts/archetypes/archetypes.json`
(`k = 3`). The percentages cited under *Defining traits* are the share of that
cluster's members giving the dominant answer to the question.

---

## De Plan-Giraffe

_Cluster 0 · 15 respondents_

Torent kalm boven de chaos uit met een strak plan in de hand. Regelt de borrel,
claimt het terras en houdt het overzicht — spontaan is voor andere dieren.

**Defining traits**

- Plant álles: **100%** kiest "Plannen" boven spontaan.
- Natuurmens in hart en nieren (**73%** Natuur boven Stad).
- Terraskoning (**60%** Terras boven Festival).
- De organisator (**33%**) én sfeermaker (**33%**) van het gezelschap.
- Komt als één van de eersten binnen (**40%**) en houdt het bij "nog even één
  drankje" (**53%**).
- Avondmens (**67%**), maar danst het liefst vanaf de zijlijn (**60%**).

---

## De Kom-Eraan-Giraffe

_Cluster 1 · 14 respondents_

Roept al een uur "Ik kom eraan!" vanaf de bank thuis. Duikt spontaan op, danst
de hele avond en verdwijnt daarna zonder gedag — de vaste ster van elke
themaborrel.

**Defining traits**

- **100%** ochtendmens — vroeg wakker, laat op de borrel.
- Het "ik-kom-eraan"-liegbeest (**29%**) dat roept dat-ie onderweg is terwijl-ie
  nog thuis zit (**36%**).
- Meester van de verdwijntruc (**43%**).
- Spontaan (**64%**), stadsmens (**71%**) en festivalganger (**64%**).
- Staat wél gewoon op de dansvloer (**71%**).
- Houdt van een themaborrel (**43%**) en sluit af met eten (**43%**).

---

## De Verantwoorde Reus

_Cluster 2 · 11 respondents_

Te lang voor elk bed, te verstandig voor de laatste ronde. Blijft trouw bij de
vaste kliek, gaat op tijd naar huis en glimlacht dapper bij de zoveelste
lengtegrap.

**Defining traits**

- Gaat verantwoord naar huis (**55%**) en vroeg naar bed (**91%**).
- Trouw aan de vaste kliek (**55%**).
- De ghost in de groepsapp (**45%**).
- Voeten steken uit elk bed (**45%**) en krijgt wekelijks de lengtevraag
  (**36%**).
- Avondmens vanbinnen (**91%**), maar danst vanaf de zijlijn (**64%**).
- Glimlacht bij de zoveelste lengtegrap en "sterft vanbinnen" (**27%**).
