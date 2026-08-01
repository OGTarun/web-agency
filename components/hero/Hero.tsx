"use client";

import dynamic from "next/dynamic";
import AnimatedHeadline from "./AnimatedHeadline";
import HeroBackground from "./HeroBackground";
import HeroButtons from "./HeroButtons";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#010205]">
      <HeroBackground />
      <Scene />

      <div className="relative z-40 mx-auto flex w-full max-w-7xl flex-col items-start px-6 pb-32 pt-32 text-left sm:px-8 lg:px-10">
        <div className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/55">
          <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,.9)]" />
          OG Studios / Digital Observatory
        </div>

        <AnimatedHeadline />

        <p className="mt-8 max-w-md text-base leading-8 text-white/58 md:text-lg">
          We craft premium websites, brands, and digital systems that give ambitious companies gravity.
        </p>

        <HeroButtons />
      </div>

      <div className="pointer-events-none absolute bottom-10 right-8 z-40 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 md:flex">
        <span className="h-px w-14 bg-white/25" />
        Explore the universe
      </div>
    </section>
  );
}
