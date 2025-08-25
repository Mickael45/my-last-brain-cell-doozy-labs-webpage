"use client";
import SeedButton from "./SeedButton";

export default function DevOnlySeed() {
  if (process.env.NODE_ENV === "production") return null;
  return <SeedButton />;
}
