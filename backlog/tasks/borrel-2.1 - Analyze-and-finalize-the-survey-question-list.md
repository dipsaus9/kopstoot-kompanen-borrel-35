---
id: BORREL-2.1
title: Analyze and finalize the survey question list
status: To Do
assignee: []
created_date: '2026-08-14 14:07'
labels:
  - story
dependencies: []
references:
  - docs/survey-final-questions.md
parent_task_id: BORREL-2
priority: high
type: docs
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Review the near-final Google-Form survey questions, deduplicate and sharpen them, assess each for aggregation and clustering suitability, and produce a clean, human-readable final question list (with answer options and rationale), so the data schema, clustering, archetypes and every build epic are built on one settled question set. This is the first story picked up — everything else fills in better once it lands.

Type: deliverable
Branch: BORREL-2.1/finalize-survey-questions
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 docs/survey-final-questions.md lists every final question with its answer options, marked required/optional and closed/open
- [ ] #2 Each question is annotated for its analytic role (identity, aggregate stat, archetype-clustering feature, or open showcase)
- [ ] #3 Duplicates and ambiguities in the raw set are resolved, each change with a stated rationale
- [ ] #4 The two open questions are flagged as showcase-only (not fed into clustering)
- [ ] #5 The doc is human-readable and scannable, suitable for the owner to review and approve
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Parse the raw list. 2. Group questions by analytic role. 3. Dedupe and clarify wording/options. 4. Recommend the final option sets. 5. Write the human-readable doc with a short changes-rationale section.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Highest priority — pick up first. Deliverable is a doc the owner reviews and approves; keep it scannable (headings/tables), Dutch question text preserved.

Per-question annotation roles to assign: identity (name), aggregate stat (height cm, age, province, borrel count, attendance), archetype-clustering feature (the multiple-choice personality/borrel questions + the kies-één pairs), and open showcase (the two free-text questions — NOT clustered).

Raw questions to analyze (as submitted, unstructured):

IDENTITY / STATS
- Hoe mogen we je noemen? (required)
- Hoe jong ben je? (required)
- Hoe lang ben je in centimeters? (hele lichaamslengte, xxx) (required)
- Uit welke provincie kom je? (required)
- Hoeveel borrels heb jij inmiddels op je naam staan? (required)
- Kom je borrelen zaterdag 29 augustus? (required) — opties: Uiteraard. Mijn kleedje ligt al klaar! / Ik ben nog in onderhandeling met mijn verantwoordelijkheden... / Ik wil graag, maar durf nog niet (app Biko, Jolie, Iris, Cait of Emma) / Ik moet de haren op mijn hoofd tellen / Ik ben verhinderd door een ernstig geval van slechte prioriteiten

DE TEST
- Wat is jouw grootste lange-mensen-struggle? — Te weinig beenruimte / Kleding die nooit lang genoeg is / Douchekoppen op borsthoogte / Bedden waar mijn voeten uitsteken / Altijd hoe lang ben jij horen / Mensen die vragen of ik basketbal
- Waar zit jij het liefst in een vliegtuig? — Nooduitgang / Gangpad / Raam / In het midden / Maakt niet uit, ik lijd toch
- Hoe vaak krijg jij de vraag hoe lang ben jij? — Dagelijks / Wekelijks / Regelmatig / Bijna nooit meer / Nooit
- Wat is het grootste voordeel van lang zijn? — Overal bij kunnen / Altijd goed zicht / Mensen terugvinden op festivals / Indrukwekkend zijn zonder iets te doen / Welk voordeel?
- Hoe laat ben jij normaal op een borrel? — Als een van de eersten / Keurig op tijd / Modieus te laat / Ik kom eraan! terwijl ik nog thuis ben / Als allerlaatste
- Hoe eindigt jouw gemiddelde kompanenborrel? — Verantwoord naar huis / Nog even een drankje / SHOTJESS / Met eten / Geen idee meer
- Wat is jouw ideale borrel? — Parkborrel / Kroegborrel / Themaborrel / Gala / Feestborrel
- Op een borrel ben ik meestal... — De sociale butterfly / De vaste-kliek-hanger / De organisator / De verdwijntruc / Degene die iedereen drank geeft / Degene die ineens een diep gesprek heeft
- Kies een: Plannen / Spontaan
- Kies een: Stad / Natuur
- Kies een: Festival / Terras
- Kies een: Vroeg naar bed / We zien wel waar dit eindigt
- Kies een: Italiaanse / Aziatische / Nederlandse / Mexicaanse keuken / Anders
- Kies een: Ochtendmens / Avondmens
- Maak de zin af: Je weet dat je een Kompaan bent als... (open)
- Welke eigenschap MOET de ultieme Kompaan volgens jou hebben? (open)
<!-- SECTION:NOTES:END -->
