import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import prisma from "@/lib/db";
import { parseJSON } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function fmtDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date)
  );
}

async function getBlogPost(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug, published: true } });
}

async function getRelatedPosts(category: string, currentId: string) {
  return prisma.blogPost.findMany({
    where: { category, id: { not: currentId }, published: true },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Rajdhany Realtors`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const tags = parseJSON<string[]>(post.tags, []);
  const relatedPosts = await getRelatedPosts(post.category, post.id);

  return (
    <article style={{ backgroundColor: "#fafafa" }}>

      {/* ════════ HERO IMAGE ════════ */}
      {post.coverImage && (
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 52vh, 620px)" }}>
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 35%, transparent 60%, rgba(250,250,250,0.97) 100%)",
            }}
          />
          {/* Category chip */}
          <div
            className="absolute top-8 left-8 sm:left-12 lg:left-20 font-sans uppercase"
            style={{
              fontSize: 6.5,
              letterSpacing: "0.4em",
              color: "rgba(255,255,255,0.72)",
              backgroundColor: "rgba(0,0,0,0.48)",
              padding: "5px 12px",
              borderRadius: 2,
            }}
          >
            {post.category}
          </div>
          {/* Back link */}
          <Link
            href="/blog"
            className="absolute top-8 right-8 sm:right-12 lg:right-20 group inline-flex items-center gap-2"
          >
            <span
              className="font-sans uppercase group-hover:text-white/80 transition-colors"
              style={{ fontSize: 7.5, letterSpacing: "0.4em", color: "rgba(255,255,255,0.55)" }}
            >
              Journal →
            </span>
          </Link>
        </div>
      )}

      {/* ════════ ARTICLE HEADER ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-12 pb-10">
        {!post.coverImage && (
          <Link
            href="/blog"
            className="inline-block mb-8 font-sans uppercase transition-colors duration-300 hover:text-black/55"
            style={{ fontSize: 7.5, letterSpacing: "0.4em", color: "rgba(0,0,0,0.3)" }}
          >
            ← Journal
          </Link>
        )}

        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans" style={{ fontSize: 10.5, color: "rgba(0,0,0,0.3)" }}>
              {fmtDate(post.publishedAt)}
            </span>
            <span style={{ fontSize: 7, color: "rgba(0,0,0,0.15)" }}>·</span>
            <span className="font-sans" style={{ fontSize: 10.5, color: "rgba(0,0,0,0.3)" }}>
              {post.author}
            </span>
          </div>

          <h1
            className="font-display font-normal mb-5"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
              letterSpacing: "-0.025em",
              color: "rgba(0,0,0,0.88)",
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>

          <p
            className="font-sans leading-relaxed"
            style={{ fontSize: 14, color: "rgba(0,0,0,0.38)", lineHeight: 1.7 }}
          >
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Rule */}
      <div
        className="mx-8 sm:mx-12 lg:mx-20"
        style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)" }}
      />

      {/* ════════ BODY ════════ */}
      <div className="px-8 sm:px-12 lg:px-20 pt-12 pb-16">
        <div className="max-w-2xl">
          <div className="space-y-6">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="font-sans leading-relaxed"
                style={{ fontSize: 14.5, color: "rgba(0,0,0,0.55)", lineHeight: 1.82 }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-2 mt-12 pt-8"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              <span
                className="font-sans uppercase mr-1"
                style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.2)" }}
              >
                Tags
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans"
                  style={{
                    fontSize: 10.5,
                    color: "rgba(0,0,0,0.4)",
                    padding: "3px 10px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 20,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          <div
            className="mt-10 pt-8 flex items-start gap-5"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div
              className="shrink-0 rounded-full flex items-center justify-center font-display"
              style={{
                width: 44,
                height: 44,
                backgroundColor: "rgba(0,0,0,0.06)",
                fontSize: "1rem",
                color: "rgba(0,0,0,0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              {post.author.charAt(0)}
            </div>
            <div>
              <p
                className="font-display font-normal"
                style={{ fontSize: "0.95rem", letterSpacing: "-0.02em", color: "rgba(0,0,0,0.8)" }}
              >
                {post.author}
              </p>
              <p className="font-sans mt-1" style={{ fontSize: 11.5, color: "rgba(0,0,0,0.3)" }}>
                Real Estate Expert, Rajdhany Realtors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ RELATED ════════ */}
      {relatedPosts.length > 0 && (
        <>
          <div
            className="mx-8 sm:mx-12 lg:mx-20"
            style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)" }}
          />
          <div className="px-8 sm:px-12 lg:px-20 pt-16 pb-28 lg:pb-36">
            <span
              className="block font-sans uppercase mb-10"
              style={{ fontSize: 7.5, letterSpacing: "0.45em", color: "rgba(0,0,0,0.22)" }}
            >
              Further Reading
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </article>
  );
}
