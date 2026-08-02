"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import type { ReactNode } from "react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleAnchor = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a[href^="#"]');
      if (!target) {
        return;
      }

      const href = (target as HTMLAnchorElement).getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        event.preventDefault();
        lenis.scrollTo(element as HTMLElement, { offset: -72 });
      }
    };

    document.addEventListener("click", handleAnchor);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.removeEventListener("click", handleAnchor);
    };
  }, []);

  return <>{children}</>;
}
