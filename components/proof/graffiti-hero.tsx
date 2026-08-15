import type { ReactNode } from "react";

import { SkateScene } from "./skate-scene";

/**
 * PROOF (design/skate-graffiti-proof): the shared page hero band — a painterly
 * graffiti wall behind a spray-paint display title. Drop it at the top of each
 * page so every surface wears the same anime/graffiti identity. Optional `tint`
 * washes the wall toward a type's signature hue.
 */
export function GraffitiHero({
  eyebrow,
  title,
  children,
  tint,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  tint?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b-[6px] border-[#1a1120]">
      <SkateScene className="absolute inset-0 h-full w-full" tint={tint} hideCharacter />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1120]/85 via-[#1a1120]/45 to-[#1a1120]/15" />
      <div className="relative mx-auto flex min-h-[42vh] w-full max-w-6xl flex-col justify-center px-6 py-16">
        {eyebrow ? (
          <span
            className="mb-3 inline-block w-fit -rotate-2 rounded-md border-[3px] border-[#1a1120] bg-[#3ddc84] px-3 py-1 text-sm font-black uppercase tracking-wider text-[#1a1120]"
            style={{ boxShadow: "4px 4px 0 #1a1120" }}
          >
            {eyebrow}
          </span>
        ) : null}
        <h1
          className="max-w-4xl text-[#ffd45e]"
          style={{
            fontFamily: "var(--font-display), Impact, sans-serif",
            fontSize: "clamp(2.5rem, 1.5rem + 5vw, 5rem)",
            lineHeight: 0.95,
            WebkitTextStroke: "3px #1a1120",
            textShadow: "5px 5px 0 #ff3d6e, 9px 9px 0 #1a1120",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h1>
        {children ? (
          <div className="mt-5 max-w-xl text-lg font-semibold text-white/90">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
