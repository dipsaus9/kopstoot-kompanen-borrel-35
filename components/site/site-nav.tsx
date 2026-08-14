import Link from "next/link";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

/**
 * Global navigation linking the four core views. Server component — no runtime
 * data or client-side active-state; styling comes from the BORREL-2.3 tokens.
 */
export function SiteNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Hoofdnavigatie" className={className}>
      <ul className="flex flex-wrap items-center gap-stack-xs">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              title={item.description}
              className={cn(
                "inline-flex items-center rounded-pill px-4 py-2",
                "text-body font-medium text-foreground/80",
                "transition-colors hover:bg-primary hover:text-primary-foreground",
                "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
