import type {
  Project,
  Experience,
  Skill,
  Award,
  Social,
  BlogPost,
  Education,
  Certification,
} from "@/types";

describe("TypeScript interfaces", () => {
  it("Project interface accepts valid data", () => {
    const project: Project = {
      slug: "test-project",
      title: "Test Project",
      tagline: "A test project",
      description: "Description",
      longDescription: "Long description",
      tags: ["TypeScript"],
      category: "Test",
      highlights: ["Highlight 1"],
      featured: true,
      year: "2024",
    };
    expect(project.slug).toBe("test-project");
  });

  it("Project interface accepts optional fields", () => {
    const project: Project = {
      slug: "test",
      title: "Test",
      tagline: "Tag",
      description: "Desc",
      longDescription: "Long",
      tags: ["TS"],
      category: "Test",
      highlights: ["H1"],
      featured: false,
      year: "2024",
      metrics: ["100% coverage"],
      links: [{ label: "GitHub", url: "https://github.com" }],
    };
    expect(project.metrics).toHaveLength(1);
    expect(project.links).toHaveLength(1);
  });

  it("Experience interface accepts valid data", () => {
    const exp: Experience = {
      company: "Acme",
      role: "Engineer",
      period: "2024",
      location: "Remote",
      description: "Did stuff",
      highlights: ["Built things"],
      tags: ["Go"],
    };
    expect(exp.company).toBe("Acme");
  });

  it("Skill interface accepts valid data", () => {
    const skill: Skill = {
      category: "Languages",
      items: ["TypeScript", "Python"],
    };
    expect(skill.items).toHaveLength(2);
  });

  it("Award interface accepts valid data", () => {
    const award: Award = {
      title: "Best Project",
      event: "Hackathon",
      year: "2024",
      description: "Won first place",
    };
    expect(award.title).toBe("Best Project");
  });

  it("Social interface accepts valid data", () => {
    const social: Social = {
      name: "GitHub",
      url: "https://github.com",
      icon: "github",
    };
    expect(social.icon).toBe("github");
  });

  it("BlogPost interface accepts valid data", () => {
    const post: BlogPost = {
      slug: "test-post",
      title: "Test Post",
      date: "2024-01-01",
      readingTime: "3 min read",
      tags: ["testing"],
      excerpt: "A test post",
      content: "# Hello world",
    };
    expect(post.slug).toBe("test-post");
  });

  it("Education interface accepts valid data", () => {
    const edu: Education = {
      degree: "B.S. Computer Science",
      university: "MIT",
      period: "2020-2024",
      coursework: ["Algorithms"],
    };
    expect(edu.degree).toBeTruthy();
  });

  it("Certification interface accepts valid data", () => {
    const cert: Certification = {
      title: "AWS Certified",
      issuer: "Amazon",
    };
    expect(cert.issuer).toBe("Amazon");
  });
});
