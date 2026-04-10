"use client";

import { useEffect, useState } from "react";

const sectionIds = [
  "hero",
  "highlights",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "awards",
  "blog",
  "contact",
];

export function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return active;
}
