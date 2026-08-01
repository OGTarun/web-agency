import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-16 max-w-2xl md:mb-20">
      <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
        {eyebrow}
      </p>
      <h2 className="font-sans text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
        {title}
        {accent && (
          <span className="font-display font-normal italic tracking-[-0.01em] bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
            {` ${accent}`}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
