"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#030303]">

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.3, 0.22],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500 blur-[170px]"
      />

      {/* Cyan Accent */}
      <motion.div
        animate={{
          opacity: [0.04, 0.08, 0.04],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-[120px]"
      />

      {/* Dark Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 12%, rgba(3,3,3,.55) 58%, #030303 100%)",
        }}
      />

      {/* Premium Grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Horizon Glow */}
      <div
        className="absolute bottom-0 left-0 h-80 w-full"
        style={{
          background:
            "linear-gradient(to top, rgba(124,58,237,.12), transparent)",
        }}
      />

      {/* Top Fade */}
      <div
        className="absolute top-0 left-0 h-48 w-full"
        style={{
          background:
            "linear-gradient(to bottom,#030303,transparent)",
        }}
      />

      {/* Bottom Fade */}
      <div
        className="absolute bottom-0 left-0 h-56 w-full"
        style={{
          background:
            "linear-gradient(to top,#030303,transparent)",
        }}
      />

      {/* Tiny Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 120 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

    </div>
  );
}