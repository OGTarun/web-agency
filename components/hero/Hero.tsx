"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import MouseSpotlight from "./MouseSpotlight";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05010A] px-6">

      <MouseSpotlight />

      <HeroBackground />

      <div className="relative z-20 mx-auto max-w-6xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="mb-10"
        >
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            🚀 Premium Websites • AI • Apps
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .9, delay: .2 }}
          className="text-6xl font-black leading-[1.05] text-white md:text-8xl"
        >
          We Build

          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Digital Experiences
          </span>

          That Grow Businesses.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .7 }}
          className="mx-auto mt-10 max-w-2xl text-xl text-gray-400"
        >
          Premium websites, AI automation and software engineered to help
          ambitious businesses dominate online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-14 flex flex-wrap justify-center gap-6"
        >
          <button className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold shadow-[0_0_40px_rgba(139,92,246,.45)] transition hover:scale-105">
            Start Project
          </button>

          <button className="rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl transition hover:border-violet-500">
            View Portfolio
          </button>
        </motion.div>

      </div>

    </section>
  );
}