"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/content/profile";
import { Terminal } from "@/components/terminal";

const roles = [
  "Embedded Software",
  "AI Software",
  "Robotics",
  "Edge AI",
  "Gen AI",
  "Systems Programming",
];

const AVATAR_BLUR =
  "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQED/8QAHxAAAgICAQUAAAAAAAAAAAAAAQMCBAAREhQhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAaEQACAgMAAAAAAAAAAAAAAAAAEQECElFh/9oADAMBAAIRAxEAPwDezI9OGNAYwYhSsuNREBqOz5+DCaMpMOpjY9g5brpLnwX2AxnVPhJzo//Z";

function TypingRoles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentIndex];

    // Reached the full word — pause, then begin deleting.
    if (!isDeleting && displayed === current) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    // Finished deleting — advance to the next word after a short beat.
    if (isDeleting && displayed === "") {
      const next = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % roles.length);
      }, 400);
      return () => clearTimeout(next);
    }

    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, currentIndex]);

  return (
    <span className="text-accent glow-text">
      {displayed}
      <span className="animate-blink text-accent">|</span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="hero" ref={ref} className="relative py-8 lg:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start"
        >
          {/* Left: Profile info */}
          <motion.div variants={fadeIn("up", 0)} className="space-y-6">
            {/* Profile header */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-accent/30">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL={AVATAR_BLUR}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  <span className="text-foreground">Sagar </span>
                  <span className="text-gradient-cyan">Patel</span>
                </h1>
                <p className="font-mono text-xs text-muted-foreground mt-0.5">
                  {profile.title}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="inline-flex items-center gap-2 rounded border border-accent-green/20 bg-accent-green/5 px-3 py-1.5 font-mono text-xs text-accent-green">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
              </span>
              {profile.status}
            </div>

            {/* Typing role */}
            <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <span className="text-accent-green">$</span>
              <span className="text-muted">~/</span>
              <TypingRoles />
            </div>

            {/* Tagline */}
            <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
              {profile.tagline}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="font-mono text-xs bg-accent text-background hover:bg-accent-dim">
                <a href="#dashboard">
                  View Dashboard
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="font-mono text-xs">
                <a href={profile.resumeUrl} download>
                  <Download size={14} className="mr-1.5" aria-hidden="true" />
                  Resume
                </a>
              </Button>
              <a
                href="https://github.com/sagarbpatel31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:text-accent hover:border-accent/30"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>
              <a
                href="https://linkedin.com/in/sagarp31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:text-accent hover:border-accent/30"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right: Terminal */}
          <motion.div variants={fadeIn("up", 0.2)}>
            <Terminal />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
