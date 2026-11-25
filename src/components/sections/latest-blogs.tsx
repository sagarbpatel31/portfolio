import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import type { BlogPost } from "@/types";

type SelectedBlogPost = Pick<
  BlogPost,
  "slug" | "title" | "date" | "readingTime" | "tags" | "excerpt"
>;

interface LatestBlogsProps {
  posts: SelectedBlogPost[];
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
  return (
    <section id="latest-writing" aria-labelledby="contact-title" className="py-9 sm:py-12">
      <Container>
        <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          {posts.length > 0 && <div className="dash-card">
            <div className="dash-card-header">
              <h2>Latest engineering notes</h2>
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
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                    <span>·</span>
                    <span className="text-accent">{post.tags[0]}</span>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>}

          <div className="flex flex-col rounded-xl border border-accent/20 bg-gradient-to-br from-accent/10 via-card to-card">
            <div className="flex flex-1 flex-col justify-center gap-6 p-6 sm:p-8">
              <div>
                <h2 id="contact-title" className="text-2xl font-bold tracking-tight">
                  Open to new opportunities
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  I&apos;m looking for firmware validation, embedded software, and edge AI or robotics roles.
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
