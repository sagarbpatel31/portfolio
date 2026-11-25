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

  it("preserves C++ examples and formats inline code without interpreting its punctuation", () => {
    const { container } = render(<BlogPostContent content={'Use `char *left*` and **verify**.\n\n```cpp\nif (count < 4 && ready) {\n  run();\n}\n```'} />);

    expect(screen.getByText("char *left*").tagName).toBe("CODE");
    expect(screen.getByText("verify").tagName).toBe("STRONG");
    expect(container.querySelector("pre code")).toHaveTextContent("count < 4 && ready");
  });

  it("renders literal HTML as text and limits links to supported destinations", () => {
    const { container } = render(<BlogPostContent content={'<img src=x onerror=alert(1)>\n\n[Unsafe](javascript:alert) [Reference](https://example.com/docs)'} />);

    expect(container.querySelector("img")).toBeNull();
    expect(screen.queryByRole("link", { name: "Unsafe" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reference" })).toHaveAttribute("rel", "noopener noreferrer");
  });
});
