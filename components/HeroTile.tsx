"use client";

import { motion } from "framer-motion";
import { Clock, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Hours This Week", value: "14.2", icon: Clock, color: "#00e5cc" },
  { label: "Completed", value: "8", icon: Target, color: "#f59e0b" },
  { label: "Streak Best", value: "34d", icon: TrendingUp, color: "#8b5cf6" },
];

export default function HeroTile() {
  return (
    <article
      className="glass-card rounded-3xl p-7 relative overflow-hidden col-span-full lg:col-span-2"
    >
      {/* Gradient mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 90% at 80% -20%, rgba(0,229,204,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 0% 100%, rgba(139,92,246,0.09) 0%, transparent 60%)
          `,
        }}
      />

      {/* Decorative rings */}
      <div aria-hidden className="absolute -right-12 -top-12 w-56 h-56 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(0,229,204,0.07)" }} />
      <div aria-hidden className="absolute -right-4 -top-4 w-32 h-32 rounded-full pointer-events-none"
        style={{ border: "1px solid rgba(0,229,204,0.1)" }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top row: greeting + streak badge */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              Good morning
            </p>
            <h1
              className="text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome back,{" "}
              <span className="glow-text" style={{ color: "var(--accent)" }}>
                Rishit
              </span>
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              You&apos;re on a roll — keep the momentum going today 🚀
            </p>
          </div>

          {/* Streak badge */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl flex-shrink-0"
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
            }}
          >
            <span className="flame text-2xl">🔥</span>
            <div>
              <p className="text-2xl font-extrabold leading-none"
                style={{ color: "#f59e0b", fontFamily: "var(--font-mono)" }}>
                18
              </p>
              <p className="text-[10px] tracking-wide mt-0.5"
                style={{ color: "rgba(245,158,11,0.7)" }}>
                DAY STREAK
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-6 mb-5 h-px w-full" style={{ background: "var(--border-subtle)" }} />

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-1 min-w-[120px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-lg font-extrabold leading-none"
                    style={{ color: stat.color, fontFamily: "var(--font-mono)" }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] mt-0.5 whitespace-nowrap"
                    style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </article>
  );
}