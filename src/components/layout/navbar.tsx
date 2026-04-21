"use client";

import { useState } from "react";
import { Menu, Github, Linkedin } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/90 backdrop-blur-md"
        role="banner"
      >
        <nav
          className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="SAGAR_OS — Back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded border border-accent/30 bg-accent/10 font-mono text-xs font-bold text-accent">
              S
            </span>
            <span className="font-mono text-xs font-medium text-foreground tracking-wider">
              SAGAR<span className="text-accent">_</span>OS
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex font-mono text-xs" role="list">
            <li>
              <a href="#hero" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-accent">
                /home
              </a>
            </li>
            <li>
              <a href="#dashboard" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-accent">
                /dashboard
              </a>
            </li>
            <li>
              <a href="/resume.pdf" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-accent" download>
                /resume
              </a>
            </li>
          </ul>

          {/* Social icons + mobile menu */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/sagarbpatel31"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/sagarp31"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:text-foreground md:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}
