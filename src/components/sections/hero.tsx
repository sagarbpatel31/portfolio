"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Terminal, ChevronDown, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/content/profile";

const roles = [
  "Embedded Software",
  "AI Software",
  "Robotics",
  "Edge AI",
  "Gen AI",
  "Systems Programming",
];

function TypingRoles() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[currentIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayed === current) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % roles.length);
      return;
    }

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
    <span className="text-accent">
      {displayed}
      <span className="animate-blink text-accent">|</span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const [firstName, lastName] = profile.name.split(" ");

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="bg-grid pointer-events-none absolute inset-0" />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float absolute inset-0 rounded-full bg-accent/10 blur-[160px]" />
        <div className="animate-float-delayed absolute inset-20 rounded-full bg-accent/8 blur-[120px]" />
        <div className="animate-float absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-light/5 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          {/* Profile photo */}
          <motion.div variants={fadeIn("up", 0)} className="mb-6">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-accent/30 shadow-lg shadow-accent/10 sm:h-32 sm:w-32">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>{profile.status}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeIn("up", 0)}
            className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl"
          >
            <span className="text-foreground">{firstName}</span>{" "}
            <span className="text-gradient">{lastName}</span>
          </motion.h1>

          {/* Typing role animation */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="mt-5 flex items-center gap-2 font-mono text-base text-muted-foreground sm:text-lg"
          >
            <Terminal size={16} className="text-accent" aria-hidden="true" />
            <span className="text-muted-foreground">~/</span>
            <TypingRoles />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeIn("up", 0)}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" className="group">
              <a href="#highlights">
                See My Work
                <ChevronDown size={16} className="ml-1 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.resumeUrl} download>
                <Download size={18} className="mr-2" aria-hidden="true" />
                Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Let&apos;s Talk</a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeIn("up", 0)}
            className="mt-10 flex items-center gap-1"
          >
            <a
              href="https://github.com/sagarbpatel31"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/sagarp31"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#highlights"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block rounded-full p-2 text-muted transition-colors hover:text-accent"
        >
          <ChevronDown size={24} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
