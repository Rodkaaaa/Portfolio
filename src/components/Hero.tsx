"use client";
import DevStats from "./DevStats";
import { useEffect, useState, useRef } from "react";

const menuItems = [
  { name: "START GAME", target: "about" },
  { name: "PROJECTS", target: "projects" },
  { name: "SKILLS", target: "skills" },
  { name: "CONTACT", target: "contact" },
];

const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.3;
  audio.play();
};

export default function Hero() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(0);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    musicRef.current = new Audio("/Sounds/song.mp3");
    musicRef.current.volume = 0.2;
    musicRef.current.loop = true;
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const hero = document.getElementById("hero");
      const heroVisible = hero?.getBoundingClientRect().top === 0;

      if (!started && e.key === "Enter") {
        setStarted(true);
        playSound("/Sounds/start.mp3");
        musicRef.current?.play();
        return;
      }

      // ESC siempre permitido
      if (e.key === "Escape") {
        if (hero) {
          hero.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        return;
      }

      // 🔒 Bloquear controles si no está en hero
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
          const section = document.getElementById(menuItems[selected].target);

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
  }, [started, selected]);

  useEffect(() => {
    if (!started) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

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
  useEffect(() => {
    document.body.style.overflow = started ? "hidden" : "auto";
  }, [started]);
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-screen text-center  text-green-400 px-6"
    >
      <div className="bg-black border border-green-400 p-8 rounded-md w-full max-w-md">
        <DevStats level={30} xp={80} />

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
                  selected === index ? "text-white scale-110" : "text-green-400"
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
        )}
      </div>
    </section>
  );
}
