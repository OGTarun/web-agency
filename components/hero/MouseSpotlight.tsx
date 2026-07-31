"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 120,
    damping: 30,
  });

  const y = useSpring(mouseY, {
    stiffness: 120,
    damping: 30,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 350);
      mouseY.set(e.clientY - 350);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="pointer-events-none fixed left-0 top-0 z-10 h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-[170px]"
    />
  );
}