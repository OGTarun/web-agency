import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We map your goals, audience, and constraints until the brief is sharp enough to act on.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Concepts, systems, and motion studies converge into a direction that feels inevitable.",
  },
  {
    number: "03",
    title: "Engineer",
    description:
      "Production-grade code, real-time 3D, and performance budgets built in from day one.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Release, measure, and refine. We stay close to make the work keep earning its place.",
  },
];

function Orbit({ number, delay }: { number: string; delay: number }) {
  return (
    <div className="relative mx-auto h-20 w-20">
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[14px] rounded-full border border-line/50" />
      <div
        className="absolute inset-0"
        style={{
          animation: "orbit 20s linear infinite",
          animationDelay: `${delay}s`,
        }}
      >
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
      </div>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.18em] text-faint">
        {number}
      </span>
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-24 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Process"
          title="A disciplined path from idea to"
          accent="launch."
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden lg:block"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent" />
            {[12.5, 37.5, 62.5, 87.5].map((position) => (
              <span
                key={position}
                className="absolute -top-[2.5px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-accent-soft/40"
                style={{ left: `${position}%` }}
              />
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={0.1 * index}>
                <div className="text-center lg:px-4">
                  <Orbit number={step.number} delay={index * 2.1} />
                  <h3 className="mt-7 font-sans text-lg font-medium tracking-[-0.01em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
