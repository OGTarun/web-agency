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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer text-3xl font-black tracking-wide"
        >
          <span className="text-white">OG</span>
          <span className="text-violet-500">Studios</span>
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
              className="text-white/80 transition"
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
          className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold"
        >
          Start Project
        </motion.button>
      </div>
    </motion.nav>
  );
}