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
    <Reveal className="mb-20 max-w-3xl md:mb-24">
      <p className="mb-6 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
        {eyebrow}
      </p>
      <h2 className="font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-foreground">
        {title}
        {accent && (
          <span className="font-display font-normal italic tracking-[-0.01em] bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
            {` ${accent}`}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-7 max-w-xl text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
