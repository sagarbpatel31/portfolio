"use client";

import { useEffect, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonami(onActivate: () => void) {
  const handler = useCallback(() => {
    let idx = 0;

    return (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          onActivate();
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
  }, [onActivate]);

  useEffect(() => {
    const listener = handler();
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handler]);
}
