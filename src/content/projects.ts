import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tracemind",
    title: "TraceMind — Incident Intelligence for Robotics",
    tagline:
      "End-to-end traces, replay, and root-cause analysis for ROS2 and edge AI systems.",
    description:
      "An incident analysis platform for physical AI systems that captures telemetry across the stack — logs, metrics, ROS2 topics, inference timing, hardware state — and generates replayable failure bundles with AI-assisted root-cause analysis.",
    longDescription: `TraceMind is a startup project addressing a critical gap in robotics debugging: when a robot fails in the field, there's no easy way to replay and diagnose what happened across the full stack.

The platform captures telemetry from multiple sources — system logs, metrics, ROS2 topic data, inference timing, and hardware state — through a lightweight Go edge agent that runs on Linux and Jetson devices. A separate Python ROS2 collector monitors topic publish rates, node health, and message lag.

When incidents are detected (CPU threshold breach, topic rate drops, thermal throttling, or process crashes), TraceMind automatically captures a correlated bundle. The web interface provides a single-page correlation timeline connecting metrics, events, ROS2 state, and deployment versions, making it possible to trace failures back to their root cause.

The architecture uses a Next.js frontend with a FastAPI backend, PostgreSQL for structured data, and Docker Compose for local development. The edge agent is cross-compiled in Go for minimal overhead on resource-constrained devices.`,
    tags: ["Python", "FastAPI", "Go", "Next.js", "PostgreSQL", "ROS2", "Docker"],
    category: "Robotics & AI",
    highlights: [
      "Lightweight Go edge agent collecting CPU, memory, GPU, disk metrics and tailing logs on Linux/Jetson devices",
      "Python ROS2 collector monitoring topic publish rates, node health, and message lag",
      "Automatic incident capture on CPU threshold, topic rate drop, thermal throttling, or process crash",
      "Correlation timeline connecting metrics, events, ROS2 state, and deployment version in a single view",
      "Full-stack architecture: Next.js frontend, FastAPI backend, PostgreSQL, Docker Compose",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/tracemind" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "hydraswarm",
    title: "HydraSwarm — Multi-Agent AI with Institutional Memory",
    tagline:
      "Self-improving multi-agent AI software company powered by HydraDB institutional memory.",
    description:
      "A multi-agent AI system where 7 specialized agents collaborate on tasks, with institutional learning that makes every subsequent run measurably better. Won Best Overall Use of DeepLake at Intelligence at the Frontier Hackathon.",
    longDescription: `HydraSwarm simulates a software engineering company where 7 specialized AI agents — Product Manager, Architect, Developer, Reviewer, QA Engineer, SRE, and CTO — collaborate on tasks. Unlike one-shot AI tools, HydraSwarm remembers and improves: every task writes new knowledge back to HydraDB, and the next similar task produces a measurably better result.

The improvement is provable: Run 1 scores 7/10, Run 2 recalls lessons and scores 8/10, Run 3 reaches 9/10. Each agent follows a recall-generate-store loop, querying HydraDB for relevant knowledge before generating output and storing artifacts back for future use.

Key features include a live agent thinking log showing every HydraDB query and storage operation, SSE streaming for real-time agent activation, run comparison views with score deltas and improvement badges, and a HydraDB memory explorer for browsing institutional memory with search and relevance scoring.

Built during the Intelligence at the Frontier Hackathon (February 2026), the project won Best Overall Use of DeepLake for demonstrating institutional learning across AI agent runs.`,
    tags: ["Next.js", "TypeScript", "DeepLake", "SSE", "Multi-Agent AI"],
    category: "AI & Gen AI",
    highlights: [
      "7 specialized AI agents with recall-generate-store loop for institutional learning",
      "Provable improvement across runs: scores increase from 7 to 8 to 9 as lessons accumulate",
      "Live agent thinking log with SSE streaming showing real-time HydraDB operations",
      "Run comparison view with score deltas, recalled context diffs, and improvement badges",
      "326 unit tests across 21 suites covering backend, frontend, API, and streaming",
    ],
    metrics: ["Won Best Overall Use of DeepLake", "326 unit tests"],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/HydraSwarm" },
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
    featured: true,
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
    featured: true,
    year: "2025",
  },
  {
    slug: "openbite",
    title: "OpenBite — AI Nutrition Tracking",
    tagline:
      "Open-source AI nutrition app with computer vision food recognition and community dataset.",
    description:
      "An AI-powered nutrition tracking app that uses Google Gemini Vision to identify foods from photos, estimate portions, and provide comprehensive nutritional analysis with USDA FoodData Central.",
    longDescription: `OpenBite is an open-source nutrition tracking application that leverages AI computer vision to simplify food logging. Users upload food photos, and Google Gemini Vision identifies the items with smart portion estimation across 8 visual portion types (palm, cup, fist, thumb, slice, scoop, small, large).

The app provides comprehensive nutritional analysis by cross-referencing identified foods against the USDA FoodData Central database, with context-aware AI recommendations for meal improvements. An open community dataset allows users to contribute anonymized meal data to improve AI accuracy for everyone.

Built with Next.js 14 and TypeScript on the frontend, with Supabase (PostgreSQL + Storage + RLS) for the backend, Auth0 for authentication, and a modern glass morphism UI design with responsive layouts.`,
    tags: ["Next.js", "TypeScript", "Google Gemini", "Supabase", "Auth0", "Tailwind"],
    category: "AI & Full Stack",
    highlights: [
      "Google Gemini Vision API for food recognition from photos",
      "Smart portion estimation across 8 visual portion types",
      "USDA FoodData Central integration for accurate nutritional data",
      "Open community dataset for anonymized meal data contributions",
      "Auth0 authentication with Supabase PostgreSQL backend",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/openbite" },
    ],
    featured: false,
    year: "2025",
  },
  {
    slug: "colibri-chat",
    title: "Colibri Chat — Proximity-Based Ephemeral Chat",
    tagline:
      "Location-bound, time-bound chat for real-time coordination with people physically nearby.",
    description:
      "A proximity-based ephemeral chat system where messages are location-bound and time-bound, designed for adults to coordinate in the moment with people physically nearby.",
    longDescription: `Colibri Chat is a proximity-based communication platform built on the principle that ephemeral + contextual + safe beats engagement. Messages are bound to physical locations (100ft radius with 20ft tolerance) and expire after 60 minutes, creating truly ephemeral conversations.

The system supports neighborhood rooms and event rooms, with location permission required to join or post. Messages are greyed out when the sender leaves the geofence or has a stale heartbeat, providing real-time presence awareness. Safety features include rate limiting (1 message per 5 seconds), PII blocking, and shadow mute thresholds.

The backend is built entirely on Supabase with PostgreSQL, PostGIS for geospatial queries, Row Level Security for data protection, and Postgres RPC functions for business logic. Edge Functions provide thin API wrappers for join, heartbeat, and send-message operations.`,
    tags: ["React Native", "Supabase", "PostGIS", "PostgreSQL", "Edge Functions"],
    category: "Mobile & Full Stack",
    highlights: [
      "Geofenced messaging with 100ft radius and 20ft tolerance using PostGIS",
      "Ephemeral messages with 60-minute TTL and presence-based greying",
      "Supabase backend with PostgreSQL RLS and Postgres RPC functions",
      "Rate limiting, PII blocking, and shadow mute for safety",
      "Neighborhood and event room types with location-gated access",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/Colibri-Chat" },
    ],
    featured: false,
    year: "2026",
  },
  {
    slug: "career-ops-automation",
    title: "Career Ops — AI Job Search Automation",
    tagline:
      "AI-powered job search pipeline with tailored resume generation, multi-platform scanning, and a Go TUI dashboard.",
    description:
      "A three-part automation system that evaluates job listings with AI, generates tailored resumes from 7 role archetypes, and tracks applications through a terminal dashboard — built for embedded, edge AI, robotics, and systems roles.",
    longDescription: `Career Ops Automation is a personal productivity system that streamlines the job search process for specialized engineering roles. The architecture has three components: career-ops (an AI evaluation pipeline powered by Claude Code), typst-resume (a Typst-based resume template with automatic tailoring), and a shared glue layer connecting them.

The resume generation system auto-detects which of 7 archetypes to use based on job keywords — embedded, edge_ai, robotics, networking, linux_platform, software, or ml_ai — then reorders bullets and selects the right summary to match the role. A single YAML file serves as the source of truth for all resume data, with tagged bullets that map to multiple archetypes.

The job scanning pipeline uses Playwright and APIs to scrape listings from Greenhouse, Lever, Ashby, Workable, Wellfound, and custom careers pages. A Go TUI dashboard provides real-time application tracking with status updates and filtering.

CSV/XLSX company import, dry-run previews, and a cv.md sync script round out the workflow — making it possible to go from job URL to tailored PDF in seconds.`,
    tags: ["Python", "Go", "Typst", "Claude AI", "Playwright", "YAML"],
    category: "AI & Full Stack",
    highlights: [
      "7 resume archetypes auto-detected from job keywords for tailored PDF generation",
      "Multi-platform job scanning via Playwright: Greenhouse, Lever, Ashby, Workable, Wellfound",
      "Go TUI dashboard for real-time application tracking and status management",
      "Single YAML source of truth with tagged bullets mapping to multiple archetypes",
      "CSV/XLSX company import with dry-run previews and portals.yml integration",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/sagarbpatel31/career-ops-automation" },
    ],
    featured: false,
    year: "2025",
  },
  {
    slug: "personalizer-coach",
    title: "Personalizer Coach — AI Career Coaching",
    tagline:
      "AI-powered personalized coaching system for engineering career development.",
    description:
      "An adaptive coaching platform targeting engineering career development across Embedded Software, Software Engineering, ML/DL, and GenAI roles with quiz-based skill assessment and daily planning.",
    longDescription: `Personalizer Coach is a personalized coaching system designed for engineers preparing for career transitions. It covers four major engineering domains: Embedded Software, Software Engineering, ML/DL, and GenAI.

The adaptive quiz engine targets your weakest skills using an Elo-style rating system, automatically selecting questions and adjusting difficulty based on current skill levels. Ratings update with smoothed scoring (20% weight to new results) to avoid overcorrection.

The daily planner generates personalized study blocks based on available time, automatically allocating between applications, quizzing, and project work. It focuses on highest-priority roles with lowest current ratings, tracking completion and providing streak metrics.

Built with Next.js 15 and Tailwind CSS v4, using local storage for state management and a JSON-based question bank with a comprehensive skills taxonomy.`,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "AI", "Adaptive Learning"],
    category: "AI & Full Stack",
    highlights: [
      "Adaptive quiz engine with Elo-style rating updates targeting weakest skills",
      "Daily planner with automatic time blocking based on skill gaps",
      "Comprehensive skills taxonomy covering 4 engineering roles",
      "Smoothed scoring system (20% weight) to avoid rating overcorrection",
      "Progress tracking with real-time rating updates and streak monitoring",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/sagarbpatel31/personalizer-coach",
      },
    ],
    featured: false,
    year: "2025",
  },
];
