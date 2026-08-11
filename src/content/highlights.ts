import { Highlight } from "@/types";

export const highlights: Highlight[] = [
  {
    title: "Earned 5 hackathon and bounty recognitions in 2026",
    description:
      "Won two XG1 robotics tracks, won with the HydraSwarm multi-agent system, placed in the top 10 of HydraDB's July bug bounty, and was selected as one of 10 HydraDB Docs winners for a retrieval-quality evaluation lab.",
    metric: "5 technical wins",
    tags: ["HydraDB", "Reliability", "Multi-Agent AI", "Robotics"],
  },
  {
    title: "31% throughput improvement on logistics edge gateways",
    description:
      "At Ciena, optimized embedded Linux networking firmware — packet processing pipelines, DMA transfer paths, and interrupt handling — to boost sustained throughput by 31% during peak fulfillment operations.",
    metric: "31% throughput gain",
    tags: ["Embedded Linux", "DMA", "Packet Processing", "Yocto"],
  },
  {
    title: "Building TraceMind: incident intelligence for robotics",
    description:
      "Startup project — an end-to-end incident analysis platform for ROS2 and edge AI systems. Captures telemetry across the stack and generates replayable failure bundles with AI-assisted root-cause analysis.",
    tags: ["ROS2", "FastAPI", "Go", "PostgreSQL"],
  },
  {
    title: "AI traffic intelligence on BlueField DPUs at Cisco",
    description:
      "Integrated DOCA pipelines and ONNX inference models on NVIDIA BlueField DPUs for encrypted anomaly classification, improving accuracy by 24% and reducing host CPU utilization by 29%.",
    metric: "29% less host CPU",
    tags: ["BlueField", "DOCA", "ONNX", "gRPC"],
  },
  {
    title: "Edge AI on Jetson Orin cut unplanned downtime by 22%",
    description:
      "At Ciena, deployed CUDA and TensorRT inference pipelines on Jetson Orin for real-time conveyor and sorter anomaly detection. Built DeepStream video and telemetry pipelines that improved fault localization by 27%.",
    metric: "22% less downtime",
    tags: ["Jetson Orin", "CUDA", "TensorRT", "DeepStream"],
  },
];
