import Link from "next/link";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Container className="flex flex-col items-center text-center">
        <Terminal size={48} className="mb-6 text-accent" />
        <h1 className="font-mono text-7xl font-bold text-gradient-cyan">404</h1>
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          ~/404_not_found
        </p>
        <p className="mt-3 max-w-md text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="sm" className="mt-8 font-mono text-xs bg-accent text-background hover:bg-accent-dim">
          <Link href="/">Back to Home</Link>
        </Button>
      </Container>
    </section>
  );
}
