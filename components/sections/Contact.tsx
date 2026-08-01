import Reveal from "./Reveal";

const details = [
  { label: "Email", value: "hello@ogstudios.example", href: "mailto:hello@ogstudios.example" },
  { label: "Location", value: "Remote / Worldwide" },
  { label: "Status", value: "Booking Q4 2026" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 border-t border-line/60 bg-background py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="font-sans text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl"
          >
            Let&apos;s build something{" "}
            <span className="font-display font-normal italic tracking-[-0.01em] bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              gravitational.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">
            Tell us what you&apos;re making. We&apos;ll bring the craft, the
            systems, and the obsession with detail it takes to make it
            unforgettable.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <a
            href="mailto:hello@ogstudios.example"
            className="group inline-flex items-center gap-4 rounded-full border border-violet-400/40 bg-white/[0.03] px-8 py-4 text-sm font-medium uppercase tracking-[0.08em] text-foreground transition-all duration-300 hover:border-violet-400/70 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]"
          >
            Start a Project
            <span className="h-px w-10 bg-current transition-all duration-300 group-hover:w-14" />
          </a>
        </Reveal>

        <div className="mt-20 grid gap-4 border-t border-line/60 pt-10 sm:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.label} delay={0.06 * index}>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="group block"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                    {detail.label}
                  </p>
                  <p className="mt-2 font-mono text-sm text-foreground transition-colors group-hover:text-accent-soft">
                    {detail.value}
                  </p>
                </a>
              ) : (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                    {detail.label}
                  </p>
                  <p className="mt-2 font-mono text-sm text-foreground">
                    {detail.value}
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
