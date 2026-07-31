"use client";

import { motion } from "framer-motion";

export default function HeroButtons() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1,
        duration: 0.8,
      }}
      className="mt-12 flex flex-wrap items-center justify-center gap-5"
    >
      <motion.button
        whileHover={{
          scale: 1.05,
          y: -4,
        }}
        whileTap={{
          scale: 0.96,
        }}
        className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,.45)]"
      >
        Start Project
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.05,
          y: -4,
        }}
        whileTap={{
          scale: 0.96,
        }}
        className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:border-violet-400"
      >
        View Work
      </motion.button>
    </motion.div>
  );
}