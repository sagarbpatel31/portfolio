import { render, screen } from "@testing-library/react";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  );
});

import { ProcessCard } from "@/components/cards/process-card";
import { TimelineCard } from "@/components/cards/timeline-card";
import { EduCard } from "@/components/cards/edu-card";
import { ActivityCard } from "@/components/cards/activity-card";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";

describe("ProcessCard", () => {
  beforeEach(() => render(<ProcessCard />));

  it("lists every project as a process linking to its detail page", () => {
    expect(screen.getByText(`${projects.length} processes`)).toBeInTheDocument();
    const watchpoint = screen.getByText("Watchpoint").closest("a");
    expect(watchpoint).toHaveAttribute("href", "/projects/watchpoint");
  });
});

describe("TimelineCard", () => {
  beforeEach(() => render(<TimelineCard />));

  it("renders a deployment entry per experience", () => {
    expect(screen.getByText(`${experiences.length} deployments`)).toBeInTheDocument();
    expect(screen.getByText(/Ciena/)).toBeInTheDocument();
  });
});

describe("EduCard", () => {
  beforeEach(() => render(<EduCard />));

  it("renders degrees and certifications", () => {
    expect(screen.getByText("M.S. in Computer Science")).toBeInTheDocument();
    expect(screen.getByText("Sofia University", { exact: false })).toBeInTheDocument();
  });
});

describe("ActivityCard", () => {
  const blogEntries = [
    { slug: "test-post", title: "Test Post", date: "2025-01-01" },
  ];

  beforeEach(() => render(<ActivityCard blogEntries={blogEntries} />));

  it("merges awards and blog posts into one sorted feed", () => {
    expect(screen.getByText("POST: Test Post")).toBeInTheDocument();
    expect(screen.getAllByText(/WON:/).length).toBeGreaterThan(0);
    const post = screen.getByText("POST: Test Post").closest("a");
    expect(post).toHaveAttribute("href", "/blog/test-post");
  });
});
