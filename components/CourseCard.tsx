"use client";

import { Course } from "@/types/course";
import { Code, Rocket, Brain, FileCode, Cpu, Globe, Database, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: Course;
}

const icons = {
  Code,
  Rocket,
  Brain,
  FileCode,
  Cpu,
  Globe,
  Database,
  Layers,
};

const accentMap: Record<string, { color: string; glow: string; bg: string }> = {
  Code:     { color: "#00e5cc", glow: "rgba(0,229,204,0.2)",    bg: "rgba(0,229,204,0.07)"    },
  Rocket:   { color: "#f59e0b", glow: "rgba(245,158,11,0.2)",   bg: "rgba(245,158,11,0.07)"   },
  Brain:    { color: "#8b5cf6", glow: "rgba(139,92,246,0.2)",   bg: "rgba(139,92,246,0.07)"   },
  FileCode: { color: "#f43f5e", glow: "rgba(244,63,94,0.2)",    bg: "rgba(244,63,94,0.07)"    },
  Cpu:      { color: "#06b6d4", glow: "rgba(6,182,212,0.2)",    bg: "rgba(6,182,212,0.07)"    },
  Globe:    { color: "#10b981", glow: "rgba(16,185,129,0.2)",   bg: "rgba(16,185,129,0.07)"   },
  Database: { color: "#f97316", glow: "rgba(249,115,22,0.2)",   bg: "rgba(249,115,22,0.07)"   },
  Layers:   { color: "#ec4899", glow: "rgba(236,72,153,0.2)",   bg: "rgba(236,72,153,0.07)"   },
};

const fallbackAccent = { color: "#00e5cc", glow: "rgba(0,229,204,0.2)", bg: "rgba(0,229,204,0.07)" };

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = icons[course.icon_name as keyof typeof icons] ?? Code;
  const accent = accentMap[course.icon_name] ?? fallbackAccent;

  return (
    <motion.article
      whileHover={{
        scale: 1.025,
        y: -4,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card rounded-3xl p-6 relative overflow-hidden cursor-pointer group h-full"
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${accent.glow}, 0 0 30px ${accent.glow}`,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent.bg} 0%, transparent 70%)`,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 0% 100%, ${accent.bg} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0"
          style={{
            background: accent.bg,
            border: `1px solid ${accent.glow}`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: accent.color }} strokeWidth={2} />
        </div>

        <h3
          className="font-bold text-sm leading-snug mb-auto"
          style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
        >
          {course.title}
        </h3>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] tracking-widest uppercase font-bold"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              Progress
            </span>
            <motion.span
              className="text-sm font-extrabold"
              style={{ color: accent.color, fontFamily: "var(--font-mono)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {course.progress}%
            </motion.span>
          </div>

          <div
            className="h-1.5 w-full rounded-full overflow-hidden relative"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full rounded-full relative progress-shimmer"
              style={{
                background: `linear-gradient(90deg, ${accent.color}aa, ${accent.color})`,
                boxShadow: `0 0 10px ${accent.glow}`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}