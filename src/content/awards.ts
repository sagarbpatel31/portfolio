import { Award } from "@/types";

export const awards: Award[] = [
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
