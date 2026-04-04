import { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Journal — Rajdhany Realtors",
  description: "Perspectives on luxury living, real estate, and the art of the address. From Rajdhany Realtors.",
};

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

async function getBlogPosts(searchParams: BlogPageProps["searchParams"]) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 9;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { published: true };

  if (params.search) {
    where.OR = [
      { title: { contains: params.search } },
      { excerpt: { contains: params.search } },
      { content: { contains: params.search } },
    ];
  }

  if (params.category) {
    where.category = params.category;
  }

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({ where, orderBy: { publishedAt: "desc" }, skip, take: limit }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total, page, totalPages: Math.ceil(total / limit) };
}

async function getCategories() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  return posts.map((p) => p.category);
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { posts, total, page, totalPages } = await getBlogPosts(searchParams);
  const categories = await getCategories();
  const params = await searchParams;

  return (
    <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>

      {/* ════════ HEADER ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-10 lg:pt-28 lg:pb-12 flex items-end justify-between">
        <div className="flex items-end gap-5">
          <span
            className="font-display leading-none select-none"
            style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)", color: "rgba(0,0,0,0.04)", lineHeight: 1 }}
          >
            04
          </span>
          <div style={{ paddingBottom: "0.6rem" }}>
            <span
              className="block font-sans uppercase"
              style={{ fontSize: 7.5, letterSpacing: "0.45em", color: "rgba(0,0,0,0.22)", marginBottom: 10 }}
            >
              The Journal
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
              Perspectives on
              <br />
              <span className="italic">living well.</span>
            </h1>
          </div>
        </div>
        <p className="font-sans self-end pb-1" style={{ fontSize: 11, color: "rgba(0,0,0,0.26)" }}>
          {total} {total === 1 ? "entry" : "entries"}
        </p>
      </div>

      {/* ════════ CATEGORY FILTER ════════ */}
      {categories.length > 0 && (
        <div
          className="px-8 sm:px-12 lg:px-20 py-4 flex flex-wrap items-center gap-1.5"
          style={{ borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
        >
          <span
            className="font-sans uppercase mr-3 shrink-0"
            style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.2)" }}
          >
            Filter
          </span>
          {["All", ...categories].map((cat) => {
            const href = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
            const active = cat === "All" ? !params.category : params.category === cat;
            return (
              <Link
                key={cat}
                href={href}
                className="font-sans transition-all duration-200"
                style={{
                  fontSize: 11,
                  color: active ? "rgba(0,0,0,0.82)" : "rgba(0,0,0,0.3)",
                  padding: "4px 11px",
                  borderRadius: 20,
                  backgroundColor: active ? "rgba(0,0,0,0.07)" : "transparent",
                  border: "1px solid",
                  borderColor: active ? "rgba(0,0,0,0.1)" : "transparent",
                }}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      )}

      {/* ════════ GRID ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-10 pb-28 lg:pb-36">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?${new URLSearchParams({
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
                  </Link>
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
              No entries found.
            </span>
            {(params.search || params.category) && (
              <Link
                href="/blog"
                className="font-sans uppercase transition-colors duration-300 hover:text-black/60"
                style={{ fontSize: 8, letterSpacing: "0.42em", color: "rgba(0,0,0,0.3)" }}
              >
                Clear filter →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
