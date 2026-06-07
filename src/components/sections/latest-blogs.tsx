"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { BlogPost } from "@/types";

type LatestBlogPost = Pick<
  BlogPost,
  "slug" | "title" | "date" | "readingTime" | "tags" | "excerpt"
>;

interface LatestBlogsProps {
  posts: LatestBlogPost[];
}

export function LatestBlogs({ posts }: LatestBlogsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (posts.length === 0) {
    return null;
  }

  const [latestPost, ...otherPosts] = posts;

  return (
    <section id="latest-blogs" ref={ref} className="py-8 sm:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-6">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              latest_blogs
            </h2>
            <p className="mt-2 max-w-3xl text-xl font-bold tracking-tight sm:text-2xl">
              Recent writing on systems, edge AI, networking, and multi-agent work.
            </p>
          </motion.div>

          <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
            <motion.div variants={fadeIn("up", 0)} className="dash-card overflow-hidden">
              <Link
                href={`/blog/${latestPost.slug}`}
                className="group block h-full transition-colors hover:border-accent/30"
              >
                <div className="dash-card-body flex h-full flex-col gap-4 bg-gradient-to-br from-accent/10 via-transparent to-transparent">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                    <span className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 text-accent">
                      Latest note
                    </span>
                    <span>{latestPost.readingTime}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                      {latestPost.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {latestPost.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {latestPost.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
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
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={fadeIn("up", 0)} className="space-y-3">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group dash-card block overflow-hidden transition-colors hover:border-accent/30"
                >
                  <div className="dash-card-body space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                      <span>{new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                href="/blog"
                className="inline-flex items-center gap-1 px-1 text-sm text-accent transition-colors hover:text-accent-light"
              >
                Browse all writing
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
