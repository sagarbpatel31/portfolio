import React from "react";
import { render, screen } from "@testing-library/react";
import { ArchitectureFlow } from "@/components/architecture-flow";
import { HomeDirectory } from "@/components/sections/home-directory";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href?.toString()} {...props}>
      {children}
    </a>
  );
});

describe("ArchitectureFlow", () => {
  it("renders every architecture stage in order", () => {
    render(<ArchitectureFlow steps={["Signed bundle", "Validator", "Rollback"]} />);

    expect(screen.getByLabelText("Architecture flow")).toBeInTheDocument();
    expect(screen.getByText("stage 01")).toBeInTheDocument();
    expect(screen.getByText("stage 03")).toBeInTheDocument();
    expect(screen.getByText("Signed bundle")).toBeInTheDocument();
    expect(screen.getByText("Validator")).toBeInTheDocument();
    expect(screen.getByText("Rollback")).toBeInTheDocument();
  });
});

describe("HomeDirectory", () => {
  it("links directly to each tailored role page", () => {
    render(<HomeDirectory />);

    expect(screen.getByRole("link", { name: /Firmware & Platform Validation/ })).toHaveAttribute("href", "/roles/firmware-platform-validation");
    expect(screen.getByRole("link", { name: /Embedded Systems/ })).toHaveAttribute("href", "/roles/embedded-systems");
    expect(screen.getByRole("link", { name: /Edge AI & Robotics/ })).toHaveAttribute("href", "/roles/edge-ai-robotics");
  });
});
