"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─── */
export const navLinks = [
  { href: "/properties", label: "Residences" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

/* ─── Motion presets ─── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, delay, ease: EASE },
});

/* ═══════════════════════════════════════════
   SITE NAV
   ═══════════════════════════════════════════ */
export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50 px-8 sm:px-12 lg:px-20 pt-10 flex justify-between items-center">
        {/* Logo */}
        <motion.div {...fadeIn(0.1)}>
          <Link href="/" className="group flex items-baseline gap-3">
            <span
              className="font-display font-semibold tracking-tight text-black"
              style={{ fontSize: 20 }}
            >
              Rajdhany
            </span>
            <span
              className="font-sans uppercase text-black group-hover:text-black transition-colors duration-300"
              style={{ fontSize: 7.5, letterSpacing: "0.5em" }}
            >
              Realtors
            </span>
          </Link>
        </motion.div>

        {/* Center: thin separator + numbered nav links + thin separator */}
        <motion.div
          {...fadeIn(0.25)}
          className="hidden lg:flex items-center gap-10"
        >
          {/* Left rule */}
          <div
            style={{
              width: 1,
              height: 18,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          />

          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link group relative uppercase font-sans text-black/45 hover:text-black/72 transition-colors duration-300"
              style={{ fontSize: 9, letterSpacing: "0.3em" }}
            >
              {/* Tiny index number above each link */}
              <span
                className="absolute -top-3 left-0 font-sans text-black/18 group-hover:text-black/35 transition-colors duration-300"
                style={{ fontSize: 6.5, letterSpacing: "0.05em" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
            </Link>
          ))}

          {/* Right rule */}
          <div
            style={{
              width: 1,
              height: 18,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>

        {/* Right: pill Enquire CTA + mobile toggle */}
        <motion.div {...fadeIn(0.35)} className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2.5 group border border-black/12 hover:border-black/28 hover:bg-black/[0.025] rounded-full px-5 py-2.5 transition-all duration-300"
          >
            <span
              className="uppercase font-sans text-black/45 group-hover:text-black/70 transition-colors duration-300"
              style={{ fontSize: 8.5, letterSpacing: "0.3em" }}
            >
              Enquire
            </span>
            <span
              className="text-black/30 group-hover:text-black/55 inline-block transition-all duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
              style={{ fontSize: 10 }}
            >
              ↗
            </span>
          </Link>

          <button
            className="lg:hidden uppercase font-sans text-black/40"
            style={{ fontSize: 9, letterSpacing: "0.3em" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </motion.div>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col justify-center px-10 py-20"
            style={{ backgroundColor: "#fafafa" }}
          >
            <button
              className="absolute top-10 right-8 uppercase font-sans text-black/35"
              style={{ fontSize: 9, letterSpacing: "0.3em" }}
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.08, ease: EASE }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-5 font-display italic font-normal transition-opacity hover:opacity-60 border-b border-black/5"
                  style={{
                    color: "#111",
                    fontSize: "clamp(2.2rem, 7vw, 4rem)",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
