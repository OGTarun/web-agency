"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Main Purple Glow */}
      <motion.div
        animate={{
          x: [-150, 120, -150],
          y: [-60, 80, -60],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[15%] top-[20%] h-[650px] w-[650px] rounded-full bg-violet-600/25 blur-[180px]"
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          x: [120, -100, 120],
          y: [60, -100, 60],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[15%] bottom-[15%] h-[600px] w-[600px] rounded-full bg-cyan-400/20 blur-[180px]"
      />

      {/* Pink Glow */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[35%] top-[10%] h-[450px] w-[450px] rounded-full bg-fuchsia-500/15 blur-[160px]"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, white 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(5,1,10,.6) 80%, #05010A 100%)",
        }}
      />
    </div>
  );
}