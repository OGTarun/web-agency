"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";
import HeroButtons from "./HeroButtons";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <Scene />

      <div className="relative z-40 mx-auto flex w-full max-w-7xl flex-col items-start px-6 pb-44 pt-32 text-left sm:px-8 lg:px-10">
        <motion.p
          {...fadeUp(0.05)}
          className="mb-9 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
          OG Studios / Digital Observatory
        </motion.p>

        <AnimatedHeadline />

        <motion.p
          {...fadeUp(0.55)}
          className="mt-10 max-w-sm text-base leading-8 text-muted md:text-lg"
        >
          Websites, brands, and digital systems — done properly.
        </motion.p>

        <HeroButtons />
      </div>

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="absolute bottom-0 right-10 z-40 hidden h-16 w-px origin-bottom bg-gradient-to-t from-line-strong to-transparent md:block"
      />
    </section>
  );
}
