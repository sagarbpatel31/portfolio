import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Ciena",
    role: "Senior Embedded Software Engineer",
    period: "May 2024 – Present",
    location: "Remote, USA",
    description:
      "Own embedded Linux networking firmware and edge AI infrastructure for logistics gateways where throughput, recovery behavior, and deployment reliability directly affect warehouse operations.",
    highlights: [
      "Improved sustained gateway throughput by 31% during peak fulfillment windows by reworking packet-processing paths, DMA movement, and interrupt behavior in embedded Linux networking firmware",
      "Owned Yocto platform work across BSP upgrades, secure boot, CI validation, and release readiness, cutting hardware bring-up and deployment timelines by 24%",
      "Added watchdog recovery, failover handling, and deterministic latency validation so the platform stayed predictable under power, thermal, and network stress",
      "Built Jetson Orin inference pipelines with CUDA and TensorRT for conveyor and sorter anomaly detection, reducing unplanned operational downtime by 22%",
      "Integrated DeepStream video and telemetry flows across multiple sensors, improving fault-localization accuracy by 27% in high-throughput warehouse environments",
      "Used Nsight Systems and system-level profiling to turn GPU and networking work into a measurable latency budget rather than a best-effort pipeline",
    ],
    tags: [
      "Embedded Linux",
      "Yocto",
      "Jetson Orin",
      "CUDA",
      "TensorRT",
      "DeepStream",
      "DMA",
      "Python",
    ],
  },
  {
    company: "Cisco Systems",
    role: "Embedded Software Engineer",
    period: "Jan 2023 – Apr 2024",
    location: "Austin, TX",
    description:
      "Built switching and telemetry systems across the host, data plane, and DPU boundary, with a focus on carrier-grade stability, policy isolation, and traffic intelligence.",
    highlights: [
      "Improved forwarding stability and reduced packet loss by 31% in large-scale validation by integrating P4-programmable pipelines with switching ASIC SDK behavior more cleanly",
      "Shipped Yocto-based platform components spanning secure boot, telemetry drivers, and CI flows, moving multi-router readiness forward by 21% for carrier certification",
      "Built AI-assisted traffic intelligence on BlueField DPUs with DOCA pipelines and ONNX models, improving encrypted anomaly classification accuracy by 24%",
      "Connected real-time inference to streaming gRPC telemetry so congestion issues surfaced earlier, cutting root-cause time by 34% across distributed carrier networks",
      "Reduced host CPU utilization by 29% through better DPU offload scheduling and profiling-driven workload placement while maintaining stable throughput under peak traffic",
    ],
    tags: [
      "P4",
      "ASIC SDK",
      "Yocto",
      "BlueField",
      "DOCA",
      "ONNX",
      "gRPC",
      "Python",
    ],
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Embedded Software Engineer",
    period: "Jul 2020 – Aug 2021",
    location: "Remote, India",
    description:
      "Worked close to the hardware on telecom edge nodes, building firmware, drivers, and secure deployment paths for carrier-grade ARM systems.",
    highlights: [
      "Improved reliable delivery by 28% under bursty carrier traffic by implementing multicast replication and QoS shaping in bare-metal RTOS firmware",
      "Cut packet jitter by 35% by writing kernel modules and Ethernet drivers that used memory and DMA paths more efficiently on ARM-based edge hardware",
      "Moved secure field rollout forward by 18 days by tying bootloader work, firmware authentication, and MISRA-C discipline into the deployment path",
      "Reduced protocol error rates by 26% through Layer 2/3 stack tuning, fault injection, and JTAG-driven debugging on stress-tested network scenarios",
      "Lowered cross-process synchronization overhead by 32% using Buildroot-based Linux configuration and device-tree-backed real-time IPC paths",
    ],
    tags: [
      "RTOS",
      "ARM",
      "C",
      "Device Drivers",
      "DMA",
      "Buildroot",
      "JTAG",
      "MISRA-C",
    ],
  },
];
