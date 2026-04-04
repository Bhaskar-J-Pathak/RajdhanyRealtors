import { HeroSection } from "@/components/landing/hero-section";
import { PhilosophySection } from "@/components/landing/philosophy-section";
import { FeaturedSection } from "@/components/landing/featured-section";
import { ProcessSection } from "@/components/landing/process-section";
import { JournalSection } from "@/components/landing/journal-section";
import { CTASection } from "@/components/landing/cta-section";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const [featuredProperties, recentPosts] = await Promise.all([
    prisma.property.findMany({
      where: { featured: true, status: "available" },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        location: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        propertyType: true,
        images: true,
        status: true,
      },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        author: true,
        category: true,
        publishedAt: true,
      },
    }),
  ]);

  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <FeaturedSection properties={featuredProperties} />
      <ProcessSection />
      <JournalSection posts={recentPosts} />
      <CTASection />
    </>
  );
}
