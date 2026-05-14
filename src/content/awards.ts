import { Award } from "@/types";

export const awards: Award[] = [
  {
    title: "Best Overall Use of DeepLake",
    event: "Intelligence at the Frontier Hackathon 2026",
    year: "2026",
    description:
      "Built HydraSwarm — a self-improving multi-agent AI system where 7 specialized agents (PM, Architect, Developer, Reviewer, QA, SRE, CTO) collaborate on software engineering tasks with institutional memory via HydraDB powered by DeepLake. Scores improved measurably each run: Run 1 → 7/10, Run 2 → 8/10, Run 3 → 9/10. Featured live agent thinking logs, SSE streaming, and run comparison views. 326 unit tests across 21 suites.",
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/HydraSwarm" },
      { label: "Hackathon", url: "https://dorahacks.io/hackathon/intelligence-at-the-frontier" },
    ],
  },
  {
    title: "Physical AI & Robotics Track Winner — NomadicML",
    event: "Intelligence at the Frontier Hackathon 2026",
    year: "2026",
    description:
      "Built a rapid-iteration humanoid robot pipeline for the Unitree G1 in 36 hours. Stack: Meta Quest 3 + MuJoCo for intuitive teleoperation, NVIDIA Sonic for low-latency control commands, DeepLake for high-throughput tensor storage of demonstration data, and NVIDIA GR00T for fine-tuning locomotion policies. Used Nomadic AI to diagnose failure modes in walking and pick-and-place tasks. Competed against 150–200 curated builders for a $26,750+ prize pool.",
    links: [
      { label: "Hackathon", url: "https://dorahacks.io/hackathon/intelligence-at-the-frontier" },
      { label: "NomadicML", url: "https://nomadic.ai" },
    ],
  },
  {
    title: "Cyberwave × Toolhouse Track Winner",
    event: "Robotic Agents Hackathon, March 2026",
    year: "2026",
    description:
      "Built MedAssist — an AI-powered medication verification and dispensing agent that closes the full sense-reason-act loop. The SO-101 robot arm camera identifies each vial (drug name, dosage, expiry, position) via Claude Vision. A Toolhouse agent runs a 10-check safety sequence against the patient record. ElevenLabs provides real-time voice narration of every dispensing action. Addresses the 1.5M annual US medication error problem with autonomous AI-robotic verification.",
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/med-assist" },
      { label: "Devpost", url: "https://devpost.com/software/medassist" },
    ],
  },
];
