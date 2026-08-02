import Reveal from "./Reveal";
import { EMAIL, LOCATION, MAILTO } from "@/lib/site";

const details = [
  {
    label: "Email",
    value: EMAIL,
    href: MAILTO,
  },
  { label: "Location", value: LOCATION },
  { label: "Status", value: "Booking Q4 2026" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 py-36 md:py-56"
    >
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_14px_rgba(34,211,238,0.7)]" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-foreground"
          >
            Let&apos;s build something{" "}
            <span className="font-display font-normal italic tracking-[-0.01em] bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              gravitational.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-muted md:text-lg">
            The journey ends where the work begins. Tell us what you&apos;re
            making — we&apos;ll bring the craft, the systems, and the
            obsession with detail.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-12">
          <a
            href={MAILTO}
            className="group inline-flex items-center gap-4 rounded-full border border-violet-400/40 bg-white/[0.03] px-8 py-4 text-sm font-medium uppercase tracking-[0.08em] text-foreground transition-all duration-300 hover:border-violet-400/70 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]"
          >
            Start a Project
            <span className="h-px w-10 bg-current transition-all duration-300 group-hover:w-14" />
          </a>
        </Reveal>

        <Reveal delay={0.2} className="mt-24">
          <div className="flex flex-col items-center justify-center gap-6 border-t border-line/40 pt-10 sm:flex-row sm:gap-20">
            {details.map((detail) => (
              <div key={detail.label} className="text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="mt-2 block font-mono text-sm text-foreground transition-colors hover:text-accent-soft"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-2 font-mono text-sm text-foreground">
                    {detail.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
