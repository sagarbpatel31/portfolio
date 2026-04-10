"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Copy, Check, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/content/profile";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 sm:py-32">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-accent/[0.06]" />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeIn("up", 0)}>
            <div className="section-bar mx-auto mb-4" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              get_in_touch
            </h2>
            <p className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s build something{" "}
              <span className="text-gradient">that matters.</span>
            </p>
            <p className="mt-4 text-lg text-muted">
              Open to embedded, AI software, robotics, and edge AI opportunities.
              Available for collaboration and full-time roles.
            </p>
          </motion.div>

          {/* Email CTA */}
          <motion.div variants={fadeIn("up", 0)} className="mt-10">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="group shadow-lg shadow-accent/25">
                <a href={`mailto:${profile.email}`}>
                  <Mail size={18} className="mr-2" aria-hidden="true" />
                  Send an Email
                  <ArrowUpRight size={16} className="ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check size={18} className="mr-2 text-green-400" aria-hidden="true" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} className="mr-2" aria-hidden="true" />
                    Copy Email
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeIn("up", 0)} className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://github.com/sagarbpatel31"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-foreground"
            >
              <Github size={18} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/sagarp31"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-foreground"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
