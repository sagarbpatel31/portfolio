import { Container } from "@/components/ui/container";
import { selectedImpact } from "@/content/hiring";

export function SelectedImpact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="border-b border-border/70 bg-card/45">
      <Container>
        <h2 id="impact-title" className="sr-only">Selected outcomes</h2>
        <dl className="divide-y divide-border sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {selectedImpact.map((item) => (
            <div key={item.label} className="flex gap-4 py-4 sm:block sm:p-5 sm:first:pl-0 lg:p-6">
              <dt className="mt-0.5 min-w-[3.5rem] font-mono text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
                {item.value}
              </dt>
              <dd className="sm:mt-2">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
