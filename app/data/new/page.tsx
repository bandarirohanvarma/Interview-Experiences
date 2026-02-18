"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function DataNewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    company: "",
    round_type: "screening",
    difficulty: "easy",
    experience: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("experiences").insert([
      {
        ...form,
        category: "data",
        company: form.company.toLowerCase(),
      },
    ]);

    if (!error) {
      router.push("/data");
    } else {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Add Data Interview Experience
        </h1>

        <input
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Company Name"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, round_type: e.target.value })
          }
        >
          <option value="screening">Screening</option>
          <option value="technical">Technical</option>
          <option value="coding">Coding</option>
          <option value="panel">Panel</option>
        </select>

        <select
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, difficulty: e.target.value })
          }
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <textarea
          placeholder="Write your experience..."
          className="w-full border p-2 rounded h-32"
          required
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <button className="w-full bg-black text-white p-2 rounded">
          Save Experience
        </button>
      </form>
    </div>
  );
}
