"use client";

import { useEffect, useRef } from "react";

export default function SynthwaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#ff00ff";
      ctx.lineWidth = 1;

      const gridSize = 40;

      offset += 0.5;

      if (offset > gridSize) offset = 0;

      // líneas horizontales
      for (let y = height / 2; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(width, y + offset);
        ctx.stroke();
      }

      // líneas verticales con perspectiva
      const centerX = width / 2;

      for (let i = -20; i <= 20; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, height / 2);
        ctx.lineTo(centerX + i * gridSize, height);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
}