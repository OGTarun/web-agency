import { ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="font-display text-2xl font-normal italic tracking-[-0.02em] text-foreground">
              OG
            </span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.34em] text-muted">
              Studios
            </span>
          </a>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            Digital Observatory · © {year}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          aria-label="Back to top"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-accent-soft/50 hover:text-accent-soft"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  );
}
