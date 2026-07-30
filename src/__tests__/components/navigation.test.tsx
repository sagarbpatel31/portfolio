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
    a: React.forwardRef(({ children, ...props }: any, ref: any) => {
      const { variants, initial, animate, exit, transition, ...rest } = props;
      return <a ref={ref} {...rest}>{children}</a>;
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

  it("renders S monogram badge", () => {
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("renders SAGAR_OS branding", () => {
    expect(screen.getByText(/SAGAR/)).toBeInTheDocument();
    expect(screen.getByText(/OS/)).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    expect(screen.getByText("/home")).toBeInTheDocument();
    expect(screen.getByText("/work")).toBeInTheDocument();
    expect(screen.getByText("/writing")).toBeInTheDocument();
    expect(screen.getByText("/stack")).toBeInTheDocument();
    expect(screen.getByText("/resume")).toBeInTheDocument();
  });

  it("nav links use correct hrefs", () => {
    const homeLink = screen.getByText("/home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
    const workLink = screen.getByText("/work").closest("a");
    expect(workLink).toHaveAttribute("href", "/projects");
  });

  it("resume link points to the ATS resume page", () => {
    const resumeLink = screen.getByText("/resume").closest("a");
    expect(resumeLink).toHaveAttribute("href", "/resume");
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
    expect(screen.getByText("/home")).toBeInTheDocument();
    expect(screen.getByText("/work")).toBeInTheDocument();
    expect(screen.getByText("/writing")).toBeInTheDocument();
    expect(screen.getByText("/stack")).toBeInTheDocument();
    expect(screen.getByText("/resume")).toBeInTheDocument();
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
    await user.click(screen.getByText("/home"));
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
  it("renders null (replaced by StatusBar)", () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).toBe("");
  });
});
