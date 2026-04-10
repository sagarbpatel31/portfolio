import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Ciena",
    role: "Senior Embedded Software Engineer",
    period: "May 2024 – Present",
    location: "Remote, USA",
    description:
      "Engineering embedded Linux networking firmware for logistics edge gateways and deploying edge AI inference on NVIDIA Jetson Orin.",
    highlights: [
      "Engineered embedded Linux networking firmware for logistics edge gateways, optimizing packet processing pipelines, DMA transfer paths, and interrupt handling to improve sustained throughput by 31% during peak fulfillment operations",
      "Led development of the embedded Linux platform using Yocto, performing BSP upgrades, secure boot integration, CI validation, and release management, reducing hardware bring-up and deployment timelines by 24%",
      "Implemented system reliability mechanisms including watchdog recovery, failover handling, and deterministic latency validation under varying power, thermal, and network conditions",
      "Developed edge AI inference pipelines on NVIDIA Jetson Orin using CUDA and TensorRT to detect conveyor and sorter anomalies in real time, reducing unplanned operational downtime by 22%",
      "Built DeepStream-based video and telemetry pipelines integrating multi-sensor data streams, improving fault localization accuracy by 27% during high-throughput warehouse processing",
      "Conducted GPU and system-level profiling using NVIDIA Nsight Systems to analyze memory bandwidth and kernel execution, optimizing AI inference pipelines and networking tasks for deterministic latency",
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
      "Built switching firmware with P4-programmable data-plane pipelines and AI-assisted traffic intelligence on NVIDIA BlueField DPUs.",
    highlights: [
      "Engineered switching firmware integrating P4-programmable data-plane pipelines with switching ASIC SDKs, improving forwarding stability and reducing packet loss by 31% during large-scale network validation",
      "Developed embedded Linux platform components using Yocto, including secure boot configuration, telemetry drivers, and CI pipelines, accelerating multi-router platform readiness by 21% for carrier certification",
      "Implemented AI-assisted traffic intelligence using NVIDIA BlueField DPUs, integrating DOCA pipelines and ONNX inference models to improve encrypted anomaly classification accuracy by 24%",
      "Integrated real-time inference with streaming gRPC telemetry pipelines, enabling predictive congestion detection and reducing root-cause analysis time by 34% across distributed carrier networks",
      "Optimized DPU offload scheduling and inference workloads through DOCA profiling tools, reducing host CPU utilization by 29% while maintaining stable throughput under peak traffic conditions",
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
      "Developed bare-metal RTOS firmware and embedded Linux systems for ARM-based telecom edge nodes in carrier-grade networking environments.",
    highlights: [
      "Developed bare-metal RTOS firmware for ARM-based telecom edge nodes, implementing multicast packet replication and QoS traffic shaping to boost reliable delivery rates by 28% under bursty carrier loads",
      "Wrote custom kernel modules and device drivers for high-speed Ethernet interfaces, enabling efficient memory management and DMA engines that cut packet jitter by 35% in distributed network deployments",
      "Integrated bootloader development with firmware authentication and MISRA-C compliant coding, streamlining secure deployment across multi-vendor platforms and advancing field rollout by 18 days",
      "Optimized Layer 2/3 networking stacks with fault injection testing and JTAG debugging, enhancing protocol stability and reducing error rates by 26% during stress-tested edge scenarios",
      "Configured embedded Linux using Buildroot and device tree overlays for real-time IPC mechanisms, improving cross-process coordination and cutting synchronization overhead by 32% in carrier-grade environments",
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
