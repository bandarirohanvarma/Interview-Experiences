"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function JavaNewPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [roundType, setRoundType] = useState("screening");
  const [difficulty, setDifficulty] = useState("easy");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("experiences").insert([
      {
        name,
        company: company.toLowerCase().trim(),
        category: "java",
        round_type: roundType,
        difficulty,
        experience,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error saving experience");
      return;
    }

    router.push("/java");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl space-y-4 border border-white/20"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Add Java Interview Experience
        </h1>

        <input
          required
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
        />

        <input
          required
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
        />

        <select
          value={roundType}
          onChange={(e) => setRoundType(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
        >
          <option value="screening">Screening</option>
          <option value="technical 1">Technical 1</option>
          <option value="technical 2">Technical 2</option>
          <option value="technical + coding">Technical + Coding</option>
          <option value="coding">Coding</option>
          <option value="panel">Panel</option>
          <option value="hr">HR</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <textarea
          required
          placeholder="Write your experience..."
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 h-32"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          {loading ? "Saving..." : "Save Experience"}
        </button>
      </form>
    </div>
  );
}
