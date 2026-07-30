import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogIndex } from "@/components/blog-index";
import { Container } from "@/components/ui/container";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description:
    "Practical notes from Sagar Patel on embedded systems, edge AI, robotics, networking, and multi-agent AI.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Engineering Notes | SAGAR_OS",
    description:
      "Practical notes on embedded systems, edge AI, robotics, networking, and multi-agent AI.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    readingTime: post.readingTime,
    tags: post.tags,
    excerpt: post.excerpt,
  }));

  return (
    <Container>
      <div className="py-8 pb-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          cd ~/home
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/writing — {posts.length} notes
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-foreground">Engineering </span>
            <span className="text-gradient-cyan">notes</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Short, practical writing on production systems, edge AI, robotics,
            networking, and agent reliability.
          </p>
        </div>

        <BlogIndex posts={posts} />
      </div>
    </Container>
  );
}
