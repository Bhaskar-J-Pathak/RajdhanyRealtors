"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  category: string;
  publishedAt: Date | null;
}

interface JournalSectionProps {
  posts: BlogPost[];
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/* ═══════════════════════════════════════════
   JOURNAL SECTION
   ═══════════════════════════════════════════ */
export function JournalSection({ posts }: JournalSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  if (!posts || posts.length === 0) return null;

  const [primary, ...rest] = posts;
  const secondary = rest.slice(0, 2);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Grain */}
      <div
        className="hero-grain absolute inset-0 pointer-events-none z-[1]"
        style={{ opacity: 0.025 }}
      />

      <div className="relative z-10 px-8 sm:px-12 lg:px-20 pt-20 pb-24 lg:pt-28 lg:pb-36">

        {/* ════════ HEADER ════════ */}
        <div className="flex items-end justify-between mb-14 lg:mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="block font-sans uppercase"
              style={{
                fontSize: 7.5,
                letterSpacing: "0.45em",
                color: "rgba(0,0,0,0.22)",
                marginBottom: 14,
              }}
            >
              From the Journal
            </motion.span>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              >
                <h2
                  className="font-display font-normal"
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
                    letterSpacing: "-0.03em",
                    color: "rgba(0,0,0,0.85)",
                    lineHeight: 1.05,
                  }}
                >
                  Perspectives on
                  <br />
                  <span className="italic">living well</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <Link href="/blog" className="group inline-flex items-center gap-2.5">
              <span
                className="font-sans uppercase group-hover:text-black/60 transition-colors duration-300"
                style={{ fontSize: 7.5, letterSpacing: "0.35em", color: "rgba(0,0,0,0.28)" }}
              >
                All Entries
              </span>
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-[3px]"
                style={{ fontSize: 11, color: "rgba(0,0,0,0.22)" }}
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ════════ MAGAZINE LAYOUT ════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-10 items-start">

          {/* Primary article */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          >
            <Link href={`/blog/${primary.slug}`} className="group block">
              {/* Cover */}
              <div
                className="relative overflow-hidden mb-6"
                style={{ height: "clamp(240px, 42vh, 460px)", borderRadius: 3 }}
              >
                <img
                  src={primary.coverImage}
                  alt={primary.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Category chip */}
                <div
                  className="absolute top-4 left-4 font-sans uppercase"
                  style={{
                    fontSize: 6.5,
                    letterSpacing: "0.38em",
                    color: "rgba(255,255,255,0.7)",
                    backgroundColor: "rgba(0,0,0,0.48)",
                    padding: "5px 10px",
                    borderRadius: 2,
                  }}
                >
                  {primary.category}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-sans"
                  style={{ fontSize: 10.5, color: "rgba(0,0,0,0.22)" }}
                >
                  {formatDate(primary.publishedAt)}
                </span>
                <span style={{ fontSize: 8, color: "rgba(0,0,0,0.12)" }}>·</span>
                <span
                  className="font-sans"
                  style={{ fontSize: 10.5, color: "rgba(0,0,0,0.22)" }}
                >
                  {primary.author}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display font-normal group-hover:opacity-65 transition-opacity duration-300 mb-3"
                style={{
                  fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
                  letterSpacing: "-0.025em",
                  color: "rgba(0,0,0,0.85)",
                  lineHeight: 1.12,
                }}
              >
                {primary.title}
              </h3>

              {/* Excerpt */}
              <p
                className="font-sans leading-relaxed"
                style={{ fontSize: 12.5, color: "rgba(0,0,0,0.3)" }}
              >
                {primary.excerpt}
              </p>
            </Link>
          </motion.div>

          {/* Secondary articles */}
          {secondary.length > 0 && (
            <div className="flex flex-col gap-0">
              {secondary.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: EASE }}
                  style={{
                    paddingTop: i > 0 ? "1.5rem" : 0,
                    paddingBottom: "1.5rem",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Link href={`/blog/${post.slug}`} className="group flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{ width: 84, height: 68, borderRadius: 2 }}
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span
                        className="block font-sans uppercase mb-1.5"
                        style={{ fontSize: 6.5, letterSpacing: "0.38em", color: "rgba(0,0,0,0.2)" }}
                      >
                        {post.category}
                      </span>
                      <h4
                        className="font-display font-normal group-hover:opacity-60 transition-opacity duration-300"
                        style={{
                          fontSize: "0.92rem",
                          letterSpacing: "-0.02em",
                          color: "rgba(0,0,0,0.82)",
                          lineHeight: 1.2,
                        }}
                      >
                        {post.title}
                      </h4>
                      <p
                        className="font-sans mt-1.5"
                        style={{ fontSize: 10.5, color: "rgba(0,0,0,0.22)" }}
                      >
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
