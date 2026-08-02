"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

interface Project {
  title: string;
  category: string;
  year: string;
  tags: string[];
  number: string;
  panel: "commander" | "study" | "aurora";
}

const projects: Project[] = [
  {
    title: "OG Commander",
    category: "Command Center",
    year: "2026",
    tags: ["Next.js", "WebGL", "Real-time"],
    number: "01",
    panel: "commander",
  },
  {
    title: "Study Mate",
    category: "Learning Platform",
    year: "2026",
    tags: ["Brand", "Product", "Mobile"],
    number: "02",
    panel: "study",
  },
  {
    title: "Aurora",
    category: "Brand System",
    year: "2025",
    tags: ["Identity", "Motion", "Guidelines"],
    number: "03",
    panel: "aurora",
  },
];

function CommanderPanel() {
  return (
    <div className="absolute inset-0 bg-[#070b18]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_12%,rgba(139,92,246,0.24),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_88%,rgba(34,211,238,0.13),transparent_50%)]" />
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.05]" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.05]" />

      <svg
        className="absolute right-8 top-8 h-44 w-44 text-accent-soft/60"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.4" opacity="0.8" />
        <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.3" opacity="0.6" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
      </svg>

      <div className="absolute left-6 top-6 font-mono text-[10px] uppercase leading-5 tracking-[0.24em] text-white/45 sm:left-8 sm:top-8">
        <p>System: Command</p>
        <p className="text-white/25">41.8921°N — 12.4923°E</p>
      </div>

      <span className="absolute -right-4 -top-10 select-none font-display text-[11rem] italic leading-none text-white/[0.04]">
        01
      </span>
    </div>
  );
}

function StudyMatePanel() {
  return (
    <div className="absolute inset-0 bg-[#080a16]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(99,102,241,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_90%,rgba(34,211,238,0.12),transparent_50%)]" />

      <div className="absolute left-1/2 top-1/2 w-[min(62%,320px)] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border border-white/10 bg-[#0d1020]/90 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-cyan/80" />
            <span className="h-2 w-2 rounded-full bg-violet-400/60" />
            <span className="ml-auto rounded-full bg-indigo-500/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-indigo-200/80">
              Study Mate
            </span>
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-3/4 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="mt-3 flex gap-2">
              <div className="h-12 w-full rounded-lg bg-gradient-to-br from-indigo-500/40 to-sky-400/30" />
              <div className="h-12 w-full rounded-lg bg-white/[0.06]" />
            </div>
            <div className="h-2 w-2/3 rounded-full bg-white/[0.08]" />
          </div>
        </div>
      </div>

      <span className="absolute -right-4 -top-10 select-none font-display text-[11rem] italic leading-none text-white/[0.04]">
        02
      </span>
    </div>
  );
}

function AuroraPanel() {
  return (
    <div className="absolute inset-0 bg-[#070912]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(109,40,217,0.2),transparent_60%)]" />
      <div className="absolute left-0 top-1/2 h-16 w-full -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.16),rgba(167,139,250,0.2),rgba(56,189,248,0.16),transparent)]" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.05]" />

      <p className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45 sm:left-8 sm:top-8">
        Brand System — 2025
      </p>
      <p className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35 sm:right-8 sm:top-8">
        v2.0
      </p>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-6 text-center">
          <p className="font-display text-6xl italic leading-none text-white sm:text-7xl">
            Aurora
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.34em] text-white/50">
            Light on everything
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 left-6 flex items-center gap-2 sm:bottom-6 sm:left-8">
        {["#22d3ee", "#a78bfa", "#f472b6", "#fbbf24"].map((color) => (
          <span
            key={color}
            className="h-3 w-3 rounded-full border border-white/10"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <span className="absolute -right-4 -top-10 select-none font-display text-[11rem] italic leading-none text-white/[0.04]">
        03
      </span>
    </div>
  );
}

function ExhibitPanel({ panel }: { panel: Project["panel"] }) {
  if (panel === "study") {
    return <StudyMatePanel />;
  }
  if (panel === "aurora") {
    return <AuroraPanel />;
  }
  return <CommanderPanel />;
}

interface ExhibitCardProps {
  project: Project;
  aspect: string;
}

function ExhibitCard({ project, aspect }: ExhibitCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });
  const spotlightX = useMotionValue(-200);
  const spotlightY = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${spotlightX}px ${spotlightY}px, rgba(167,139,250,0.16), transparent 72%)`;

  const handlePointerMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - bounds.left) / bounds.width - 0.5;
    const dy = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(-dy * 5);
    rotateY.set(dx * 6);
    spotlightX.set(event.clientX - bounds.left);
    spotlightY.set(event.clientY - bounds.top);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    spotlightX.set(-200);
    spotlightY.set(-200);
  };

  return (
    <motion.a
      href="#contact"
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      whileHover="hover"
      className="group relative block overflow-hidden rounded-2xl border border-line/80 bg-glass/30"
    >
      <div className={`relative overflow-hidden ${aspect}`}>
        <ExhibitPanel panel={project.panel} />

        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 sm:left-6 sm:top-6">
          {project.year}
        </span>

        <motion.span
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white opacity-0 transition-opacity duration-300 backdrop-blur-md group-hover:opacity-100 sm:right-6 sm:top-6"
          initial={false}
          variants={{ hover: { rotate: 45 } }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>

        <div className="absolute bottom-0 left-0 p-6 sm:p-8">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
            {project.category}
          </p>
          <h3 className="font-display text-3xl italic text-white sm:text-4xl">
            {project.title}
          </h3>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight, opacity: reducedMotion ? 0 : 1 }}
      />

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
  );
}

export default function Portfolio() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="scroll-mt-24 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects we're"
          accent="proud of."
          description="A selection of exhibits from the collection — each one designed, built, and shipped to outlast the moment it launched."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="lg:col-span-2">
            <ExhibitCard
              project={featured}
              aspect="aspect-[4/3] md:aspect-[21/9]"
            />
          </Reveal>
          {rest.map((project, index) => (
            <Reveal key={project.title} delay={0.08 * (index + 1)}>
              <ExhibitCard project={project} aspect="aspect-[4/3]" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
