import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest, unauthorizedResponse } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";
import { z } from "zod";

const propertySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  location: z.string().min(1),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  area: z.number().positive(),
  propertyType: z.string().min(1),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["available", "sold", "pending"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;
    const featured = searchParams.get("featured") === "true";
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};

    if (featured) {
      where.featured = true;
    }

    if (status) {
      where.status = status;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ]);

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get properties error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await authenticateRequest(request);
  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const data = propertySchema.parse(body);

    const slug = generateSlug(data.title);

    // Check for duplicate slug
    const existing = await prisma.property.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const property = await prisma.property.create({
      data: {
        title: data.title,
        slug: finalSlug,
        description: data.description,
        price: data.price,
        location: data.location,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        propertyType: data.propertyType,
        features: JSON.stringify(data.features || []),
        images: JSON.stringify(data.images || []),
        featured: data.featured || false,
        status: data.status || "available",
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Create property error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
