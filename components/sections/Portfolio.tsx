"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "OG Commander",
    category: "Command Center",
    year: "2026",
    tags: ["Next.js", "WebGL", "Real-time"],
    panel:
      "bg-[radial-gradient(ellipse_at_30%_20%,rgba(139,92,246,0.4),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(34,211,238,0.28),transparent_50%)]",
  },
  {
    title: "Study Mate",
    category: "Learning Platform",
    year: "2026",
    tags: ["Brand", "Product", "Mobile"],
    panel:
      "bg-[radial-gradient(ellipse_at_70%_30%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(ellipse_at_20%_85%,rgba(129,140,248,0.3),transparent_50%)]",
  },
  {
    title: "Aurora",
    category: "Brand System",
    year: "2025",
    tags: ["Identity", "Motion", "Guidelines"],
    panel:
      "bg-[radial-gradient(ellipse_at_50%_25%,rgba(167,139,250,0.38),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(56,189,248,0.3),transparent_50%)]",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="scroll-mt-24 bg-background py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects we're"
          accent="proud of."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={0.08 * index}>
              <motion.a
                href="#contact"
                whileHover="hover"
                className="group block overflow-hidden rounded-3xl border border-line bg-glass transition-colors duration-300 hover:border-line-strong"
              >
                <div
                  className={`relative flex aspect-[4/3] items-end overflow-hidden ${project.panel}`}
                >
                  <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                    {project.year}
                  </span>
                  <motion.span
                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white opacity-0 transition-opacity duration-300 backdrop-blur-md group-hover:opacity-100"
                    variants={{ hover: { rotate: 45 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                  <div className="p-6">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                      {project.category}
                    </p>
                    <h3 className="font-display text-2xl italic text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 p-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
