"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronDown, Medal, ExternalLink } from "lucide-react";
import { awards } from "@/content/awards";

interface HackathonGroup {
  event: string;
  year: string;
  wins: typeof awards;
}

function getProjectSlug(awardTitle: string): string {
  const lower = awardTitle.toLowerCase();
  if (lower.includes("hydraswarm")) return "hydraswarm";
  if (
    lower.includes("deeplake") ||
    lower.includes("nomadicml") ||
    lower.includes("data at scale") ||
    lower.includes("physical ai")
  )
    return "xg1";
  if (lower.includes("cyberwave") || lower.includes("toolhouse"))
    return "medassist";
  return "";
}

export function HackathonsCard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const grouped = awards.reduce<Record<string, HackathonGroup>>((acc, award) => {
    if (!acc[award.event]) {
      acc[award.event] = {
        event: award.event,
        year: award.year,
        wins: [],
      };
    }
    acc[award.event].wins.push(award);
    return acc;
  }, {});

  const groups = Object.values(grouped);

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span className="flex items-center gap-1.5">
          <Trophy size={11} className="text-accent-amber" />
          hackathons
        </span>
        <span className="text-accent-amber font-semibold">
          {groups.length} events · {awards.length} wins
        </span>
      </div>
      <div className="dash-card-body space-y-2">
        {groups.map((group) => {
          const isOpen = expanded === group.event;
          return (
            <div
              key={group.event}
              className="rounded border border-border/50 bg-surface/30 overflow-hidden transition-colors hover:border-accent/30"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : group.event)}
                className="w-full flex items-center gap-2 px-3 py-2.5 font-mono text-xs hover:bg-accent/5 transition-colors text-left"
              >
                <Medal
                  size={13}
                  className={`shrink-0 ${
                    group.wins.length > 1 ? "text-accent-amber" : "text-accent"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="truncate text-foreground font-semibold">
                    {group.event}
                  </div>
                  <div className="text-[10px] text-muted">
                    {group.wins.length} {group.wins.length === 1 ? "win" : "wins"}
                  </div>
                </div>
                <ChevronDown
                  size={13}
                  className={`text-muted shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden border-t border-border/50 bg-background/40"
                  >
                    <div className="px-3 py-3 space-y-3">
                      {group.wins.map((win) => {
                        const slug = getProjectSlug(win.title);
                        return (
                          <motion.div
                            key={win.title}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                            className="space-y-1.5 font-mono text-[11px]"
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-accent-amber shrink-0 mt-0.5">
                                ★
                              </span>
                              <span className="text-accent font-semibold leading-snug">
                                {win.title}
                              </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed pl-5">
                              {win.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pl-5 pt-1">
                              {slug && (
                                <Link
                                  href={`/projects/${slug}`}
                                  className="inline-flex items-center gap-1 rounded border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-accent hover:bg-accent/20 hover:border-accent/60 transition-all"
                                >
                                  view project →
                                </Link>
                              )}
                              {win.links?.map((link) => (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded border border-border bg-surface/50 px-2 py-0.5 text-[10px] text-muted-foreground hover:text-accent hover:border-accent/30 transition-all"
                                >
                                  {link.label}
                                  <ExternalLink size={8} />
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
