"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, User, Settings, Zap } from "lucide-react";

const items = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Courses",   icon: BookOpen },
  { name: "Profile",   icon: User },
  { name: "Settings",  icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside
      className="hidden md:flex md:w-[72px] lg:w-60 min-h-screen flex-shrink-0 flex-col py-8"
      style={{ background: "var(--bg-surface)", borderRight: "1px solid var(--border-subtle)" }}
    >
      {/* Logo */}
      <div className="px-4 mb-10 flex items-center gap-3 overflow-hidden">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--accent) 0%, #00b4d8 100%)",
            boxShadow: "0 0 20px rgba(0,229,204,0.35)",
          }}>
          <Zap className="w-5 h-5 text-black" strokeWidth={2.5} />
        </div>
        <span className="text-xl font-extrabold tracking-tight hidden lg:block"
          style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
          Learn<span style={{ color: "var(--accent)" }}>X</span>
        </span>
      </div>

      {/* Label */}
      <p className="px-4 text-[10px] font-bold tracking-[0.2em] uppercase mb-3 hidden lg:block"
        style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        Navigation
      </p>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;
          return (
            <button key={item.name} onClick={() => setActive(item.name)}
              className="relative flex items-center gap-3 w-full p-3 rounded-xl transition-colors"
              style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)" }}>
              {isActive && (
                <>
                  <motion.div layoutId="active-nav" className="absolute inset-0 rounded-xl"
                    style={{ background: "var(--accent-dim)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  <motion.div layoutId="active-nav-bar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                </>
              )}
              <Icon className="relative z-10 flex-shrink-0 h-[18px] w-[18px]"
                strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="relative z-10 text-sm font-medium hidden lg:block"
                style={{ fontFamily: "var(--font-display)" }}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* PRO badge — fixed overflow */}
      <div className="mx-3 mt-6 p-3 rounded-xl hidden lg:block"
        style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-mid)" }}>
        <p className="text-xs font-bold mb-1"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
          PRO PLAN
        </p>
        <p className="text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
          Unlimited courses &amp; AI tutoring
        </p>
      </div>
    </aside>
  );
}