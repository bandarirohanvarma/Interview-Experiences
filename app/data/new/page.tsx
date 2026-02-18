"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function slugifyCompany(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

export default function DataNewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyParam = searchParams.get("company") || "";

  const [form, setForm] = useState({
    name: "",
    company: "",
    round_type: "screening",
    difficulty: "easy",
    experience: "",
  });

  useEffect(() => {
    if (companyParam) {
      setForm((p) => ({ ...p, company: decodeURIComponent(companyParam) }));
    }
  }, [companyParam]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const companySlug = slugifyCompany(form.company);

    const { error } = await supabase.from("experiences").insert([
      {
        category: "data",
        name: form.name,
        company: companySlug,
        round_type: form.round_type,
        difficulty: form.difficulty,
        experience: form.experience,
      },
    ]);

    if (error) return alert(error.message);

    router.push(`/data/${encodeURIComponent(companySlug)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-extrabold text-center">
          Add Data Interview Experience
        </h1>
        <p className="text-center text-white/70 mt-2">
          Share what happened and help others.
        </p>

        <div className="space-y-4 mt-8">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            required
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30"
          />

          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company Name (e.g., Wells Fargo)"
            required
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.round_type}
              onChange={(e) => setForm({ ...form, round_type: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="screening">Screening</option>
              <option value="technical">Technical</option>
              <option value="coding">Coding</option>
              <option value="panel">Panel</option>
            </select>

            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <textarea
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            placeholder="Write your experience..."
            required
            rows={6}
            className="w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30"
          />

          <button className="w-full rounded-xl py-3 font-semibold bg-white text-black hover:opacity-90 transition shadow">
            Save Experience
          </button>
        </div>
      </form>
    </div>
  );
}
