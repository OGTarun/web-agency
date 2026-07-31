"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "50+",
    label: "Projects",
  },
  {
    value: "99%",
    label: "Performance",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mt-16 flex flex-wrap items-center justify-center gap-10"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 backdrop-blur-xl"
        >
          <h3 className="text-3xl font-bold text-white">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-gray-400">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}