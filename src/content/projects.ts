import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "offline-ota",
    title: "Offline OTA Update System — Signed Updates for Edge Linux",
    tagline:
      "Local-first OTA for Linux edge devices — signed bundles, staged installs, health-check promotion, automatic rollback. No cloud required.",
    description:
      "An offline-first OTA update system for Linux edge devices. Delivers signed update bundles over USB or local HTTP, verifies integrity and authenticity before install, stages releases safely, promotes only after health checks pass, and rolls back automatically on failure — with a local dashboard for status and audit history.",
    longDescription: `Most OTA systems assume cloud connectivity. Field-deployed edge hardware — industrial gateways, agricultural controllers, remote sensors — often has none. Offline OTA Update System is built for exactly that: deliver and apply firmware/app updates with full cryptographic safety and automatic rollback, entirely offline.

**Signed bundle delivery**: Updates ship as signed bundles delivered over USB or local HTTP. The device agent validates version, target, file hashes, and signature against a trusted public key before anything touches the active system. An update that fails verification never gets staged.

**Staged installs with symlink switching**: Releases are staged into inactive directories. The agent only switches the active release (via atomic symlink swap) after the new version is fully written and verified, then restarts the service. The previous release stays intact on disk.

**Health-check promotion + automatic rollback**: After switching, the agent runs health checks against the new release. If they pass, the update is promoted. If they fail — or the service crashes — the agent automatically rolls back to the last known-good release by switching the symlink back. This is the core safety guarantee: a bad update can't brick the device.

**Components**: a device updater daemon and state machine (\`agent/\`), a release builder + demo app for Raspberry Pi (\`demo_service/\`), a local dashboard and API for status and audit history (\`server/\`), a manifest + signing tool (\`signer/\`), and systemd units for device integration (\`device/\`).

The full workflow: build a release bundle with manifest and signatures → deliver over USB or local HTTP → device validates version/target/hashes/signature → stage to inactive location → switch active release and restart → health checks confirm success or trigger rollback.`,
    tags: ["Python", "Embedded Linux", "OTA", "Cryptography", "Raspberry Pi", "systemd"],
    category: "Embedded & Systems",
    highlights: [
      "Signed bundle verification — version, target, hashes, and signature checked before any install",
      "Staged releases with atomic symlink switching — previous release stays intact on disk",
      "Health-check based promotion: bad updates trigger automatic rollback to last known-good",
      "Offline delivery over USB or local HTTP — zero cloud dependency",
      "Local dashboard with full update history and audit trail",
      "Device updater daemon + state machine, signing tool, and systemd integration units",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/offline-ota-update-system" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "embodipedia",
    title: "Embodipedia — The AI-Maintained Wikipedia of Humanoid Robotics",
    tagline:
      "A self-maintaining encyclopedia for humanoid robotics — no human editors. Agents read tweets, papers, and news, extract typed claims, route them into bull/bear/canonical lanes, and synthesize cited prose.",
    description:
      "Embodipedia is the first self-maintaining encyclopedia for the humanoid-robotics industry. Autonomous agents ingest tweets, papers, podcasts, and news; extract typed claims with confidence scores; route each claim into a perspective lane (canonical / bull / bear) via HydraDB sub-tenants; and synthesize Wikipedia-style prose with inline citations. Built for WikiThon 2026.",
    longDescription: `Embodipedia is what an encyclopedia looks like when AI agents — not humans — write and maintain every article. Agents read tweets, papers, podcasts, and news; extract typed claims with confidence scores; route each into a perspective lane; and synthesize Wikipedia-grade prose with inline citations. When evidence is too thin to ground a sentence, the system renders a clean \`[unverified]\` badge instead of inventing a fact.

**The architectural distinctive — three perspective sub-tenants**: Where ordinary RAG collapses all evidence into one corpus, Embodipedia keeps optimistic ("bull"), skeptical ("bear"), and measured ("canonical") claims in separate HydraDB lanes. Routing happens per-claim, not per-source — a single interview can contribute a canonical deployment fact and a bull forward-looking projection at once. The Talk page then recalls each lane separately and renders a real debate between agents that read the same world but reached different conclusions.

**The pipeline**: Ingest (tweets, papers, podcasts, news) → Extract (GPT-4o-mini produces typed claims + confidence) → Route (perspective router assigns canonical/bull/bear HydraDB sub-tenants) → Synthesize (GPT-4o writes Wikipedia prose with footnotes and [unverified] badges).

**Surfaces**: a portal homepage, entity articles with infoboxes and hover tooltips, a time-travel slider that re-renders an article using only claims published by a past date, self-healing stale banners, Talk pages with bull-vs-bear debate sections, revision history, "What Links Here," a live recent-changes feed, a ⌘K palette that synthesizes cited answers and draws entity graphs, and a live-ingest surface that turns any pasted text into typed claims in real time.

Built on Next.js 15 (App Router + RSC) with a FastAPI backend, HydraDB temporal context graph, and GPT-4o. Built for WikiThon 2026.`,
    tags: ["Next.js", "TypeScript", "Python", "HydraDB", "GPT-4o", "Multi-Agent AI", "RAG"],
    category: "AI & Multi-Agent Systems",
    highlights: [
      "Self-maintaining encyclopedia — autonomous agents read, extract, route, and synthesize with zero human editors",
      "Three perspective sub-tenants (canonical / bull / bear) in HydraDB — Talk pages render real agent debates",
      "Per-claim routing: one source can feed multiple perspective lanes simultaneously",
      "[unverified] badges instead of hallucination when evidence is too thin",
      "Time-travel slider re-renders articles using only claims published by a chosen past date",
      "⌘K palette synthesizes cited answers + draws SVG entity graphs; live-ingest turns pasted text into claims",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/EMBODIPEDIA" },
      { label: "WikiThon", url: "https://luma.com/6pybuh79?tk=5RGaoS" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "codebaseos",
    title: "CodebaseOS — Origin Story for Any Line of Code",
    tagline:
      "Right-click any line. Ask why. Get the full origin story across commits, PRs, issues, and decisions — in 200ms. A VS Code extension backed by a temporal context graph.",
    description:
      "CodebaseOS is a VS Code extension that explains the origin story of any line of code — surfacing the commits, PRs, issues, and decisions behind it in ~200ms with clickable links to the real sources. Backed by a HydraDB temporal context graph with Merkle-chain verified ingestion. Built for Agents Under Pressure (AI Valley 48-hour hackathon).",
    longDescription: `Every line of code has a story — why it was written, what PR introduced it, what issue it fixed, what decision shaped it. That story is normally scattered across git history, closed PRs, and stale issues. CodebaseOS reconstructs it on demand: right-click any line, ask "why," and get a graph-grounded answer with clickable links to the real PR, commit, or issue — in about 200ms.

**How it works**: CodebaseOS ingests a repository's history into a HydraDB temporal context graph — commits, PRs, issues, and the relationships between them. Ingestion is Merkle-chain verified, so you can prove the graph matches the source history (\`make verify\` → ✓ Merkle chain intact). Small repos are ingested completely (and report coverage, e.g. "✓ complete: 38/38 commits"); large repos are sampled (latest N) and flagged honestly.

**In the editor**: hover a line or click the 🧬 Why? / 📜 Origin story CodeLens to get a graph-grounded answer. Other commands — "Explain this file" (what it does, who owns it, key decisions), "What changed" (everything touching a file in a date range), and "Bus factor" (who holds the knowledge and the risk if they leave). Any answer can be copied as Markdown to paste into a PR or doc. No graph database to operate, no query language to learn — just ask.

**Architecture**: a VS Code extension (hover, CodeLens, webviews), a FastAPI backend, and a dashboard with a force-directed graph, chaos view, and time-travel. Built for the "Agents Under Pressure — Build your own OS" 48-hour hackathon at AI Valley. Published to the VS Code Marketplace.`,
    tags: ["TypeScript", "Python", "VS Code Extension", "HydraDB", "FastAPI", "OpenAI"],
    category: "AI & Developer Tools",
    highlights: [
      "Right-click any line → full origin story across commits, PRs, issues, and decisions in ~200ms",
      "Graph-grounded answers with clickable links to the real PR / commit / issue",
      "Merkle-chain verified ingestion — prove the context graph matches source history",
      "Honest coverage: small repos ingested completely, large repos sampled and flagged",
      "Editor commands: Why?, Explain this file, What changed, Bus factor — copy any answer as Markdown",
      "VS Code extension + FastAPI backend + force-graph dashboard, published to the Marketplace",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/CodeBaseOS" },
      { label: "VS Marketplace", url: "https://marketplace.visualstudio.com/items?itemName=CodeBaseOS.codebaseos" },
    ],
    featured: true,
    year: "2026",
  },
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
    featured: false,
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
    featured: false,
    year: "2026",
  },
];
