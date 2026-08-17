import { FindYourself, getFindYourselfPeople } from "@/components/find-yourself";
import { SkateScene } from "@/components/proof/skate-scene";
import { TypeCarousel } from "@/components/types-carousel/type-carousel";

/** TODO: vul de echte enquête-URL in wanneer die er is. */
const FORM_URL = "#";

/**
 * The start page: "vind jezelf terug". The old home funnel is gone — `/` now IS
 * the find-yourself lookup, under the graffiti/anime hero. Build-time data (no
 * runtime fetch); real names shown openly.
 */
export default function Home() {
  const people = getFindYourselfPeople();

  return (
    <div className="min-h-screen bg-[#1a1120]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b-[6px] border-[#1a1120]">
        <SkateScene className="absolute inset-0 h-full w-full" hideCharacter />
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
            className="max-w-4xl text-[#ffd45e]"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              fontSize: "clamp(2.5rem, 9vw, 5.5rem)",
              lineHeight: 0.95,
              WebkitTextStroke: "2.5px #1a1120",
              textShadow: "5px 5px 0 #ff3d6e, 8px 8px 0 #1a1120",
              letterSpacing: "0.02em",
              overflowWrap: "break-word",
              hyphens: "auto",
            }}
          >
            Welk type Kompaan ben jij?
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold text-white/90">
            Zoek je eigen naam en vind jezelf terug — je % gemiddelde Kompaan, waar
            je juist afwijkt, en welk borrel-type bij je hoort.
          </p>
        </div>
      </section>

      {/* TYPES CAROUSEL — the six types, one at a time */}
      <section className="bg-[#faf3e6] pt-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <TypeCarousel />
        </div>
      </section>

      {/* SEARCH PANEL */}
      <section className="bg-[#faf3e6] py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div
            className="relative rounded-2xl border-[5px] border-[#1a1120] bg-white p-4 sm:p-10"
            style={{ boxShadow: "10px 10px 0 #1a1120" }}
          >
            <FindYourself people={people} />
          </div>

          {/* Not in the list? Fill in the survey. */}
          <div
            className="mt-8 flex flex-col items-start gap-4 rounded-2xl border-[5px] border-[#1a1120] bg-[#ffd45e] p-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ boxShadow: "8px 8px 0 #1a1120" }}
          >
            <p className="text-lg font-black text-[#1a1120]">
              Staat jouw naam er niet tussen? Vul de enquête in en doe mee!
            </p>
            <a
              href={FORM_URL}
              className="inline-flex min-h-tap shrink-0 items-center gap-2 rounded-md border-[3px] border-[#1a1120] bg-[#ff3d6e] px-5 py-2 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#1a1120] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1120]"
            >
              Naar de enquête
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
