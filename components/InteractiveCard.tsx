"use client";
import React, { useRef, useState, useEffect, HTMLAttributes } from "react";

interface InteractiveCardProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: number; // rotation intensity in degrees
  glow?: boolean; // enable radial glow following pointer
  disableTilt?: boolean; // allow disabling tilt while keeping glow
}

/**
 * Subtle interactive card: pointer tilt + soft radial glow.
 * Accessible: honors prefers-reduced-motion, resets on leave, keyboard focus scale.
 */
export default function InteractiveCard({
  children,
  className = "",
  intensity = 8,
  glow = true,
  disableTilt = false,
  ...rest
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number>(undefined);
  const [pos, setPos] = useState({ xPct: 50, yPct: 50 });
  const [hovered, setHovered] = useState(false);
  const resetTimeout = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    if (!hovered) setHovered(true);
    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current);
      resetTimeout.current = null;
    }
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));
    const xPct = clamp((x / rect.width) * 100, 0, 100);
    const yPct = clamp((y / rect.height) * 100, 0, 100);
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setPos({ xPct, yPct }));
  }

  function handleLeave() {
    setHovered(false);
    // Delay resetting the position until after fade-out to avoid "jump" flash
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = window.setTimeout(() => {
      setPos({ xPct: 50, yPct: 50 });
      resetTimeout.current = null;
    }, 240); // match opacity transition (duration-300 trimmed slightly)
  }

  function handleFocus() {
    if (reduced) return;
    setHovered(true);
    setPos({ xPct: 50, yPct: 40 });
  }

  function handleBlur() {
    setHovered(false);
    setPos({ xPct: 50, yPct: 50 });
  }

  const rx = ((pos.yPct / 100 - 0.5) * -intensity).toFixed(2);
  const ry = ((pos.xPct / 100 - 0.5) * intensity).toFixed(2);

  // Compose styles; avoid overriding existing transform utilities by nesting internal wrapper if needed.
  const transformStyle =
    !reduced && !disableTilt
      ? { transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)` }
      : {};

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`group relative transition-transform duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${className}`}
      style={transformStyle as React.CSSProperties}
      {...rest}
    >
      {glow && (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `radial-gradient(circle at ${pos.xPct}% ${pos.yPct}%, rgba(255,255,255,0.08), transparent 60%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
      {children}
    </div>
  );
}
