"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function JavaNewPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [round, setRound] = useState("screening");
  const [difficulty, setDifficulty] = useState("easy");
  const [experience, setExperience] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("experiences").insert([
      {
        name,
        company: company.toLowerCase(),
        round_type: round,
        difficulty,
        experience,
        category: "java",
      },
    ]);

    if (error) {
      alert("Error saving experience");
      return;
    }

    router.push("/java");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Add Java Interview Experience
        </h1>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:ring-2 focus:ring-purple-500"
        />

        <input
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:ring-2 focus:ring-purple-500"
        />

        {/* ROUND */}
        <select
          value={round}
          onChange={(e) => setRound(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:ring-2 focus:ring-purple-500 appearance-none"
        >
          <option value="screening" className="bg-slate-800 text-white">
            Screening
          </option>
          <option value="technical 1" className="bg-slate-800 text-white">
            Technical 1
          </option>
          <option value="technical 2" className="bg-slate-800 text-white">
            Technical 2
          </option>
          <option value="technical + coding" className="bg-slate-800 text-white">
            Technical + Coding
          </option>
          <option value="coding" className="bg-slate-800 text-white">
            Coding
          </option>
          <option value="hr" className="bg-slate-800 text-white">
            HR
          </option>
          <option value="panel" className="bg-slate-800 text-white">
            Panel
          </option>
        </select>

        {/* DIFFICULTY */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:ring-2 focus:ring-purple-500 appearance-none"
        >
          <option value="easy" className="bg-slate-800 text-white">
            Easy
          </option>
          <option value="medium" className="bg-slate-800 text-white">
            Medium
          </option>
          <option value="hard" className="bg-slate-800 text-white">
            Hard
          </option>
        </select>

        <textarea
          placeholder="Write your experience..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-600 focus:ring-2 focus:ring-purple-500 h-32"
        />

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition">
          Save Experience
        </button>
      </form>
    </div>
  );
}
