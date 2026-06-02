"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { socials } from "@/content/socials";
import { cycleTheme } from "@/lib/theme";

interface OutputLine {
  text: string;
  type: "input" | "output" | "accent" | "muted";
}

function longestCommonPrefix(words: string[]): string {
  if (words.length === 0) return "";
  let prefix = words[0];
  for (const word of words.slice(1)) {
    while (!word.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

const COMMANDS: Record<string, () => OutputLine[]> = {
  help: () => [
    { text: "Available commands:", type: "accent" },
    { text: "  about       — Who I am", type: "output" },
    { text: "  skills      — Technical capabilities", type: "output" },
    { text: "  experience  — Deployment history", type: "output" },
    { text: "  projects    — Active processes", type: "output" },
    { text: "  contact     — Establish connection", type: "output" },
    { text: "  socials     — Social links", type: "output" },
    { text: "  status      — System status", type: "output" },
    { text: "  resume      — Download resume", type: "output" },
    { text: "  theme       — Cycle color theme", type: "output" },
    { text: "  neofetch    — System info (fancy)", type: "output" },
    { text: "  whoami      — Current user info", type: "output" },
    { text: "  ls          — List directory", type: "output" },
    { text: "  uname       — System info", type: "output" },
    { text: "  clear       — Clear terminal", type: "output" },
    { text: "", type: "output" },
    { text: "  tip: press Tab to autocomplete · ↑/↓ for history", type: "muted" },
  ],
  neofetch: () => [
    { text: "  *****    *    *****    *    **** ", type: "accent" },
    { text: "  *       * *   *       * *   *   *", type: "accent" },
    { text: "  ****   *****  *  **  *****  **** ", type: "accent" },
    { text: "      *  *   *  *   *  *   *  * *  ", type: "accent" },
    { text: "  *****  *   *  *****  *   *  *  **", type: "accent" },
    { text: "", type: "output" },
    { text: "", type: "output" },
    { text: "  sagar@sagar-os", type: "accent" },
    { text: "  --------------------------------", type: "muted" },
    { text: "  OS:        SAGAR_OS v1.0.0 (stable)", type: "output" },
    { text: "  Kernel:    Embedded Linux + AI Stack", type: "output" },
    { text: "  Shell:     bash 5.2.37 / zsh 5.9", type: "output" },
    { text: "  Arch:      x86_64 / ARM64 / Jetson Orin", type: "output" },
    { text: "  Languages: C / C++ / Python / Rust", type: "output" },
    { text: "  Stack:     CUDA · TensorRT · ROS2 · DPDK", type: "output" },
    { text: "  Uptime:    5y 10m (career mode)", type: "output" },
    { text: "  Location:  San Francisco Bay Area, CA", type: "output" },
    { text: "  Status:    Open to roles", type: "accent" },
  ],
  whoami: () => [
    { text: "visitor", type: "accent" },
    { text: "", type: "output" },
    { text: "You are exploring the SAGAR_OS portfolio terminal.", type: "muted" },
    { text: "Sagar Patel is the sysadmin. He built this.", type: "muted" },
  ],
  "ls": () => [
    { text: "total 8", type: "muted" },
    { text: "drwxr-xr-x  projects/", type: "accent" },
    { text: "drwxr-xr-x  experience/", type: "accent" },
    { text: "drwxr-xr-x  skills/", type: "accent" },
    { text: "-rw-r--r--  resume.pdf", type: "output" },
    { text: "-rw-r--r--  README.md", type: "output" },
    { text: "-r--------  .secrets  (nice try)", type: "muted" },
  ],
  "uname": () => [
    { text: "SAGAR_OS v1.0.0 (stable)", type: "accent" },
    { text: "Kernel: Embedded-Linux + AI-Stack", type: "output" },
    { text: "Arch:   x86_64 / ARM64 / Jetson Orin", type: "output" },
    { text: "Uptime: 5y 10m (career mode)", type: "muted" },
  ],
  about: () => [
    { text: profile.shortBio, type: "output" },
    { text: "", type: "output" },
    { text: `Location: ${profile.location}`, type: "muted" },
    { text: `Focus: ${profile.focusAreas.slice(0, 4).join(", ")}`, type: "muted" },
  ],
  skills: () => {
    const lines: OutputLine[] = [];
    skills.forEach((cat) => {
      lines.push({ text: `[${cat.category.toUpperCase()}]`, type: "accent" });
      lines.push({ text: `  ${cat.items.join(", ")}`, type: "output" });
    });
    return lines;
  },
  experience: () => {
    const lines: OutputLine[] = [];
    experiences.forEach((exp) => {
      const current = exp.period.includes("Present");
      lines.push({
        text: `${current ? "●" : "○"} ${exp.company} — ${exp.role}`,
        type: current ? "accent" : "output",
      });
      lines.push({ text: `  ${exp.period} | ${exp.location}`, type: "muted" });
    });
    return lines;
  },
  projects: () => {
    const lines: OutputLine[] = [];
    projects.forEach((p, i) => {
      const status = p.featured ? "● ACTIVE" : "○ IDLE";
      lines.push({
        text: `  ${String(i + 1).padStart(3, "0")}  ${p.title.split("—")[0].trim().padEnd(22)} ${status}`,
        type: p.featured ? "accent" : "output",
      });
    });
    return lines;
  },
  contact: () => [
    { text: `Email:    ${profile.email}`, type: "accent" },
    { text: `GitHub:   github.com/sagarbpatel31`, type: "output" },
    { text: `LinkedIn: linkedin.com/in/sagarp31`, type: "output" },
  ],
  socials: () =>
    socials.map((s) => ({
      text: `${s.name.padEnd(9)} ${s.url}`,
      type: "output" as const,
    })),
  theme: () => {
    const next = cycleTheme();
    return [
      { text: `theme → ${next}`, type: "accent" },
      { text: "cycle: cyan → amber → green → light", type: "muted" },
    ];
  },
  pwd: () => [{ text: "/home/visitor/sagar-os", type: "output" }],
  date: () => [{ text: new Date().toString(), type: "output" }],
  status: () => [
    { text: `System:   ONLINE`, type: "accent" },
    { text: `Status:   ${profile.status}`, type: "output" },
    { text: `Location: ${profile.location}`, type: "muted" },
  ],
  resume: () => {
    if (typeof window !== "undefined") {
      window.open("/resume", "_blank");
    }
    return [{ text: "Opening resume...", type: "accent" }];
  },
  // ── Easter eggs ──────────────────────────────────────
  "sudo hire sagar": () => [
    { text: "[sudo] password for recruiter:", type: "muted" },
    { text: "", type: "output" },
    { text: "✓ Access granted.", type: "accent" },
    { text: "✓ Redirecting to resume...", type: "accent" },
    { text: "", type: "output" },
    { text: "Just kidding — but seriously, let's talk.", type: "output" },
    { text: `→ ${profile.email}`, type: "accent" },
  ],
  "sudo": () => [
    { text: "visitor is not in the sudoers file.", type: "accent" },
    { text: "This incident will be reported.", type: "muted" },
    { text: "", type: "output" },
    { text: "Hint: try 'sudo hire sagar'", type: "muted" },
  ],
  "git log": () => [
    { text: "commit e33fa3a (HEAD -> main)", type: "accent" },
    { text: "Author: Sagar Patel <sagar@myjobemails.com>", type: "output" },
    { text: "Date:   ongoing", type: "muted" },
    { text: "    feat: keep shipping", type: "output" },
    { text: "", type: "output" },
    { text: "commit 439f979", type: "output" },
    { text: "    feat: 5+ years embedded systems + AI", type: "output" },
    { text: "", type: "output" },
    { text: "commit 0000001", type: "output" },
    { text: "    init: first line of code, age 14", type: "muted" },
  ],
  "ping": () => [
    { text: "PING sagar-os: 56 data bytes", type: "muted" },
    { text: "64 bytes: icmp_seq=0 ttl=64 time=0.42 ms", type: "output" },
    { text: "64 bytes: icmp_seq=1 ttl=64 time=0.38 ms", type: "output" },
    { text: "64 bytes: icmp_seq=2 ttl=64 time=0.41 ms", type: "output" },
    { text: "", type: "output" },
    { text: "→ sagar-os is alive and responding.", type: "accent" },
  ],
  "cat readme.md": () => [
    { text: "# Sagar Patel", type: "accent" },
    { text: "", type: "output" },
    { text: "Embedded software engineer who also ships AI.", type: "output" },
    { text: "Builds things from the silicon up.", type: "output" },
    { text: "", type: "output" },
    { text: "## Stack", type: "accent" },
    { text: "C / C++ / Python / Embedded Linux / CUDA / ROS2 / GenAI", type: "output" },
    { text: "", type: "output" },
    { text: "## Status", type: "accent" },
    { text: `${profile.status}`, type: "output" },
  ],
  "exit": () => [
    { text: "Nice try. The terminal does not quit.", type: "accent" },
    { text: "You are already inside the machine.", type: "muted" },
  ],
  "rm -rf /": () => [
    { text: "rm: permission denied: /", type: "accent" },
    { text: "The portfolio is immutable. Good try.", type: "muted" },
  ],
  "hello": () => [
    { text: "Hello! I'm SAGAR_OS.", type: "accent" },
    { text: "Type 'help' to see what I can do.", type: "output" },
  ],
  "hi": () => [
    { text: "Hey! Type 'help' to get started.", type: "accent" },
  ],
};

const COMPLETIONS = [
  "about", "skills", "experience", "projects", "contact", "socials",
  "status", "resume", "theme", "neofetch", "whoami", "ls", "uname",
  "pwd", "date", "ping", "clear", "help",
];

export function Terminal() {
  const [history, setHistory] = useState<OutputLine[]>([
    { text: "Welcome to SAGAR_OS. Type 'help' for available commands.", type: "accent" },
    { text: "", type: "output" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const inputLine: OutputLine = { text: `visitor@sagar-os:~$ ${cmd}`, type: "input" };

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      setCmdHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      return;
    }

    const handler = COMMANDS[cmd];
    if (handler) {
      const output = handler();
      setHistory((prev) => [...prev, inputLine, ...output, { text: "", type: "output" }]);
    } else {
      setHistory((prev) => [
        ...prev,
        inputLine,
        { text: `command not found: ${cmd}. Type 'help' for available commands.`, type: "muted" },
        { text: "", type: "output" },
      ]);
    }

    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const prefix = input.trim().toLowerCase();
      if (!prefix) return;
      const matches = COMPLETIONS.filter((c) => c.startsWith(prefix));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const common = longestCommonPrefix(matches);
        if (common.length > prefix.length) {
          setInput(common);
        } else {
          setHistory((prev) => [
            ...prev,
            { text: `visitor@sagar-os:~$ ${prefix}`, type: "input" },
            { text: matches.join("   "), type: "muted" },
            { text: "", type: "output" },
          ]);
        }
      }
    }
  };

  const colorMap: Record<string, string> = {
    input: "text-muted-foreground",
    output: "text-foreground",
    accent: "text-accent",
    muted: "text-muted",
  };

  return (
    <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-titlebar">
        <div className="terminal-dot bg-accent-rose/80" />
        <div className="terminal-dot bg-accent-amber/80" />
        <div className="terminal-dot bg-accent-green/80" />
        <span className="ml-2 text-[11px] text-muted">sagar-os — bash — 80×24</span>
      </div>
      <div ref={scrollRef} className="terminal-body">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre ${colorMap[line.type]}`}>
            {line.text || "\u00A0"}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <span className="text-accent-green whitespace-nowrap shrink-0">visitor@sagar-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-foreground outline-none caret-accent"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
