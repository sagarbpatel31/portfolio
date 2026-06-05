"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { stackMap } from "@/content/hiring";

export function StackMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="stack-map" ref={ref} className="py-8 sm:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-6">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              stack_map
            </h2>
            <p className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              The profile, grouped the way technical reviewers actually evaluate it.
            </p>
          </motion.div>

          <div className="grid gap-3 lg:grid-cols-5">
            {stackMap.map((group) => (
              <motion.div key={group.domain} variants={fadeIn("up", 0)} className="dash-card">
                <div className="dash-card-header">
                  <span>{group.domain}</span>
                  <span>{group.items.length}</span>
                </div>
                <div className="dash-card-body space-y-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{group.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
