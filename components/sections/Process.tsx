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

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-24 border-t border-line/60 bg-background py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Process"
          title="A disciplined path from idea to"
          accent="launch."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={0.08 * index}>
              <article className="relative h-full rounded-3xl border border-line bg-glass p-8">
                <span className="mb-10 block font-display text-4xl italic text-accent-soft">
                  {step.number}
                </span>
                <h3 className="font-sans text-lg font-medium tracking-[-0.01em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
