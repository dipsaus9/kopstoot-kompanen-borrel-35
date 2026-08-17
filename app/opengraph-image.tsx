import { ImageResponse } from "next/og";

/**
 * Dynamic social-share card (BORREL-5.5).
 *
 * next/og renders this React tree to a 1200×630 PNG at build time, so every
 * shared link (WhatsApp, Twitter/X, iMessage, …) shows an on-brand preview in
 * the site's graffiti/anime style instead of a blank card.
 *
 * Deliberately text + shapes only (no raster character art) so it renders fast
 * and deterministically on the edge. Colours are the concrete hex equivalents
 * of the brand OKLCH tokens in app/theme/tokens.css (dark ink ground, giraffe
 * gold, and the per-type accent family for the paint splashes) — kept in sync
 * with app/apple-icon.tsx and app/icon.svg.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Borrel 35 — Welk type Kompaan ben jij?";

// Brand palette as concrete hex (OKLCH tokens → sRGB), matching app/icon.svg.
const INK = "#1a1120"; // --brand-cocoa-deep ground
const INK_LINE = "#16111e"; // darkest ink outline
const CREAM = "#fbf6ea"; // --brand-cream
const GOLD = "#ffd45e"; // --brand-giraffe display pop
const FLAMINGO = "#ff3d6e"; // --brand-flamingo
const PARK = "#48d06a"; // --brand-park (acid green)
const NIGHT = "#5b6cf0"; // --brand-night (electric indigo)
const WINE = "#ef3b46"; // --brand-wine (pop red)
const GRAPE = "#9b45db"; // --brand-liquorice (electric grape)

/**
 * Fetch the Bangers display woff/ttf at build so the title renders in the same
 * spray/comic face as the site. Falls back to a bold system font when the
 * network is unavailable, so the build never fails on a font fetch.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      new URL(
        "https://raw.githubusercontent.com/google/fonts/main/ofl/bangers/Bangers-Regular.ttf",
      ),
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

// Thick ink "marker line" around display text (mirrors the .tag-ink utility).
const INK_OUTLINE_TEXT = [
  `-3px -3px 0 ${INK_LINE}`,
  `3px -3px 0 ${INK_LINE}`,
  `-3px 3px 0 ${INK_LINE}`,
  `3px 3px 0 ${INK_LINE}`,
  `0 6px 0 ${INK_LINE}`,
].join(", ");

export default async function OpengraphImage() {
  const fontData = await loadDisplayFont();
  const displayFamily = fontData ? "Bangers" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: INK,
          overflow: "hidden",
          fontFamily: displayFamily,
        }}
      >
        {/* ---- Type-colour paint splashes (decorative, behind the copy) ---- */}
        <div
          style={{
            position: "absolute",
            top: -90,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: 999,
            background: PARK,
            border: `10px solid ${INK_LINE}`,
            transform: "rotate(-12deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -70,
            width: 380,
            height: 380,
            borderRadius: 999,
            background: NIGHT,
            border: `10px solid ${INK_LINE}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 120,
            width: 150,
            height: 150,
            borderRadius: 40,
            background: FLAMINGO,
            border: `9px solid ${INK_LINE}`,
            transform: "rotate(14deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 90,
            width: 130,
            height: 130,
            borderRadius: 999,
            background: WINE,
            border: `9px solid ${INK_LINE}`,
            transform: "rotate(-8deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 30,
            width: 90,
            height: 90,
            borderRadius: 24,
            background: GRAPE,
            border: `8px solid ${INK_LINE}`,
            transform: "rotate(18deg)",
          }}
        />

        {/* ---- Wordmark sticker: the hot-pink "BORREL 35" tag ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "14px 30px",
            marginBottom: 44,
            borderRadius: 18,
            background: FLAMINGO,
            border: `7px solid ${INK_LINE}`,
            transform: "rotate(-3deg)",
            boxShadow: `12px 12px 0 ${INK_LINE}`,
          }}
        >
          <div
            style={{
              fontSize: 46,
              letterSpacing: "-1px",
              color: CREAM,
              lineHeight: 1,
            }}
          >
            BORREL
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 66,
              height: 66,
              borderRadius: 14,
              background: GOLD,
              border: `5px solid ${INK_LINE}`,
              fontSize: 46,
              color: INK_LINE,
              lineHeight: 1,
            }}
          >
            35
          </div>
        </div>

        {/* ---- Display title ---- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 90px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 128,
              lineHeight: 1.02,
              color: GOLD,
              letterSpacing: "-1px",
              textShadow: INK_OUTLINE_TEXT,
            }}
          >
            Welk type Kompaan ben jij?
          </div>
        </div>

        {/* ---- Sub-line ---- */}
        <div
          style={{
            marginTop: 40,
            fontSize: 34,
            color: CREAM,
            fontFamily: "sans-serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          De giraffe-enquête van Kompanen
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Bangers",
              data: fontData,
              style: "normal" as const,
              weight: 400 as const,
            },
          ]
        : undefined,
    },
  );
}
