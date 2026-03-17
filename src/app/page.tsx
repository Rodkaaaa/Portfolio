"use client";

import Hero from "../components/Hero";
import Projects from "../components/Projects";
import RetroStars from "../components/RetroStars";
import About from "../components/About";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Controls from "../components/Controls";
import ForestBackground from "../components/ForestBackground";
import Fireflies from "../components/Fireflies";
import FogLayer from "../components/FogLayer";
import MobileGamepad from "../components/MobileGamepad";

export default function Home() {

  const triggerKey = (key: string, code?: string) => {
    const event = new KeyboardEvent("keydown", {
      key,
      code: code || key,
      bubbles: true,
    });

    window.dispatchEvent(event);
  };

  return (
    <main className="relative text-green-400">

      <MobileGamepad
        onUp={() => triggerKey("ArrowUp")}
        onDown={() => triggerKey("ArrowDown")}
        onLeft={() => triggerKey("ArrowLeft")}
        onRight={() => triggerKey("ArrowRight")}
        onA={() => triggerKey("Enter")}
        onB={() => triggerKey("Escape")}
        onStart={() => triggerKey("Enter")}
      />

      <ForestBackground />
      <FogLayer />
      <RetroStars />
      <Fireflies />
      <Controls />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>

    </main>
  );
}