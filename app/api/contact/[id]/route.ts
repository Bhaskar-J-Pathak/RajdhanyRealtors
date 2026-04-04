import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest, unauthorizedResponse } from "@/lib/auth";
import { z } from "zod";

const updateContactSchema = z.object({
  status: z.enum(["new", "read", "replied"]),
});

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
    const data = updateContactSchema.parse(body);

    const contact = await prisma.contact.update({
      where: { id },
      data: { status: data.status },
    });

    return NextResponse.json(contact);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Update contact error:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
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
    await prisma.contact.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
