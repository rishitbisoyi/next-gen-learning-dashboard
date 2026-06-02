"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, User, Settings } from "lucide-react";

const items = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Courses", icon: BookOpen },
  { name: "Profile", icon: User },
  { name: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [active, setActive] = useState("Dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden flex justify-around items-center px-2 py-2"
      style={{
        background: "rgba(13, 17, 23, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.name;

        return (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl"
            style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-active"
                className="absolute inset-0 rounded-xl"
                style={{ background: "var(--accent-dim)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon
              className="relative z-10 w-5 h-5"
              strokeWidth={isActive ? 2.5 : 1.8}
            />
            <span
              className="relative z-10 text-[9px] font-bold tracking-wide"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {item.name.toUpperCase()}
            </span>
          </button>
        );
      })}
    </nav>
  );
}