import { ArrowUp } from "lucide-react";
import SocialLinks from "../social/SocialIcons";
import { EMAIL, MAILTO } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-6xl px-6 pt-24 sm:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent" />

        <div className="flex flex-col items-center gap-8 py-24 text-center md:py-28">
          <a href="#top" className="group flex cursor-pointer items-center gap-3">
            <span className="font-display text-3xl font-normal italic tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent-soft md:text-4xl">
              OG
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-muted">
              Studios
            </span>
          </a>

          <p className="max-w-md font-display text-lg italic leading-relaxed text-muted md:text-xl">
            Crafted with intention. Built for the long orbit.
          </p>
        </div>

        <div className="flex justify-center pb-20">
          <SocialLinks />
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-line/40 pt-8 pb-12 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            © {year} OG Studios · Digital Observatory
          </p>

          <a
            href={MAILTO}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent-soft"
          >
            {EMAIL}
          </a>

          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-soft/50 hover:text-accent-soft hover:shadow-[0_8px_28px_rgba(167,139,250,0.25)]"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
