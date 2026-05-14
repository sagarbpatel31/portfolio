"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { awards } from "@/content/awards";

export function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="awards" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="mb-4 h-0.5 w-12 rounded-full bg-accent" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              achievements
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Competitions and recognitions.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {awards.map((award) => (
              <motion.div key={award.title} variants={fadeIn("up", 0)}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Trophy size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <h3 className="font-semibold">{award.title}</h3>
                        <p className="text-sm text-muted">
                          {award.event} &middot; {award.year}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted">{award.description}</p>
                    {award.links && award.links.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {award.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10"
                          >
                            {link.label}
                            <ExternalLink size={9} />
                          </a>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
