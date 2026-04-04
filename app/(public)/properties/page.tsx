import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyFilters } from "@/components/properties/property-filters";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Residences — Rajdhany Realtors",
  description: "Explore ultra-premium residences curated by Rajdhany Realtors in Guwahati, Assam.",
};

interface PropertiesPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    location?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

async function getProperties(searchParams: PropertiesPageProps["searchParams"]) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 12;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { location: { contains: params.search } },
      { description: { contains: params.search } },
    ];
  }

  if (params.type) {
    where.propertyType = params.type;
  }

  if (params.minPrice || params.maxPrice) {
    where.price = {};
    if (params.minPrice) {
      (where.price as Record<string, number>).gte = parseInt(params.minPrice);
    }
    if (params.maxPrice) {
      (where.price as Record<string, number>).lte = parseInt(params.maxPrice);
    }
  }

  if (params.bedrooms) {
    where.bedrooms = parseInt(params.bedrooms);
  }

  if (params.location) {
    where.location = { contains: params.location };
  }

  if (params.status) {
    where.status = params.status;
  } else {
    where.status = "available";
  }

  type OrderBy = { [key: string]: "asc" | "desc" };
  let orderBy: OrderBy = { createdAt: "desc" };

  if (params.sort) {
    switch (params.sort) {
      case "price-asc": orderBy = { price: "asc" }; break;
      case "price-desc": orderBy = { price: "desc" }; break;
      case "newest": orderBy = { createdAt: "desc" }; break;
      case "oldest": orderBy = { createdAt: "asc" }; break;
    }
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({ where, orderBy, skip, take: limit }),
    prisma.property.count({ where }),
  ]);

  return { properties, total, page, totalPages: Math.ceil(total / limit) };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { properties, total, page, totalPages } = await getProperties(searchParams);
  const params = await searchParams;

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>

      {/* ════════ EDITORIAL HEADER ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-10 lg:pt-28 lg:pb-14 flex items-end justify-between">
        <div className="flex items-end gap-5">
          {/* Ghost number */}
          <span
            className="font-display leading-none select-none"
            style={{
              fontSize: "clamp(4.5rem, 11vw, 9rem)",
              color: "rgba(0,0,0,0.04)",
              lineHeight: 1,
            }}
          >
            03
          </span>
          <div style={{ paddingBottom: "0.6rem" }}>
            <span
              className="block font-sans uppercase"
              style={{
                fontSize: 7.5,
                letterSpacing: "0.45em",
                color: "rgba(0,0,0,0.22)",
                marginBottom: 10,
              }}
            >
              Residences
            </span>
            <h1
              className="font-display font-normal"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                letterSpacing: "-0.025em",
                color: "rgba(0,0,0,0.85)",
                lineHeight: 1.06,
              }}
            >
              Select your
              <br />
              <span className="italic">address.</span>
            </h1>
          </div>
        </div>

        {/* Count */}
        <p
          className="font-sans self-end pb-1"
          style={{ fontSize: 11, color: "rgba(0,0,0,0.26)", letterSpacing: "0.02em" }}
        >
          {total} {total === 1 ? "residence" : "residences"}
        </p>
      </div>

      {/* ════════ FILTERS ════════ */}
      <div className="px-8 sm:px-12 lg:px-20">
        <Suspense fallback={<div style={{ height: 56, borderTop: "1px solid rgba(0,0,0,0.05)" }} />}>
          <PropertyFilters />
        </Suspense>
      </div>

      {/* ════════ GRID ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-10 pb-28 lg:pb-36">
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={`/properties?${new URLSearchParams({
                      ...Object.fromEntries(
                        Object.entries(params).filter(([, v]) => v !== undefined)
                      ) as Record<string, string>,
                      page: p.toString(),
                    }).toString()}`}
                    className="font-sans transition-all duration-200"
                    style={{
                      fontSize: 11,
                      color: p === page ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.3)",
                      padding: "6px 13px",
                      borderRadius: 20,
                      backgroundColor: p === page ? "rgba(0,0,0,0.07)" : "transparent",
                      border: "1px solid",
                      borderColor: p === page ? "rgba(0,0,0,0.1)" : "transparent",
                    }}
                  >
                    {p}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center py-24">
            <span
              className="block font-display italic"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "rgba(0,0,0,0.2)",
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              No residences found.
            </span>
            <Link
              href="/properties"
              className="font-sans uppercase transition-colors duration-300 hover:text-black/60"
              style={{ fontSize: 8, letterSpacing: "0.42em", color: "rgba(0,0,0,0.3)" }}
            >
              Clear filters →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
