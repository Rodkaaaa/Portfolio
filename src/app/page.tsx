"use client";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import RetroStars from "../components/RetroStars";
import SynthwaveGrid from "../components/SynthwaveGrid";
import About from "../components/About";
import { useEffect, useState } from "react";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import Controls from "../components/Controls";

export default function Home() {
  return (
    <main className="relative bg-black text-green-400">
      <Controls />

      <SynthwaveGrid />
      <RetroStars />

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
