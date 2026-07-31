"use client";

import { motion } from "framer-motion";

const words = [
  "Build",
  "Extraordinary",
  "Digital",
  "Experiences",
];

export default function AnimatedHeadline() {
  return (
    <div className="space-y-2">

      {words.map((word, index) => (
        <motion.h1
          key={word}
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.2,
            duration: 0.8,
          }}
          className={`font-black leading-none tracking-tight
            ${
              index === 1
                ? "bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
                : "text-white"
            }
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl`}
        >
          {word}
        </motion.h1>
      ))}

    </div>
  );
}