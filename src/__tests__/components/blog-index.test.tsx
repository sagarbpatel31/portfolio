import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogIndex } from "@/components/blog-index";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  );
});

const posts = Array.from({ length: 14 }, (_, index) => {
  const number = index + 1;

  return {
    slug: `post-${number}`,
    title: `Post ${number}`,
    date: `2026-07-${String(number).padStart(2, "0")}`,
    readingTime: "2 min read",
    tags: [`Tag ${number}`],
    excerpt: `Excerpt for post ${number}`,
  };
});

describe("BlogIndex", () => {
  it("shows a concise first page and reveals more posts on demand", async () => {
    const user = userEvent.setup();
    render(<BlogIndex posts={posts} />);

    expect(screen.getByText("Post 12")).toBeInTheDocument();
    expect(screen.queryByText("Post 13")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show 2 more" }));

    expect(screen.getByText("Post 13")).toBeInTheDocument();
    expect(screen.getByText("Post 14")).toBeInTheDocument();
  });

  it("searches the full archive, including posts outside the first page", async () => {
    const user = userEvent.setup();
    render(<BlogIndex posts={posts} />);

    await user.type(screen.getByRole("textbox", { name: "Search blog posts" }), "Post 14");

    expect(screen.getByText("Post 14")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
  });

  it("matches multi-word queries regardless of word order", async () => {
    const user = userEvent.setup();
    render(<BlogIndex posts={posts} />);

    await user.type(
      screen.getByRole("textbox", { name: "Search blog posts" }),
      "14 Post"
    );

    expect(screen.getByText("Post 14")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
  });

  it("keeps the topic list collapsed until requested", async () => {
    const user = userEvent.setup();
    render(<BlogIndex posts={posts} />);

    expect(screen.queryByRole("button", { name: /Tag 14/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "+4 topics" }));
    expect(screen.getByRole("button", { name: /Tag 14/ })).toBeInTheDocument();
  });
});
