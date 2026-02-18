import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Interview Experiences",
  description: "Share and explore interview experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              InterviewHub
            </Link>

            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-white/80">
                Home
              </Link>
              <Link href="/data" className="hover:text-white/80">
                Data
              </Link>
              <Link href="/java" className="hover:text-white/80">
                Java
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
