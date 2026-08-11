import { Award } from "@/types";

export const awards: Award[] = [
  {
    title: "HydraDB Docs Winner - Retrieval Quality Evaluation Lab",
    event: "Hack into HydraDB Docs",
    year: "2026",
    description:
      "Selected as one of 10 winners for PR #184, a deterministic HydraDB v2 retrieval-quality evaluator that turns tuning into measurable release gates. The contribution added Hit@K, source Recall@K, MRR@K, latency percentiles, profile comparison, a fictional golden corpus, live sandbox evidence, and 31 passing Node.js tests.",
    links: [
      { label: "PR #184", url: "https://github.com/usecortex/mintlify-docs/pull/184" },
      { label: "Event", url: "https://luma.com/5swfnpjk" },
    ],
  },
  {
    title: "Top-10 Winner - HydraDB Ingestion Write-Safety Audit",
    event: "Break into HydraDB: BugBounty Week",
    year: "2026",
    description:
      "Placed in the top 10 among more than 20 submissions. Built a bounded, reproducible audit and documented ingestion write-safety failures around upsert semantics and 0-byte or empty-success paths, plus indexed JSON projection/filter corruption and a tenant-readiness race. The report focused on clear reproduction steps and the data-integrity impact of silent success.",
    links: [
      { label: "Event", url: "https://luma.com/0bxv1xmc" },
    ],
  },
  {
    title: "Physical AI & Robotics: Data at Scale — Best Overall Use of DeepLake",
    event: "Intelligence at the Frontier Hackathon 2026",
    year: "2026",
    description:
      "Won for XG1 — a rapid-iteration humanoid robot pipeline built in 2 days for the Unitree G1. Used DeepLake to store and stream Lightwheel's G1 beverage organization data with efficient tensor storage for fast I/O fine-tuning under tight time constraints. The data pipeline enabled GR00T policy fine-tuning that wouldn't have been possible with conventional storage.",
    links: [
      { label: "Hackathon", url: "https://intelligence-at-the-frontier-hackathon.devspot.app/?activeTab=challenges&challenge=484" },
      { label: "DeepLake", url: "https://www.deeplake.ai/" },
    ],
  },
  {
    title: "Physical AI & Robotics by NomadicML — New Project Winner",
    event: "Intelligence at the Frontier Hackathon 2026",
    year: "2026",
    description:
      "Won for XG1's humanoid robot pipeline. Used Nomadic AI as a diagnostic layer to pinpoint failure modes in the fine-tuned GR00T agent's reasoning — identifying why specific task instructions failed and creating a clear improvement path. Combined immersive Meta Quest 3 + MuJoCo teleop with robust MLOps for a fast-track humanoid robot learning workflow.",
    links: [
      { label: "Hackathon", url: "https://intelligence-at-the-frontier-hackathon.devspot.app/?activeTab=challenges&challenge=484" },
      { label: "NomadicML", url: "https://nomadic.ai" },
    ],
  },
  {
    title: "Hackathon Winner — HydraSwarm",
    event: "a fun hack day (promise) — Virtual / Discord",
    year: "2026",
    description:
      "Won for HydraSwarm — a 7-agent software engineering company where every agent queries HydraDB before acting and stores lessons back after. Run a task once, score 7/10. Run a similar task again and agents recall what went wrong the first time — score goes up. Used 7 distinct HydraDB capabilities including knowledge ingestion, sub-tenants per agent, shared org memory, hybrid recall, graph relations, and inference. 325 unit tests across 21 suites.",
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/HydraSwarm" },
      { label: "Event", url: "https://luma.com/uv13n64x?tk=wjHDI0" },
    ],
  },
];
