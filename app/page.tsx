import { AverageProfile } from "@/components/profile";
import { getAggregate } from "@/lib/aggregate";

/**
 * The landing view (BORREL-3.3): the Average Kompaan profile — "Jan Kompaan
 * Modaal". A server component that reads the survey aggregate at build/server
 * time via `getAggregate()` (no runtime fetch, no client data) and renders it
 * as playful giraffe tiles.
 */
export default function Home() {
  const aggregate = getAggregate();

  return (
    <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
      <AverageProfile aggregate={aggregate} />
    </div>
  );
}
