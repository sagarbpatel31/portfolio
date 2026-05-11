"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { Send } from "lucide-react";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactCard() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="dash-card h-full">
      <div className="dash-card-header">
        <span>establish connection</span>
        <button
          onClick={copyEmail}
          className="font-mono text-[10px] text-accent transition-colors hover:text-accent-light"
        >
          {copied ? "EMAIL COPIED ✓" : `ssh ${profile.email}`}
        </button>
      </div>

      <div className="dash-card-body">
        {status === "sent" ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6 font-mono text-center">
            <span className="text-2xl text-accent-green">✓</span>
            <span className="text-sm text-accent-green">TRANSMISSION SENT</span>
            <span className="text-xs text-muted">Will respond within 24h.</span>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-xs text-accent underline underline-offset-2"
            >
              send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2 font-mono text-sm">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                  name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full rounded border border-border bg-surface px-2 py-1.5 text-xs text-foreground outline-none placeholder:text-muted focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                  email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@domain.com"
                  className="w-full rounded border border-border bg-surface px-2 py-1.5 text-xs text-foreground outline-none placeholder:text-muted focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted">
                message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="What are you building? Let's talk."
                rows={3}
                className="w-full resize-none rounded border border-border bg-surface px-2 py-1.5 text-xs text-foreground outline-none placeholder:text-muted focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                required
              />
            </div>
            {status === "error" && (
              <p className="text-xs text-accent-rose">
                Transmission failed — try email directly.
              </p>
            )}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex gap-3 text-xs text-muted">
                <a
                  href="https://github.com/sagarbpatel31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  github ↗
                </a>
                <a
                  href="https://linkedin.com/in/sagarp31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  linkedin ↗
                </a>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex items-center gap-1.5 rounded border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/20 disabled:opacity-50"
              >
                <Send size={10} />
                {status === "sending" ? "SENDING..." : "TRANSMIT"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
