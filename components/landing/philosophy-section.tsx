"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ─── Motion preset ─── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Manifesto lines ─── */
const LINES = [
  { text: "Not spaces.",    italic: false, outline: false },
  { text: "Declarations",   italic: true,  outline: false },
  { text: "of belonging.",  italic: false, outline: true  },
];

/* Marquee string — repeated to ensure no gaps at any viewport */
const TICKER =
  "ULTRA-PREMIUM RESIDENCES \u00a0·\u00a0 GUWAHATI, ASSAM \u00a0·\u00a0 CRAFTED FOR THE DISCERNING \u00a0·\u00a0 EST. 2013 \u00a0·\u00a0 NORTHEAST INDIA \u00a0·\u00a0 RAJDHANY REALTORS \u00a0·\u00a0 ";

/* ═══════════════════════════════════════════
   PHILOSOPHY SECTION
   ═══════════════════════════════════════════ */
export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  /* Parallax for the full-width image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Grain — same texture as hero */}
      <div
        className="hero-grain absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: 0.03 }}
      />

      {/* ════════ MARQUEE BAND ════════ */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.05)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          paddingTop: 11,
          paddingBottom: 11,
        }}
      >
        {/* Two copies so the -50% animation loops seamlessly */}
        <div className="hero-marquee flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-sans shrink-0"
              style={{
                fontSize: 7.5,
                letterSpacing: "0.42em",
                color: "rgba(0,0,0,0.11)",
                paddingRight: "4em",
              }}
            >
              {TICKER.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      {/* ════════ CENTERED MANIFESTO ════════ */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12 lg:px-20 pt-24 pb-20 lg:pt-40 lg:pb-32">

        {/* "Our Philosophy" label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="uppercase font-sans"
          style={{
            fontSize: 7.5,
            letterSpacing: "0.5em",
            color: "rgba(0,0,0,0.2)",
            marginBottom: 52,
            display: "block",
          }}
        >
          Our Philosophy
        </motion.span>

        {/* 3-line staggered manifesto */}
        <div>
          {LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 1.3, delay: 0.22 + i * 0.16, ease: EASE }}
              >
                <span
                  className={`block font-display font-normal ${line.italic ? "italic" : ""}`}
                  style={{
                    fontSize: "clamp(2.8rem, 6.2vw, 8rem)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.03em",
                    color: line.outline ? "transparent" : "rgba(0,0,0,0.88)",
                    WebkitTextStroke: line.outline
                      ? "1px rgba(0,0,0,0.52)"
                      : undefined,
                  }}
                >
                  {line.text}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════ FULL-WIDTH CINEMATIC IMAGE ════════ */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
        className="relative z-10 overflow-hidden mx-8 sm:mx-12 lg:mx-20"
        style={{
          height: "clamp(260px, 52vh, 680px)",
          borderRadius: 3,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: imgY, scale: 1.14 }}
        >
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
            alt="Crafted living — Rajdhany Realtors"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Very subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,250,0.08) 0%, transparent 30%, transparent 70%, rgba(250,250,250,0.15) 100%)",
          }}
        />
      </motion.div>

      {/* ════════ BOTTOM RESOLUTION ════════ */}
      <div className="relative z-10 px-8 sm:px-12 lg:px-20 pt-16 pb-28 lg:pt-20 lg:pb-44 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">

        {/* Left: thin rule + body copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.85, ease: EASE }}
          className="max-w-sm"
        >
          <div
            style={{
              width: 36,
              height: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
              marginBottom: 20,
            }}
          />
          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: 13, color: "rgba(0,0,0,0.3)" }}
          >
            Rajdhany brings a new standard of ultra-luxury living to the heart
            of Assam. Our residences are curated experiences for those who
            demand more than architecture — a declaration of how life should be
            lived.
          </p>
        </motion.div>

        {/* Right: CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.0, ease: EASE }}
        >
          <Link href="/about" className="group inline-flex items-center gap-3">
            <span
              className="uppercase font-sans group-hover:text-black/70 transition-colors duration-300"
              style={{
                fontSize: 9,
                letterSpacing: "0.35em",
                color: "rgba(0,0,0,0.38)",
              }}
            >
              Our Story
            </span>
            <div
              className="flex items-center justify-center rounded-full group-hover:border-black/25 transition-all duration-500"
              style={{
                width: 36,
                height: 36,
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <span
                className="inline-block transition-all duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                style={{ fontSize: 12, color: "rgba(0,0,0,0.32)" }}
              >
                ↗
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom rule ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
        className="relative z-10 mx-8 sm:mx-12 lg:mx-20"
        style={{
          transformOrigin: "left",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)",
        }}
      />
    </section>
  );
}
