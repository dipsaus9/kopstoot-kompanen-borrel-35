import {
  FindYourType,
  getFindYourselfPeople,
  type TypeFinderOption,
} from "@/components/find-yourself";
import { SkateScene } from "@/components/proof/skate-scene";

/**
 * PROOF (design/skate-graffiti-proof): landing restyled into the retro-anime /
 * skate graffiti direction — illustrative SVG sunset skatepark, spray-paint
 * display type, thick outlines, film grain. Not wired for production; a look proof.
 */
export default function Home() {
  const options: TypeFinderOption[] = getFindYourselfPeople().map((person) => ({
    id: person.id,
    name: person.name,
    archetype: person.archetype,
  }));

  return (
    <div className="min-h-screen bg-[#1a1120]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b-[6px] border-[#1a1120]">
        <SkateScene className="absolute inset-0 h-full w-full" />
        {/* legibility scrim: dark on the text side, clear on the character side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1120]/80 via-[#1a1120]/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-6 py-24">
          <span
            className="mb-3 inline-block w-fit -rotate-2 rounded-md border-[3px] border-[#1a1120] bg-[#3ddc84] px-3 py-1 text-sm font-black uppercase tracking-wider text-[#1a1120]"
            style={{ boxShadow: "4px 4px 0 #1a1120" }}
          >
            Vind jouw type Kompaan
          </span>
          <h1
            className="max-w-4xl text-6xl leading-[0.95] text-[#ffd45e] sm:text-7xl md:text-8xl"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              WebkitTextStroke: "3px #1a1120",
              textShadow: "6px 6px 0 #ff3d6e, 10px 10px 0 #1a1120",
              letterSpacing: "0.02em",
            }}
          >
            Welk type Kompaan ben jij?
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold text-white/90">
            Zoek je eigen naam, en scheur meteen door naar jouw eigen borrel-type —
            met de Kompanen die op de borrel precies zo tekeer gaan als jij.
          </p>
        </div>
      </section>

      {/* SEARCH PANEL */}
      <section className="bg-[#faf3e6] py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div
            className="relative rounded-2xl border-[5px] border-[#1a1120] bg-white p-6 sm:p-10"
            style={{ boxShadow: "10px 10px 0 #1a1120" }}
          >
            <FindYourType options={options} />
          </div>
        </div>
      </section>
    </div>
  );
}
