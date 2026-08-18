import { describe, expect, it } from "vitest";

import { toCsv } from "@/lib/data/csv";
import { loadLiveResponses, parseLiveResponses } from "@/lib/data/live";

// Header row mirrors the real Google-Form export: Dutch question texts (with
// their trailing spaces, colons and emoji-free wording), interleaved with
// columns that have no schema field (timestamp, real name, consent, tips) which
// must be dropped.
const HEADER = [
  "Tijdstempel",
  "Hoe heet je?",
  "Wat is je bijnaam of hoe mogen we je noemen?",
  "Hoe jong ben je?",
  "Hoe lang ben je in centimeters? (je lichaamslengte dus)",
  "In welke provincie woon je?",
  "Hoeveelste borrel wordt dit voor jou?",
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
  "Kies je borrel-superkracht",
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
  "Testpersoon", // real name — used as the display name when unique
  "Tester", // nickname — only appended to disambiguate shared real names
  "30",
  "185",
  "Utrecht",
  "Acht-en-twintigste", // Dutch ordinal → 28
  "Uiteraard. Mijn kleedje ligt al klaar!",
  "Iets wat niet mapt, Te weinig beenruimte", // multi-select: first mappable token wins
  "Nooduitgang, take my money 🤑", // emoji stripped → "Nooduitgang, take my money"
  "Een paar keer per maand",
  "De bovenste plank is gewoon een normale plank",
  "Als één van de eersten",
  "Keurig en verantwoord naar huis",
  "Parkborrel 🌳", // emoji stripped → "Parkborrel"
  "De regelaar: heeft pleisters, een powerbank en weet waar iedereen is",
  "Mijn geheime homemade mix",
  "Dat meen ik daadwerkelijk en iedereen lacht me uit",
  "Teleporteren naar huis",
  "🏙️ Stad", // emoji stripped → "Stad"
  "Spontaan",
  "Festival: €8,50 voor een lauw biertje", // prefix → "Festival"
  "ALLES", // uppercase alias → "Alles"
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

  it("uses the real name (not the nickname) when it is unique", () => {
    expect(rows[0].name).toBe("Testpersoon");
  });

  it("parses numeric stats and Dutch ordinal borrel counts", () => {
    expect(rows[0].age).toBe(30);
    expect(rows[0].heightCm).toBe(185);
    expect(rows[0].borrelCount).toBe(28);
  });

  it("normalises closed answers onto the schema option sets", () => {
    expect(rows[0].province).toBe("Utrecht");
    expect(rows[0].tallStruggle).toBe("Te weinig beenruimte");
    expect(rows[0].planeSeat).toBe("Nooduitgang, take my money");
    expect(rows[0].heightQuestionFreq).toBe("Een paar keer per maand");
    expect(rows[0].tallAdvantage).toBe(
      "De bovenste plank is gewoon een normale plank",
    );
    expect(rows[0].borrelEnding).toBe("Keurig en verantwoord naar huis");
    expect(rows[0].idealBorrel).toBe("Parkborrel");
    expect(rows[0].borrelRole).toBe(
      "De regelaar: heeft pleisters, een powerbank en weet waar iedereen is",
    );
    expect(rows[0].drink).toBe("Mijn geheime homemade mix");
    expect(rows[0].earlyBedLate).toBe(
      "Dat meen ik daadwerkelijk en iedereen lacht me uit",
    );
    expect(rows[0].borrelSuperpower).toBe("Teleporteren naar huis");
    expect(rows[0].cityNature).toBe("Stad");
    expect(rows[0].festivalTerrace).toBe("Festival");
    expect(rows[0].cuisine).toBe("Alles"); // "ALLES" alias → canonical "Alles"
  });

  it("keeps open answers verbatim", () => {
    expect(rows[0].kompaanIfSentence).toBe("je altijd je kop stoot");
    expect(rows[0].heightRemark).toBe("Hoe is het weer daarboven?");
  });

  it("returns an empty array for a header-only or empty CSV", () => {
    expect(parseLiveResponses(toCsv([HEADER]))).toHaveLength(0);
    expect(parseLiveResponses("")).toHaveLength(0);
  });
});

describe("form-drift normalisation fixes", () => {
  /** Parse one row built from VALID_ROW with the given cell overrides. */
  const parseOne = (overrides: Record<number, string>) => {
    const cells = VALID_ROW.map((c, i) =>
      i in overrides ? overrides[i] : c,
    );
    return parseLiveResponses(toCsv([HEADER, cells]))[0];
  };

  it("reads the newcomer borrel-count option as 1", () => {
    // "Hoeveelste borrel wordt dit voor jou?" dropdown choice for first-timers.
    expect(
      parseOne({ 6: "Eerste maar ik zit al in de community" }).borrelCount,
    ).toBe(1);
  });

  it("aliases the apostrophe-less arrival option back to canonical", () => {
    expect(
      parseOne({ 12: "Ik kom eraan!' terwijl ik nog thuis ben" }).borrelArrival,
    ).toBe("'Ik kom eraan!' terwijl ik nog thuis ben");
  });

  it("falls back off-list cuisines to Anders instead of dropping the row", () => {
    expect(parseOne({ 22: "Surinaams" }).cuisine).toBe("Anders");
    expect(parseOne({ 22: "VEGAN BURGERS" }).cuisine).toBe("Anders");
  });
});

describe("real-name display with nickname disambiguation", () => {
  /** VALID_ROW with real name (col 1) and nickname (col 2) overridden. */
  const rowWithName = (real: string, nick: string) =>
    VALID_ROW.map((c, i) => (i === 1 ? real : i === 2 ? nick : c));

  it("appends the nickname only when the real name is shared", () => {
    const rows = parseLiveResponses(
      toCsv([
        HEADER,
        rowWithName("Sam", "Sammie"),
        rowWithName("Sam", "Sambal"),
        rowWithName("Robin", "Rob"),
      ]),
    );
    const names = rows.map((r) => r.name);
    // The two Sams get their nickname in parentheses; unique Robin stays bare.
    expect(names).toContain("Sam (Sammie)");
    expect(names).toContain("Sam (Sambal)");
    expect(names).toContain("Robin");
  });

  it("falls back to the nickname when the real name is blank", () => {
    const [row] = parseLiveResponses(toCsv([HEADER, rowWithName("", "Nicky")]));
    expect(row.name).toBe("Nicky");
  });
});

describe("loadLiveResponses", () => {
  it("skips the network under the test runner so tests stay offline", async () => {
    // The unit-test guard means it never fetches — the caller falls back to the
    // committed mock CSV.
    await expect(loadLiveResponses()).resolves.toBeNull();
  });
});
