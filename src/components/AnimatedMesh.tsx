import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mesh properties
    const gridSize = 80;
    const points: Array<{ x: number; y: number; originalX: number; originalY: number }> = [];

    // Initialize grid points
    for (let x = 0; x <= canvas.width; x += gridSize) {
      for (let y = 0; y <= canvas.height; y += gridSize) {
        points.push({
          x,
          y,
          originalX: x,
          originalY: y,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update point positions based on mouse and time
      const time = Date.now() * 0.001;
      points.forEach((point) => {
        const distanceToMouse = Math.sqrt(
          Math.pow(point.originalX - mousePosition.current.x, 2) +
          Math.pow(point.originalY - mousePosition.current.y, 2)
        );

        const influenceRadius = 200;
        const influence = Math.max(0, 1 - distanceToMouse / influenceRadius);
        
        const waveX = Math.sin(time + point.originalX * 0.01) * 10;
        const waveY = Math.cos(time + point.originalY * 0.01) * 10;
        
        const mouseInfluenceX = (mousePosition.current.x - point.originalX) * influence * 0.1;
        const mouseInfluenceY = (mousePosition.current.y - point.originalY) * influence * 0.1;

        point.x = point.originalX + waveX + mouseInfluenceX;
        point.y = point.originalY + waveY + mouseInfluenceY;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Connect to nearby points
        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j];
          const distance = Math.sqrt(
            Math.pow(point.x - otherPoint.x, 2) + Math.pow(point.y - otherPoint.y, 2)
          );

          if (distance < gridSize * 1.5) {
            const opacity = Math.max(0, 1 - distance / (gridSize * 1.5));
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.2})`;
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        }

        // Draw points
        const distanceToMouse = Math.sqrt(
          Math.pow(point.x - mousePosition.current.x, 2) +
          Math.pow(point.y - mousePosition.current.y, 2)
        );
        
        const size = Math.max(1, 3 - distanceToMouse / 100);
        const glowIntensity = Math.max(0, 1 - distanceToMouse / 150);
        
        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + glowIntensity * 0.7})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default AnimatedMesh;