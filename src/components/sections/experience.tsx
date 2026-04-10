"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { experiences } from "@/content/experience";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="experience" ref={ref} className="py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-10">
            <div className="mb-4 h-0.5 w-12 rounded-full bg-accent" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              work_experience
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Where I&apos;ve built systems and shipped code.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative mt-10 space-y-6 pl-6 before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
            {experiences.map((exp) => (
              <motion.div key={exp.company + exp.role} variants={fadeIn("up", 0)} className="relative">
                <div className="absolute -left-6 top-8 flex h-3 w-3 -translate-x-1/2 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.role}</h3>
                        <p className="font-medium text-accent">{exp.company}</p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-1 text-sm text-muted sm:items-end">
                        <span>{exp.period}</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} aria-hidden="true" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted">{exp.description}</p>
                    <ul
                      className="mb-4 space-y-2"
                      aria-label={`Highlights for ${exp.role} at ${exp.company}`}
                    >
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
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
