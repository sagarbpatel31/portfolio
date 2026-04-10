import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

describe("Button", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: "Outline" });
    expect(btn.className).toContain("border");
  });

  it("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button", { name: "Ghost" });
    expect(btn).toBeInTheDocument();
  });

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  it("applies size variants", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toContain("h-8");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button").className).toContain("h-12");
  });

  it("forwards additional className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });

  it("supports disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag")).toBeInTheDocument();
  });

  it("renders with outline variant", () => {
    render(<Badge variant="outline">Outline Tag</Badge>);
    const badge = screen.getByText("Outline Tag");
    expect(badge.className).toContain("border");
  });

  it("forwards additional className", () => {
    render(<Badge className="extra">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("extra");
  });
});

describe("Card", () => {
  it("renders card with header, content, and footer", () => {
    render(
      <Card>
        <CardHeader>
          <h3>Title</h3>
        </CardHeader>
        <CardContent>
          <p>Body content</p>
        </CardContent>
        <CardFooter>
          <span>Footer</span>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies card styling", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-card");
    expect(card.className).toContain("border");
    expect(card.className).toContain("rounded-xl");
  });
});

describe("Container", () => {
  it("renders children with max-width constraint", () => {
    const { container } = render(<Container>Content</Container>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("max-w-6xl");
    expect(div.className).toContain("mx-auto");
  });

  it("forwards additional className", () => {
    const { container } = render(<Container className="extra">Content</Container>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("extra");
  });
});

describe("SectionHeading", () => {
  it("renders title", () => {
    render(<SectionHeading title="My Section" />);
    expect(screen.getByText("My Section")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<SectionHeading title="Title" subtitle="A description" />);
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<SectionHeading title="Title" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(0);
  });

  it("centers content when align is center", () => {
    const { container } = render(<SectionHeading title="Centered" align="center" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("text-center");
  });
});
