"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dash-card">
      <div className="dash-card-header">
        <span>establish connection</span>
      </div>
      <div className="dash-card-body space-y-3 font-mono text-sm">
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">
            <span className="text-accent-green">&gt;</span> ssh {profile.email}
          </span>
          <button
            onClick={copyEmail}
            className="rounded border border-border px-2 py-0.5 text-xs text-accent transition-colors hover:bg-accent/10"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center justify-between gap-2 rounded px-0 py-1 transition-colors hover:text-accent"
        >
          <span className="text-muted-foreground">
            <span className="text-accent-green">&gt;</span> mail --send
          </span>
          <span className="rounded border border-border px-2 py-0.5 text-xs text-accent">
            OPEN
          </span>
        </a>
        <a
          href="https://github.com/sagarbpatel31"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded px-0 py-1 transition-colors hover:text-accent"
        >
          <span className="text-muted-foreground">
            <span className="text-accent-green">&gt;</span> git clone github/sagarbpatel31
          </span>
          <span className="rounded border border-border px-2 py-0.5 text-xs text-accent">
            OPEN
          </span>
        </a>
        <a
          href="https://linkedin.com/in/sagarp31"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded px-0 py-1 transition-colors hover:text-accent"
        >
          <span className="text-muted-foreground">
            <span className="text-accent-green">&gt;</span> ping linkedin/sagarp31
          </span>
          <span className="rounded border border-border px-2 py-0.5 text-xs text-accent">
            OPEN
          </span>
        </a>
      </div>
    </div>
  );
}
