"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiteNav } from "@/components/layout/site-nav";

/* ─── Motion presets ─── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const revealUp = (delay: number) => ({
  initial: { y: "110%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  transition: { duration: 1.2, delay, ease: EASE },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, delay, ease: EASE },
});

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  /* Custom cursor */
  const cursorX = useMotionValue(-80);
  const cursorY = useMotionValue(-80);
  const sx = useSpring(cursorX, { stiffness: 160, damping: 30, mass: 0.3 });
  const sy = useSpring(cursorY, { stiffness: 160, damping: 30, mass: 0.3 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col select-none overflow-hidden"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* ── Custom cursor ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
        style={{
          x: sx,
          y: sy,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.12)",
          mixBlendMode: "difference",
        }}
      >
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
      </motion.div>

      {/* ── Grain texture ── */}
      <div
        className="hero-grain absolute inset-0 z-[1] pointer-events-none"
        style={{ opacity: 0.03 }}
      />

      {/* ════════ NAV ════════ */}
      <SiteNav />

      {/* ════════ HERO BODY ════════ */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
        {/* ── Meta marker ── */}
        <motion.div
          {...fadeIn(0.5)}
          className="mb-10 lg:mb-16"
        >
          <span
            className="uppercase font-sans text-black/90"
            style={{ fontSize: 8, letterSpacing: "0.5em" }}
          >
            Est. 2013 — Guwahati, Assam
          </span>
        </motion.div>

        {/* ── Central typographic composition ── */}
        <div className="relative">
          {/* Line 1: "Crafting" */}
          <div className="overflow-hidden">
            <motion.div {...revealUp(0.6)}>
              <span
                className="font-display font-normal text-black/90 block"
                style={{
                  fontSize: "clamp(3rem, 9vw, 9.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                Crafting
              </span>
            </motion.div>
          </div>

          {/* Line 2: "landmark" with embedded image */}
          <div className="overflow-hidden mt-1 lg:mt-2">
            <motion.div
              {...revealUp(0.75)}
              className="flex items-center gap-4 sm:gap-6 lg:gap-8"
            >
              <span
                className="font-display font-normal text-black/90 shrink-0"
                style={{
                  fontSize: "clamp(3rem, 9vw, 9.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                landmark
              </span>

              {/* Inline editorial image */}
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: 1.4, delay: 1.3, ease: EASE }}
                className="hidden sm:block relative overflow-hidden rounded-[4px] shrink-0"
                style={{
                  width: "clamp(100px, 14vw, 220px)",
                  height: "clamp(56px, 8vw, 120px)",
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ y: imgY, scale: imgScale }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Luxury interior"
                    className="w-full h-full object-cover"
                    style={{ minHeight: "120%" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Line 3: "addresses." — outline variant */}
          <div className="overflow-hidden mt-1 lg:mt-2">
            <motion.div
              {...revealUp(0.9)}
              className="flex items-baseline"
            >
              <span
                className="font-display italic font-normal block"
                style={{
                  fontSize: "clamp(3rem, 9vw, 9.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(0,0,0,0.55)",
                }}
              >
                addresses
              </span>
              <span
                className="font-display italic font-normal text-black/80"
                style={{
                  fontSize: "clamp(3rem, 9vw, 9.5rem)",
                  lineHeight: 1,
                }}
              >
                .
              </span>
            </motion.div>
          </div>

          {/* Paragraph — desktop: locked to bottom-right of text block, aligns with "addresses." */}
          <motion.div
            {...fadeIn(1.6)}
            className="hidden lg:block absolute right-0 bottom-0 max-w-[230px] text-right"
          >
            <p
              className="font-sans text-black/50 leading-relaxed"
              style={{ fontSize: 13 }}
            >
              Ultra-premium residences in the heart of Guwahati.
              Designed for the discerning few who seek more
              than a home — a statement.
            </p>
          </motion.div>
        </div>

        {/* ── Bottom: CTA + mobile paragraph ── */}
        <div className="mt-12 lg:mt-20 flex flex-col gap-8">
          {/* Mobile-only paragraph (desktop version is inside the text block above) */}
          <motion.div {...fadeIn(1.6)} className="lg:hidden max-w-[300px]">
            <p
              className="font-sans text-black/30 leading-relaxed"
              style={{ fontSize: 13 }}
            >
              Ultra-premium residences in the heart of Guwahati.
              Designed for the discerning few who seek more
              than a home — a statement.
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div
            {...fadeIn(1.8)}
            className="flex items-center gap-6"
          >
            {/* Primary CTA pill */}
            <Link
              href="/properties"
              className="group inline-flex items-center gap-3 rounded-full transition-all duration-500 hover:bg-black/[0.04]"
              style={{
                border: "1px solid rgba(0,0,0,0.14)",
                padding: "13px 26px",
              }}
            >
              <span
                className="font-sans uppercase group-hover:text-black/65 transition-colors duration-300"
                style={{ fontSize: 8, letterSpacing: "0.38em", color: "rgba(0,0,0,0.44)" }}
              >
                Explore Residences
              </span>
              <span
                className="inline-block transition-all duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
                style={{ fontSize: 11, color: "rgba(0,0,0,0.28)" }}
              >
                ↗
              </span>
            </Link>

            {/* Divider */}
            <span style={{ width: 1, height: 18, backgroundColor: "rgba(0,0,0,0.08)", display: "block" }} />

            {/* Ghost CTA */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2"
            >
              <span
                className="font-sans uppercase group-hover:text-black/50 transition-colors duration-300"
                style={{ fontSize: 8, letterSpacing: "0.38em", color: "rgba(0,0,0,1)" }}
              >
                Our Story
              </span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-[3px]"
                style={{ fontSize: 10, color: "rgba(0,0,0,0.18)" }}
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        {...fadeIn(2.2)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="font-sans uppercase"
          style={{ fontSize: 6.5, letterSpacing: "0.5em", color: "rgba(0,0,0,0.18)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(0,0,0,0.18)", fontSize: 12 }}
        >
          ↓
        </motion.div>
      </motion.div>

    </section>
  );
}
