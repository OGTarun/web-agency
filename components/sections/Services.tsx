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

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 border-t border-line/60 bg-background py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
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
                  className="group flex h-full flex-col rounded-3xl border border-line bg-glass p-8 transition-colors duration-300 hover:border-accent-soft/40 hover:bg-glass-strong"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line text-foreground transition-colors duration-300 group-hover:border-accent-soft/50 group-hover:text-accent-soft">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-xs text-faint">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg font-medium tracking-[-0.01em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {service.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
