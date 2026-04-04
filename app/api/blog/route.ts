import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest, unauthorizedResponse } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().optional(),
  author: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const published = searchParams.get("published");
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {};

    if (published === "true") {
      where.published = true;
    } else if (published === "false") {
      where.published = false;
    }

    if (category) {
      where.category = category;
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get blog posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
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
    const data = blogSchema.parse(body);

    const slug = generateSlug(data.title);

    // Check for duplicate slug
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: finalSlug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || "",
        author: data.author,
        category: data.category,
        tags: JSON.stringify(data.tags || []),
        published: data.published || false,
        publishedAt: data.published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
