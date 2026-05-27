import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cpu, Code2, Terminal, Boxes, Wrench, Radio } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uses & Now",
  description:
    "What Sagar Patel is working on right now, and the hardware, tools, and stack he builds with.",
  alternates: { canonical: `${SITE_URL}/uses` },
  openGraph: {
    title: "Uses & Now | SAGAR_OS",
    description:
      "Current focus + the hardware, tools, and stack behind the work.",
    url: `${SITE_URL}/uses`,
    type: "website",
  },
};

interface StackGroup {
  label: string;
  icon: React.ReactNode;
  items: string[];
}

const NOW: { label: string; detail: string; status: "active" | "learning" | "open" }[] = [
  {
    label: "Senior Software Engineer @ Ciena",
    detail:
      "Embedded Linux networking firmware on NVIDIA Jetson Orin — packet processing, DMA optimization, edge AI inference pipelines (CUDA/TensorRT).",
    status: "active",
  },
  {
    label: "M.S. Computer Science @ Sofia University",
    detail: "Part-time, Jan 2026 – Jun 2027. Deepening ML systems + distributed computing.",
    status: "active",
  },
  {
    label: "Building: Watchpoint, StepAhead, FieldFix, SignalForge",
    detail:
      "Robotics incident intelligence, infant motor-development AI, offline repair assistant, and a DPDK traffic generator — all shipping in production.",
    status: "active",
  },
  {
    label: "Learning: Physical AI + Multi-Agent Systems",
    detail:
      "NVIDIA GR00T policy fine-tuning, humanoid teleop (XG1 / Unitree G1), and HydraDB-backed agent memory architectures.",
    status: "learning",
  },
  {
    label: "Open to roles",
    detail:
      "Physical AI · Forward Deployed Engineer · Gen AI software · Embedded software. High-ownership, ship-fast environments.",
    status: "open",
  },
];

const STACK: StackGroup[] = [
  {
    label: "Hardware",
    icon: <Cpu size={13} />,
    items: [
      "NVIDIA Jetson Orin / Xavier",
      "NVIDIA BlueField DPU",
      "Raspberry Pi",
      "ESP32",
      "STM32",
      "BeagleBone Black",
      "MacBook Pro (M-series)",
    ],
  },
  {
    label: "Languages",
    icon: <Code2 size={13} />,
    items: ["C", "C++", "Python", "Bash", "TypeScript"],
  },
  {
    label: "Editors & AI Tools",
    icon: <Terminal size={13} />,
    items: ["VS Code", "Cursor", "Eclipse IDE", "Claude Code", "Codex", "vim"],
  },
  {
    label: "Embedded Toolchain",
    icon: <Wrench size={13} />,
    items: [
      "Yocto",
      "Buildroot",
      "CMake",
      "GDB",
      "JTAG",
      "Nsight Systems",
      "PREEMPT_RT",
    ],
  },
  {
    label: "Edge AI & Robotics",
    icon: <Radio size={13} />,
    items: [
      "CUDA",
      "TensorRT",
      "ONNX",
      "DeepStream",
      "ROS2",
      "MuJoCo",
      "NVIDIA GR00T",
    ],
  },
  {
    label: "Web & Infra",
    icon: <Boxes size={13} />,
    items: [
      "Next.js",
      "React",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "Vercel",
      "GitHub Actions",
    ],
  },
];

const statusStyle = {
  active: "text-accent-green",
  learning: "text-accent",
  open: "text-accent-amber",
} as const;

const statusLabel = {
  active: "ACTIVE",
  learning: "LEARNING",
  open: "OPEN",
} as const;

export default function UsesPage() {
  return (
    <Container>
      <div className="py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={12} />
          cd ~/dashboard
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            ~/uses
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-foreground">Uses </span>
            <span className="text-gradient-cyan">&amp; Now</span>
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            What I&apos;m working on right now + the stack behind the work.
          </p>
        </div>

        {/* NOW */}
        <div className="dash-card mb-3">
          <div className="dash-card-header">
            <span>~/now</span>
            <span className="text-accent-green">current focus</span>
          </div>
          <div className="dash-card-body space-y-3">
            {NOW.map((item) => (
              <div key={item.label} className="flex gap-3 font-mono text-sm">
                <span
                  className={`mt-0.5 shrink-0 text-[10px] font-semibold ${statusStyle[item.status]} w-[68px]`}
                >
                  [{statusLabel[item.status]}]
                </span>
                <div className="min-w-0">
                  <div className="text-foreground">{item.label}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* USES grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STACK.map((group) => (
            <div key={group.label} className="dash-card">
              <div className="dash-card-header">
                <span className="flex items-center gap-1.5">
                  <span className="text-accent">{group.icon}</span>
                  {group.label}
                </span>
                <span className="text-muted">{group.items.length}</span>
              </div>
              <div className="dash-card-body">
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border bg-surface/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-muted">
          Inspired by{" "}
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            uses.tech
          </a>{" "}
          · last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </div>
    </Container>
  );
}
