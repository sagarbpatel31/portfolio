import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border/70 py-14 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-green/20 bg-accent-green/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-green">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
            </span>
            Open to high-ownership engineering roles
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent">
            Sagar Patel · Systems &amp; AI Engineer
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.03] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl">
            I build the software between{" "}
            <span className="text-gradient-cyan">hardware and intelligence.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Embedded Linux, high-performance networking, edge AI, and robotics,
            owned from low-level implementation through production behavior.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-mono text-xs font-semibold text-background transition-colors hover:bg-accent-dim"
            >
              View selected work
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-4 py-2.5 font-mono text-xs font-semibold text-foreground transition-colors hover:border-accent/30 hover:text-accent"
            >
              <Download size={14} aria-hidden="true" />
              Resume
            </Link>
            <a
              href="https://github.com/sagarbpatel31"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent sm:inline-flex"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com/in/sagarp31"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center rounded-md border border-border p-2.5 text-muted-foreground transition-colors hover:border-accent/30 hover:text-accent sm:inline-flex"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            <span>Ciena</span>
            <span>Cisco</span>
            <span>TCS</span>
            <span>4+ years in production systems</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
