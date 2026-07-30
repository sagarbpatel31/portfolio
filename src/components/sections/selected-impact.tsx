import { Container } from "@/components/ui/container";
import { selectedImpact } from "@/content/hiring";

export function SelectedImpact() {
  return (
    <section id="impact" className="py-6 sm:py-8">
      <Container>
        <div className="dash-card">
          <div className="dash-card-header">
            <span>selected_impact</span>
            <span className="text-accent">measured outcomes</span>
          </div>
          <div className="grid md:grid-cols-3 md:divide-x md:divide-border">
            {selectedImpact.map((item) => (
              <div
                key={item.label}
                className="border-b border-border p-5 last:border-b-0 sm:p-6 md:border-b-0"
              >
                <p className="font-mono text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
