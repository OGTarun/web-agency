"use client";

import HeroBackground from "./HeroBackground";
import MouseSpotlight from "./MouseSpotlight";
import Scene from "./Scene";
import AnimatedHeadline from "./AnimatedHeadline";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import FloatingGlassCard from "./FloatingGlassCard";
import Particles from "./Particles";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05010A]">

      {/* Background */}
      <HeroBackground />
      <MouseSpotlight />
      <Particles />
      <Scene />

      {/* Left Floating Card */}
      <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <FloatingGlassCard
          title="AI Automation"
          value="Save 30+ hrs/week"
          icon="🤖"
        />
      </div>

      {/* Right Floating Card */}
      <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <FloatingGlassCard
          title="Performance"
          value="99 Lighthouse"
          icon="⚡"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-40 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">

        <AnimatedHeadline />

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
          We design premium websites, AI systems and software that help
          ambitious brands stand out, automate workflows and scale faster.
        </p>

        <HeroButtons />

        <HeroStats />

      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#05010A] to-transparent" />

    </section>
  );
}