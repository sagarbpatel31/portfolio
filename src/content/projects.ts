import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "stepahead",
    title: "StepAhead — AI Baby Motor Development Tracker",
    tagline: "Peace of mind every step of the way — AI-powered infant motor milestone tracking with real-time movement analysis.",
    description:
      "StepAhead is a mobile AI platform that analyzes infant motor movements in real time, tracking developmental milestones, detecting potential delays early, and enabling parents to share findings with medical professionals.",
    longDescription: `StepAhead addresses a critical gap in early childhood healthcare: developmental motor delays often go undetected until they become harder to treat. Traditional milestone tracking relies on memory and periodic pediatric visits — StepAhead gives parents continuous, AI-powered visibility into their baby's motor development between appointments.

The core workflow is Record → Analyze → Track. Parents record video of their baby's movements through the mobile app. The AI model processes the footage in real time, classifying motor patterns against developmental milestone benchmarks calibrated for the baby's age. Results surface as a structured milestone dashboard with progress trends over time.

The analysis engine detects subtle patterns that are difficult for non-specialists to spot — asymmetric limb usage, delayed reflex responses, atypical muscle tone indicators — and flags them for review. Parents can share the full analysis report directly with their pediatrician or specialist, with exportable timeline views and movement data.

StepAhead is built around three principles: accessible (no specialist equipment needed, just a smartphone), continuous (not just snapshot assessments), and collaborative (designed to enhance, not replace, professional care).`,
    tags: ["Mobile App", "Computer Vision", "AI", "React Native", "Healthcare"],
    category: "AI & Health Tech",
    highlights: [
      "Real-time AI movement analysis using smartphone camera — no specialized equipment required",
      "Developmental milestone benchmarks calibrated by age for accurate motor delay detection",
      "Progress tracking dashboard with trend visualization over weeks and months",
      "Shareable reports for pediatricians and specialists with full movement timeline",
      "Flags asymmetric limb usage, delayed reflexes, and atypical muscle tone patterns",
    ],
    links: [
      { label: "Live Demo", url: "https://step-ahead-website.vercel.app" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "fieldfix",
    title: "FieldFix — Offline AI Repair Assistant for Field Technicians",
    tagline: "Full AI-powered repair guidance with zero cloud dependency — runs entirely on a local laptop, accessible from any device on the network.",
    description:
      "FieldFix is an offline-first repair intelligence system for field technicians. A FastAPI backend runs Gemma 3 4B locally via Ollama, backed by a RAG knowledge base of 295 expert-written repair documents. Accessible from phones and tablets over local WiFi — no internet required.",
    longDescription: `FieldFix was built for the environments where repair problems actually happen: agricultural fields, industrial facilities, remote construction sites — places with no cloud connectivity and no time to search through manuals. A technician speaks or types a symptom, and FieldFix returns structured repair guidance: ranked probable causes, step-by-step instructions, required tools, and safety stop conditions.

The AI backbone is Gemma 3 4B running through Ollama with Metal GPU acceleration on the host laptop. The model never touches the cloud — all inference is local. A RAG layer (ChromaDB with all-MiniLM-L6-v2 embeddings, 295 semantic chunks) grounds the model's responses in 37 expert-written repair documents spanning Robotics, Electronics, Emergency Equipment, Household systems, and Safety Guides.

The multi-agent pipeline processes each symptom through five specialized agents: a diagnosis agent identifies probable causes, a cause ranker orders them by likelihood, a repair planner generates RAG-augmented step-by-step instructions, a question agent surfaces clarifying questions, and a verification agent produces stop conditions and prevention tips.

Safety is handled deterministically — before any AI agent sees a query, a rules-based guardrail layer classifies it against 9 hard-stop categories (gas leaks, electrical fire, lithium battery failure, high-voltage exposure, etc.). Hard stops return an immediate warning with no AI processing. This design choice — no model for safety decisions — is intentional.

A per-device SQLite history store lets the system recall previous repairs on the same device, improving diagnostic accuracy for recurring issues. The frontend is a Next.js app served over the local network, accessible from iOS Safari on any phone connected to the same WiFi.`,
    tags: ["Python", "FastAPI", "Next.js", "Gemma 3", "Ollama", "ChromaDB", "RAG", "TypeScript"],
    category: "AI & Embedded Tools",
    highlights: [
      "Fully offline — Gemma 3 4B via Ollama with Metal GPU, zero cloud calls",
      "5-agent pipeline: diagnosis, cause ranking, repair planning, Q&A, verification",
      "RAG knowledge base: 295 chunks from 37 expert docs across 5 repair categories",
      "Deterministic safety guardrails run before any AI processing — 9 hard-stop categories",
      "Per-device SQLite repair history improves accuracy for recurring issues",
      "Mobile-accessible over local WiFi — works on iOS Safari with no app install",
      "115 unit tests + 9 orchestrator tests across safety, RAG, routing, and API layers",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/patilgayatri22/fieldfix-ai" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "signalforge",
    title: "SignalForge — High-Performance Network Traffic Generator",
    tagline:
      "DPDK-powered packet generator and traffic analyzer for stress-testing data-plane pipelines and validating network behavior.",
    description:
      "SignalForge is a high-performance network traffic generation and analysis tool built on DPDK. It generates crafted packet streams at line rate for testing switching firmware, P4 data planes, and embedded network stacks — with a Python CLI for test scenario authoring and real-time throughput/latency dashboards.",
    longDescription: `Validating high-performance networking code requires traffic that can stress the system at full line rate with controllable packet patterns. SignalForge fills this gap: a DPDK-based traffic generator that runs on commodity x86 hardware and pushes packets at rates up to 100Gbps, with precise control over packet content, timing, and flow distribution.

The core engine is written in C with DPDK for kernel-bypass packet I/O. It uses multi-queue RSS distribution to spread traffic across CPU cores, with per-core packet generation threads that minimize cache contention. Configurable inter-packet gaps enable both constant-rate and bursty traffic patterns that reflect real production load profiles.

A Python CLI layer wraps the C engine, providing a YAML-based test scenario format. Scenarios specify packet templates (Ethernet/IP/TCP/UDP headers with field ranges for fuzzing), flow definitions (src/dst IP ranges, port ranges), traffic rates (constant, ramp, burst), and measurement windows. This makes test authoring accessible without requiring DPDK expertise.

Real-time analysis captures per-flow throughput, latency distributions (p50/p95/p99), packet loss rates, and reorder events. Results stream to a terminal dashboard (Rich-based) and export to CSV for post-analysis. Integration with Wireshark via pcap export enables packet-level inspection of captured traffic.`,
    tags: ["C", "DPDK", "Python", "Networking", "Linux", "Performance"],
    category: "Networking & Systems",
    highlights: [
      "DPDK kernel-bypass packet I/O for line-rate generation up to 100Gbps on commodity hardware",
      "Multi-queue RSS distribution with per-core generation threads for minimal cache contention",
      "YAML-based test scenario format: packet templates, flow definitions, rate profiles",
      "Real-time dashboard: per-flow throughput, latency p50/p95/p99, loss rate, reorder events",
      "pcap export for Wireshark integration and packet-level inspection",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/signalforge" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "watchpoint",
    title: "Watchpoint — Incident Intelligence for Robotics",
    tagline: "Stop guessing why your robot failed — Watchpoint captures incidents, correlates telemetry, and generates replayable failure bundles with AI root-cause analysis.",
    description:
      "Watchpoint is a robotics observability platform. A lightweight Go agent runs on Linux/Jetson edge hardware, detects incidents (node crashes, topic starvation, thermal throttling), and generates portable replay bundles. A rules-based + AI-assisted RCA engine surfaces root causes in a correlation timeline dashboard.",
    longDescription: `When a robot fails in the field, the debugging process is painful: logs are scattered across multiple systems, the exact sequence of events is unclear, and reproducing the failure requires setting up the same hardware configuration. Watchpoint solves this by treating robot failures as first-class incidents — capturing everything automatically, correlating it, and packaging it for investigation.

The edge agent is written in Go for minimal overhead on resource-constrained hardware. It runs on Linux and NVIDIA Jetson devices, collecting CPU, memory, GPU, and disk metrics with a local ring buffer that preserves pre-incident context. A separate Python ROS2 collector monitors topic publish rates, node health, and message lag in real time.

Incident triggers fire on configurable conditions: CPU threshold breach, topic rate drop below threshold, thermal throttling onset, or process crash. When a trigger fires, Watchpoint captures a correlated bundle — all metrics, logs, ROS2 state, and deployment version at the time of failure — and packages it as a portable .zip that any engineer can download and replay.

The web dashboard provides a single-page incident correlation timeline connecting all signals. The rules-based analysis engine identifies common failure patterns: resource contention, thermal throttling chains, version regressions, and topic starvation cascades. An AI-assisted root cause card summarizes the probable cause and suggests next debugging steps.

Metrics that matter: 10K+ incidents captured in early testing, 73% reduction in mean time to root cause, compatibility with 5+ edge platforms including Jetson Orin, Raspberry Pi, and x86 Linux.`,
    tags: ["Go", "Python", "FastAPI", "Next.js", "PostgreSQL", "ROS2", "Docker"],
    category: "Robotics & AI",
    highlights: [
      "Lightweight Go edge agent — CPU, memory, GPU, disk metrics with local ring buffer for pre-incident context",
      "Python ROS2 collector: topic publish rate monitoring, node health, message lag detection",
      "Auto-incident capture on node crash, topic starvation, thermal throttling, or process failure",
      "Portable replay bundles (.zip) with all incident evidence — shareable across teams",
      "Rules-based + AI-assisted RCA: identifies resource contention, version regressions, failure chains",
      "73% MTTR reduction and 10K+ incidents captured in production testing",
    ],
    links: [
      { label: "Live Demo", url: "https://watchpoint-gray.vercel.app" },
      { label: "GitHub", url: "https://github.com/sagarbpatel31/watchpoint" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "xg1",
    title: "XG1 — Rapid Humanoid Robot Learning Pipeline",
    tagline:
      "2-day humanoid robot pipeline for the Unitree G1 — Meta Quest 3 teleop, NVIDIA Sonic, DeepLake data, GR00T policy fine-tuning, Nomadic diagnostics. Won 2 tracks.",
    description:
      "XG1 is a rapid-iteration humanoid robot learning pipeline built in 2 days for the Unitree G1. It combines immersive teleoperation, high-throughput tensor data infrastructure, and foundation-model fine-tuning to move from manual demonstration to autonomous policy testing — winning both the DeepLake and NomadicML tracks at Intelligence at the Frontier Hackathon.",
    longDescription: `XG1 demonstrates a fast-track workflow for humanoid robot learning. The challenge: take a Unitree G1 humanoid from manual demonstration to autonomous policy testing in 36 hours, with reliable performance on complex tasks like walking to tables and pick-and-place maneuvers with beverages and apples.

**Teleoperation Layer**: We integrated Meta Quest 3 with MuJoCo for intuitive 6DOF control, using NVIDIA Sonic to achieve low-latency control commands. This let us manually complete the target tasks (walking + pick-and-place) and capture high-fidelity demonstration data. Sonic's millisecond-class latency was critical — any teleop lag breaks operator confidence.

**Data Strategy with DeepLake**: To handle high-throughput training, we used DeepLake to store and stream Lightwheel's G1 beverage organization data. The efficient tensor storage provided the fast I/O necessary to fine-tune models within tight time constraints. Without it, the training pipeline would have been I/O-bound rather than compute-bound — the entire fine-tuning loop would have stalled.

**Policy Fine-Tuning with NVIDIA GR00T**: We fine-tuned NVIDIA GR00T on our collected data. Since Sonic's fine-tuning features were not yet released, we used Sonic primarily for high-fidelity data collection while running autonomous inference through GR00T. The 45 minutes of demonstration data (135,000 timesteps at 50Hz) was enough to produce a working policy in ~2 hours of training.

**Diagnostics with Nomadic AI**: To understand why the fine-tuned agent struggled with specific task instructions, we used Nomadic AI as a diagnostic layer. This pinpointed failure modes in the model's reasoning — identifying which task instructions caused divergence, at what decision points, and what features the model was attending to incorrectly. The output was a concrete improvement path rather than vague hypotheses.

**Outcome**: Won 2 tracks at Intelligence at the Frontier Hackathon 2026 — "Physical AI & Robotics: Data at Scale — Best Overall Use of DeepLake" and "Physical AI & Robotics by NomadicML — New Project Winner". The architecture demonstrated that combining immersive teleop with robust MLOps tooling can compress the humanoid-learning timeline from weeks to days.`,
    tags: ["Robotics", "Unitree G1", "Meta Quest 3", "MuJoCo", "NVIDIA Sonic", "DeepLake", "NVIDIA GR00T", "Nomadic AI"],
    category: "Physical AI & Robotics",
    highlights: [
      "Meta Quest 3 + MuJoCo teleoperation with NVIDIA Sonic for low-latency control",
      "DeepLake tensor storage for high-throughput streaming of G1 demonstration data",
      "NVIDIA GR00T policy fine-tuning on 45 min of collected demonstrations (135K timesteps)",
      "Nomadic AI diagnostics layer pinpointing fine-tuned agent failure modes",
      "Successful execution: walking to tables, beverage and apple pick-and-place",
      "Built in 36 hours from blank slate to autonomous policy testing",
    ],
    metrics: [
      "Won DeepLake track — Best Overall Use",
      "Won NomadicML track — New Project Winner",
    ],
    links: [
      { label: "Hackathon", url: "https://intelligence-at-the-frontier-hackathon.devspot.app/?activeTab=challenges&challenge=484" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "hydraswarm",
    title: "HydraSwarm — 7-Agent AI Software Company with HydraDB",
    tagline:
      "A 7-agent software engineering company where every agent queries HydraDB before acting and stores lessons back after. Score 7/10 first run, higher next run. Memory makes it real.",
    description:
      "HydraSwarm simulates a 7-agent software engineering company where every agent queries HydraDB before acting and stores lessons back after. Run a task once, score 7/10. Run a similar task again and agents recall what went wrong — score goes up. Uses 7 distinct HydraDB capabilities including knowledge ingestion, sub-tenants per agent, shared org memory, hybrid recall, graph relations, and inference.",
    longDescription: `HydraSwarm is what multi-agent AI looks like when memory is treated as a first-class capability rather than an afterthought. Seven specialized agents — Product Manager, Architect, Developer, Reviewer, QA Engineer, SRE, and CTO — collaborate on tasks, with every agent following a strict recall-generate-store loop against HydraDB.

The mechanism is simple but powerful: before an agent generates output, it queries HydraDB for relevant prior lessons. After it generates, it writes new lessons back. Run 1 of any task scores 7/10. Run 2 recalls Run 1's mistakes and scores 8/10. Run 3 reaches 9/10. The improvement is provable, measurable, and visible in the live dashboard.

**Seven HydraDB capabilities used**:
1. **Knowledge ingestion** — agents write structured lessons after every task
2. **Sub-tenants per agent** — each role has isolated memory namespaces
3. **Shared org memory** — cross-role context for institutional knowledge
4. **Hybrid recall** — combines semantic search with structured filters
5. **Graph relations** — explicit links between related lessons and tasks
6. **Inference** — derived insights from accumulated lesson patterns
7. **Memory explorer** — search and relevance scoring for browsing all stored knowledge

**Live agent thinking log**: Every HydraDB query and storage operation streams to the UI via SSE. Judges and operators can watch the institutional memory get used and updated in real time — making the architecture legible rather than a black box.

**Run comparison view**: Side-by-side diff of two runs of the same task, showing score deltas, recalled context differences, and improvement badges. This is what makes "institutional learning" concrete instead of hand-wavy.

**Engineering rigor**: 325 unit tests across 21 suites covering backend logic, frontend rendering, API contracts, and SSE streaming. Fast tests (under 8 seconds full run) meant we could refactor the memory architecture at 2am without breaking agent communication.

Won the "a fun hack day (promise)" virtual hackathon on Discord — a 178-attendee event focused on serious technical builds.`,
    tags: ["Next.js", "TypeScript", "DeepLake", "HydraDB", "SSE", "Multi-Agent AI", "RAG"],
    category: "AI & Multi-Agent Systems",
    highlights: [
      "7 specialized agents (PM, Architect, Developer, Reviewer, QA, SRE, CTO) with recall-generate-store loop",
      "Provable improvement across runs: 7/10 → 8/10 → 9/10 as lessons accumulate",
      "7 distinct HydraDB capabilities: ingestion, sub-tenants, shared memory, hybrid recall, graph relations, inference, explorer",
      "Live agent thinking log with SSE streaming showing real-time HydraDB ops",
      "Run comparison view with score deltas, recalled context diffs, improvement badges",
      "325 unit tests across 21 suites — backend, frontend, API, streaming all covered",
    ],
    metrics: ["Hackathon Winner", "325 unit tests across 21 suites", "7/10 → 9/10 score improvement"],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/HydraSwarm" },
      { label: "Hackathon", url: "https://luma.com/uv13n64x?tk=wjHDI0" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "medassist",
    title: "MedAssist — AI Medication Verification & Dispensing",
    tagline:
      "Robotic dispensing agent that closes the sense-reason-act loop for medication safety.",
    description:
      "An AI-powered medication verification and dispensing system built at the Robotic Agents Hackathon. Uses computer vision, Claude AI reasoning, and a SO-101 robotic arm to autonomously verify and pick medications.",
    longDescription: `MedAssist addresses a critical healthcare problem: approximately 1.5 million people are harmed by medication errors in the US each year. The system closes the full sense-reason-act loop — a camera sees what's on the tray, an AI agent reasons about what should be there for a specific patient, and a robotic arm physically executes the verified pick or refuses to move if anything is wrong.

The Sense stage uses the SO-101 robotic arm's camera to scan the medication tray, with Claude Vision identifying each vial by drug name, dosage, expiry, and tray position. The Reason stage runs a Toolhouse agent that performs a 10-check safety sequence in strict priority order against the patient medication record. The Act stage calls the Cyberwave robot skill to execute the verified pick, with ElevenLabs providing real-time voice narration.

Built at the Robotic Agents Hackathon (March 2026) in the Cyberwave × Toolhouse track, with teammates Aaryan Mahipal, Anna Saltveit, and Gayatri Patil.`,
    tags: ["Python", "Claude AI", "Computer Vision", "Robotics", "ElevenLabs"],
    category: "Robotics & AI",
    highlights: [
      "Complete sense-reason-act loop: camera vision, AI reasoning, and robotic arm execution",
      "10-check safety sequence with strict priority ordering — first failure halts the process",
      "Claude Vision for medication identification: drug name, dosage, expiry, tray position",
      "Toolhouse agent integration with Cyberwave robot skills for autonomous picking",
      "Real-time ElevenLabs voice narration of dispensing actions",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/med-assist" },
    ],
    featured: false,
    year: "2026",
  },
  {
    slug: "plastic-debris-detection",
    title: "Plastic Debris Detection via Satellite Imagery",
    tagline:
      "Detecting plastic debris in the Mediterranean Sea using Sentinel-2 satellite data and spectral analysis.",
    description:
      "An Omdena open-source project for detecting plastic debris through satellite imagery in the Italian and Mediterranean Seas, using Sentinel-2 data, atmospheric correction, and spectral index filtering.",
    longDescription: `This Omdena open-source collaboration tackles environmental monitoring by detecting marine plastic debris using satellite imagery. The project processes Sentinel-2 multispectral data through a pipeline that includes atmospheric correction via ACOLITE, cloud masking with s2cloudless, and spectral index computation.

The detection workflow generates patch/mask pairs from satellite tiles, filtering detections using spectral indices including NDVI (Normalized Difference Vegetation Index) and FDI (Floating Debris Index). The pipeline integrates with MARIDA-type dataset workflows for training data preparation and uses NetCDF windrow filtering for debris candidate identification.

Key contributions include implementing the ACOLITE correction workflow, RGB patch generation, mask rasterization, cloud detection integration, and patch-level processing within the process_tile loop. The work demonstrates rigorous data pipeline engineering applied to environmental satellite remote sensing.`,
    tags: ["Python", "Jupyter", "Sentinel-2", "Remote Sensing", "Computer Vision"],
    category: "Applied ML",
    highlights: [
      "Sentinel-2 satellite data processing with ACOLITE atmospheric correction",
      "Cloud masking integration using s2cloudless for clean imagery",
      "Spectral index filtering with NDVI and FDI for debris detection",
      "Patch/mask pair generation pipeline with NetCDF windrow filtering",
      "MARIDA-type dataset workflow integration for training data preparation",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/sagarbpatel31/Sagar_TriesteItalyChapter_PlasticDebrisDetection",
      },
    ],
    featured: false,
    year: "2025",
  },
];
