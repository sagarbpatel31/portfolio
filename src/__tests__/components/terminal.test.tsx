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
});
