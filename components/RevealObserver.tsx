"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

function markVisible(element: Element) {
  if (!(element instanceof HTMLElement)) return;
  element.setAttribute("data-revealed", "true");
}

export default function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      elements.forEach(markVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markVisible(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    for (const element of elements) {
      if (element instanceof HTMLElement && element.dataset.revealed === "true") {
        continue;
      }
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
