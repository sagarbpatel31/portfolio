import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import type { BlogPost } from "@/types";

type LatestBlogPost = Pick<
  BlogPost,
  "slug" | "title" | "date" | "readingTime" | "tags"
>;

interface LatestBlogsProps {
  posts: LatestBlogPost[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function LatestBlogs({ posts }: LatestBlogsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="latest-writing" className="py-10 pb-16 sm:py-14 sm:pb-20">
      <Container>
        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="dash-card">
            <div className="dash-card-header">
              <span>latest_writing</span>
              <Link href="/blog" className="text-accent hover:text-accent-light">
                View archive
              </Link>
            </div>
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-5 transition-colors hover:bg-surface/50 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                    <span>·</span>
                    <span className="text-accent">{post.tags[0]}</span>
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <h2 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-accent sm:text-lg">
                      {post.title}
                    </h2>
                    <ArrowRight
                      size={15}
                      className="mt-1 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="dash-card flex flex-col border-accent/20 bg-gradient-to-br from-accent/10 via-card to-card">
            <div className="dash-card-header">
              <span>open_to_work</span>
              <span className="text-accent-green">available</span>
            </div>
            <div className="dash-card-body flex flex-1 flex-col justify-between gap-8 p-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Let&apos;s build something difficult
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  Need systems depth with end-to-end ownership?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  I&apos;m open to embedded, edge AI, robotics, physical AI, and
                  forward-deployed engineering roles.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-mono text-xs font-semibold text-background transition-colors hover:bg-accent-dim"
                >
                  <Mail size={14} aria-hidden="true" />
                  Email me
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-xs font-semibold text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  <Download size={14} aria-hidden="true" />
                  PDF resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
