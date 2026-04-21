"use client";

import { X, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const navLinks = [
  { label: "/home", href: "#hero" },
  { label: "/dashboard", href: "#dashboard" },
  { label: "/resume", href: "/resume.pdf" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-14 items-center justify-between px-4">
            <span className="font-mono text-xs font-medium text-foreground tracking-wider">
              SAGAR<span className="text-accent">_</span>OS
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-muted transition-colors hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center gap-6 px-4 pt-16">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                variants={fadeIn("up", 0)}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="font-mono text-2xl text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </motion.a>
            ))}

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://github.com/sagarbpatel31"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-accent"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/sagarp31"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-accent"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:sagar@myjobemails.com"
                className="text-muted-foreground transition-colors hover:text-accent"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
