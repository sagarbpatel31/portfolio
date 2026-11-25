export const selectedImpact = [
  {
    value: "31%",
    label: "Higher gateway throughput",
    detail: "Ciena · Tuned packet processing, DMA, and interrupts.",
  },
  {
    value: "24%",
    label: "Shorter bring-up and deployment",
    detail: "Ciena · Upgraded the Yocto BSP and improved CI validation.",
  },
  {
    value: "2",
    label: "Robotics hackathon wins",
    detail: "XG1 · Unitree G1 teleoperation and policy testing.",
  },
];

export const heroSignals = [
  "5+ years building and validating production systems",
  "Firmware validation + Embedded Linux + CUDA + DPDK + ROS2",
  "Open to systems, robotics, and edge AI roles",
];

export const specializationSignals = [
  "AI platform & firmware validation",
  "Embedded Linux & BSP",
  "Edge AI inference",
  "Robotics pipelines",
  "Networking / DPU / DPDK",
  "Forward-deployed systems",
];

export const proudWork = [
  {
    title: "Shipped under hard operational constraints",
    label: "field systems",
    description:
      "Built systems that had to survive offline updates, hardware variability, noisy telemetry, and failure modes where truck rolls were the backup plan.",
    proof: "Offline OTA, watchdog recovery, deterministic latency validation, and edge observability workflows.",
  },
  {
    title: "Built end-to-end instead of handing off halfway",
    label: "ownership",
    description:
      "The strongest work spans architecture, implementation, validation, profiling, and the tooling needed to keep it reliable after first release.",
    proof: "From BSP and firmware layers to inference pipelines, replay tooling, dashboards, and deployment-safe release paths.",
  },
  {
    title: "Production systems, not prompt demos",
    label: "systems bias",
    description:
      "AI work is framed as a systems problem: retrieval quality, latency budgets, observability, rollout safety, and measurable behavior under load.",
    proof: "RAG evaluation loops, edge inference tuning, DPU traffic intelligence, and incident-intelligence tooling for robotics teams.",
  },
];

export const engineeringPrinciples = [
  {
    title: "Systems first",
    description:
      "I care about architectures that stay observable, recoverable, and fast under real-world constraints, not just benchmark-friendly prototypes.",
  },
  {
    title: "Ownership over handoffs",
    description:
      "The best work usually happens when one engineer can follow the problem from vague requirement to shipped behavior and debugging evidence.",
  },
  {
    title: "Proof over claims",
    description:
      "I trust traces, latency budgets, rollback paths, and quantified outcomes more than polished demos or generic AI language.",
  },
];

export const stackMap = [
  {
    domain: "Platform Validation",
    summary: "Firmware and AI platform readiness across bring-up, BIOS, verification, and release gates.",
    items: [
      "Firmware Validation",
      "Software-Driven Verification",
      "Platform Bring-Up",
      "BIOS Validation",
      "Production Readiness",
    ],
  },
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

const otaSource = "https://github.com/sagarbpatel31/offline-ota-update-system/blob/5ee00414e379144180648d5418a865261bcc4656";
const incidentFixtures = "https://github.com/sagarbpatel31/watchpoint/blob/5b261c899b54f98a429df35b045f20596590b986/packages/sample-data/fixtures";
const teleopSource = "https://github.com/AIBotTeachesAI/quest3-unitree-g1-teleop/blob/f6e9284e7b38c54969f2a2d33040648ffbc21721";

export const caseStudies = [
  {
    slug: "offline-ota",
    category: "Embedded Linux",
    title: "Offline OTA Update System",
    workSample: {
      action: "Inspect the rollback test",
      title: "What happens when a signed update fails its health check?",
      context: "An automated Linux test installs two application versions into a temporary device directory. The test checks the release the device actually points to after recovery.",
      observations: [
        { label: "Starting state", detail: "Version 1.1.0 passes its health check and becomes active." },
        { label: "Injected fault", detail: "The test stages signed version 1.2.0 and makes its health check return “connection refused”." },
        { label: "Pass condition", detail: "The install reports failure, the active release points back to 1.1.0, and the audit history contains both the failed check and the rollback." },
      ],
      finding: "On August 11, 2026, all six Python and time-zone combinations passed in GitHub Actions. A separate Ubuntu job installed three signed releases and rolled back twice.",
      sources: [
        { label: "Read the test assertions", href: `${otaSource}/tests/test_install_flow.py#L74-L87` },
        { label: "Inspect the CI run", href: "https://github.com/sagarbpatel31/offline-ota-update-system/actions/runs/31470593722" },
      ],
    },
    problem:
      "Deploy application updates to Linux edge devices in the field without internet access.",
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
      "Signed application updates over USB or local HTTP, with health checks that trigger a rollback if the new release fails.",
    metric: "0 cloud dependency",
    decisions: [
      { choice: "Verify before staging", reason: "Keep signature and bundle checks ahead of changes to the active application." },
      { choice: "Keep release directories", reason: "An atomic symlink switch provides a path back to the previous application after a failed health check." },
    ],
    validationPlan: [
      "Reject a modified bundle and confirm the active release is untouched.",
      "Make the new application's health check fail and inspect rollback and audit history.",
      "Interrupt activation on a disposable test device and inspect restart recovery.",
    ],
    year: "2026",
  },
  {
    slug: "watchpoint",
    category: "Robotics & AI",
    title: "Watchpoint",
    workSample: {
      action: "Follow a ROS 2 incident",
      title: "Why did a robot slow to a stop during inference?",
      context: "This 90-second timeline comes from Watchpoint’s synthetic CPU-contention fixture. It follows a navigation controller sharing compute with a batch inference job.",
      observations: [
        { label: "5 seconds", detail: "Batch inference starts. The system monitor recorded 45% CPU usage five seconds earlier." },
        { label: "22 seconds", detail: "The velocity-command topic (/cmd_vel) drops to 8.1 Hz against its expected 10 Hz." },
        { label: "60 seconds", detail: "The navigation controller reports 2.1 Hz and engages a safety stop. CPU usage peaked at 98% five seconds earlier." },
        { label: "87 seconds", detail: "After the inference job releases CPU resources, /cmd_vel returns to 9.8 Hz." },
      ],
      finding: "The first topic-rate warning arrives 38 seconds before the safety stop. That earlier window shows where to start investigating the interaction between inference and navigation.",
      sources: [
        { label: "Inspect the event log", href: `${incidentFixtures}/event-logs/cpu-contention-001-events.json` },
        { label: "Read the incident record", href: `${incidentFixtures}/incidents/cpu-contention-001.json` },
      ],
    },
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
    techStack: ["Go", "ROS 2", "FastAPI", "Python", "Next.js", "PostgreSQL", "Docker"],
    outcome:
      "A Go agent and ROS 2 collector package logs, metrics, and pre-failure context into portable incident bundles.",
    metric: "Replayable incident bundles",
    decisions: [
      { choice: "Buffer on the edge", reason: "A local ring buffer preserves context from before an incident trigger fires." },
      { choice: "Export portable evidence", reason: "An incident bundle brings logs, resource metrics, and ROS 2 state into the same investigation." },
    ],
    validationPlan: [
      "Seed a CPU contention scenario and inspect telemetry before and after the trigger.",
      "Download a bundle and check that it identifies the device and deployment.",
      "Compare a version-regression scenario with a thermal-throttling scenario.",
    ],
    year: "2026",
  },
  {
    slug: "xg1",
    category: "Humanoid robotics",
    title: "XG1",
    workSample: {
      action: "Trace a headset movement",
      title: "How does a headset movement reach a simulated humanoid?",
      context: "In our hackathon team’s Quest 3 teleoperation pipeline, the browser and robot use different coordinate systems. The pose reader translates between them before the control stack consumes a movement.",
      observations: [
        { label: "Input", detail: "WebXR reports headset and controller poses in a frame where positive Y points up and negative Z points forward." },
        { label: "Worked example", detail: "Moving a controller 10 cm forward gives a WebXR displacement of (0, 0, −0.10) m. The reader maps it to (+0.10, 0, 0) m in the robot frame." },
        { label: "Orientation", detail: "The reader also changes the basis of the rotation and returns the quaternion with the scalar first, the order expected by the next stage." },
      ],
      finding: "A single forward movement gives a quick diagnostic in MuJoCo. If it appears as sideways motion, the frame conversion is an early place to check.",
      sources: [
        { label: "Inspect the pose conversion", href: `${teleopSource}/gear_sonic/utils/teleop/vr/quest3_reader.py#L34-L46` },
        { label: "See the simulation setup", href: `${teleopSource}/SETUP_GUIDE.md` },
      ],
    },
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
      "Our team connected Quest 3 teleoperation to GR00T policy evaluation for a simulated Unitree G1 and won two hackathon tracks.",
    metric: "2 track wins",
    decisions: [
      { choice: "Use separate collection and policy tools", reason: "Sonic supported teleoperation and demonstration collection, while GR00T supplied the fine-tuning and policy-inference path." },
      { choice: "Evaluate in MuJoCo", reason: "Simulation gave the team a place to inspect policy behavior within the event window. Physical deployment remains future work." },
    ],
    validationPlan: [
      "Record the simulation, model, and dataset versions for each evaluation.",
      "Replay a fixed task set and preserve unsuccessful attempts alongside successful ones.",
      "Review diagnostics at the point where the policy diverges from the task.",
    ],
    year: "2026",
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];
