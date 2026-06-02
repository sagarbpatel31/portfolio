"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileDown,
  MapPin,
  Target,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecruiterBookingLink } from "@/lib/contact";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/content/profile";

const proofPoints = [
  {
    icon: ShieldCheck,
    title: "Production systems across layers",
    text: "Embedded Linux, data plane networking, GPU inference, and multi-agent AI in one profile means less ramp time and fewer handoffs.",
  },
  {
    icon: Target,
    title: "Owns ambiguity end-to-end",
    text: "The work consistently spans architecture, implementation, debugging, and shipping. That matters when there is no clean spec to start from.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Built for high-ownership roles",
    text: "Strong fit for teams that need one engineer to move between product, system design, and execution without losing rigor.",
  },
];

export function HiringSignal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const scheduleLink = getRecruiterBookingLink(profile.name, profile.email);

  return (
    <section id="hiring" ref={ref} className="py-8 sm:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn("up", 0)} className="mb-6">
            <div className="section-bar mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              why_hire_me
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              A concise hiring case for teams that need systems depth and shipping speed.
            </p>
          </motion.div>

          <div className="grid gap-3 lg:grid-cols-3">
            <motion.div variants={fadeIn("up", 0)} className="dash-card lg:col-span-2">
              <div className="dash-card-header">
                <span>proof points</span>
                <span className="text-accent-green">systems-first</span>
              </div>
              <div className="dash-card-body grid gap-3 sm:grid-cols-3">
                {proofPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={point.title}
                      className="rounded-lg border border-border bg-surface/50 p-4"
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span className="rounded border border-accent/20 bg-accent/5 p-2 text-accent">
                          <Icon size={14} aria-hidden="true" />
                        </span>
                        <h3 className="font-semibold leading-snug text-foreground">
                          {point.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {point.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeIn("up", 0)} className="dash-card">
              <div className="dash-card-header">
                <span>open_to_work</span>
                <span className="text-accent-amber">available</span>
              </div>
              <div className="dash-card-body space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Best fit
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    Physical AI, Forward Deployed, Embedded Software, and Gen AI systems roles.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Location
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-foreground">
                    <MapPin size={13} className="text-accent" aria-hidden="true" />
                    {profile.location}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Preferred type
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {profile.openTo.slice(0, 4).map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {profile.status}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeIn("up", 0)} className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="dash-card">
              <div className="dash-card-header">
                <span>resume</span>
                <span className="text-accent">pdf</span>
              </div>
              <div className="dash-card-body space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  A compact resume for hiring teams that want the strongest signal fast. The
                  portfolio goes deeper, but this is the shortest path to the summary.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" className="font-mono text-xs bg-accent text-background hover:bg-accent-dim">
                    <a href={profile.resumeUrl} download>
                      <FileDown size={14} className="mr-1.5" aria-hidden="true" />
                      Download resume
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="font-mono text-xs">
                    <Link href="/projects">
                      View projects
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="font-mono text-xs">
                    <a href={scheduleLink}>
                      <ArrowUpRight size={14} className="mr-1.5" aria-hidden="true" />
                      Book intro call
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-header">
                <span>hire_signal</span>
                <span className="text-accent-green">direct</span>
              </div>
              <div className="dash-card-body">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-surface/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Role
                    </p>
                    <p className="mt-1 text-sm text-foreground">Systems & AI engineer</p>
                  </div>
                  <div className="rounded-lg border border-border bg-surface/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Proof
                    </p>
                    <p className="mt-1 text-sm text-foreground">Production shipping + hackathon wins</p>
                  </div>
                  <div className="rounded-lg border border-border bg-surface/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      Contact
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="mt-1 inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-light"
                    >
                      Email me
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
