import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { variants, initial, animate, exit, transition, ...rest } = props;
      return <div ref={ref} {...rest}>{children}</div>;
    }),
    nav: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { variants, initial, animate, exit, transition, ...rest } = props;
      return <nav ref={ref} {...rest}>{children}</nav>;
    }),
    li: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { variants, initial, animate, exit, transition, ...rest } = props;
      return <li ref={ref} {...rest}>{children}</li>;
    }),
  },
  useInView: () => true,
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the scroll-spy hook
jest.mock("@/lib/use-active-section", () => ({
  useActiveSection: () => "about",
}));

import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

describe("Navbar", () => {
  beforeEach(() => render(<Navbar />));

  it("renders SP monogram", () => {
    expect(screen.getByText("SP")).toBeInTheDocument();
  });

  it("renders name", () => {
    expect(screen.getByText("Sagar Patel")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("nav links use anchor hrefs", () => {
    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink).toHaveAttribute("href", "#about");
  });

  it("highlights active section", () => {
    // useActiveSection is mocked to return "about"
    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink?.className).toContain("text-accent");
  });

  it("has GitHub social link", () => {
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toHaveAttribute("href", "https://github.com/sagarbpatel31");
  });

  it("has LinkedIn social link", () => {
    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/sagarp31");
  });

  it("has mobile menu button", () => {
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("has correct banner role", () => {
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("has main navigation aria-label", () => {
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });
});

describe("MobileNav", () => {
  it("renders nothing when closed", () => {
    const { container } = render(<MobileNav isOpen={false} onClose={() => {}} />);
    expect(container.querySelector("[role='dialog']")).not.toBeInTheDocument();
  });

  it("renders nav links when open", () => {
    render(<MobileNav isOpen={true} onClose={() => {}} />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("has close button", () => {
    render(<MobileNav isOpen={true} onClose={() => {}} />);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = jest.fn();
    render(<MobileNav isOpen={true} onClose={onClose} />);
    const user = userEvent.setup();
    await user.click(screen.getByLabelText("Close menu"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when nav link is clicked", async () => {
    const onClose = jest.fn();
    render(<MobileNav isOpen={true} onClose={onClose} />);
    const user = userEvent.setup();
    await user.click(screen.getByText("About"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has social links", () => {
    render(<MobileNav isOpen={true} onClose={() => {}} />);
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("has dialog role when open", () => {
    render(<MobileNav isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  beforeEach(() => render(<Footer />));

  it("renders copyright with current year", () => {
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders Sagar Patel copyright", () => {
    expect(screen.getByText(/Sagar Patel/)).toBeInTheDocument();
  });

  it("has social links", () => {
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("has contentinfo role", () => {
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("has social links navigation", () => {
    expect(screen.getByRole("navigation", { name: "Social links" })).toBeInTheDocument();
  });
});
