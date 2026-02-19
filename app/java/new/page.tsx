"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function JavaNewPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [round, setRound] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("experiences").insert([
      {
        name,
        company,
        round,
        difficulty,
        experience,
        category: "java",
      },
    ]);

    if (!error) {
      router.push("/java");
    } else {
      alert("Error saving experience");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black flex items-center justify-center p-6">
      <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Add Java Interview Experience
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400"
            required
          />

          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400"
            required
          />

          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
            required
          >
            <option value="">Select Interview Round</option>
            <option>Screening</option>
            <option>Technical 1</option>
            <option>Technical 2</option>
            <option>Technical + Coding</option>
            <option>Coding</option>
            <option>HR</option>
            <option>Panel</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white"
            required
          >
            <option value="">Select Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <textarea
            placeholder="Write your experience..."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400"
            rows={5}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition"
          >
            Save Experience
          </button>
        </form>
      </div>
    </div>
  );
}
