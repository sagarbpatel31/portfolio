"use client";

import { useState, useCallback } from "react";
import { BootSequence } from "@/components/boot-sequence";

export function BootWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      {children}
    </>
  );
}
