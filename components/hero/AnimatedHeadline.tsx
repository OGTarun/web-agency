"use client";

import { motion } from "framer-motion";

const lines = [
  { text: "Digital", display: false },
  { text: "Experiences", display: false },
  { text: "That Inspire", display: true },
];

const headlineVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.16, staggerChildren: 0.12 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AnimatedHeadline() {
  return (
    <motion.h1
      animate="visible"
      className="font-sans font-medium leading-[0.95] tracking-[-0.045em]"
      initial="hidden"
      variants={headlineVariants}
    >
      {lines.map(({ text, display }) => (
        <motion.span
          key={text}
          className={`block text-[clamp(2.6rem,7vw,5.4rem)] ${
            display
              ? "font-display font-normal italic tracking-[-0.01em] bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent"
              : "text-foreground"
          }`}
          variants={lineVariants}
        >
          {text}
        </motion.span>
      ))}
    </motion.h1>
  );
}
