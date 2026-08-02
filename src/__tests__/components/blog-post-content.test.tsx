import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { BlogPostContent } from "@/components/blog-post-content";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}));

jest.mock("next/link", () => {
  return ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe("BlogPostContent", () => {
  it("renders Markdown tables and ordered lists semantically", () => {
    const content = [
      "| Resource | Limit |",
      "| --- | --- |",
      "| Memory | 512 MB |",
      "",
      "1. Start the service",
      "2. Validate recovery",
    ].join("\n");

    render(<BlogPostContent content={content} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Resource" })
    ).toBeInTheDocument();
    expect(screen.getByText("512 MB")).toBeInTheDocument();
    expect(screen.getByRole("list")).toHaveClass("list-decimal");
    expect(screen.getByText("Validate recovery")).toBeInTheDocument();
  });
});
