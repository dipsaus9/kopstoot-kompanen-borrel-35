/**
 * The primary Borrel 35 routes, in navigation order. Slugs are the Dutch route
 * names the rest of the app links against; some pages are added by later
 * stories — linking ahead of the page is intentional.
 */
export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  {
    href: "/",
    label: "Vind jezelf",
    description: "Zoek je naam en vind jezelf terug",
  },
  {
    href: "/typetjes",
    label: "Typetjes",
    description: "De borrel-archetypes",
  },
  {
    href: "/vergelijk",
    label: "Vergelijk",
    description: "Zet meerdere profielen naast elkaar",
  },
  {
    href: "/gemiddelde",
    label: "Gemiddelde",
    description: "Het gemiddelde Borrel 35-profiel",
  },
  {
    href: "/toppers",
    label: "Toppers",
    description: "De uitschieters en records",
  },
];
