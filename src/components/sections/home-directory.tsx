import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { roleProfiles } from "@/content/roles";

export function HomeDirectory() {
  return (
    <section id="role-fit" aria-labelledby="role-fit-title" className="scroll-mt-14 border-y border-border/70 bg-card/35 py-8 sm:py-10">
      <Container>
        <h2 id="role-fit-title" className="mb-4 text-2xl font-bold tracking-tight">Explore by role</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {roleProfiles.map((role) => (
            <Link
              key={role.slug}
              href={`/roles/${role.slug}`}
              className="group rounded-lg border border-border bg-card/75 p-4 transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-foreground group-hover:text-accent">{role.label}</h3>
                <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {role.skills.slice(0, 3).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
