"use client";

import { useLenis } from "@/lib/useLenis";
import Preloader from "@/components/Preloader";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useLenis();

  return (
    <>
      <Preloader />
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
