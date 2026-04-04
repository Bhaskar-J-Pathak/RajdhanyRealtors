"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { parseJSON } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

function fmt(price: number): string {
  if (price >= 10_000_000) return `₹${(price / 10_000_000).toFixed(1)} Cr`;
  if (price >= 100_000) return `₹${(price / 100_000).toFixed(0)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

interface PropertyCardProps {
  property: {
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
  };
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const images = parseJSON<string[]>(property.images, []);
  const image = images[0] || FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: EASE }}
      className="group"
    >
      <Link href={`/properties/${property.slug}`} className="block">
        {/* Image */}
        <div
          className="relative overflow-hidden mb-4"
          style={{ borderRadius: 3, aspectRatio: "4/3" }}
        >
          <img
            src={image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)" }}
          />
          {/* Status chip */}
          {property.status !== "available" && (
            <div
              className="absolute top-3 left-3 font-sans uppercase"
              style={{
                fontSize: 6.5,
                letterSpacing: "0.38em",
                color: "rgba(255,255,255,0.82)",
                backgroundColor: "rgba(0,0,0,0.52)",
                padding: "4px 9px",
                borderRadius: 2,
              }}
            >
              {property.status}
            </div>
          )}
        </div>

        {/* Text */}
        <div>
          <span
            className="block font-sans uppercase mb-1.5"
            style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.22)" }}
          >
            {property.propertyType}
          </span>

          <h3
            className="font-display font-normal mb-1 group-hover:opacity-60 transition-opacity duration-300 line-clamp-1"
            style={{
              fontSize: "1.02rem",
              letterSpacing: "-0.02em",
              color: "rgba(0,0,0,0.85)",
              lineHeight: 1.22,
            }}
          >
            {property.title}
          </h3>

          <p
            className="font-sans mb-3 line-clamp-1"
            style={{ fontSize: 11, color: "rgba(0,0,0,0.28)" }}
          >
            {property.location}
          </p>

          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex gap-3">
              <span className="font-sans" style={{ fontSize: 11, color: "rgba(0,0,0,0.28)" }}>
                {property.bedrooms} bed
              </span>
              <span className="font-sans" style={{ fontSize: 11, color: "rgba(0,0,0,0.28)" }}>
                {property.bathrooms} bath
              </span>
              <span className="font-sans" style={{ fontSize: 11, color: "rgba(0,0,0,0.28)" }}>
                {property.area.toLocaleString()} sqft
              </span>
            </div>

            <span
              className="font-display"
              style={{
                fontSize: "0.92rem",
                letterSpacing: "-0.02em",
                color: "rgba(0,0,0,0.78)",
              }}
            >
              {fmt(property.price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
