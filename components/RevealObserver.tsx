"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";

function markVisible(element: Element) {
  if (!(element instanceof HTMLElement)) return;
  element.setAttribute("data-revealed", "true");
}

export default function RevealObserver() {
  // RevealObserver lives in the root layout which never unmounts, so the
  // effect must re-run on every route change. Otherwise newly mounted
  // [data-reveal] nodes (e.g. on back-nav from /project/[id] to /) stay
  // at opacity:0 forever because nothing ever observes them.
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scan = () => {
      const elements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
      if (!elements.length) return [] as Element[];

      if (prefersReducedMotion) {
        elements.forEach(markVisible);
        return [];
      }

      return elements.filter((el) => {
        if (!(el instanceof HTMLElement)) return false;
        return el.dataset.revealed !== "true";
      });
    };

    if (prefersReducedMotion) {
      scan();
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

    // Initial scan for elements already in the DOM for this route.
    for (const element of scan()) observer.observe(element);

    // React commits the new page tree in the same tick as the pathname
    // change but the DOM may still be mounting at the time this effect
    // runs. A microtask + a rAF catches both server-rendered and
    // client-rendered subtrees without waiting a visible amount of time.
    const raf = requestAnimationFrame(() => {
      for (const element of scan()) observer.observe(element);
    });

    // A MutationObserver picks up any later client-rendered inserts
    // (e.g. dynamic(() => import(...), { ssr: false }) wrappers).
    const mutationObserver = new MutationObserver(() => {
      for (const element of scan()) observer.observe(element);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
