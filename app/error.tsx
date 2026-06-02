"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-base)" }}
    >
      <div
        className="glass-card rounded-3xl p-10 max-w-md w-full mx-4 text-center relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244,63,94,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{
            background: "rgba(244,63,94,0.1)",
            border: "1px solid rgba(244,63,94,0.25)",
          }}
        >
          <span className="text-2xl">⚠️</span>
        </div>

        <h2
          className="text-xl font-extrabold mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Something went wrong
        </h2>
        <p
          className="text-sm mb-7"
          style={{ color: "var(--text-secondary)" }}
        >
          Could not connect to the database. Check your Supabase credentials and try again.
        </p>

        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid var(--border-glow)",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
          }}
        >
          TRY AGAIN
        </button>
      </div>
    </main>
  );
}