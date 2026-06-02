import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
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
  const latestPost = posts[0];
  const topicCounts = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      topicCounts.set(tag, (topicCounts.get(tag) ?? 0) + 1);
    });
  });
  const popularTopics = [...topicCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <Container>
      <div className="py-8">
        {/* Back link */}
        <Link
          href="/#dashboard"
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

        {latestPost && (
          <section className="mb-8 grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
            <Link
              href={`/blog/${latestPost.slug}`}
              className="dash-card group flex h-full flex-col transition-colors hover:border-accent/30"
            >
              <div className="dash-card-body flex h-full flex-col gap-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                  <span className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 text-accent">
                    Latest note
                  </span>
                  <span>{latestPost.readingTime}</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                    {latestPost.title}
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {latestPost.excerpt}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-[11px] font-mono text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} aria-hidden="true" />
                    {new Date(latestPost.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {latestPost.readingTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-accent">
                  Read latest post
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <div className="dash-card">
              <div className="dash-card-header">
                <span>Archive signals</span>
                <span>{posts.length} posts</span>
              </div>
              <div className="dash-card-body space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Popular topics
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {popularTopics.map(([tag, count]) => (
                      <span
                        key={tag}
                        className="rounded border border-border bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag} · {count}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-surface/40 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Reading map
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Start with the latest post, then filter by topic when you want a deeper
                    systems, edge AI, or robotics thread.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <BlogIndex posts={posts} />
      </div>
    </Container>
  );
}
