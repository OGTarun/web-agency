"use client";

import { motion } from "framer-motion";

interface FloatingGlassCardProps {
  title: string;
  value: string;
  icon: string;
}

export default function FloatingGlassCard({
  title,
  value,
  icon,
}: FloatingGlassCardProps) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      className="w-72 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_0_60px_rgba(139,92,246,.15)]"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-3xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-gray-400">
        {value}
      </p>
    </motion.div>
  );
}