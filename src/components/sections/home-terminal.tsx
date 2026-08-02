import { Terminal } from "@/components/terminal";
import { Container } from "@/components/ui/container";

export function HomeTerminal() {
  return (
    <section
      id="terminal"
      aria-labelledby="terminal-title"
      className="scroll-mt-16 border-y border-border/70 py-10 sm:scroll-mt-20 sm:py-14"
    >
      <Container>
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              interactive_console
            </p>
            <h2
              id="terminal-title"
              className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Query the profile directly.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground sm:text-right">
            Try help, projects, experience, skills, or contact.
          </p>
        </div>

        <Terminal />
      </Container>
    </section>
  );
}
