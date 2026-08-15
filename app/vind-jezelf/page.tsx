import { redirect } from "next/navigation";

/**
 * `/vind-jezelf` is now the start page at `/` — this route just redirects there
 * so any existing links keep working.
 */
export default function VindJezelfPage() {
  redirect("/");
}
