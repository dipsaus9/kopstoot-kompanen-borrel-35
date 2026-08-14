# Enquête — definitieve vragenlijst (Borrel 35 · Jan Kompaan Modaal)

> Settled question set for the Kopstoot Kompanen Borrel 35 site. Every downstream story
> (data schema `BORREL-2.2`, clustering spike `BORREL-2.5`, archetype generation `BORREL-2.6`,
> and the four build epics) builds on **this** list. Owner reviews + approves before the Google
> Form is frozen.

Dutch question text is preserved as it will appear in the form; annotations are for the build.

## Legend

- **Type** — `open` (free text) · `single` (one choice) · `number` (numeric input).
- **Verplicht** — required (●) / optional (○) in the form.
- **Rol** — analytic role for the site:
  - `identity` — who the row is (name).
  - `stat` — aggregate number/category shown in the **average Kompaan** profile.
  - `cluster` — feeds the **archetype clustering** (`BORREL-2.5`) and the **% gemiddelde Kompaan** match.
  - `showcase` — free-text, shown as quotes; **never clustered**.
- **% match** — ✓ = counts toward *"Jij bent X% gemiddelde Kompaan"* / *"n/m kenmerken"*.

---

## 1. Identiteit & statistieken

| # | Vraag | Type | Verplicht | Opties | Rol | % match |
|---|-------|------|:--:|--------|-----|:--:|
| 1 | Hoe mogen we je noemen? | open | ● | — (vrije naam) | identity | — |
| 2 | Hoe jong ben je? | number | ● | leeftijd in hele jaren | stat | ✓ |
| 3 | Hoe lang ben je in centimeters? | number | ● | lichaamslengte in cm (3 cijfers, ~100–230) | stat | ✓ |
| 4 | Uit welke provincie kom je? | single | ● | Groningen · Friesland · Drenthe · Overijssel · Flevoland · Gelderland · Utrecht · Noord-Holland · Zuid-Holland · Zeeland · Noord-Brabant · Limburg · Buiten Nederland | stat | ✓ |
| 5 | Hoeveel borrels heb jij inmiddels op je naam staan? | number | ● | aantal (hele getallen) | stat | ✓ |
| 6 | Kom je borrelen zaterdag 29 augustus? | single | ● | Uiteraard. Mijn kleedje ligt al klaar! · Ik ben nog in onderhandeling met mijn verantwoordelijkheden… · Ik wil graag, maar durf nog niet (app Biko, Jolie, Iris, Cait of Emma) · Ik moet de haren op mijn hoofd tellen · Ik ben verhinderd door een ernstig geval van slechte prioriteiten | stat (RSVP) | — |

**Notes**
- **Q2 leeftijd**: kept as an exact **number**, not a bracket — a number aggregates cleanly (real average age) and can be bracketed later for display; a bracket can't be un-bracketed. Display on the site may still show a range.
- **Q4 provincie**: the raw list gave no options → the 12 NL provinces are enumerated, plus **Buiten Nederland** so no one is stuck.
- **Q6 aanwezigheid**: this is an **RSVP / logistics** answer, not a personality trait. It's a fun aggregate stat (opkomst %) but is **excluded from clustering and from the % match** — it says nothing about *what kind* of Kompaan you are.

---

## 2. De test — persoonlijkheid & borrelgedrag (clustering features)

All `single`, all required (●), all `cluster` + count toward the **% match** (✓).

| # | Vraag | Opties |
|---|-------|--------|
| 7 | Wat is jouw grootste lange-mensen-struggle? | Te weinig beenruimte · Kleding die nooit lang genoeg is · Douchekoppen op borsthoogte · Bedden waar mijn voeten uitsteken · Altijd "hoe lang ben jij?" horen · Mensen die vragen of ik basketbal |
| 8 | Waar zit jij het liefst in een vliegtuig? | Nooduitgang · Gangpad · Raam · In het midden · Maakt niet uit, ik lijd toch |
| 9 | Hoe vaak krijg jij de vraag "Hoe lang ben jij?"? | Dagelijks · Wekelijks · Regelmatig · Bijna nooit meer · Nooit |
| 10 | Wat is het grootste voordeel van lang zijn? | Overal bij kunnen · Altijd goed zicht · Mensen terugvinden op festivals · Indrukwekkend zijn zonder iets te doen · Welk voordeel? |
| 11 | Hoe laat ben jij normaal op een borrel? | Als één van de eersten · Keurig op tijd · Modieus te laat · "Ik kom eraan!" terwijl ik nog thuis ben · Als allerlaatste |
| 12 | Hoe eindigt jouw gemiddelde Kompanenborrel? | Verantwoord naar huis · Nog even één drankje · SHOTJESS · Met eten · Geen idee meer |
| 13 | Wat is jouw ideale borrel? | Parkborrel · Kroegborrel · Themaborrel · Gala · Feestborrel |
| 14 | Op een borrel ben ik meestal… | De sociale butterfly · De vaste-kliek-hanger · De organisator · De verdwijntruc · Degene die iedereen drank geeft · Degene die ineens een diep gesprek heeft |

### Kies één (2.b) — snelle knopen, ook clustering features

| # | Vraag | Opties |
|---|-------|--------|
| 15 | Kies één | Plannen · Spontaan |
| 16 | Kies één | Stad · Natuur |
| 17 | Kies één | Festival · Terras |
| 18 | Kies één | Vroeg naar bed · We zien wel waar dit eindigt |
| 19 | Kies één (keuken) | Italiaanse · Aziatische · Nederlandse · Mexicaanse · Anders |
| 20 | Kies één | Ochtendmens · Avondmens |

**Encoding notes for `BORREL-2.5` clustering**
- **Ordinal** (encode as an ordered scale, not one-hot): Q9 (Dagelijks→Nooit), Q11 (eersten→allerlaatste). Q12 has a mild "verantwoord → los" ordering but is safest as nominal.
- **Nominal / one-hot**: Q7, Q8, Q10, Q13, Q14, Q19.
- **Binary**: Q15–Q18, Q20.
- **Weighting**: Q14 (sociale rol) and Q11/Q12 (borrel-avond) are the strongest archetype signals; Q19 (keuken) is the weakest — give it low weight or drop it if it adds noise. Decide in the spike.
- Q10 option "Welk voordeel?" and Q8 "Maakt niet uit, ik lijd toch" are valid categories, not missing data.

---

## 3. Open vragen — **showcase only, niet geclusterd**

| # | Vraag | Type | Verplicht | Rol |
|---|-------|------|:--:|-----|
| 21 | Maak de zin af: "Je weet dat je een Kompaan bent als…" | open | ● | showcase |
| 22 | Welke eigenschap MOET de ultieme Kompaan volgens jou hebben? | open | ● | showcase |

These two are the "mooiste dingen" — surfaced as **quotes / a wall** on the site (superlatives epic).
They are **explicitly excluded from clustering and the % match** (free text, not comparable). Owner
may set these to optional (○) if response rate suffers — they are the only two safe to make optional.

---

## 3b. Extra / leuke vragen (nieuw — playful add-ons)

Six added questions to boost the fun, strengthen the archetypes and feed the superlatives. Tone kept
in line with the rest (speels, giraffe-humor, uit de liefdeshoek).

| # | Vraag | Type | Verplicht | Opties | Rol | % match |
|---|-------|------|:--:|--------|-----|:--:|
| 23 | Hoe vaak stoot je je hoofd? | single | ● | Dagelijks · Wekelijks · Alleen bij lage deuren · Nooit, ik duik automatisch | stat (superlatief, ordinaal) | — |
| 24 | Jouw standaard reactie op "hoe is het weer daarboven?" | single | ● | Lach maar mee · Negeren · Gevat terugkaatsen · Elke keer verzin ik wat nieuws · Ik glimlach en sterf vanbinnen | cluster | ✓ |
| 25 | Jouw vaste borrel-drankje? | single | ● | Bier · Wijn · Shot(s) · Fris/0.0 · Cocktail · Wat er maar is | cluster (+ superlatief) | ✓ |
| 26 | Jouw rol in de app-groep? | single | ● | De planner · De ghost · De meme-spammer · Het "ik-kom-eraan"-liegbeest · De sfeermaker | cluster | ✓ |
| 27 | Kies één | single | ● | Dansvloer · Zijlijn | cluster (binair) | ✓ |
| 28 | Meest gehoorde lengte-opmerking waar je klaar mee bent? | open | ● | — (vrije tekst) | showcase | — |

**Notes**
- **Q25 (drankje)** and **Q26 (app-rol)** are strong archetype signals — great for the typetjes; Q25 also drives a superlatief ("meest voorkomende Kompanen-drankje").
- **Q23 (hoofd stoten)** is a superlatief/fun stat, encode **ordinal**.
- **Encoding for `BORREL-2.5`**: Q23 ordinal · Q24/Q25/Q26 nominal (one-hot) · Q27 binary.
- **Q28** joins the quote-wall with Q21/Q22 — **showcase only, not clustered**.

---

## 4. Changes & rationale (raw → final)

| Change | Rationale |
|--------|-----------|
| Q2 "Hoe jong ben je?" → **numeric age** (was ambiguous; earlier draft used a bracket) | A number aggregates to a real average and can be bucketed later; a bracket loses information permanently. |
| Q4 provincie → **enumerated 12 provinces + "Buiten Nederland"** | Raw gave no options; a fixed list keeps the province stat clean and comparable. |
| Q6 aanwezigheid → tagged **RSVP stat, excluded from clustering & % match** | It's event logistics, not a personality trait — clustering on it would pollute the archetypes. |
| "Kies een" → **"Kies één"** | Correct spelling; keep the four (now six) quick-choice items grouped. |
| Q9 / Q11 marked **ordinal** | They have a natural order; encoding them ordinally gives the clustering more signal than one-hot. |
| Q19 keuken flagged **low-weight / droppable** | Food preference correlates weakly with the borrel archetypes; keep it fun but don't let it dominate. |
| No duplicates removed | The current raw set has no true duplicates (the old "leeftijdscategorie" is now folded into Q2). |
| **Added 6 playful questions (Q23–Q28)** — head-bumping, "weer daarboven"-reactie, vaste drankje, app-groep-rol, dansvloer/zijlijn, meest-gehoorde lengte-opmerking | More lol + stronger archetype signal & superlatives; tone kept playful. Q23–Q27 closed, Q28 open showcase. |

## 5. Summary

- **28 questions**: 1 identity · 6 stats (1 RSVP) · 18 clustering features · 3 open showcase.
- **Clustering (`BORREL-2.5`) uses Q7–Q20 + Q24–Q27** (18 features).
- **% gemiddelde Kompaan** uses Q2–Q5 (stats) + Q7–Q20 + Q24–Q27 (clustering) — a Kompaan is measured on both their numbers and their type.
- **Open Q21/Q22/Q28** are quotes only.
- CSV column order should follow this numbering so `BORREL-2.2` can map headers → schema fields directly.

> **Owner action**: approve this list (or edit inline), then it's frozen into the Google Form and
> becomes the contract for the data schema. Real responses swap in later; the *shape* is settled here.
