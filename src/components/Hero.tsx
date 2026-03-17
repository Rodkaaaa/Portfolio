"use client";
import DevStats from "./DevStats";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (!started && e.key === "Enter") {
        setStarted(true);
        playSound("/sounds/start.mp3");
        playSound("/sounds/song.mp3");
        return;
      }
      if (e.key === "Escape") {
        const hero = document.getElementById("hero");

        if (hero) {
          hero.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }

      if (started) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          playSound("/sounds/down.mp3");
          setSelected((prev) => (prev + 1) % menuItems.length);
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          playSound("/sounds/up.mp3");
          setSelected((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
        }

        if (e.code === "Enter") {
          const section = document.getElementById(menuItems[selected].target);

          if (section) {
            playSound("/sounds/select.mp3");
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

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center min-h-screen text-center bg-black text-green-400 px-6"
    >
      {" "}
      <h1 className="text-4xl md:text-6xl mb-10 tracking-widest">
        FREDERICK CID
      </h1>
      <h2 className="text-lg md:text-2xl mb-16">SOFTWARE DEVELOPER</h2>
      <DevStats level={30} xp={80} />
      {!started && (
        <p className="text-yellow-300 text-xl press-start">PRESS ENTER</p>
      )}
      {started && (
        <div className="flex flex-col gap-6 text-lg">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`transition ${
                selected === index
                  ? "text-white scale-110 translate-x-2"
                  : "text-green-400"
              }`}
            >
              {selected === index && (
                <span className="mr-2 arcade-cursor">▶</span>
              )}{" "}
              {item.name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
