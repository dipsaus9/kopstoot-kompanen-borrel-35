/**
 * The landing hero for the Average Kompaan profile (BORREL-3.3).
 *
 * A bold, vertical giraffe-patch banner introducing "Jan Kompaan Modaal" — the
 * composite profile built from every survey response. Presentational only; the
 * response count is passed in so the copy stays honest to the dataset.
 */

export interface ProfileHeroProps {
  /** How many responses the composite profile is averaged over. */
  readonly responseCount: number;
}

export function ProfileHero({ responseCount }: ProfileHeroProps) {
  return (
    <header className="sr-only">
      <p className="text-caption font-bold tracking-eyebrow uppercase">
        Het gemiddelde Borrel 35-profiel
      </p>
      <h1 className="mt-stack-sm text-display font-black leading-colossus tracking-display text-balance">
        Jan Kompaan Modaal
      </h1>
      <p className="mt-stack-md max-w-[42ch] text-body-lg font-medium leading-body">
        Deze giraffe is samengesteld uit {responseCount} ingevulde enquêtes: de
        gemiddelde leeftijd, lengte en borrelteller, plus de antwoorden die de
        meeste Kompanen kozen.
      </p>
    </header>
  );
}
