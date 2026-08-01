"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const links = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((currentScrolled) =>
        currentScrolled === nextScrolled ? currentScrolled : nextScrolled,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
      <motion.nav
        aria-label="Primary"
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled || open
            ? "border-b border-line bg-background/60 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 sm:px-8">
          <a
            href="#top"
            className="flex cursor-pointer items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-3xl font-normal italic tracking-[-0.02em] text-foreground">
              OG
            </span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-muted">
              Studios
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm tracking-[0.08em] text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent-soft after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden rounded-full border border-violet-400/40 bg-white/[0.03] px-6 py-3 text-sm font-medium tracking-[0.04em] text-foreground transition-colors hover:border-violet-400/60 md:inline-flex"
            >
              Start a Project
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line md:hidden"
              onClick={() => setOpen((current) => !current)}
            >
              <span
                className={`absolute h-px w-4 bg-foreground transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-foreground transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-background/95 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6">
              {links.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="flex items-baseline gap-4 py-3"
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-mono text-xs text-faint">
                      0{index + 1}
                    </span>
                    <span className="font-display text-4xl italic text-foreground">
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <p className="px-6 font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
              OG Studios / Digital Observatory
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
