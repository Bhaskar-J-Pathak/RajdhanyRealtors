import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PropertyCard } from "@/components/properties/property-card";
import { InquiryForm } from "@/components/forms/inquiry-form";
import prisma from "@/lib/db";
import { parseJSON } from "@/lib/utils";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

function fmt(price: number): string {
  if (price >= 10_000_000) return `₹${(price / 10_000_000).toFixed(1)} Cr`;
  if (price >= 100_000) return `₹${(price / 100_000).toFixed(0)} L`;
  return `₹${price.toLocaleString("en-IN")}`;
}

async function getProperty(slug: string) {
  return prisma.property.findUnique({ where: { slug } });
}

async function getSimilarProperties(propertyType: string, currentId: string) {
  return prisma.property.findMany({
    where: { propertyType, id: { not: currentId }, status: "available" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id: slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — Rajdhany Realtors`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      images: parseJSON<string[]>(property.images, [])[0]
        ? [parseJSON<string[]>(property.images, [])[0]]
        : [],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id: slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const images = parseJSON<string[]>(property.images, []);
  const features = parseJSON<string[]>(property.features, []);
  const similarProperties = await getSimilarProperties(property.propertyType, property.id);

  const FALLBACK =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>

      {/* ════════ HERO IMAGE ════════ */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(320px, 55vh, 680px)" }}
      >
        <img
          src={images[0] || FALLBACK}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {/* Back link */}
        <Link
          href="/properties"
          className="absolute top-8 left-8 sm:left-12 lg:left-20 group inline-flex items-center gap-2"
        >
          <span
            className="font-sans uppercase group-hover:text-white/80 transition-colors duration-300"
            style={{ fontSize: 7.5, letterSpacing: "0.4em", color: "rgba(255,255,255,0.6)" }}
          >
            ← Residences
          </span>
        </Link>
        {/* Status */}
        {property.status !== "available" && (
          <div
            className="absolute top-8 right-8 sm:right-12 lg:right-20 font-sans uppercase"
            style={{
              fontSize: 6.5,
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.8)",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "5px 12px",
              borderRadius: 2,
            }}
          >
            {property.status}
          </div>
        )}
        {/* Bottom title overlay */}
        <div className="absolute bottom-0 inset-x-0 px-8 sm:px-12 lg:px-20 pb-8">
          <span
            className="block font-sans uppercase mb-2"
            style={{ fontSize: 7, letterSpacing: "0.44em", color: "rgba(255,255,255,0.6)" }}
          >
            {property.propertyType}
          </span>
          <h1
            className="font-display font-normal"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
              letterSpacing: "-0.025em",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.08,
            }}
          >
            {property.title}
          </h1>
        </div>
      </div>

      {/* ════════ IMAGE STRIP ════════ */}
      {images.length > 1 && (
        <div className="px-8 sm:px-12 lg:px-20 pt-3 grid grid-cols-4 gap-2">
          {images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{ borderRadius: 2, aspectRatio: "4/3" }}
            >
              <img src={img} alt={`${property.title} ${i + 2}`} className="w-full h-full object-cover" />
              {i === 3 && images.length > 5 && (
                <div
                  className="absolute inset-0 flex items-center justify-center font-display"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", fontSize: "1.1rem" }}
                >
                  +{images.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ════════ VITALS BAR ════════ */}
      <div
        className="px-8 sm:px-12 lg:px-20 py-6 flex flex-wrap items-center justify-between gap-6"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="flex gap-8">
          {[
            { val: property.bedrooms, label: "BED" },
            { val: property.bathrooms, label: "BATH" },
            { val: `${property.area.toLocaleString()}`, label: "SQFT" },
          ].map((s) => (
            <div key={s.label}>
              <span
                className="block font-display"
                style={{ fontSize: "1.4rem", letterSpacing: "-0.02em", color: "rgba(0,0,0,0.82)" }}
              >
                {s.val}
              </span>
              <span
                className="font-sans"
                style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.22)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-right">
          <span
            className="block font-sans uppercase mb-1"
            style={{ fontSize: 7, letterSpacing: "0.3em", color: "rgba(0,0,0,0.22)" }}
          >
            Starting from
          </span>
          <span
            className="font-display"
            style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)", letterSpacing: "-0.025em", color: "rgba(0,0,0,0.85)" }}
          >
            {fmt(property.price)}
          </span>
        </div>
      </div>

      {/* ════════ BODY ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-12 pb-24 lg:pt-16 lg:pb-36 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">

        {/* Left: content */}
        <div>
          {/* Location */}
          <p
            className="font-sans mb-10"
            style={{ fontSize: 12.5, color: "rgba(0,0,0,0.32)", letterSpacing: "0.02em" }}
          >
            {property.location}
          </p>

          {/* Description */}
          <div className="mb-10">
            <span
              className="block font-sans uppercase mb-5"
              style={{ fontSize: 7, letterSpacing: "0.44em", color: "rgba(0,0,0,0.2)" }}
            >
              About this Residence
            </span>
            <p
              className="font-sans leading-relaxed whitespace-pre-line"
              style={{ fontSize: 13.5, color: "rgba(0,0,0,0.45)", lineHeight: 1.75 }}
            >
              {property.description}
            </p>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div>
              <span
                className="block font-sans uppercase mb-6"
                style={{ fontSize: 7, letterSpacing: "0.44em", color: "rgba(0,0,0,0.2)" }}
              >
                Features &amp; Amenities
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.2)", flexShrink: 0 }}
                    />
                    <span className="font-sans" style={{ fontSize: 12.5, color: "rgba(0,0,0,0.45)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: inquiry sidebar */}
        <div className="lg:sticky lg:top-24">
          <div
            className="p-8"
            style={{
              backgroundColor: "#f3f3f3",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <span
              className="block font-sans uppercase mb-6"
              style={{ fontSize: 7, letterSpacing: "0.44em", color: "rgba(0,0,0,0.22)" }}
            >
              Enquire about this Residence
            </span>

            {/* Quick contact */}
            <div className="flex gap-3 mb-6">
              <a
                href="tel:+911234567890"
                className="flex-1 flex items-center justify-center gap-2 font-sans uppercase transition-all duration-300 hover:bg-black/[0.06]"
                style={{
                  fontSize: 7.5,
                  letterSpacing: "0.3em",
                  color: "rgba(0,0,0,0.5)",
                  padding: "10px 0",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 3,
                }}
              >
                Call
              </a>
              <a
                href="mailto:info@rajdhanyrealtors.com"
                className="flex-1 flex items-center justify-center gap-2 font-sans uppercase transition-all duration-300 hover:bg-black/[0.06]"
                style={{
                  fontSize: 7.5,
                  letterSpacing: "0.3em",
                  color: "rgba(0,0,0,0.5)",
                  padding: "10px 0",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 3,
                }}
              >
                Email
              </a>
            </div>

            <div
              className="flex items-center gap-3 mb-6"
              style={{ color: "rgba(0,0,0,0.15)" }}
            >
              <div style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
              <span className="font-sans" style={{ fontSize: 9 }}>or</span>
              <div style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
            </div>

            <InquiryForm propertyId={property.id} propertyTitle={property.title} />
          </div>
        </div>
      </div>

      {/* ════════ SIMILAR RESIDENCES ════════ */}
      {similarProperties.length > 0 && (
        <div
          className="px-8 sm:px-12 lg:px-20 pb-28 lg:pb-36"
          style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "4rem" }}
        >
          <span
            className="block font-sans uppercase mb-10"
            style={{ fontSize: 7.5, letterSpacing: "0.45em", color: "rgba(0,0,0,0.22)" }}
          >
            Similar Residences
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {similarProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
