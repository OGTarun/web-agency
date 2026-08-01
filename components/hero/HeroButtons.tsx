"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className: string;
}

function MagneticButton({ children, className }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 260 });
  const springY = useSpring(y, { damping: 18, stiffness: 260 });

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.1);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.1);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={className}
      onPointerLeave={resetPosition}
      onPointerMove={handlePointerMove}
      style={{ x: springX, y: springY }}
      type="button"
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

export default function HeroButtons() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 flex flex-wrap items-center justify-center gap-5"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <MagneticButton className="rounded-full border border-sky-300/65 bg-white/[0.035] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-white shadow-[inset_0_0_20px_rgba(125,211,252,.06),0_0_28px_rgba(59,130,246,.12)]">
        Explore Our Work
      </MagneticButton>

      <MagneticButton className="rounded-full border border-white/15 bg-white/[0.025] px-7 py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-white/85 backdrop-blur-xl transition-colors hover:border-white/35 hover:bg-white/[0.07]">
        Start a Project
      </MagneticButton>
    </motion.div>
  );
}
