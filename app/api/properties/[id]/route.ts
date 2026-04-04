import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest, unauthorizedResponse } from "@/lib/auth";
import { z } from "zod";

const updatePropertySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  location: z.string().min(1).optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  area: z.number().positive().optional(),
  propertyType: z.string().min(1).optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: z.enum(["available", "sold", "pending"]).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("Get property error:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await authenticateRequest(request);
  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = updatePropertySchema.parse(body);

    const updateData: Record<string, unknown> = { ...data };

    if (data.features) {
      updateData.features = JSON.stringify(data.features);
    }
    if (data.images) {
      updateData.images = JSON.stringify(data.images);
    }

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Update property error:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await authenticateRequest(request);
  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete property error:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
