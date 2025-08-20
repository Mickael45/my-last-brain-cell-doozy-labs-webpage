import { useEffect, useRef, useState } from "react";

/**
 * Hook to reveal an element on first viewport entry (once) with intersection observer.
 */
export function useReveal<T extends HTMLElement>(
  options: { threshold?: number } = {}
) {
  const { threshold = 0.2 } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, visible]);
  return { ref, visible };
}
