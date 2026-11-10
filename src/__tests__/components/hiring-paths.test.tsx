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
  it("exposes tailored role paths without adding another homepage section", () => {
    render(<HomeDirectory postCount={89} />);

    expect(screen.getByRole("link", { name: /Role Fit/ })).toHaveAttribute("href", "/roles");
    expect(screen.getByText("3 hiring paths")).toBeInTheDocument();
    expect(screen.getByText("89 notes")).toBeInTheDocument();
  });
});
