import fs from "node:fs";
import path from "node:path";

const OUT_PATH = path.resolve("public/resume.pdf");
const resumeData = (await import("../src/content/resume-data.json", {
  with: { type: "json" },
})).default;

function esc(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'");
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function makePage(lines) {
  const ops = [];
  let y = 752;
  const add = (text, { x = 48, size = 10, font = "F1", gap = 14 } = {}) => {
    for (const line of wrapText(text, Math.max(24, Math.floor((510 - (x - 48)) / (size * 0.5))))) {
      ops.push(`BT /${font} ${size} Tf ${x} ${y} Td (${esc(line)}) Tj ET`);
      y -= gap;
    }
  };

  for (const item of lines) {
    if (item.type === "spacer") {
      y -= item.size ?? 8;
      continue;
    }
    if (item.type === "heading") {
      add(item.text, { size: item.size ?? 13, font: "F2", gap: item.gap ?? 16 });
      continue;
    }
    if (item.type === "subheading") {
      add(item.text, { size: item.size ?? 10, font: "F2", gap: item.gap ?? 14 });
      continue;
    }
    if (item.type === "bullet") {
      const bulletLines = wrapText(item.text, 78);
      bulletLines.forEach((line, index) => {
        add(index === 0 ? `- ${line}` : `  ${line}`, { x: 58, size: 9.5, font: "F1", gap: 12 });
      });
      continue;
    }
    if (item.type === "chips") {
      add(item.text, { size: item.size ?? 9, font: "F1", gap: item.gap ?? 12 });
      continue;
    }
    add(item.text, item.style);
  }
  if (y < 40) {
    throw new Error("Resume content exceeds the page margins.");
  }
  return ops;
}

const pages = [
  makePage([
    { type: "heading", text: resumeData.name, size: 24, gap: 25 },
    { type: "subheading", text: resumeData.title, size: 12, gap: 18 },
    { type: "text", text: `${resumeData.location} | ${resumeData.email}`, style: { size: 9.5, gap: 14 } },
    { type: "text", text: "sagar-os.vercel.app | github.com/sagarbpatel31 | linkedin.com/in/sagarp31", style: { size: 9.5, gap: 14 } },
    { type: "spacer", size: 9 },
    { type: "text", text: resumeData.shortBio, style: { size: 10, gap: 14 } },
    { type: "spacer", size: 12 },
    { type: "heading", text: "PROFESSIONAL EXPERIENCE", size: 12, gap: 22 },
    ...resumeData.experience.flatMap((job) => [
      { type: "subheading", text: `${job.role} - ${job.company}`, size: 10.5, gap: 15 },
      { type: "text", text: `${job.period} | ${job.location}`, style: { size: 9.5, gap: 15 } },
      ...job.bullets.map((bullet) => ({ type: "bullet", text: bullet })),
      { type: "spacer", size: 12 },
    ]),
  ]),
  makePage([
    { type: "subheading", text: resumeData.name, size: 13, gap: 20 },
    { type: "heading", text: "TECHNICAL SKILLS", size: 12, gap: 20 },
    ...resumeData.skills.flatMap((skill) => [
      { type: "subheading", text: skill.category, size: 10, gap: 13 },
      { type: "text", text: skill.items.join(", "), style: { size: 9.5, gap: 12 } },
      { type: "spacer", size: 3 },
    ]),
    { type: "spacer", size: 8 },
    { type: "heading", text: "SELECTED PROJECTS", size: 12, gap: 20 },
    ...resumeData.projects.flatMap((project) => [
      { type: "subheading", text: `${project.title} - ${project.category} (${project.year})`, size: 10, gap: 14 },
      { type: "text", text: project.summary, style: { size: 9.5, gap: 12 } },
      ...project.impact.map((item) => ({ type: "bullet", text: item })),
      { type: "spacer", size: 8 },
    ]),
    { type: "heading", text: "EDUCATION", size: 12, gap: 18 },
    ...resumeData.education.map((line) => ({ type: "bullet", text: line })),
    { type: "spacer", size: 8 },
    { type: "heading", text: "CERTIFICATIONS", size: 12, gap: 18 },
    ...resumeData.certifications.map((line) => ({ type: "bullet", text: line })),
  ]),
];

function buildPdf(pageOps) {
  const font1Id = 1;
  const font2Id = 2;
  const contentStartId = 3;
  const pageStartId = contentStartId + pageOps.length;
  const pagesId = pageStartId + pageOps.length;
  const catalogId = pagesId + 1;

  const objects = [
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`,
    `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`,
  ];

  for (const ops of pageOps) {
    const stream = ops.join("\n");
    objects.push(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`);
  }

  for (let i = 0; i < pageOps.length; i++) {
    const contentId = contentStartId + i;
    objects.push(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${font1Id} 0 R /F2 ${font2Id} 0 R >> >> /Contents ${contentId} 0 R >>`
    );
  }

  objects.push(
    `<< /Type /Pages /Kids [${Array.from({ length: pageOps.length }, (_, i) => `${pageStartId + i} 0 R`).join(" ")}] /Count ${pageOps.length} >>`
  );
  objects.push(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  const header = "%PDF-1.4\n";
  const xref = [];
  let offset = Buffer.byteLength(header, "utf8");
  let body = "";
  for (let i = 0; i < objects.length; i++) {
    xref.push(offset);
    const entry = `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
    body += entry;
    offset += Buffer.byteLength(entry, "utf8");
  }

  const xrefOffset = Buffer.byteLength(header + body, "utf8");
  const xrefTable = [
    "xref",
    `0 ${objects.length + 1}`,
    "0000000000 65535 f",
    ...xref.map((off) => `${String(off).padStart(10, "0")} 00000 n`),
    "trailer",
    `<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>`,
    "startxref",
    String(xrefOffset),
    "%%EOF",
  ].join("\n");

  return Buffer.from(header + body + xrefTable, "utf8");
}

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, buildPdf(pages));
console.log(`Wrote ${OUT_PATH}`);
