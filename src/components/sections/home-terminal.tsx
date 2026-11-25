import { ChevronDown, Terminal as TerminalIcon } from "lucide-react";
import { Terminal } from "@/components/terminal";
import { Container } from "@/components/ui/container";

export function HomeTerminal() {
  return (
    <section id="terminal" aria-labelledby="terminal-title" className="scroll-mt-16 border-t border-border/70 py-6">
      <Container>
        <details className="group rounded-lg border border-border bg-card/70">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
            <TerminalIcon size={16} className="text-accent" aria-hidden="true" />
            <span id="terminal-title">Explore the SAGAR_OS terminal</span>
            <ChevronDown size={16} className="ml-auto text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="border-t border-border p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Try <code>help</code>, <code>projects</code>, or <code>skills</code>.
            </p>
            <Terminal />
          </div>
        </details>
      </Container>
    </section>
  );
}
