"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STEPS = [
  {
    index: "01",
    title: "The Conversation",
    body: "Every exceptional home begins with understanding. We take time to learn your vision, lifestyle, and aspirations — then curate possibilities that align precisely with who you are.",
  },
  {
    index: "02",
    title: "The Curation",
    body: "We handpick each residence for architectural integrity, neighbourhood calibre, and investment potential. Only properties that meet our uncompromising standard are ever presented.",
  },
  {
    index: "03",
    title: "The Address",
    body: "From first viewing to final key handover, we orchestrate every detail with discretion and care. Your new address is not simply a location — it is the beginning of a curated chapter.",
  },
];

/* ═══════════════════════════════════════════
   PROCESS SECTION
   ═══════════════════════════════════════════ */
export function ProcessSection() {
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
        style={{ opacity: 0.025 }}
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

      <div className="relative z-10 px-8 sm:px-12 lg:px-20 pt-20 pb-24 lg:pt-28 lg:pb-36">

        {/* ════════ HEADER ════════ */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="block font-sans uppercase"
              style={{
                fontSize: 7.5,
                letterSpacing: "0.45em",
                color: "rgba(0,0,0,0.22)",
                marginBottom: 14,
              }}
            >
              Our Process
            </motion.span>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.1, delay: 0.18, ease: EASE }}
              >
                <h2
                  className="font-display font-normal"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.8rem)",
                    letterSpacing: "-0.03em",
                    color: "rgba(0,0,0,0.85)",
                    lineHeight: 1.05,
                  }}
                >
                  The Rajdhany
                  <br />
                  <span className="italic">Experience</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="font-sans leading-relaxed lg:max-w-[260px] lg:text-right"
            style={{ fontSize: 12.5, color: "rgba(0,0,0,0.28)" }}
          >
            A refined journey from aspiration to address — guided every step by expertise, discretion, and absolute care.
          </motion.p>
        </div>

        {/* ════════ STEPS ════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.14, ease: EASE }}
              className="relative flex flex-col py-10 lg:py-0 lg:pr-12"
              style={{
                borderTop:
                  i > 0
                    ? "1px solid rgba(0,0,0,0.05)"
                    : "none",
              }}
            >
              {/* Vertical rule between columns (desktop only) */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-0 bottom-0"
                  style={{
                    width: 1,
                    background:
                      "linear-gradient(to bottom, transparent, rgba(0,0,0,0.07) 20%, rgba(0,0,0,0.07) 80%, transparent)",
                  }}
                />
              )}

              {/* Step index */}
              <span
                className="font-sans block mb-8"
                style={{
                  fontSize: 7,
                  letterSpacing: "0.4em",
                  color: "rgba(0,0,0,0.18)",
                }}
              >
                {step.index}
              </span>

              {/* Step title */}
              <h3
                className="font-display font-normal mb-5"
                style={{
                  fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)",
                  letterSpacing: "-0.025em",
                  color: "rgba(0,0,0,0.82)",
                  lineHeight: 1.1,
                }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: 12.5, color: "rgba(0,0,0,0.3)" }}
              >
                {step.body}
              </p>

              {/* Accent mark */}
              <div
                className="mt-10"
                style={{ height: 1, width: 24, backgroundColor: "rgba(0,0,0,0.08)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
        className="relative z-10 mx-8 sm:mx-12 lg:mx-20"
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)",
          transformOrigin: "left",
        }}
      />
    </section>
  );
}
