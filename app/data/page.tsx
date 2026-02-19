export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function DataPage() {
  const { data } = await supabase
    .from("experiences")
    .select("company")
    .eq("category", "data");

  const companies = [
    ...new Set(data?.map((item) => item.company)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Data Interview Experiences</h1>
        <Link
          href="/data/new"
          className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          + Add Experience
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {companies?.map((company) => (
          <Link
            key={company}
            href={`/data/${company}`}
            className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition"
          >
            <h2 className="text-xl font-semibold">{company}</h2>
            <p className="text-sm text-gray-400 mt-2">
              View experiences →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
