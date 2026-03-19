"use client";
import { useEffect, useRef, useState } from "react";

const gridSize = 20;
const tileCount = 20;

export default function SnakeGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [score, setScore] = useState(0);

  const moveSnake = () => {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= tileCount ||
      head.y >= tileCount
    ) {
      setSnake([{ x: 10, y: 10 }]);
      setScore(0);
      return;
    }

    const newSnake = [head, ...snake];

    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      });
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setDx(0);
        setDy(-1);
      }
      if (e.key === "ArrowDown") {
        setDx(0);
        setDy(1);
      }
      if (e.key === "ArrowLeft") {
        setDx(-1);
        setDy(0);
      }
      if (e.key === "ArrowRight") {
        setDx(1);
        setDy(0);
      }

      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = "lime";

    snake.forEach((s) => {
      ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize, gridSize);
    });
  }, [snake, food]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-green-400">
      <h2 className="mb-4 text-xl">🐍 SNAKE</h2>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-green-400"
      />

      <p className="mt-4">Score: {score}</p>
      <p className="text-sm mt-2">ESC to exit</p>
    </div>
  );
}