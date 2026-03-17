"use client";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import RetroStars from "../components/RetroStars";
import SynthwaveGrid from "../components/SynthwaveGrid";
import About from "../components/About";
import { useEffect, useState } from "react";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Home() {
  const [showBack, setShowBack] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // si hero es visible → ocultamos el mensaje
        setShowBack(!entry.isIntersecting);
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);
  return (
    <main className="relative bg-black text-green-400">
      {showBack && (
        <p className="fixed top-6 left-1/2 -translate-x-1/2 text-yellow-300 text-sm tracking-widest arcade-blink z-100">
          PRESS ESC TO RETURN
        </p>
      )}
      <SynthwaveGrid />

      <RetroStars />

      <div className="relative z-10">
        <Hero />

        <About />

        <Projects />

        <Skills />

        <Contact /> 
      </div>
    </main>
  );
}
