import { redirect } from "next/navigation";

/** Renamed to "Toppers" at /toppers — redirect so old links keep working. */
export default function SuperlatievenPage() {
  redirect("/toppers");
}
