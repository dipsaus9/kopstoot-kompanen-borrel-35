/**
 * The four core Borrel 35 views, in navigation order. Slugs are the Dutch
 * route names the rest of the app links against; later stories add the pages.
 */
export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  {
    href: "/",
    label: "Gemiddelde",
    description: "Het gemiddelde Borrel 35-profiel",
  },
  {
    href: "/vind-jezelf",
    label: "Vind jezelf",
    description: "Vergelijk jezelf met de groep",
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
