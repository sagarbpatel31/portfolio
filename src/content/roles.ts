export interface RoleProfile {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  summary: string;
  recruiterSummary: string;
  targetTitles: string[];
  skills: string[];
  strengths: {
    title: string;
    detail: string;
  }[];
  signals: {
    value: string;
    label: string;
    detail: string;
  }[];
  projectSlugs: string[];
  postSlugs: string[];
}

export const roleProfiles: RoleProfile[] = [
  {
    slug: "firmware-platform-validation",
    label: "Firmware & Platform Validation",
    eyebrow: "release confidence for AI platforms",
    headline: "I turn firmware candidates into evidence-backed release decisions.",
    summary:
      "Current Microsoft validation work spans software-driven verification, AI platform bring-up, BIOS validation, regression design, and production-readiness testing. Earlier embedded roles add the implementation context needed to debug across firmware, Linux, devices, and data paths.",
    recruiterSummary:
      "Best fit for teams validating server, accelerator, BIOS, BMC, embedded, or AI-platform firmware where failures must be reproducible and release evidence must survive review.",
    targetTitles: [
      "Software Validation Engineer",
      "Firmware Validation Engineer",
      "Platform Validation Engineer",
      "Systems Test Engineer",
    ],
    skills: [
      "Firmware Validation",
      "Platform Bring-Up",
      "BIOS Validation",
      "Regression Strategy",
      "Secure Boot",
      "Production Readiness",
      "Python",
      "C/C++",
    ],
    strengths: [
      {
        title: "State-aware validation",
        detail:
          "Tests boot, reset, update, recovery, persistence, and hardware-topology transitions instead of checking only the final state.",
      },
      {
        title: "Evidence-first triage",
        detail:
          "Preserves failure signatures, matched baselines, platform identity, and the first violated contract before retries change the system.",
      },
      {
        title: "Release engineering judgment",
        detail:
          "Connects changed components to risk-based coverage, representative hardware cohorts, repeatability gates, and explicit uncertainty.",
      },
    ],
    signals: [
      {
        value: "Current",
        label: "Microsoft AI platform validation",
        detail: "Firmware verification, bring-up, BIOS, and production readiness.",
      },
      {
        value: "5+ yrs",
        label: "cross-layer systems work",
        detail: "RTOS, embedded Linux, networking firmware, accelerators, and AI systems.",
      },
      {
        value: "End-to-end",
        label: "validation ownership",
        detail: "Test design, automation, evidence, triage, and release communication.",
      },
    ],
    projectSlugs: ["offline-ota", "signalforge", "watchpoint"],
    postSlugs: [
      "testing-firmware-timeouts-at-counter-rollover",
      "secure-boot-validation-needs-negative-test-chains",
      "firmware-regressions-need-paired-baselines",
      "production-readiness-needs-repeatability-gates",
    ],
  },
  {
    slug: "embedded-systems",
    label: "Embedded Systems",
    eyebrow: "software across boot, kernel, and device boundaries",
    headline: "I build embedded systems that remain observable and recoverable in the field.",
    summary:
      "The embedded path covers bare-metal and RTOS firmware, Linux BSPs, Yocto and Buildroot, device drivers, secure boot, high-speed networking, and offline update safety. The emphasis is not only bringing hardware up, but keeping it debuggable and upgradeable after deployment.",
    recruiterSummary:
      "Best fit for teams shipping embedded Linux, device firmware, BSPs, networking appliances, or field systems where resource limits and hardware variability are part of the product contract.",
    targetTitles: [
      "Embedded Software Engineer",
      "Embedded Linux Engineer",
      "Firmware Engineer",
      "Systems Software Engineer",
    ],
    skills: [
      "C/C++",
      "Embedded Linux",
      "RTOS",
      "Yocto",
      "Buildroot",
      "Device Drivers",
      "Secure Boot",
      "DPDK",
    ],
    strengths: [
      {
        title: "Hardware-to-OS depth",
        detail:
          "Works across bootloaders, firmware, kernel modules, DMA and interrupt paths, system services, and release tooling.",
      },
      {
        title: "Failure-safe delivery",
        detail:
          "Designs signed staging, health-gated promotion, rollback, watchdog recovery, and portable evidence for disconnected systems.",
      },
      {
        title: "Performance with correctness",
        detail:
          "Treats throughput, jitter, latency, ownership, cache coherency, and packet integrity as one measurable contract.",
      },
    ],
    signals: [
      {
        value: "31%",
        label: "throughput improvement",
        detail: "Packet processing, DMA paths, and interrupt handling on logistics gateways.",
      },
      {
        value: "35%",
        label: "packet-jitter reduction",
        detail: "Custom kernel modules and high-speed Ethernet interfaces.",
      },
      {
        value: "Offline",
        label: "deployment-safe updates",
        detail: "Signed bundles, atomic promotion, rollback, and local audit history.",
      },
    ],
    projectSlugs: ["offline-ota", "signalforge", "watchpoint"],
    postSlugs: [
      "tracing-an-i2c-sensor-through-a-linux-mux",
      "embedded-linux-bsp",
      "dma-buffers-need-explicit-cache-coherency-contracts",
      "watchdogs-need-progress-proofs-not-process-heartbeats",
    ],
  },
  {
    slug: "edge-ai-robotics",
    label: "Edge AI & Robotics",
    eyebrow: "physical AI under real-time and field constraints",
    headline: "I connect models to the timing, telemetry, and recovery paths that make physical AI usable.",
    summary:
      "This path combines CUDA and TensorRT inference, Jetson platforms, ROS2 observability, MuJoCo simulation, humanoid teleoperation, data pipelines, and incident intelligence. The engineering focus stays on end-to-end latency, hardware-aware deployment, and recoverable behavior.",
    recruiterSummary:
      "Best fit for robotics, physical AI, edge inference, or forward-deployed teams that need an engineer who can move between models, devices, control paths, observability, and product surfaces.",
    targetTitles: [
      "Robotics Software Engineer",
      "Edge AI Engineer",
      "Physical AI Engineer",
      "Forward Deployed Engineer",
    ],
    skills: [
      "CUDA",
      "TensorRT",
      "Jetson Orin",
      "ROS2",
      "MuJoCo",
      "NVIDIA GR00T",
      "Computer Vision",
      "Observability",
    ],
    strengths: [
      {
        title: "End-to-end latency thinking",
        detail:
          "Budgets sensing, transport, preprocessing, inference, control, and operator feedback as one pipeline rather than isolated benchmarks.",
      },
      {
        title: "Incident-ready robotics",
        detail:
          "Captures pre-failure context, ROS2 health, resource telemetry, version identity, and replayable evidence at the edge.",
      },
      {
        title: "Simulation-to-hardware execution",
        detail:
          "Connects teleoperation, MuJoCo, demonstration data, policy fine-tuning, diagnostics, and physical-system evaluation.",
      },
    ],
    signals: [
      {
        value: "73%",
        label: "lower mean time to root cause",
        detail: "Incident capture and correlated robotics evidence through Watchpoint.",
      },
      {
        value: "2 wins",
        label: "humanoid robotics tracks",
        detail: "XG1 teleop-to-policy pipeline built in a 36-hour event window.",
      },
      {
        value: "22%",
        label: "less unplanned downtime",
        detail: "Jetson Orin anomaly-detection pipeline for logistics equipment.",
      },
    ],
    projectSlugs: ["watchpoint", "xg1", "stepahead"],
    postSlugs: [
      "mapping-detection-boxes-back-to-camera-pixels",
      "robotics-telemetry-should-preserve-causality-across-clock-domains",
      "latency-budgets-robotics-pipelines",
      "mujoco-sim-to-real",
    ],
  },
];

export function getRoleProfile(slug: string) {
  return roleProfiles.find((role) => role.slug === slug);
}
