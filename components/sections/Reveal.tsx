"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
