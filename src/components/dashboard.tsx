"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { StatsCard } from "@/components/cards/stats-card";
import { ProcessCard } from "@/components/cards/process-card";
import { SkillsCard } from "@/components/cards/skills-card";
import { TimelineCard } from "@/components/cards/timeline-card";
import { ActivityCard } from "@/components/cards/activity-card";
import { EduCard } from "@/components/cards/edu-card";
import { ContactCard } from "@/components/cards/contact-card";
import { GitHubCard } from "@/components/cards/github-card";
import { HackathonsCard } from "@/components/cards/hackathons-card";

interface BlogEntry {
  slug: string;
  title: string;
  date: string;
}

export function Dashboard({ blogEntries }: { blogEntries: BlogEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="dashboard" ref={ref} className="py-8 pb-16">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section label */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              System Dashboard
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-3"
          >
            <StatsCard metric="31%" label="Throughput gain" source="Ciena" color="cyan" />
            <StatsCard metric="3" label="Hackathon wins" source="2 events" color="amber" />
            <StatsCard metric="4+" label="Years experience" source="Industry" color="green" />
            <StatsCard metric="8" label="Active projects" source="GitHub" color="cyan" />
          </motion.div>

          {/* Main grid */}
          <div className="grid gap-3 lg:grid-cols-3">
            {/* Process monitor — 2 cols */}
            <motion.div variants={fadeIn("up", 0)} className="lg:col-span-2">
              <ProcessCard />
            </motion.div>

            {/* Timeline — 1 col */}
            <motion.div variants={fadeIn("up", 0)}>
              <TimelineCard />
            </motion.div>
          </div>

          {/* Second row */}
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            {/* Skills — 2 cols */}
            <motion.div variants={fadeIn("up", 0)} className="lg:col-span-2">
              <SkillsCard />
            </motion.div>

            {/* Activity log + Hackathons stacked — 1 col */}
            <motion.div variants={fadeIn("up", 0)} className="space-y-3">
              <ActivityCard blogEntries={blogEntries} />
              <HackathonsCard />
            </motion.div>
          </div>

          {/* Third row */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Education */}
            <motion.div variants={fadeIn("up", 0)}>
              <EduCard />
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeIn("up", 0)}>
              <ContactCard />
            </motion.div>

            {/* GitHub live stats */}
            <motion.div variants={fadeIn("up", 0)} className="sm:col-span-2 lg:col-span-1">
              <GitHubCard />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
