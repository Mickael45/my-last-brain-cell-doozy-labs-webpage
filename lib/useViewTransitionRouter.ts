"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export function useViewTransitionRouter() {
  const router = useRouter();

  const push = (href: string) => {
    if (typeof document.startViewTransition === "function") {
      startTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  return {
    ...router,
    push,
  };
}
