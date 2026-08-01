"use client";

import { motion } from "framer-motion";

const words = ["Digital", "Experiences", "That Inspire"];

const headlineVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.16, staggerChildren: 0.14 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AnimatedHeadline() {
  return (
    <motion.h1
      animate="visible"
      className="flex flex-col gap-1 font-medium leading-[0.9] tracking-[-0.055em] sm:gap-2"
      initial="hidden"
      variants={headlineVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={word}
          className={`block text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] ${
            index === 2
              ? "bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent"
              : "text-white"
          }`}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
