"use client";

import DevStats from "./DevStats";
import { useEffect, useState, useRef, useMemo} from "react";
import { CheatSystem } from "../utils/cheatSystem";
import SnakeGame from "./SnakeGame";

const baseMenuItems = [
  { name: "START GAME", target: "about" },
  { name: "PROJECTS", target: "projects" },
  { name: "SKILLS", target: "skills" },
  { name: "CONTACT", target: "contact" },
];

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.3;
  audio.play();
};

export default function Hero() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snakeMode, setSnakeMode] = useState(false);

  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [godMode, setGodMode] = useState(false);
  const [maxStats, setMaxStats] = useState(false);
  const [bloodMode, setBloodMode] = useState(false);

  const [konamiIndex, setKonamiIndex] = useState(0);

  const cheatRef = useRef<CheatSystem | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Música
  useEffect(() => {
    musicRef.current = new Audio("/Sounds/song.mp3");
    musicRef.current.volume = 0.2;
    musicRef.current.loop = true;
  }, []);

  // 🎮 Cheat Engine
  useEffect(() => {
    cheatRef.current = new CheatSystem([
      {
        code: "IDDQD",
        action: () => {
          setGodMode(true);
          playSound("/Sounds/start.mp3");
        },
      },
      {
        code: "MOTHERLODE",
        action: () => {
          setMaxStats(true);
          playSound("/Sounds/start.mp3");
        },
      },
      {
        code: "IDKFA",
        action: () => {
          setSecretUnlocked(true);
          setMaxStats(true);
          playSound("/Sounds/start.mp3");
        },
      },
      {
        code: "ABACABB",
        action: () => {
          setBloodMode(true);
          playSound("/Sounds/start.mp3");
        },
      },
      {
        code: "SNAKE",
        action: () => {
          setSnakeMode(true);
        },
      },
    ]);
  }, []);

  const menuItems = useMemo(() => secretUnlocked
    ? [...baseMenuItems, { name: "TRUST ME", target: "secret" }]
    : baseMenuItems, [secretUnlocked]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.repeat) return;

      cheatRef.current?.handleKey(e.key);

      const hero = document.getElementById("hero");
      const heroVisible = hero?.getBoundingClientRect().top === 0;

      // 🎮 KONAMI
      if (e.code === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        setKonamiIndex(nextIndex);

        if (nextIndex === konamiCode.length) {
          setSecretUnlocked(true);
          setKonamiIndex(0);
          playSound("/Sounds/start.mp3");
        }
      } else {
        setKonamiIndex(0);
      }

      if (!started && e.key === "Enter") {
        setStarted(true);
        playSound("/Sounds/start.mp3");
        musicRef.current?.play();
        return;
      }

      if (e.key === "Escape") {
        hero?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (!heroVisible) return;

      if (started) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          playSound("/Sounds/down.mp3");
          setSelected((prev) => (prev + 1) % menuItems.length);
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          playSound("/Sounds/up.mp3");
          setSelected((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
        }

        if (e.code === "Enter") {
          const selectedItem = menuItems[selected];

          if (selectedItem.target === "secret") {
            window.open("https://matias.me/nsfw/", "_blank");
            return;
          }

          const section = document.getElementById(selectedItem.target);

          section?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [started, selected, konamiIndex, menuItems]);

  // 🚫 Scroll lock
  useEffect(() => {
    if (!started || godMode) return;

    const prevent = (e: Event) => e.preventDefault();

    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });

    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [started, godMode]);
  // 🐍 Bloquear scroll cuando Snake está activo
  useEffect(() => {
    if (snakeMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = started ? "hidden" : "auto";
    }
  }, [snakeMode, started]);
  return (
    <>
      <section
        id="hero"
        className={`flex flex-col items-center justify-center min-h-screen text-center px-6
      ${bloodMode ? "text-red-500" : "text-green-400"}`}
      >
        <div
          className={`border p-8 rounded-md w-full max-w-md
        ${bloodMode ? "border-red-500 bg-black" : "border-green-400 bg-black"}`}
        >
          <DevStats level={maxStats ? 99 : 30} xp={maxStats ? 999 : 80} />

          {!started && (
            <p className="text-yellow-300 text-xl press-start mt-6">
              PRESS ENTER
            </p>
          )}

          {started && (
            <div className="flex flex-col gap-6 text-lg mt-6">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative text-center transition ${
                    selected === index
                      ? "text-white scale-110"
                      : "text-green-400"
                  }`}
                >
                  {selected === index && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2">
                      ▶
                    </span>
                  )}

                  {item.name}
                </div>
              ))}
            </div>
          )}

          {godMode && (
            <p className="text-yellow-400 mt-4 animate-pulse">GOD MODE</p>
          )}

          {bloodMode && (
            <p className="text-red-500 mt-4 animate-pulse">FATALITY MODE</p>
          )}
        </div>
      </section>
      {/* 🎮 MINI JUEGO */}
      {snakeMode && <SnakeGame onClose={() => setSnakeMode(false)} />}
    </>
  );
}
