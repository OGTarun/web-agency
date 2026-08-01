"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
}

const baseClass =
  "rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-[0.08em]";

const variantClass: Record<MagneticButtonProps["variant"], string> = {
  primary:
    "border border-violet-400/40 bg-white/[0.03] text-white shadow-[inset_0_0_20px_rgba(167,139,250,0.08),0_0_32px_rgba(139,92,246,0.18)]",
  secondary:
    "border border-line bg-glass text-muted transition-colors hover:border-line-strong hover:text-foreground",
};

function MagneticButton({ children, variant }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 18, stiffness: 260 });
  const springY = useSpring(y, { damping: 18, stiffness: 260 });

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={`${baseClass} ${variantClass[variant]} cursor-pointer`}
      onPointerLeave={resetPosition}
      onPointerMove={handlePointerMove}
      style={{ x: springX, y: springY }}
      type="button"
      whileHover={{ scale: 1.03 }}
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
      className="mt-12 flex flex-wrap items-center gap-5"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <MagneticButton variant="primary">Explore Our Work</MagneticButton>
      <MagneticButton variant="secondary">Start a Project</MagneticButton>
    </motion.div>
  );
}
