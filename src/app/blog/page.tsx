import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/container";
import { BlogIndex } from "@/components/blog-index";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on embedded systems, edge AI, robotics, networking, and multi-agent AI — from silicon to production.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog | SAGAR_OS",
    description:
      "Notes on embedded systems, edge AI, robotics, networking, and multi-agent AI.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    readingTime: p.readingTime,
    tags: p.tags,
    excerpt: p.excerpt,
  }));

  return (
    <Container>
      <div className="py-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} />
          cd ~/dashboard
        </Link>

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/blog — {posts.length} entries
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-foreground">Notes on </span>
            <span className="text-gradient-cyan">systems &amp; AI</span>
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Embedded · edge AI · robotics · networking · multi-agent systems
          </p>
        </div>

        <BlogIndex posts={posts} />
      </div>
    </Container>
  );
}
