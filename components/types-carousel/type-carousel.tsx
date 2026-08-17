"use client";

/**
 * Auto-rotating showcase of the six Kompaan types on the home page — one at a
 * time, its character art + name + description, dressed in that type's theme.
 * Advances every {@link INTERVAL_MS}; pauses on hover/focus and honours
 * prefers-reduced-motion. Dots let you jump to a specific type.
 */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";

import {
  getTypeTheme,
  typeThemeVars,
  type ArchetypeId,
} from "@/app/theme/type-themes";
import { ARCHETYPES } from "@/content/archetypes";

const INTERVAL_MS = 4500;

export function TypeCarousel() {
  const count = ARCHETYPES.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const select = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(() => setIndex((v) => (v + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  const archetype = ARCHETYPES[index];
  const themeStyle = typeThemeVars(
    getTypeTheme(archetype.id as ArchetypeId),
  ) as CSSProperties;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="De typetjes, één voor één"
      data-type={archetype.id}
      style={{ ...themeStyle, boxShadow: "10px 10px 0 #1a1120" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative overflow-hidden rounded-2xl border-[5px] border-[#1a1120] bg-[#1a1120]"
    >
      <div className="grid items-stretch sm:grid-cols-2">
        {/* Character art */}
        <div
          key={`${archetype.id}-img`}
          className="relative aspect-[4/5] w-full sm:aspect-auto sm:min-h-[28rem]"
          style={{ animation: "borrel-fade .45s ease" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static art asset */}
          <img
            src={archetype.image}
            alt={`Illustratie van ${archetype.name}`}
            className="absolute inset-0 size-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1120] via-transparent to-transparent sm:bg-gradient-to-r" />
        </div>

        {/* Text */}
        <div
          key={`${archetype.id}-txt`}
          className="flex flex-col gap-4 p-6 sm:p-8"
          style={{ animation: "borrel-fade .45s ease" }}
        >
          <span
            className="w-fit -rotate-2 rounded-md border-[3px] border-[#1a1120] bg-type px-3 py-1 text-sm font-black uppercase tracking-wider text-type-ink"
            style={{ boxShadow: "3px 3px 0 #1a1120" }}
          >
            Welk type ben jij?
          </span>
          <h2
            className="text-[#ffd45e]"
            style={{
              fontFamily: "var(--font-display), Impact, sans-serif",
              fontSize: "clamp(2rem, 1.4rem + 3vw, 3.5rem)",
              lineHeight: 0.95,
              WebkitTextStroke: "2px #1a1120",
              overflowWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {archetype.name}
          </h2>
          <p className="line-clamp-4 max-w-prose text-base font-medium leading-relaxed text-white/85">
            {archetype.description}
          </p>
          <Link
            href={`/typetjes/${archetype.id}`}
            className="inline-flex min-h-tap w-fit items-center gap-2 rounded-md border-[3px] border-[#1a1120] bg-type px-5 py-2 text-sm font-black uppercase tracking-wide text-type-ink shadow-[4px_4px_0_#1a1120] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd45e]"
          >
            Bekijk dit type
            <span aria-hidden>→</span>
          </Link>

          {/* Dots */}
          <div className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Kies een type">
            {ARCHETYPES.map((type, n) => (
              <button
                key={type.id}
                type="button"
                aria-label={type.name}
                aria-current={n === index ? "true" : undefined}
                onClick={() => select(n)}
                className={`h-2.5 rounded-pill border-2 border-[#1a1120] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd45e] ${
                  n === index ? "w-8 bg-[#ffd45e]" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
