"use client";

import { useEffect, useRef } from "react";

export default function RetroStars() {
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

    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.5 + 0.2,
    }));

    function animate() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#00ff9f";

      stars.forEach((star) => {
        ctx.fillRect(star.x, star.y, 2, 2);

        star.y += star.speed;

        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    }

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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}