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
    label: "Home",
    description: "Terug naar de start",
  },
  {
    href: "/gemiddelde",
    label: "Gemiddelde",
    description: "Het gemiddelde Borrel 35-profiel",
  },
  {
    href: "/vind-jezelf",
    label: "Vind jezelf",
    description: "Vergelijk jezelf met de groep",
  },
  {
    href: "/vergelijk",
    label: "Vergelijk",
    description: "Zet twee profielen naast elkaar",
  },
  {
    href: "/typetjes",
    label: "Typetjes",
    description: "De borrel-archetypes",
  },
  {
    href: "/superlatieven",
    label: "Superlatieven",
    description: "De uitschieters en records",
  },
];
