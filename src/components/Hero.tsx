"use client";
import DevStats from "./DevStats";
import { useEffect, useState, useRef } from "react";

const baseMenuItems = [
  { name: "START GAME", target: "about" },
  { name: "PROJECTS", target: "projects" },
  { name: "SKILLS", target: "skills" },
  { name: "CONTACT", target: "contact" },
];

// 🎮 Konami Code
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
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const musicRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Música
  useEffect(() => {
    musicRef.current = new Audio("/Sounds/song.mp3");
    musicRef.current.volume = 0.2;
    musicRef.current.loop = true;
  }, []);

  // 📜 Menú dinámico
  const menuItems = secretUnlocked
    ? [...baseMenuItems, { name: "TRUST ME", target: "secret" }]
    : baseMenuItems;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const hero = document.getElementById("hero");
      const heroVisible = hero?.getBoundingClientRect().top === 0;

      // 🎮 KONAMI CODE DETECTION
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

      // ▶ START
      if (!started && e.key === "Enter") {
        setStarted(true);
        playSound("/Sounds/start.mp3");
        musicRef.current?.play();
        return;
      }

      // ⏹ ESC vuelve arriba
      if (e.key === "Escape") {
        if (hero) {
          hero.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        return;
      }

      // 🔒 Bloqueo si no está visible
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
          setSelected((prev) =>
            prev === 0 ? menuItems.length - 1 : prev - 1
          );
        }

        // 🎯 ENTER
        if (e.code === "Enter") {
          const selectedItem = menuItems[selected];

          // 🔓 SECRETO
          if (selectedItem.target === "secret") {
            playSound("/Sounds/desbloqueo.mp3");
            window.open("https://matias.me/nsfw/", "_blank");
            return;
          }

          const section = document.getElementById(selectedItem.target);

          if (section) {
            playSound("/Sounds/select.mp3");
            section.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [started, selected, konamiIndex, menuItems]);

  // 🚫 Bloquear scroll
  useEffect(() => {
    if (!started) return;

    const preventScroll = (e: Event) => e.preventDefault();

    const preventKeys = (e: KeyboardEvent) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "Space",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];

      if (keys.includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [started]);

  // 🔒 overflow
  useEffect(() => {
    document.body.style.overflow = started ? "hidden" : "auto";
  }, [started]);

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-screen text-center text-green-400 px-6"
    >
      <div className="bg-black border border-green-400 p-8 rounded-md w-full max-w-md">
        <DevStats level={30} xp={80} />

        {!started && (
          <p className="text-yellow-300 text-xl press-start mt-6">
            PRESS ENTER
          </p>
        )}

        {started && (
          <>
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
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 arcade-cursor">
                      ▶
                    </span>
                  )}

                  {item.name}
                </div>
              ))}
            </div>

            {/* 🔓 Cheat message */}
            {secretUnlocked && (
              <p className="text-pink-400 mt-4 animate-pulse">
                🔓 CHEAT UNLOCKED
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}