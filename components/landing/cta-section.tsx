"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LINES = [
  { text: "Let's begin", italic: false },
  { text: "a conversation.", italic: true },
];

/* ═══════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════ */
export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Grain */}
      <div
        className="hero-grain absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: 0.03 }}
      />

      {/* Top rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
        className="relative z-10 mx-8 sm:mx-12 lg:mx-20"
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07), transparent)",
          transformOrigin: "left",
        }}
      />

      <div className="relative z-10 px-8 sm:px-12 lg:px-20 pt-24 pb-32 lg:pt-36 lg:pb-48 flex flex-col items-center text-center">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="block font-sans uppercase mb-12"
          style={{
            fontSize: 7.5,
            letterSpacing: "0.5em",
            color: "rgba(0,0,0,0.2)",
          }}
        >
          Begin Your Journey
        </motion.span>

        {/* Display text */}
        <div className="mb-12 lg:mb-16">
          {LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.18 + i * 0.14, ease: EASE }}
              >
                <span
                  className={`block font-display font-normal ${line.italic ? "italic" : ""}`}
                  style={{
                    fontSize: "clamp(2.6rem, 5.5vw, 7rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    color: "rgba(0,0,0,0.85)",
                  }}
                >
                  {line.text}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.55, ease: EASE }}
          className="font-sans leading-relaxed max-w-[260px] mb-12"
          style={{ fontSize: 13, color: "rgba(0,0,0,0.28)" }}
        >
          Whether seeking your first ultra-premium residence or expanding a refined portfolio, we are ready.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Primary */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full transition-all duration-500 hover:bg-black/[0.04]"
            style={{
              border: "1px solid rgba(0,0,0,0.16)",
              padding: "14px 28px",
            }}
          >
            <span
              className="font-sans uppercase group-hover:text-black/65 transition-colors duration-300"
              style={{ fontSize: 7.5, letterSpacing: "0.38em", color: "rgba(0,0,0,0.48)" }}
            >
              Get in Touch
            </span>
            <span
              className="inline-block transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
              style={{ fontSize: 12, color: "rgba(0,0,0,0.32)" }}
            >
              ↗
            </span>
          </Link>

          {/* Divider dot */}
          <span
            className="hidden sm:block"
            style={{ fontSize: 8, color: "rgba(0,0,0,0.14)" }}
          >
            ·
          </span>

          {/* Secondary */}
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2"
          >
            <span
              className="font-sans uppercase group-hover:text-black/55 transition-colors duration-300"
              style={{ fontSize: 7.5, letterSpacing: "0.38em", color: "rgba(0,0,0,0.26)" }}
            >
              View Residences
            </span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-[3px]"
              style={{ fontSize: 11, color: "rgba(0,0,0,0.2)" }}
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
