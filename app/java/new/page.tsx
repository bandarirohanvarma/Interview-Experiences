"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function JavaNewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    company: "",
    round_type: "",
    difficulty: "",
    experience: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await supabase.from("experiences").insert([
      {
        ...form,
        category: "java",
        company: form.company.trim().toLowerCase(),
      },
    ]);

    router.push("/java");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Add Java Interview Experience
        </h1>

        <input
          placeholder="Your Name"
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Company Name"
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <select
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
          onChange={(e) =>
            setForm({ ...form, round_type: e.target.value })
          }
        >
          <option value="">Select Interview Round</option>
          <option value="Screening">Screening</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
        </select>

        <select
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white border border-gray-600"
          onChange={(e) =>
            setForm({ ...form, difficulty: e.target.value })
          }
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <textarea
          placeholder="Write your experience..."
          required
          rows={5}
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white border border-gray-600"
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition">
          Save Experience
        </button>
      </form>
    </div>
  );
}
