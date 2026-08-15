"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Global navigation linking every primary Borrel 35 route in the graffiti/anime
 * voice. On desktop it is a row of ink-pill links; on mobile it collapses behind
 * a touch-sized sticker toggle (44px targets, keyboard + screen-reader friendly,
 * closes on route change or Escape). Active state is marked with aria-current and
 * the live per-type accent (bg-primary recolours under a [data-type] scope).
 */
export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the mobile panel while it is open.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function linkClass(active: boolean): string {
    return cn(
      "inline-flex min-h-tap items-center rounded-md px-3 py-1.5",
      "text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline-none",
      active
        ? "border-[3px] border-[#1a1120] bg-[#ffd45e] text-[#1a1120] shadow-[3px_3px_0_#ff3d6e]"
        : "text-[#faf3e6]/85 hover:text-[#ffd45e]",
    );
  }

  return (
    <nav aria-label="Hoofdnavigatie" className={cn("relative", className)}>
      {/* Desktop: a row of ink pills. */}
      <ul className="hidden items-center gap-stack-xs md:flex">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                title={item.description}
                aria-current={active ? "page" : undefined}
                className={linkClass(active)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile: a touch-sized sticker toggle. */}
      <button
        type="button"
        aria-label={open ? "Sluit menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-nav-mobile"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex min-h-tap min-w-tap items-center justify-center rounded-pill md:hidden",
          "border-[3px] border-[var(--brand-cocoa-deep)] bg-background text-foreground",
          "shadow-[var(--sticker-shadow-sm)] transition-transform",
          "active:translate-y-0.5 active:shadow-none focus-visible:outline-none",
        )}
      >
        <MenuIcon open={open} />
      </button>

      {/* Mobile panel: single-column, touch-sized links. */}
      <ul
        id="site-nav-mobile"
        className={cn(
          "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 flex-col gap-stack-xs md:hidden",
          "rounded-2xl border-[3px] border-[var(--brand-cocoa-deep)] bg-card p-stack-sm",
          "shadow-[var(--sticker-shadow)]",
          open ? "flex" : "hidden",
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                title={item.description}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(linkClass(active), "w-full")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      className="size-5"
    >
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}
