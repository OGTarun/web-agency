"use client";

import { motion } from "framer-motion";
import { Compass, Fingerprint, Monitor, Zap } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: Monitor,
    number: "01",
    title: "Web Experiences",
    description:
      "Award-calibre websites engineered for speed, detail, and emotional impact.",
  },
  {
    icon: Fingerprint,
    number: "02",
    title: "Brand Identity",
    description:
      "Distinctive marks, systems, and voices that make companies unmistakable.",
  },
  {
    icon: Zap,
    number: "03",
    title: "Digital Products",
    description:
      "Tools and platforms designed and built to be loved by the people who use them.",
  },
  {
    icon: Compass,
    number: "04",
    title: "Motion & 3D",
    description:
      "Cinematic interfaces and real-time 3D that turn interaction into atmosphere.",
  },
];

function BlueprintLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 blueprint-grid opacity-60"
    />
  );
}

function OrbitMark({ delay }: { delay: number }) {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-6 -right-6 h-28 w-28 text-line-strong"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
      <g
        className="text-accent-soft"
        style={{
          animation: "orbit 22s linear infinite",
          animationDelay: `${delay}s`,
          transformBox: "view-box",
          transformOrigin: "50px 50px",
        }}
      >
        <circle cx="90" cy="50" r="1.6" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 overflow-hidden py-28 md:py-40"
    >
      <BlueprintLayer />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="Everything a modern brand needs to"
          accent="feel inevitable."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={0.08 * index}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-glass/40 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-accent-soft/30"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.18em] text-faint">
                      {service.number}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-accent-soft/40 group-hover:text-accent-soft">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-medium tracking-[-0.01em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
                    {service.description}
                  </p>

                  <OrbitMark delay={index * 1.7} />
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
