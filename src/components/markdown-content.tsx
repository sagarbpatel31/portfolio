"use client";

import { useMemo } from "react";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function parseInline(text: string): string {
  return escapeHtml(text).replace(
    /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g,
    (_match, code, label, href, bold, italic) => {
      if (code !== undefined) return `<code>${code}</code>`;
      if (href !== undefined) {
        if (!/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href)) return label;
        const external = /^https?:\/\//i.test(href);
        const attributes = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}"${attributes}>${label}</a>`;
      }
      if (bold !== undefined) return `<strong>${bold}</strong>`;
      return `<em>${italic}</em>`;
    }
  );
}

function parseTableRow(row: string): string[] {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderMarkdown(content: string): string {
  const segments = content.split(/(```[\s\S]*?```)/g);
  const htmlParts: string[] = [];

  for (const segment of segments) {
    // Code blocks
    if (segment.startsWith("```") && segment.endsWith("```")) {
      const inner = segment.slice(3, -3);
      const newlineIdx = inner.indexOf("\n");
      const lang = newlineIdx > 0 ? inner.slice(0, newlineIdx).trim() : "";
      const code = newlineIdx > 0 ? inner.slice(newlineIdx + 1) : inner;
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      htmlParts.push(
        `<pre class="bg-surface border border-border rounded-lg p-4 overflow-x-auto my-6"><code${lang ? ` data-language="${escapeHtml(lang)}"` : ""} class="text-sm font-mono text-foreground">${escaped}</code></pre>`
      );
      continue;
    }

    // Text sections - split by double newlines for paragraphs
    const blocks = segment.split(/\n\n+/);

    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      const lines = trimmed.split("\n").map((line) => line.trim());
      const isTable =
        lines.length >= 2 &&
        lines[0].includes("|") &&
        /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(lines[1]);

      // Tables
      if (isTable) {
        const headers = parseTableRow(lines[0]);
        const rows = lines.slice(2).map(parseTableRow);
        const headerHtml = headers
          .map(
            (header) =>
              `<th class="border-b border-border bg-surface px-3 py-2 text-left font-mono text-xs text-foreground">${parseInline(header)}</th>`
          )
          .join("");
        const bodyHtml = rows
          .map(
            (row) =>
              `<tr>${row
                .map(
                  (cell) =>
                    `<td class="border-b border-border/70 px-3 py-2 align-top text-sm text-muted-foreground">${parseInline(cell)}</td>`
                )
                .join("")}</tr>`
          )
          .join("");

        htmlParts.push(
          `<div class="my-6 overflow-x-auto rounded-lg border border-border"><table class="w-full border-collapse"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`
        );
      }
      // Headings
      else if (trimmed.startsWith("### ")) {
        htmlParts.push(
          `<h3 class="text-xl font-semibold mt-10 mb-4">${parseInline(trimmed.slice(4))}</h3>`
        );
      } else if (trimmed.startsWith("## ")) {
        htmlParts.push(
          `<h2 class="text-2xl font-bold mt-12 mb-4">${parseInline(trimmed.slice(3))}</h2>`
        );
      } else if (trimmed.startsWith("# ")) {
        htmlParts.push(
          `<h1 class="text-3xl font-bold mt-12 mb-6">${parseInline(trimmed.slice(2))}</h1>`
        );
      }
      // Blockquotes
      else if (trimmed.startsWith("> ")) {
        const quoteLines = trimmed
          .split("\n")
          .map((line) => line.replace(/^>\s?/, ""))
          .join("\n");
        htmlParts.push(
          `<blockquote class="border-l-2 border-accent pl-4 my-6 whitespace-pre-line text-muted-foreground italic">${parseInline(quoteLines)}</blockquote>`
        );
      }
      // Unordered lists
      else if (/^[-*]\s/.test(trimmed)) {
        const items = trimmed
          .split("\n")
          .filter((line) => /^[-*]\s/.test(line.trim()))
          .map(
            (line) =>
              `<li class="text-muted-foreground leading-relaxed">${parseInline(line.trim().replace(/^[-*]\s/, ""))}</li>`
          )
          .join("");
        htmlParts.push(
          `<ul class="list-disc list-inside space-y-2 my-4 ml-2">${items}</ul>`
        );
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(trimmed)) {
        const items = lines
          .filter((line) => /^\d+\.\s/.test(line))
          .map(
            (line) =>
              `<li class="text-muted-foreground leading-relaxed">${parseInline(line.replace(/^\d+\.\s/, ""))}</li>`
          )
          .join("");
        htmlParts.push(
          `<ol class="list-decimal list-inside space-y-2 my-4 ml-2">${items}</ol>`
        );
      }
      // Horizontal rule
      else if (/^---+$/.test(trimmed)) {
        htmlParts.push(
          `<hr class="border-border my-8" />`
        );
      }
      // Regular paragraph
      else {
        htmlParts.push(
          `<p class="whitespace-pre-line text-muted-foreground leading-relaxed my-4">${parseInline(trimmed)}</p>`
        );
      }
    }
  }

  return htmlParts.join("");
}

export function MarkdownContent({ content }: { content: string }) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  return <div className="prose max-w-none text-base" dangerouslySetInnerHTML={{ __html: html }} />;
}
