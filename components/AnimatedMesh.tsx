"use client";
import React, { useEffect, useRef, useState } from "react";

const AnimatedMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncEnabled = () => {
      setEnabled(!media.matches && window.innerWidth >= 768);
    };

    syncEnabled();
    window.addEventListener("resize", syncEnabled);
    media.addEventListener?.("change", syncEnabled);

    return () => {
      window.removeEventListener("resize", syncEnabled);
      media.removeEventListener?.("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const resizeCanvas = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      // Reset matrix on each resize so scaling never compounds.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildPoints();
    };

    const gridSize = 44;
    const points: Array<{
      x: number;
      y: number;
      originalX: number;
      originalY: number;
    }> = [];
    let cols = 0;

    const rebuildPoints = () => {
      points.length = 0;
      cols = Math.ceil(viewport.width / gridSize) + 1;
      for (let x = 0; x <= viewport.width; x += gridSize) {
        for (let y = 0; y <= viewport.height; y += gridSize) {
          points.push({
            x,
            y,
            originalX: x,
            originalY: y,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updatePoints = (time: number) => {
      points.forEach((point) => {
        const distanceToMouse = Math.sqrt(
          Math.pow(point.originalX - mousePosition.current.x, 2) +
            Math.pow(point.originalY - mousePosition.current.y, 2),
        );

        const influenceRadius = 180;
        const influence = Math.max(0, 1 - distanceToMouse / influenceRadius);

        const waveX = Math.sin(time + point.originalX * 0.012) * 6;
        const waveY = Math.cos(time + point.originalY * 0.012) * 6;

        const mouseInfluenceX =
          (mousePosition.current.x - point.originalX) * influence * 0.06;
        const mouseInfluenceY =
          (mousePosition.current.y - point.originalY) * influence * 0.06;

        point.x = point.originalX + waveX + mouseInfluenceX;
        point.y = point.originalY + waveY + mouseInfluenceY;
      });
    };

    const drawConnections = () => {
      ctx.lineWidth = 0.9;
      const maxConnection = gridSize * 1.5;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];

        // Check neighbors: right, bottom, bottom-right, bottom-left
        const neighbors = [
          points[i + 1],
          points[i + cols],
          points[i + cols + 1],
          points[i + cols - 1],
        ].filter(Boolean);

        for (const p2 of neighbors) {
          // Avoid wrapping connections from last to first column
          if (p1.originalX > p2.originalX + gridSize * 1.5) continue;
          if (p2.originalX > p1.originalX + gridSize * 1.5) continue;

          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2),
          );

          if (distance < maxConnection) {
            const opacity = Math.max(0, 1 - distance / maxConnection);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.25})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawPoints = () => {
      points.forEach((point) => {
        const distanceToMouse = Math.sqrt(
          Math.pow(point.x - mousePosition.current.x, 2) +
            Math.pow(point.y - mousePosition.current.y, 2),
        );

        const size = Math.max(1, 3 - distanceToMouse / 100);
        const glowIntensity = Math.max(0, 1 - distanceToMouse / 150);

        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + glowIntensity * 0.7})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const targetFrameTime = 1000 / 30;
    let lastFrameTime = 0;
    let isVisible = true;

    const animate = (timestamp: number) => {
      if (!isVisible) {
        animationFrameId.current = null;
        return;
      }

      if (timestamp - lastFrameTime >= targetFrameTime) {
        lastFrameTime = timestamp;
        ctx.clearRect(0, 0, viewport.width, viewport.height);
        const time = timestamp * 0.001;

        updatePoints(time);
        drawConnections();
        drawPoints();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    const visibilityObserver = new IntersectionObserver((entries) => {
      const nextVisible = entries.some((entry) => entry.isIntersecting);
      isVisible = nextVisible;
      if (nextVisible && animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    });
    visibilityObserver.observe(canvas);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      visibilityObserver.disconnect();
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = null;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default AnimatedMesh;