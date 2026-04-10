import { Education, Certification } from "@/types";

export const education: Education[] = [
  {
    degree: "M.S. in Computer Science",
    university: "Sofia University",
    period: "Oct 2025 – Jun 2027",
    location: "CA, USA",
    coursework: [
      "Advanced Algorithms",
      "Machine Learning",
      "Distributed Systems",
      "AI Systems",
    ],
  },
  {
    degree: "M.S. in Embedded and Cyber Physical Systems",
    university: "University of California, Irvine",
    period: "Sep 2021 – Dec 2022",
    location: "CA, USA",
    coursework: [
      "Embedded Systems",
      "Cyber Physical Systems",
      "Real-Time Operating Systems",
      "IoT Systems",
      "Digital Signal Processing",
    ],
  },
  {
    degree: "B.Tech",
    university: "Charotar University of Science and Technology",
    period: "Jul 2017 – Jun 2021",
    location: "Gujarat, India",
    coursework: [
      "Data Structures & Algorithms",
      "Computer Networks",
      "Operating Systems",
      "Microprocessors",
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: "NVIDIA-Certified Associate: Generative AI LLMs (NCA-GENL)",
    issuer: "NVIDIA",
  },
];
