"use client";

import { X, Github, Linkedin, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";

const navLinks = [
  { label: "Work", href: "#highlights" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-lg md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-md p-2 text-muted transition-colors hover:text-foreground"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <motion.nav
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col items-center gap-6" role="list">
              {navLinks.map((link, index) => (
                <motion.li key={link.href} variants={fadeIn("up", index * 0.05)}>
                  <a
                    href={link.href}
                    className="text-2xl font-medium text-muted transition-colors hover:text-foreground"
                    onClick={onClose}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Social links */}
            <motion.div
              variants={fadeIn("up", 0)}
              className="mt-10 flex items-center gap-5"
            >
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
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
