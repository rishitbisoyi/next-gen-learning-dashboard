"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const activity = [
  3,0,2,4,1,3,0,
  2,4,0,3,1,2,4,
  0,3,2,1,4,3,0,
  4,1,3,0,2,4,1,
  2,0,4,3,1,2,0,
  3,4,1,2,0,3,4,
  0,2,3,1,4,0,2,
  4,1,0,3,2,4,1,
  3,0,4,1,2,3,0,
  2,4,1,0,3,2,4,
];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"];

const getColor = (level: number) => {
  switch (level) {
    case 0: return "rgba(255,255,255,0.05)";
    case 1: return "rgba(0,229,204,0.18)";
    case 2: return "rgba(0,229,204,0.35)";
    case 3: return "rgba(0,229,204,0.58)";
    case 4: return "rgba(0,229,204,0.88)";
    default: return "rgba(255,255,255,0.05)";
  }
};

const getGlow = (level: number) => {
  if (level === 4) return "0 0 5px rgba(0,229,204,0.55)";
  if (level === 3) return "0 0 3px rgba(0,229,204,0.3)";
  return "none";
};

export default function ActivityTile() {
  const total = activity.reduce((a, b) => a + b, 0);

  return (
    <article className="glass-card rounded-3xl p-5 relative overflow-hidden flex flex-col">
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,229,204,0.04) 0%, transparent 70%)" }} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-mid)" }}>
              <Activity className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
              Activity
            </h3>
          </div>
          <span className="text-xs font-bold"
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            {total} pts
          </span>
        </div>

        <div className="flex mb-1" style={{ paddingLeft: 18 }}>
          {months.map((m) => (
            <div key={m} className="flex-1 text-center"
              style={{ fontSize: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {m}
            </div>
          ))}
        </div>

        <div className="flex gap-1 flex-1">
          <div className="flex flex-col" style={{ gap: 3, paddingTop: 1 }}>
            {["M","","W","","F","","S"].map((d, i) => (
              <div key={i} style={{
                height: 11, fontSize: 7,
                color: d ? "var(--text-muted)" : "transparent",
                fontFamily: "var(--font-mono)",
                lineHeight: "11px",
                width: 10,
              }}>
                {d}
              </div>
            ))}
          </div>

          <div className="flex-1 grid" style={{
            gridTemplateColumns: "repeat(10, 1fr)",
            gridTemplateRows: "repeat(7, 11px)",
            gap: 3,
          }}>
            {activity.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.01 * i, type: "spring", stiffness: 500, damping: 30 }}
                className="rounded-[3px]"
                style={{ background: getColor(level), boxShadow: getGlow(level) }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span style={{ fontSize: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Less</span>
          {[0,1,2,3,4].map((l) => (
            <div key={l} style={{
              width: 10, height: 10,
              borderRadius: 3,
              background: getColor(l),
            }} />
          ))}
          <span style={{ fontSize: 8, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>More</span>
        </div>
      </div>
    </article>
  );
}