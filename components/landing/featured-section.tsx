"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  images: string;
  status: string;
}

interface FeaturedSectionProps {
  properties: Property[];
}

function formatPrice(price: number): string {
  if (price >= 10_000_000) return `₹${(price / 10_000_000).toFixed(1)} Cr`;
  if (price >= 100_000) return `₹${(price / 100_000).toFixed(0)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

function getFirstImage(images: string): string {
  try {
    const arr = JSON.parse(images);
    return arr[0] || "";
  } catch {
    return "";
  }
}

const FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

/* ═══════════════════════════════════════════
   FEATURED SECTION
   ═══════════════════════════════════════════ */
export function FeaturedSection({ properties }: FeaturedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8% 0px" });

  if (!properties || properties.length === 0) return null;

  const [hero, ...rest] = properties;
  const secondary = rest.slice(0, 2);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Grain */}
      <div
        className="hero-grain absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: 0.03 }}
      />

      {/* ════════ SECTION HEADER ════════ */}
      <div className="relative z-10 px-8 sm:px-12 lg:px-20 pt-24 lg:pt-36 pb-12 lg:pb-16 flex items-end justify-between">
        <div className="flex items-end gap-5">
          {/* Ghost number */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display leading-none"
            style={{
              fontSize: "clamp(4.5rem, 11vw, 9rem)",
              color: "rgba(0,0,0,0.04)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            02
          </motion.span>

          <div style={{ paddingBottom: "0.6rem" }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="block font-sans uppercase"
              style={{
                fontSize: 7.5,
                letterSpacing: "0.45em",
                color: "rgba(0,0,0,0.22)",
                marginBottom: 10,
              }}
            >
              Selected Residences
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              style={{
                height: 1,
                width: 44,
                backgroundColor: "rgba(0,0,0,0.08)",
                transformOrigin: "left",
              }}
            />
          </div>
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <Link href="/properties" className="group inline-flex items-center gap-2.5">
            <span
              className="font-sans uppercase group-hover:text-black/60 transition-colors duration-300"
              style={{ fontSize: 7.5, letterSpacing: "0.35em", color: "rgba(0,0,0,0.28)" }}
            >
              View All
            </span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-[3px]"
              style={{ fontSize: 11, color: "rgba(0,0,0,0.22)" }}
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ════════ HERO CARD ════════ */}
      <div className="relative z-10 px-8 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="group flex flex-col lg:flex-row overflow-hidden"
          style={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}
        >
          {/* Image */}
          <div
            className="relative overflow-hidden lg:w-[56%] shrink-0"
            style={{ height: "clamp(280px, 46vh, 580px)" }}
          >
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
              className="absolute inset-0"
            >
              <img
                src={getFirstImage(hero.images) || FALLBACK}
                alt={hero.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>

            {/* Status */}
            {hero.status !== "available" && (
              <div
                className="absolute top-4 left-4 font-sans uppercase"
                style={{
                  fontSize: 6.5,
                  letterSpacing: "0.38em",
                  color: "rgba(255,255,255,0.75)",
                  backgroundColor: "rgba(0,0,0,0.52)",
                  padding: "5px 10px",
                  borderRadius: 2,
                }}
              >
                {hero.status}
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="flex-1 flex flex-col justify-between p-8 lg:p-12 xl:p-14"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <div>
              <span
                className="block font-sans uppercase mb-5"
                style={{ fontSize: 7, letterSpacing: "0.44em", color: "rgba(0,0,0,0.2)" }}
              >
                {hero.propertyType}
              </span>

              <h3
                className="font-display font-normal leading-tight mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)",
                  letterSpacing: "-0.025em",
                  color: "rgba(0,0,0,0.85)",
                }}
              >
                {hero.title}
              </h3>

              <p
                className="font-sans"
                style={{
                  fontSize: 12,
                  color: "rgba(0,0,0,0.28)",
                  letterSpacing: "0.02em",
                  marginBottom: "2.2rem",
                }}
              >
                {hero.location}
              </p>

              {/* Specs */}
              <div
                className="flex gap-8"
                style={{
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                  marginBottom: "2.5rem",
                }}
              >
                {[
                  { val: hero.bedrooms, label: "BED" },
                  { val: hero.bathrooms, label: "BATH" },
                  { val: `${hero.area.toLocaleString()}`, label: "SQFT" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <span
                      className="block font-display"
                      style={{
                        fontSize: "1.15rem",
                        color: "rgba(0,0,0,0.78)",
                        letterSpacing: "-0.02em",
                        marginBottom: 3,
                      }}
                    >
                      {spec.val}
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: 6.5, letterSpacing: "0.38em", color: "rgba(0,0,0,0.2)" }}
                    >
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex items-end justify-between">
              <div>
                <span
                  className="block font-sans uppercase mb-1"
                  style={{ fontSize: 7, letterSpacing: "0.3em", color: "rgba(0,0,0,0.2)" }}
                >
                  Starting from
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.4rem, 2vw, 1.7rem)",
                    letterSpacing: "-0.025em",
                    color: "rgba(0,0,0,0.82)",
                  }}
                >
                  {formatPrice(hero.price)}
                </span>
              </div>

              <Link
                href={`/properties/${hero.slug}`}
                className="group/btn inline-flex items-center justify-center rounded-full transition-all duration-500 hover:bg-black/[0.05]"
                style={{
                  width: 50,
                  height: 50,
                  border: "1px solid rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              >
                <span
                  className="inline-block transition-all duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]"
                  style={{ fontSize: 14, color: "rgba(0,0,0,0.38)" }}
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ════════ SECONDARY CARDS ════════ */}
      {secondary.length > 0 && (
        <div className="relative z-10 px-8 sm:px-12 lg:px-20 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-28 lg:pb-36">
          {secondary.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease: EASE }}
              className="group overflow-hidden"
              style={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ height: "clamp(200px, 28vh, 320px)" }}
              >
                <img
                  src={getFirstImage(property.images) || FALLBACK}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 55%)",
                  }}
                />
                {/* Price overlaid on image */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className="font-display"
                    style={{
                      fontSize: "1.1rem",
                      color: "rgba(255,255,255,0.92)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {formatPrice(property.price)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className="p-5 flex items-center justify-between"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <div className="min-w-0 mr-4">
                  <span
                    className="block font-sans uppercase mb-1.5"
                    style={{ fontSize: 6.5, letterSpacing: "0.4em", color: "rgba(0,0,0,0.2)" }}
                  >
                    {property.propertyType}
                  </span>
                  <h4
                    className="font-display font-normal truncate"
                    style={{
                      fontSize: "1rem",
                      letterSpacing: "-0.02em",
                      color: "rgba(0,0,0,0.82)",
                    }}
                  >
                    {property.title}
                  </h4>
                  <p
                    className="font-sans mt-1"
                    style={{ fontSize: 11, color: "rgba(0,0,0,0.26)" }}
                  >
                    {property.bedrooms} bed · {property.bathrooms} bath ·{" "}
                    {property.area.toLocaleString()} sqft
                  </p>
                </div>

                <Link
                  href={`/properties/${property.slug}`}
                  className="group/btn shrink-0 inline-flex items-center justify-center rounded-full transition-all duration-500 hover:bg-black/[0.05]"
                  style={{
                    width: 42,
                    height: 42,
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <span
                    className="inline-block transition-all duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]"
                    style={{ fontSize: 13, color: "rgba(0,0,0,0.32)" }}
                  >
                    ↗
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
