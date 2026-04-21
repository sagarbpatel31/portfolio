"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Container className="flex flex-col items-center text-center">
        <TriangleAlert size={48} className="mb-6 text-accent-rose" />
        <h1 className="font-mono text-xl font-bold text-foreground">
          runtime_error
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          Something went wrong. Please try again.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-8 flex gap-3">
          <Button onClick={() => reset()} size="sm" className="font-mono text-xs bg-accent text-background hover:bg-accent-dim">
            Try Again
          </Button>
          <Button asChild variant="outline" size="sm" className="font-mono text-xs">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
