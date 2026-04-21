"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";

interface OutputLine {
  text: string;
  type: "input" | "output" | "accent" | "muted";
}

const COMMANDS: Record<string, () => OutputLine[]> = {
  help: () => [
    { text: "Available commands:", type: "accent" },
    { text: "  about       — Who I am", type: "output" },
    { text: "  skills      — Technical capabilities", type: "output" },
    { text: "  experience  — Deployment history", type: "output" },
    { text: "  projects    — Active processes", type: "output" },
    { text: "  contact     — Establish connection", type: "output" },
    { text: "  status      — System status", type: "output" },
    { text: "  resume      — Download resume", type: "output" },
    { text: "  clear       — Clear terminal", type: "output" },
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
  status: () => [
    { text: `System:   ONLINE`, type: "accent" },
    { text: `Status:   ${profile.status}`, type: "output" },
    { text: `Location: ${profile.location}`, type: "muted" },
  ],
  resume: () => {
    if (typeof window !== "undefined") {
      window.open("/resume.pdf", "_blank");
    }
    return [{ text: "Opening resume.pdf...", type: "accent" }];
  },
};

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
          <div key={i} className={colorMap[line.type]}>
            {line.text || "\u00A0"}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-accent-green mr-1">visitor@sagar-os:~$</span>
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
