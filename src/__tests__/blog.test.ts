import fs from "fs";
import matter from "gray-matter";

jest.mock("fs");
jest.mock("gray-matter");

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedMatter = matter as unknown as jest.Mock;

describe("getAllPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(["good.mdx", "bad.mdx"] as never);
    mockedFs.readFileSync.mockImplementation((p) =>
      String(p).includes("bad") ? "BAD" : "GOOD"
    );
    mockedMatter.mockImplementation((input: string) => {
      if (input === "BAD") throw new Error("malformed frontmatter");
      return {
        data: { title: "Good Post", date: "2024-01-01", tags: ["x"] },
        content: "Some readable body content here.",
      };
    });
  });

  it("skips a malformed post instead of throwing, and memoizes the result", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    const { getAllPosts } = require("@/lib/blog");

    const first = getAllPosts();
    expect(first).toHaveLength(1);
    expect(first[0].slug).toBe("good");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("bad.mdx")
    );

    // Second call is served from the module-level cache (no extra fs read).
    mockedFs.readdirSync.mockClear();
    const second = getAllPosts();
    expect(second).toBe(first);
    expect(mockedFs.readdirSync).not.toHaveBeenCalled();

    warn.mockRestore();
  });
});
