import Link from "next/link";
import { supabase } from "@/lib/supabase";

function prettyCompany(slug: string) {
  const withSpaces = slug.replace(/-/g, " ");
  return withSpaces.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function DataDashboard() {
  const { data } = await supabase
    .from("experiences")
    .select("company")
    .eq("category", "data");

  const companies = Array.from(
    new Set((data ?? []).map((x: any) => x.company).filter(Boolean))
  ).sort();

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-4xl font-extrabold">Data Interview Experiences</h1>

          <Link
            href="/data/new"
            className="px-5 py-3 rounded-xl bg-white text-black font-semibold shadow hover:opacity-90 transition"
          >
            + Add Experience
          </Link>
        </div>

        <p className="text-white/70 mt-3">
          Choose a company to see all experiences.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {companies.map((c) => (
            <Link
              key={c}
              href={`/data/${encodeURIComponent(c)}`}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 shadow-xl hover:bg-white/10 transition"
            >
              <div className="text-xl font-bold">{prettyCompany(c)}</div>
              <div className="text-white/60 text-sm mt-2">View experiences →</div>
            </Link>
          ))}

          {companies.length === 0 && (
            <div className="text-white/70">
              No companies yet. Add the first one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
