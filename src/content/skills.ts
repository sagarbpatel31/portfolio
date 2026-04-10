import { Skill } from "@/types";

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["C", "C++", "Python", "TypeScript", "Bash"],
  },
  {
    category: "Embedded & Systems",
    items: [
      "Embedded Linux",
      "RTOS",
      "Yocto",
      "Buildroot",
      "BSP",
      "Device Drivers",
      "ARM",
      "DMA",
      "JTAG",
      "MISRA-C",
    ],
  },
  {
    category: "Networking & Data Plane",
    items: [
      "DPDK",
      "TCP/IP",
      "L2/L3 Networking",
      "Packet Processing",
      "gRPC",
      "ASIC SDKs",
      "QoS",
    ],
  },
  {
    category: "AI/ML & Edge",
    items: [
      "CUDA",
      "TensorRT",
      "DeepStream",
      "cuDNN",
      "ONNX",
      "DOCA",
      "Jetson (Xavier/Orin)",
      "JetPack SDK",
      "Nsight Systems",
    ],
  },
  {
    category: "Web & Full Stack",
    items: [
      "Next.js",
      "React",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
  },
  {
    category: "Tools & Infrastructure",
    items: [
      "Git",
      "GDB",
      "Wireshark",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "CI/CD",
    ],
  },
];
