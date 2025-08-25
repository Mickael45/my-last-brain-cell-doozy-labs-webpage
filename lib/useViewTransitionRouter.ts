"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export function useViewTransitionRouter() {
  const router = useRouter();

  const push = (href: string) => {
    if (document.startViewTransition) {
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
