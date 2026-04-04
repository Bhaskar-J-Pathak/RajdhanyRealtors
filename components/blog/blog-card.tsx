"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FALLBACK =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    author: string;
    category: string;
    publishedAt: Date | null;
  };
  index?: number;
}

function fmtDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date)
  );
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: EASE }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover */}
        <div
          className="relative overflow-hidden mb-4"
          style={{ borderRadius: 3, aspectRatio: "16/10" }}
        >
          <img
            src={post.coverImage || FALLBACK}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Category chip */}
          <div
            className="absolute top-3 left-3 font-sans uppercase"
            style={{
              fontSize: 6.5,
              letterSpacing: "0.38em",
              color: "rgba(255,255,255,0.72)",
              backgroundColor: "rgba(0,0,0,0.48)",
              padding: "4px 9px",
              borderRadius: 2,
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="font-sans" style={{ fontSize: 10.5, color: "rgba(0,0,0,0.22)" }}>
            {fmtDate(post.publishedAt)}
          </span>
          <span style={{ fontSize: 7, color: "rgba(0,0,0,0.14)" }}>·</span>
          <span className="font-sans" style={{ fontSize: 10.5, color: "rgba(0,0,0,0.22)" }}>
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-normal line-clamp-2 group-hover:opacity-60 transition-opacity duration-300 mb-2"
          style={{
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: "rgba(0,0,0,0.85)",
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="font-sans leading-relaxed line-clamp-2"
          style={{ fontSize: 12, color: "rgba(0,0,0,0.3)" }}
        >
          {post.excerpt}
        </p>
      </Link>
    </motion.div>
  );
}
