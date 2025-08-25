"use client";
import { useState, useTransition } from "react";
import { createSeedData } from "../app/actions/seed";
import { SeedResult } from "../types/actions";

export default function SeedButton() {
  const [result, setResult] = useState<null | SeedResult>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <button
        onClick={() => {
          startTransition(async () => {
            const r = await createSeedData();
            setResult(r);
            // Force reload to pick up ISR later; for dev just refresh client state
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          });
        }}
        className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-400 hover:to-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pending}
      >
        {pending ? "Seeding..." : "Create seed data"}
      </button>
      {result && (
        <div className="text-xs text-gray-300 bg-gray-800/80 backdrop-blur px-3 py-1 rounded-md shadow">
          {result.skipped ? "Already have 20+ projects" : `Created ${result.created}. Total now ${result.total}.`}
        </div>
      )}
    </div>
  );
}
