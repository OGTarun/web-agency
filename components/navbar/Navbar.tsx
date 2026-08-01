"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  "Home",
  "Services",
  "Portfolio",
  "About",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/40 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="flex cursor-pointer items-center gap-3"
        >
          <span className="text-3xl font-black tracking-[-0.16em] text-white">OG</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.34em] text-white/85">Studios</span>
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden gap-10 md:flex">
          {links.map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{
                y: -2,
                color: "#A855F7",
              }}
              className="text-sm tracking-[0.08em] text-white/75 transition"
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168,85,247,.45)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="rounded-full border border-white/35 bg-white/[0.025] px-6 py-3 text-sm font-medium tracking-[0.04em] text-white backdrop-blur-md"
        >
          Let&apos;s Talk
        </motion.button>
      </div>
    </motion.nav>
  );
}
