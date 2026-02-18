import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight text-center">
          Interview Experiences
        </h1>
        <p className="text-center text-white/70 mt-4 text-lg">
          Share your interview journey. Help others prepare.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/data"
            className="group rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-xl hover:bg-white/10 transition"
          >
            <div className="text-sm text-white/60">Category</div>
            <div className="text-3xl font-bold mt-2">Data</div>
            <div className="mt-3 text-white/70">
              Data Scientist, Analyst, ML, AI, BI…
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-white font-semibold">
              Explore <span className="group-hover:translate-x-1 transition">→</span>
            </div>
          </Link>

          <Link
            href="/java"
            className="group rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-xl hover:bg-white/10 transition"
          >
            <div className="text-sm text-white/60">Category</div>
            <div className="text-3xl font-bold mt-2">Java / Software</div>
            <div className="mt-3 text-white/70">
              Java, Full-Stack, Backend, SDE…
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-white font-semibold">
              Explore <span className="group-hover:translate-x-1 transition">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
