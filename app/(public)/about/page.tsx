import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Rajdhany Realtors",
  description:
    "Rajdhany Realtors — ultra-premium real estate curated for the discerning, in the heart of Guwahati, Assam. Est. 2013.",
};

const PILLARS = [
  {
    index: "01",
    title: "Discretion",
    body: "Every consultation, every transaction, every detail handled with absolute confidentiality and the highest professional standards.",
  },
  {
    index: "02",
    title: "Curation",
    body: "We do not list every property — we curate. Each residence in our portfolio is handpicked for architectural merit, neighbourhood prestige, and enduring value.",
  },
  {
    index: "03",
    title: "Excellence",
    body: "From the first conversation to the final handover, we orchestrate a seamless experience that reflects our commitment to getting every detail right.",
  },
];

const MILESTONES = [
  { year: "2013", event: "Founded in Guwahati with a singular vision for ultra-premium real estate in Northeast India." },
  { year: "2016", event: "Completed our first landmark residential project — a defining address in the city." },
  { year: "2019", event: "Expanded portfolio to include bespoke commercial and mixed-use developments." },
  { year: "2023", event: "A decade of curating landmark addresses for the most discerning clientele in Assam." },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#fafafa" }}>

      {/* ════════ HERO ════════ */}
      <div className="relative overflow-hidden">
        {/* Cinematic background */}
        <div className="relative" style={{ height: "clamp(400px, 65vh, 720px)" }}>
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Rajdhany Realtors"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 35%, transparent 55%, rgba(250,250,250,0.95) 100%)",
            }}
          />
          {/* Grain */}
          <div className="hero-grain absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }} />
        </div>

        {/* Overlapping title */}
        <div
          className="px-8 sm:px-12 lg:px-20"
          style={{ marginTop: "-4rem", position: "relative", zIndex: 10 }}
        >
          <span
            className="block font-sans uppercase mb-4"
            style={{ fontSize: 7.5, letterSpacing: "0.5em", color: "rgba(0,0,0,0.22)" }}
          >
            About Us
          </span>
          <h1
            className="font-display font-normal"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              letterSpacing: "-0.03em",
              color: "rgba(0,0,0,0.85)",
              lineHeight: 1.04,
            }}
          >
            Rajdhany.
            <br />
            <span className="italic">Est. 2013.</span>
          </h1>
        </div>
      </div>

      {/* ════════ MANIFESTO ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-16 lg:pt-24 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        <div>
          <p
            className="font-display font-normal leading-snug"
            style={{
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              letterSpacing: "-0.02em",
              color: "rgba(0,0,0,0.78)",
              lineHeight: 1.3,
            }}
          >
            We began with a conviction that Northeast India deserved a truly world-class approach to luxury real estate.
          </p>
        </div>
        <div className="space-y-5">
          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: 13.5, color: "rgba(0,0,0,0.4)", lineHeight: 1.8 }}
          >
            Rajdhany Realtors was founded in 2013 in Guwahati, Assam — born from a belief that the city's most discerning residents deserved more than what the market offered. Not just properties, but addresses that speak to identity, aspiration, and the way life should be lived.
          </p>
          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: 13.5, color: "rgba(0,0,0,0.4)", lineHeight: 1.8 }}
          >
            We operate as a boutique firm — intentionally small, intensely focused, and unapologetically selective. Every residence we represent carries our full attention, care, and reputation.
          </p>
          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: 13.5, color: "rgba(0,0,0,0.4)", lineHeight: 1.8 }}
          >
            Today, Rajdhany is the definitive name for ultra-premium real estate in Guwahati — trusted by those who understand that a home is not a transaction, but a declaration.
          </p>
        </div>
      </div>

      {/* ════════ RULE ════════ */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07), transparent)" }}
      />

      {/* ════════ PILLARS ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 lg:mb-20">
          <span
            className="font-sans uppercase"
            style={{ fontSize: 7.5, letterSpacing: "0.45em", color: "rgba(0,0,0,0.22)" }}
          >
            Our Pillars
          </span>
          <p
            className="font-sans leading-relaxed max-w-xs sm:text-right"
            style={{ fontSize: 12.5, color: "rgba(0,0,0,0.28)" }}
          >
            Three principles that guide every decision we make.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.index}
              className="relative flex flex-col py-10 lg:py-0 lg:pr-12"
              style={{ borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
            >
              {i < PILLARS.length - 1 && (
                <div
                  className="hidden lg:block absolute right-0 top-0 bottom-0"
                  style={{
                    width: 1,
                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.07) 20%, rgba(0,0,0,0.07) 80%, transparent)",
                  }}
                />
              )}
              <span
                className="font-sans block mb-8"
                style={{ fontSize: 7, letterSpacing: "0.4em", color: "rgba(0,0,0,0.18)" }}
              >
                {pillar.index}
              </span>
              <h3
                className="font-display font-normal mb-5"
                style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", letterSpacing: "-0.025em", color: "rgba(0,0,0,0.82)" }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: 12.5, color: "rgba(0,0,0,0.3)" }}
              >
                {pillar.body}
              </p>
              <div className="mt-10" style={{ height: 1, width: 24, backgroundColor: "rgba(0,0,0,0.08)" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ════════ RULE ════════ */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)" }}
      />

      {/* ════════ STORY IMAGE + MILESTONES ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-16 lg:pt-28 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-start">
        {/* Left: cinematic image */}
        <div
          className="overflow-hidden"
          style={{ borderRadius: 3, height: "clamp(280px, 45vh, 520px)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
            alt="Rajdhany Realtors office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: milestones */}
        <div>
          <span
            className="block font-sans uppercase mb-10"
            style={{ fontSize: 7.5, letterSpacing: "0.45em", color: "rgba(0,0,0,0.22)" }}
          >
            Milestones
          </span>
          <div className="space-y-0">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className="flex gap-6"
                style={{
                  paddingBottom: "1.8rem",
                  marginBottom: "1.8rem",
                  borderBottom: i < MILESTONES.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                }}
              >
                <span
                  className="font-display shrink-0"
                  style={{ fontSize: "1rem", letterSpacing: "-0.02em", color: "rgba(0,0,0,0.25)", minWidth: 44 }}
                >
                  {m.year}
                </span>
                <p
                  className="font-sans leading-relaxed"
                  style={{ fontSize: 12.5, color: "rgba(0,0,0,0.42)" }}
                >
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ CTA ════════ */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)" }}
      />
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-28 lg:pt-24 lg:pb-40 flex flex-col items-center text-center">
        <span
          className="block font-sans uppercase mb-10"
          style={{ fontSize: 7.5, letterSpacing: "0.5em", color: "rgba(0,0,0,0.2)" }}
        >
          Work With Us
        </span>
        <h2
          className="font-display font-normal mb-5"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 5rem)",
            letterSpacing: "-0.03em",
            color: "rgba(0,0,0,0.85)",
            lineHeight: 1.05,
          }}
        >
          Begin your
          <br />
          <span className="italic">conversation.</span>
        </h2>
        <p
          className="font-sans leading-relaxed max-w-xs mb-10"
          style={{ fontSize: 13, color: "rgba(0,0,0,0.28)" }}
        >
          We welcome a select number of new clients each year. If you are ready to elevate your address, we would like to hear from you.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 rounded-full transition-all duration-500 hover:bg-black/[0.04]"
          style={{ border: "1px solid rgba(0,0,0,0.16)", padding: "14px 28px" }}
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
      </div>
    </div>
  );
}
