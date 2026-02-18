import Link from "next/link";
import { supabase } from "@/lib/supabase";

function prettyCompany(slug: string) {
  const withSpaces = slug.replace(/-/g, " ");
  return withSpaces.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function DataCompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const companySlug = decodeURIComponent(company);

  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("category", "data")
    .eq("company", companySlug)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-4xl font-extrabold">
            {prettyCompany(companySlug)} Experiences
          </h1>

          <Link
            href={`/data/new?company=${encodeURIComponent(companySlug)}`}
            className="px-5 py-3 rounded-xl bg-white text-black font-semibold shadow hover:opacity-90 transition"
          >
            + Add Experience
          </Link>
        </div>

        <div className="mt-10 space-y-5">
          {(data ?? []).length === 0 && (
            <div className="text-white/70">No experiences yet.</div>
          )}

          {data?.map((exp: any) => (
            <div
              key={exp.id}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-lg font-bold">{exp.name}</div>
                <div className="text-sm text-white/70">
                  Difficulty: <span className="font-semibold text-white">{exp.difficulty}</span>
                  {"  "}•{"  "}
                  Round: <span className="font-semibold text-white">{exp.round_type}</span>
                </div>
              </div>

              <p className="mt-4 text-white/85 leading-relaxed whitespace-pre-wrap">
                {exp.experience}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
