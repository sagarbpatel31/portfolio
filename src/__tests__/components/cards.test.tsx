import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock framer-motion (used by SkillsCard)
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { variants, initial, animate, exit, transition, whileHover, ...rest } = props;
      return <div ref={ref} {...rest}>{children}</div>;
    }),
  },
  useInView: () => true,
}));

import { ContactCard } from "@/components/cards/contact-card";
import { GitHubCard } from "@/components/cards/github-card";
import { SkillsCard } from "@/components/cards/skills-card";

describe("ContactCard", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("renders a hidden honeypot field", () => {
    const { container } = render(<ContactCard />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("shows inline feedback for an invalid email and clears it when fixed", async () => {
    const user = userEvent.setup();
    render(<ContactCard />);
    const email = screen.getByPlaceholderText("you@domain.com");

    await user.type(email, "notanemail");
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();

    await user.clear(email);
    await user.type(email, "real@example.com");
    expect(screen.queryByText("Enter a valid email address.")).not.toBeInTheDocument();
  });

  it("does not submit when the email is invalid", async () => {
    const user = userEvent.setup();
    render(<ContactCard />);
    await user.type(screen.getByPlaceholderText("Your name"), "Ada");
    await user.type(screen.getByPlaceholderText("you@domain.com"), "bad-email");
    await user.type(
      screen.getByPlaceholderText("What are you building? Let's talk."),
      "Hello there"
    );
    await user.click(screen.getByRole("button", { name: /TRANSMIT/ }));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows success after a valid submission", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactCard />);
    await user.type(screen.getByPlaceholderText("Your name"), "Ada");
    await user.type(screen.getByPlaceholderText("you@domain.com"), "ada@example.com");
    await user.type(
      screen.getByPlaceholderText("What are you building? Let's talk."),
      "Let's build something"
    );
    await user.click(screen.getByRole("button", { name: /TRANSMIT/ }));
    expect(await screen.findByText("TRANSMISSION SENT")).toBeInTheDocument();
  });

  it("shows a failure message that clears when the user edits the form", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    render(<ContactCard />);
    await user.type(screen.getByPlaceholderText("Your name"), "Ada");
    await user.type(screen.getByPlaceholderText("you@domain.com"), "ada@example.com");
    await user.type(
      screen.getByPlaceholderText("What are you building? Let's talk."),
      "Let's build something"
    );
    await user.click(screen.getByRole("button", { name: /TRANSMIT/ }));

    expect(await screen.findByText(/Transmission failed/)).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Your name"), "x");
    expect(screen.queryByText(/Transmission failed/)).not.toBeInTheDocument();
  });
});

describe("GitHubCard", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("shows an unavailable state when the API reports an error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ error: true }),
    });
    render(<GitHubCard />);
    expect(await screen.findByText("stats unavailable")).toBeInTheDocument();
    expect(screen.getAllByText("n/a")).toHaveLength(3);
  });

  it("renders real zeros distinctly from an error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ repos: 0, followers: 0, stars: 0 }),
    });
    render(<GitHubCard />);
    const zeros = await screen.findAllByText("0");
    expect(zeros).toHaveLength(3);
    expect(screen.queryByText("n/a")).not.toBeInTheDocument();
    expect(screen.getByText("live · updated hourly")).toBeInTheDocument();
  });

  it("renders real stats", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ repos: 12, followers: 34, stars: 56 }),
    });
    render(<GitHubCard />);
    expect(await screen.findByText("12")).toBeInTheDocument();
    expect(screen.getByText("34")).toBeInTheDocument();
    expect(screen.getByText("56")).toBeInTheDocument();
  });
});

describe("SkillsCard", () => {
  it("exposes each skill as an accessible progressbar", () => {
    render(<SkillsCard />);
    const bars = screen.getAllByRole("progressbar");
    expect(bars.length).toBeGreaterThan(0);
    bars.forEach((bar) => {
      expect(bar).toHaveAttribute("aria-valuenow");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
    });
  });
});
