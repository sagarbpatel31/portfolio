import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Download,
  FolderKanban,
  Mail,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getRoleProfile, roleProfiles } from "@/content/roles";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import type { BlogPost, Project } from "@/types";

interface RolePageProps {
  params: Promise<{ slug: string }>;
}

const maturityTextClass: Record<Project["maturity"]["tone"], string> = {
  green: "text-accent-green",
  cyan: "text-accent",
  amber: "text-accent-amber",
};

export function generateStaticParams() {
  return roleProfiles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleProfile(slug);

  if (!role) {
    return { title: "Role Path Not Found" };
  }

  const url = `${SITE_URL}/roles/${role.slug}`;
  return {
    title: role.label,
    description: role.recruiterSummary,
    alternates: { canonical: url },
    openGraph: {
      title: `${role.label} | SAGAR_OS`,
      description: role.recruiterSummary,
      url,
      type: "profile",
    },
  };
}

export default async function RolePage({ params }: RolePageProps) {
  const { slug } = await params;
  const role = getRoleProfile(slug);

  if (!role) {
    notFound();
  }

  const selectedProjects = role.projectSlugs
    .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
    .filter((project): project is Project => Boolean(project));
  const allPosts = getAllPosts();
  const selectedPosts = role.postSlugs
    .map((postSlug) => allPosts.find((post) => post.slug === postSlug))
    .filter((post): post is BlogPost => Boolean(post));
  const url = `${SITE_URL}/roles/${role.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${profile.name} — ${role.label}`,
    description: role.recruiterSummary,
    url,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      url: SITE_URL,
      knowsAbout: role.skills,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-8">
        <Container>
          <Link
            href="/roles"
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            cd ~/role-fit
          </Link>

          <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-accent/10 via-card to-card p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_center,var(--color-accent)_1px,transparent_1px)] [background-size:20px_20px]"
              />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {role.eyebrow}
                </p>
                <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  {role.headline}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {role.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {role.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <aside className="dash-card">
              <div className="dash-card-header">
                <span className="flex items-center gap-2">
                  <Target size={13} className="text-accent" aria-hidden="true" />
                  target roles
                </span>
                <span className="text-accent-green">open</span>
              </div>
              <div className="dash-card-body space-y-3">
                {role.targetTitles.map((title) => (
                  <div key={title} className="rounded-lg border border-border bg-surface/50 px-3 py-2 text-sm text-foreground">
                    {title}
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Role evidence summary">
            {role.signals.map((signal) => (
              <div key={signal.label} className="dash-card">
                <div className="dash-card-body">
                  <p className="font-mono text-2xl font-bold text-accent">{signal.value}</p>
                  <h2 className="mt-2 text-sm font-semibold text-foreground">{signal.label}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{signal.detail}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-8" aria-labelledby="strengths-title">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span id="strengths-title" className="font-mono text-xs uppercase tracking-widest text-muted">
                execution strengths
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {role.strengths.map((strength, index) => (
                <article key={strength.title} className="rounded-xl border border-border bg-card/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      capability {String(index + 1).padStart(2, "0")}
                    </span>
                    <BriefcaseBusiness size={14} className="text-muted" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-semibold text-foreground">{strength.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{strength.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8" aria-labelledby="project-proof-title">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">selected proof</p>
                <h2 id="project-proof-title" className="mt-1 text-2xl font-bold tracking-tight">
                  Projects aligned to this path
                </h2>
              </div>
              <FolderKanban size={20} className="text-muted" aria-hidden="true" />
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {selectedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="dash-card group flex h-full flex-col"
                >
                  <div className="dash-card-header">
                    <span>{project.category}</span>
                    <span className={maturityTextClass[project.maturity.tone]}>
                      {project.maturity.label}
                    </span>
                  </div>
                  <div className="dash-card-body flex flex-1 flex-col">
                    <h3 className="font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 font-mono text-xs text-accent">
                      Review evidence
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8" aria-labelledby="writing-proof-title">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">technical judgment</p>
                <h2 id="writing-proof-title" className="mt-1 text-2xl font-bold tracking-tight">
                  Writing relevant to this role
                </h2>
              </div>
              <BookOpen size={20} className="text-muted" aria-hidden="true" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {selectedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border bg-card/70 p-5 transition-colors hover:border-accent/30"
                >
                  <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <span>{post.date}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/10 via-card to-card p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">role-fit summary</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">{role.label}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {role.recruiterSummary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-dim"
                >
                  <Download size={14} aria-hidden="true" />
                  Download resume
                </a>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`${role.label} opportunity`)}`}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  <Mail size={14} aria-hidden="true" />
                  Contact Sagar
                </a>
                <Link
                  href="/roles"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                >
                  Other paths
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
