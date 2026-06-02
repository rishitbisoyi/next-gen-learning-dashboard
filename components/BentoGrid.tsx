"use client";

import { motion } from "framer-motion";
import { Course } from "@/types/course";
import HeroTile from "./HeroTile";
import CourseCard from "./CourseCard";
import ActivityTile from "./ActivityTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section
      className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 pb-24 md:pb-8 overflow-y-auto"
      style={{ maxHeight: "100vh" }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            Dashboard
          </p>
          <h2 className="text-lg font-extrabold mt-0.5"
            style={{ fontFamily: "var(--font-display)" }}>
            My Learning Space
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
          }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }} />
          LIVE
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

        {/* Hero — 2 cols on lg */}
        <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-2">
          <HeroTile />
        </motion.div>

        {/* Activity — 1 col, same row as hero */}
        <motion.div variants={itemVariants} className="col-span-1">
          <ActivityTile />
        </motion.div>

        {/* Course cards */}
        {courses.map((course) => (
          <motion.div key={course.id} variants={itemVariants} className="col-span-1">
            <CourseCard course={course} />
          </motion.div>
        ))}

      </div>
    </motion.section>
  );
}