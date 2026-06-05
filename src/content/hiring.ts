export const selectedImpact = [
  {
    value: "31%",
    label: "throughput gain on logistics edge gateways",
    detail: "Packet processing, DMA paths, and interrupt handling tuned at Ciena.",
  },
  {
    value: "73%",
    label: "mean time to root-cause reduction",
    detail: "Watchpoint bundles incident evidence and correlates robotics telemetry automatically.",
  },
  {
    value: "2",
    label: "hackathon tracks won on XG1",
    detail: "DeepLake + NomadicML wins for humanoid teleop and GR00T fine-tuning.",
  },
];

export const stackMap = [
  {
    domain: "Embedded",
    summary: "Firmware and platform layers where boot, safety, and release discipline matter.",
    items: ["C", "C++", "Embedded Linux", "Yocto", "Buildroot", "RTOS", "Secure Boot"],
  },
  {
    domain: "Networking",
    summary: "Data plane systems that care about packet paths, latency, and throughput.",
    items: ["P4", "DPDK", "DMA Optimization", "TCP/IP", "BlueField DPU", "Telemetry"],
  },
  {
    domain: "Edge AI",
    summary: "GPU inference at the edge with tight latency budgets and operational constraints.",
    items: ["CUDA", "TensorRT", "DeepStream", "Jetson Orin", "ONNX", "Nsight Systems"],
  },
  {
    domain: "Robotics",
    summary: "Teleop, sensing, and policy training for physical AI systems.",
    items: ["ROS2", "MuJoCo", "Physical AI", "Control Systems", "Sensor Fusion"],
  },
  {
    domain: "Full-Stack Systems",
    summary: "User-facing control planes, APIs, and shipping infrastructure around the core systems.",
    items: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "CI/CD", "GitHub Actions"],
  },
];

export const caseStudies = [
  {
    slug: "offline-ota",
    category: "Embedded Linux",
    title: "Offline OTA Update System",
    problem:
      "Field hardware needed a safe update path that worked without cloud access and never bricked the device.",
    constraints: [
      "No internet dependency during delivery or install.",
      "Updates had to prove authenticity before any state changed.",
      "A bad release had to roll back automatically without operator intervention.",
    ],
    architecture: [
      "Signed bundle",
      "Validator",
      "Staging slot",
      "Health checks",
      "Promote / rollback",
    ],
    techStack: ["Python", "systemd", "Raspberry Pi", "Cryptography", "Local HTTP", "Shell"],
    outcome:
      "Delivered an offline-first update path with atomic promotion, automatic rollback, and local audit history.",
    metric: "0 cloud dependency",
    year: "2026",
  },
  {
    slug: "watchpoint",
    category: "Robotics & AI",
    title: "Watchpoint",
    problem:
      "Robotics teams needed a repeatable way to capture incidents, correlate telemetry, and stop guessing at root cause.",
    constraints: [
      "Edge devices had limited resources and noisy telemetry.",
      "The system had to preserve pre-incident context automatically.",
      "Bundles had to be portable so engineers could replay failures elsewhere.",
    ],
    architecture: [
      "Incident trigger",
      "Go edge agent",
      "ROS2 collector",
      "Replay bundle",
      "RCA dashboard",
    ],
    techStack: ["Go", "Python", "ROS2", "FastAPI", "Next.js", "PostgreSQL", "Docker"],
    outcome:
      "Cut mean time to root cause by 73% while capturing 10K+ incidents across Jetson, Raspberry Pi, and x86 targets.",
    metric: "73% MTTR reduction",
    year: "2026",
  },
  {
    slug: "xg1",
    category: "Physical AI / Robotics",
    title: "XG1",
    problem:
      "A humanoid learning pipeline had to move from teleop to policy testing inside a 36-hour hackathon window.",
    constraints: [
      "Low-latency control mattered more than raw model size.",
      "Demonstration data had to stream fast enough to finish training in time.",
      "The workflow had to stay useful for both teleop and diagnostics.",
    ],
    architecture: [
      "Quest 3 teleop",
      "MuJoCo sim",
      "DeepLake stream",
      "GR00T fine-tune",
      "Policy test",
    ],
    techStack: [
      "Meta Quest 3",
      "MuJoCo",
      "NVIDIA Sonic",
      "DeepLake",
      "GR00T",
      "Nomadic AI",
    ],
    outcome:
      "Won 2 hackathon tracks and proved the teleop-to-policy loop on the Unitree G1 within 36 hours.",
    metric: "2 track wins",
    year: "2026",
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];
