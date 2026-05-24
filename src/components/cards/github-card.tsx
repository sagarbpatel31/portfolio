"use client";

import { useEffect, useState } from "react";
import { Github, Star, Users, GitFork } from "lucide-react";

interface GitHubStats {
  repos: number;
  followers: number;
  stars: number;
}

type GitHubResponse = GitHubStats | { error: true };

export function GitHubCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data: GitHubResponse) => {
        if ("error" in data) {
          setState("error");
        } else {
          setStats(data);
          setState("ready");
        }
      })
      .catch(() => setState("error"));
  }, []);

  const val = (n: number | undefined) =>
    state === "loading" ? "—" : state === "error" ? "n/a" : (n ?? 0).toString();

  return (
    <div className="dash-card h-full">
      <div className="dash-card-header">
        <span>github stats</span>
        <a
          href="https://github.com/sagarbpatel31"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent transition-colors hover:text-accent-light"
          aria-label="GitHub profile"
        >
          <Github size={12} />
        </a>
      </div>
      <div className="dash-card-body">
        <div className="grid grid-cols-3 gap-2 font-mono text-center">
          <div className="flex flex-col items-center gap-1">
            <GitFork size={13} className="text-muted" />
            <span className="text-2xl font-bold text-accent">
              {val(stats?.repos)}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              repos
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Star size={13} className="text-muted" />
            <span className="text-2xl font-bold text-accent-amber">
              {val(stats?.stars)}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              stars
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Users size={13} className="text-muted" />
            <span className="text-2xl font-bold text-accent-green">
              {val(stats?.followers)}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              followers
            </span>
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] text-muted">
          {state === "error" ? "stats unavailable" : "live · updated hourly"}
        </p>
      </div>
    </div>
  );
}
