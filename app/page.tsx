import {
  FindYourType,
  getFindYourselfPeople,
  type TypeFinderOption,
} from "@/components/find-yourself";

/**
 * The landing view (BORREL-4.7): the homepage is now entirely a find-your-type
 * flow. A prominent name search funnels the visitor straight to their own
 * per-type page (`/typetjes/<archetype-id>`, BORREL-4.6). A server component that
 * precomputes every respondent's name + resolved archetype at build/server time
 * via `getFindYourselfPeople()` (no runtime fetch, no DB) and hands the lean
 * option list to the client selector, which owns only the name-picking
 * interaction. Real names are shown openly (locked decision). The Average Kompaan
 * profile now lives at `/gemiddelde`.
 */
export default function Home() {
  const options: TypeFinderOption[] = getFindYourselfPeople().map((person) => ({
    id: person.id,
    name: person.name,
    archetype: person.archetype,
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-stack-md py-stack-lg">
      <FindYourType options={options} />
    </div>
  );
}
