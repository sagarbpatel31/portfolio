import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock framer-motion to render children directly
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <div ref={ref} {...filterDomProps(props)}>{children}</div>
    )),
    h1: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <h1 ref={ref} {...filterDomProps(props)}>{children}</h1>
    )),
    p: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <p ref={ref} {...filterDomProps(props)}>{children}</p>
    )),
    header: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <header ref={ref} {...filterDomProps(props)}>{children}</header>
    )),
    nav: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <nav ref={ref} {...filterDomProps(props)}>{children}</nav>
    )),
    li: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <li ref={ref} {...filterDomProps(props)}>{children}</li>
    )),
    a: React.forwardRef(({ children, ...props }: any, ref: any) => (
      <a ref={ref} {...filterDomProps(props)}>{children}</a>
    )),
  },
  useInView: () => true,
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

function filterDomProps(props: Record<string, any>) {
  const filtered: Record<string, any> = {};
  const ignore = new Set([
    "variants", "initial", "animate", "exit", "transition",
    "whileHover", "whileTap", "layout",
  ]);
  for (const [key, value] of Object.entries(props)) {
    if (!ignore.has(key)) filtered[key] = value;
  }
  return filtered;
}

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  );
});

jest.mock("next/image", () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} />
  );
});

jest.mock("@/lib/use-active-section", () => ({
  useActiveSection: () => "hero",
}));

jest.mock("@/components/terminal", () => ({
  Terminal: () => <div data-testid="terminal">Terminal Mock</div>,
}));

import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Awards } from "@/components/sections/awards";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

describe("Hero section", () => {
  beforeEach(() => render(<Hero />));

  it("renders the name", () => {
    expect(screen.getByText("Sagar")).toBeInTheDocument();
    expect(screen.getByText("Patel")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    expect(screen.getByText(/Open to Physical AI.*Forward Deployed/)).toBeInTheDocument();
  });

  it("renders role domains terminal", () => {
    expect(screen.getByText("~/")).toBeInTheDocument();
  });

  it("renders tagline", () => {
    expect(screen.getByText(/Building production software from silicon to multi-agent AI/)).toBeInTheDocument();
  });

  it("has View Dashboard CTA linking to dashboard", () => {
    expect(screen.getByRole("link", { name: /View Dashboard/ })).toHaveAttribute("href", "#dashboard");
  });

  it("has Resume download CTA", () => {
    expect(screen.getByRole("link", { name: /Resume/ })).toHaveAttribute("href", "/resume");
  });

  it("has GitHub and LinkedIn social links", () => {
    const links = screen.getAllByRole("link");
    expect(links.find((l) => l.getAttribute("aria-label") === "GitHub")).toBeTruthy();
    expect(links.find((l) => l.getAttribute("aria-label") === "LinkedIn")).toBeTruthy();
  });

  it("has section id", () => {
    expect(document.getElementById("hero")).toBeTruthy();
  });
});

describe("Highlights section", () => {
  beforeEach(() => render(<Highlights />));

  it("renders work_i'm_proud_of heading", () => {
    expect(screen.getByText(/work_i'm_proud_of/i)).toBeInTheDocument();
  });

  it("renders highlight titles", () => {
    expect(screen.getByText(/Won 2 awards at a national hackathon/)).toBeInTheDocument();
    expect(screen.getByText(/31% throughput improvement on logistics/)).toBeInTheDocument();
  });

  it("renders metrics", () => {
    expect(screen.getByText("2 hackathon wins")).toBeInTheDocument();
    expect(screen.getByText("31% throughput gain")).toBeInTheDocument();
  });

  it("renders tech tags", () => {
    expect(screen.getAllByText("DeepLake").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Yocto").length).toBeGreaterThan(0);
  });

  it("has section id", () => {
    expect(document.getElementById("highlights")).toBeTruthy();
  });
});

describe("About section", () => {
  beforeEach(() => render(<About />));

  it("renders about_me heading", () => {
    expect(screen.getByText("about_me")).toBeInTheDocument();
  });

  it("renders bio text", () => {
    expect(screen.getByText(/full stack of physical AI/)).toBeInTheDocument();
  });

  it("renders focus areas", () => {
    expect(screen.getByText("Embedded Linux & BSP")).toBeInTheDocument();
    expect(screen.getByText("Physical AI & Robotics")).toBeInTheDocument();
  });

  it("renders open to list", () => {
    expect(screen.getByText("Embedded software engineering")).toBeInTheDocument();
  });

  it("has section id", () => {
    expect(document.getElementById("about")).toBeTruthy();
  });
});

describe("Experience section", () => {
  beforeEach(() => render(<Experience />));

  it("renders work_experience heading", () => {
    expect(screen.getByText("work_experience")).toBeInTheDocument();
  });

  it("renders all three experiences", () => {
    expect(screen.getByText("Ciena")).toBeInTheDocument();
    expect(screen.getByText("Cisco Systems")).toBeInTheDocument();
    expect(screen.getByText(/Tata Consultancy Services/)).toBeInTheDocument();
  });

  it("renders roles", () => {
    expect(screen.getByText("Senior Embedded Software Engineer")).toBeInTheDocument();
    expect(screen.getAllByText("Embedded Software Engineer").length).toBeGreaterThanOrEqual(2);
  });

  it("renders tech tags", () => {
    expect(screen.getByText("Jetson Orin")).toBeInTheDocument();
    expect(screen.getByText("RTOS")).toBeInTheDocument();
  });

  it("has section id", () => {
    expect(document.getElementById("experience")).toBeTruthy();
  });
});

describe("Projects section", () => {
  beforeEach(() => render(<Projects />));

  it("renders projects heading", () => {
    expect(screen.getByText(/prototype to production/)).toBeInTheDocument();
  });

  it("renders project titles", () => {
    expect(screen.getAllByText(/Watchpoint/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/HydraSwarm/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Offline OTA/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Embodipedia/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/CodebaseOS/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/StepAhead/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/SignalForge/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/XG1/).length).toBeGreaterThan(0);
  });

  it("renders category filter tabs", () => {
    const buttons = screen.getAllByRole("button");
    const tabLabels = buttons.map((b) => b.textContent);
    expect(tabLabels).toContain("All");
    expect(tabLabels).toContain("Robotics & AI");
  });

  it("filters projects by category", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("Physical AI & Robotics"));
    expect(screen.getAllByText(/XG1/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Watchpoint/)).not.toBeInTheDocument();
  });

  it("project cards link to detail pages", () => {
    const link = screen.getByRole("link", { name: /Watchpoint/ });
    expect(link).toHaveAttribute("href", "/projects/watchpoint");
  });

  it("has section id", () => {
    expect(document.getElementById("projects")).toBeTruthy();
  });
});

describe("Skills section", () => {
  beforeEach(() => render(<Skills />));

  it("renders tech_stack heading", () => {
    expect(screen.getByText("tech_stack")).toBeInTheDocument();
  });

  it("renders all skill categories", () => {
    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
    expect(screen.getByText("Embedded Systems")).toBeInTheDocument();
    expect(screen.getByText("Edge AI & NVIDIA Platforms")).toBeInTheDocument();
  });

  it("renders individual skill items", () => {
    expect(screen.getByText("C++")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("has section id", () => {
    expect(document.getElementById("skills")).toBeTruthy();
  });
});

describe("Education section", () => {
  beforeEach(() => render(<Education />));

  it("renders degrees", () => {
    expect(screen.getByText("M.S. in Computer Science")).toBeInTheDocument();
    expect(screen.getByText(/Embedded and Cyber Physical Systems/)).toBeInTheDocument();
    expect(screen.getByText("B.Tech")).toBeInTheDocument();
  });

  it("renders universities", () => {
    expect(screen.getByText("Sofia University")).toBeInTheDocument();
    expect(screen.getByText(/University of California, Irvine/)).toBeInTheDocument();
  });

  it("renders coursework", () => {
    expect(screen.getByText("Machine Learning")).toBeInTheDocument();
  });

  it("renders certifications", () => {
    expect(screen.getByText(/Generative AI LLMs/)).toBeInTheDocument();
  });

  it("has section id", () => {
    expect(document.getElementById("education")).toBeTruthy();
  });
});

describe("Awards section", () => {
  beforeEach(() => render(<Awards />));

  it("renders achievements heading", () => {
    expect(screen.getByText("achievements")).toBeInTheDocument();
  });

  it("renders hackathon awards", () => {
    expect(screen.getByText(/Best Overall Use of DeepLake/)).toBeInTheDocument();
    expect(screen.getAllByText(/NomadicML/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/HydraSwarm/).length).toBeGreaterThan(0);
  });

  it("has section id", () => {
    expect(document.getElementById("awards")).toBeTruthy();
  });
});

describe("Blog section", () => {
  const mockPosts = [
    {
      slug: "test-post",
      title: "Test Blog Post",
      date: "2024-06-01",
      readingTime: "5 min read",
      tags: ["testing", "jest"],
      excerpt: "This is a test post excerpt",
      content: "# Test content",
    },
  ];

  beforeEach(() => render(<Blog posts={mockPosts} />));

  it("renders writing heading", () => {
    expect(screen.getByText("writing")).toBeInTheDocument();
  });

  it("renders post title", () => {
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });

  it("renders post metadata", () => {
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("links to blog detail page", () => {
    const link = screen.getByRole("link", { name: /Test Blog Post/ });
    expect(link).toHaveAttribute("href", "/blog/test-post");
  });

  it("has section id", () => {
    expect(document.getElementById("blog")).toBeTruthy();
  });
});

describe("Contact section", () => {
  beforeEach(() => render(<Contact />));

  it("renders get_in_touch heading", () => {
    expect(screen.getByText("get_in_touch")).toBeInTheDocument();
  });

  it("renders CTA copy", () => {
    expect(screen.getByText(/build something/)).toBeInTheDocument();
    expect(screen.getByText(/that matters/)).toBeInTheDocument();
  });

  it("has email send link", () => {
    const emailLink = screen.getByRole("link", { name: /Send an Email/ });
    expect(emailLink).toHaveAttribute("href", "mailto:sagar@myjobemails.com");
  });

  it("has copy email button", () => {
    expect(screen.getByRole("button", { name: /Copy Email/ })).toBeInTheDocument();
  });

  it("has GitHub and LinkedIn links", () => {
    expect(screen.getByRole("link", { name: /GitHub/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toBeInTheDocument();
  });

  it("has section id", () => {
    expect(document.getElementById("contact")).toBeTruthy();
  });
});
