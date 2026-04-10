"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { BlogPost } from "@/types";

interface BlogSectionProps {
  posts: BlogPost[];
}

export function Blog({ posts }: BlogSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="blog" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="mb-4 h-0.5 w-12 rounded-full bg-accent" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              writing
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Notes on systems, networking, and edge AI.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <motion.div key={post.slug} variants={fadeIn("up", 0)}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col transition-transform duration-200 group-hover:-translate-y-1">
                    <CardHeader>
                      <h3 className="font-semibold transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={12} aria-hidden="true" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={12} aria-hidden="true" />
                          {post.readingTime}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm leading-relaxed text-muted line-clamp-3">{post.excerpt}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="text-sm text-accent">
                      Read more
                      <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
