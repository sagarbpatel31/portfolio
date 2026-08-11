import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Terminal } from "@/components/terminal";

describe("Terminal", () => {
  it("renders the prompt and command guidance", () => {
    render(<Terminal />);

    expect(
      screen.getByText(/Welcome to SAGAR_OS/)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Terminal input")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Run terminal command" })
    ).toBeInTheDocument();
  });

  it("runs the help command", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal input"), "help");
    await user.click(
      screen.getByRole("button", { name: "Run terminal command" })
    );

    expect(screen.getByText("Available commands:")).toBeInTheDocument();
    expect(screen.getByText(/about\s+— Who I am/)).toBeInTheDocument();
  });

  it("summarizes technical recognition with the wins command", async () => {
    const user = userEvent.setup();
    render(<Terminal />);

    await user.type(screen.getByLabelText("Terminal input"), "wins");
    await user.click(
      screen.getByRole("button", { name: "Run terminal command" })
    );

    expect(
      screen.getByText("5 technical recognitions across 4 events")
    ).toBeInTheDocument();
    expect(screen.getByText(/HydraDB Docs Winner/)).toBeInTheDocument();
    expect(screen.getByText("Full summaries and evidence: /wins")).toBeInTheDocument();
  });
});
