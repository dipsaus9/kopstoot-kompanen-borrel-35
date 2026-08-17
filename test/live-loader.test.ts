import { describe, expect, it } from "vitest";

import { toCsv } from "@/lib/data/csv";
import { loadLiveResponses, parseLiveResponses } from "@/lib/data/live";

// Header row mirrors the real Google-Form export: Dutch question texts (with
// their trailing spaces, colons and emoji-free wording), in an arbitrary order
// and interleaved with columns that have no schema field (timestamp, real name,
// consent) which must be dropped.
const HEADER = [
  "Tijdstempel",
  "Hoe heet je?",
  "Wat is je bijnaam of hoe mogen we je noemen?",
  "Hoe jong ben je?",
  "Hoe lang ben je in centimeters? (je lichaamslengte dus)",
  "In welke provincie woon je?",
  "Hoeveel borrels heb jij inmiddels op je naam staan?",
  "Kom je borrelen zaterdag 29 augustus?",
  "Wat is jouw grootste lange-mensen-struggle?",
  "Waar zit jij het liefst in een vliegtuig?",
  "Hoe vaak krijg jij de vraag 'Hoe lang ben jij?'?",
  "Wat is het grootste voordeel van lang zijn?",
  "Wanneer maak jij meestal je entree op een borrel? ",
  "Hoe eindigt jouw gemiddelde kompanenborrel?",
  "Wat is jouw ideale borrel?",
  "Op een borrel ben ik meestal...",
  "Wat is jouw vaste borreldrankje?",
  "Je zegt: 'ik doe deze borrel rustig aan'. Wat betekent dat? ",
  "Kies je habitat:",
  "Afspraken plannen of spontaan afspreken?",
  "Waar vinden we jou op een vrije zomerdag? ",
  "Wat is je lievelingskeuken?",
  "Maak de zin af: Je weet dat je een Kompaan bent als...",
  "Welke lengte-opmerking mag wat jou betreft per direct met pensioen? ",
  "Ik beloof plechtig dat ik de tekst gelezen heb.",
  "Heb je nog tips, tops of andere mededelingen? ",
];

/** A row whose answers exercise every kind of normalisation. */
const VALID_ROW = [
  "14-8-2026 18:58:52",
  "Testpersoon", // real name — dropped in favour of the nickname
  "Tester",
  "30",
  "185",
  "Utrecht",
  "Acht-en-twintigste", // Dutch ordinal → 28
  "Uiteraard. Mijn kleedje ligt al klaar!",
  "Iets wat niet mapt, Te weinig beenruimte", // multi-select: first mappable token wins
  "Nooduitgang, take my money", // prefix + trailing flavour text → "Nooduitgang"
  "Een paar keer per maand", // alias → "Regelmatig"
  "De bovenste plank is gewoon een normale plank", // alias → "Overal bij kunnen"
  "Als één van de eersten",
  "Keurig en verantwoord naar huis", // alias → "Verantwoord naar huis"
  "Parkborrel 🌳", // emoji stripped → "Parkborrel"
  "De regelaar: heeft pleisters, een powerbank en weet waar iedereen is", // alias → "De organisator"
  "Mijn geheime homemade mix", // alias → "Cocktail"
  "Dat meen ik daadwerkelijk en iedereen lacht me uit", // alias → "Vroeg naar bed"
  "🏙️ Stad", // emoji stripped → "Stad"
  "Spontaan",
  "Festival: €8,50 voor een lauw biertje", // prefix → "Festival"
  "Italiaans", // prefix → "Italiaanse"
  "je altijd je kop stoot",
  "Hoe is het weer daarboven?",
  "Ja baas",
  "een leuke tip",
];

/** Same as VALID_ROW but with an unparseable borrel count → row is skipped. */
const INVALID_ROW = VALID_ROW.map((cell, i) =>
  i === 6 ? "geen flauw idee" : cell,
);

describe("parseLiveResponses", () => {
  const rows = parseLiveResponses(toCsv([HEADER, VALID_ROW, INVALID_ROW]));

  it("maps every valid row and skips unparseable ones", () => {
    // Only the valid row survives; the bad borrel-count row is dropped.
    expect(rows).toHaveLength(1);
  });

  it("picks the nickname column for the name (not the real name)", () => {
    expect(rows[0].name).toBe("Tester");
  });

  it("parses numeric stats and Dutch ordinal borrel counts", () => {
    expect(rows[0].age).toBe(30);
    expect(rows[0].heightCm).toBe(185);
    expect(rows[0].borrelCount).toBe(28);
  });

  it("normalises closed answers onto the schema option sets", () => {
    expect(rows[0].province).toBe("Utrecht");
    expect(rows[0].tallStruggle).toBe("Te weinig beenruimte");
    expect(rows[0].planeSeat).toBe("Nooduitgang");
    expect(rows[0].heightQuestionFreq).toBe("Regelmatig");
    expect(rows[0].tallAdvantage).toBe("Overal bij kunnen");
    expect(rows[0].borrelEnding).toBe("Verantwoord naar huis");
    expect(rows[0].idealBorrel).toBe("Parkborrel");
    expect(rows[0].borrelRole).toBe("De organisator");
    expect(rows[0].drink).toBe("Cocktail");
    expect(rows[0].earlyBedLate).toBe("Vroeg naar bed");
    expect(rows[0].cityNature).toBe("Stad");
    expect(rows[0].festivalTerrace).toBe("Festival");
    expect(rows[0].cuisine).toBe("Italiaanse");
  });

  it("keeps open answers verbatim", () => {
    expect(rows[0].kompaanIfSentence).toBe("je altijd je kop stoot");
    expect(rows[0].heightRemark).toBe("Hoe is het weer daarboven?");
    expect(rows[0].ultimateKompaanTrait).toBe("een leuke tip");
  });

  it("fills schema fields with no form column from documented defaults", () => {
    expect(rows[0].morningEvening).toBe("Ochtendmens");
    expect(rows[0].headBump).toBe("Dagelijks");
    expect(rows[0].weatherReaction).toBe("Lach maar mee");
    expect(rows[0].appGroupRole).toBe("De planner");
    expect(rows[0].danceSideline).toBe("Dansvloer");
  });

  it("returns an empty array for a header-only or empty CSV", () => {
    expect(parseLiveResponses(toCsv([HEADER]))).toHaveLength(0);
    expect(parseLiveResponses("")).toHaveLength(0);
  });
});

describe("loadLiveResponses", () => {
  it("skips the network under the test runner so tests stay offline", async () => {
    // The unit-test guard means it never fetches — the caller falls back to the
    // committed mock CSV.
    await expect(loadLiveResponses()).resolves.toBeNull();
  });
});
