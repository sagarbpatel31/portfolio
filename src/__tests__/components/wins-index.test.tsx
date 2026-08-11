import { render, screen } from "@testing-library/react";
import { WinsIndex } from "@/components/wins-index";

describe("WinsIndex", () => {
  beforeEach(() => render(<WinsIndex />));

  it("summarizes the recognition record", () => {
    expect(
      screen.getByRole("heading", { name: "Proof from shipping, testing, and teaching." })
    ).toBeInTheDocument();
    expect(screen.getByText("technical recognitions")).toBeInTheDocument();
    expect(screen.getByText("HydraDB wins")).toBeInTheDocument();
  });

  it("shows the HydraDB Docs winning contribution and public pull request", () => {
    expect(screen.getByText(/HydraDB Docs Winner/)).toBeInTheDocument();
    expect(screen.getByText(/31 passing Node.js tests/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /PR #184/ })).toHaveAttribute(
      "href",
      "https://github.com/usecortex/mintlify-docs/pull/184"
    );
  });

  it("shows the verified bug bounty placement and focus", () => {
    expect(screen.getByText(/Ingestion Write-Safety Audit/)).toBeInTheDocument();
    expect(screen.getByText(/top 10 among more than 20 submissions/)).toBeInTheDocument();
    expect(screen.getByText(/upsert semantics and 0-byte or empty-success paths/)).toBeInTheDocument();
  });
});
