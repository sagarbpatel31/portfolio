"use client";

import { useState } from "react";
import { Menu, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/use-active-section";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { label: "Work", href: "#highlights" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const active = useActiveSection();

  const isActive = (href: string) => {
    const id = href.replace("#", "");
    return active === id;
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md"
        role="banner"
      >
        <nav
          className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label="Sagar Patel — Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 font-mono text-sm font-bold text-accent">
              SP
            </span>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              Sagar Patel
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons + mobile menu */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/sagarbpatel31"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/sagarp31"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
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
