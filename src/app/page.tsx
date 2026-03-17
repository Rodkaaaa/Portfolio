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

export default function Home() {
  return (
    <main className="relative  text-green-400">

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