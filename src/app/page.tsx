"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import CanvasSequence from "@/components/CanvasSequence";
import {
  HeroSection,
  ArtisanalRevealSection,
  AlchemySection,
  HeritageSection,
} from "@/components/sections/StorytellingSections";
import { SignatureBentoSection } from "@/components/sections/SignatureBentoSection";
import { SignaturesExplorer } from "@/components/sections/SignaturesExplorer";
import { AnimatedTestimonials } from "@/components/ui/testimonial";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <main className="relative bg-forest-green text-muted-gold min-h-screen">
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      <Navbar isPreloaderDone={isPreloaderDone} />

      {/* The sticky background canvas that plays the image sequence */}
      <CanvasSequence containerRef={containerRef} />

      {/* The scrolling container that provides the "track" for the animation height */}
      <div
        ref={containerRef}
        className="relative z-10 w-full"
        style={{ height: "500vh" }}
      >
        <HeroSection scrollProgress={scrollYProgress} isPreloaderDone={isPreloaderDone} />
        <ArtisanalRevealSection scrollProgress={scrollYProgress} />
        <AlchemySection scrollProgress={scrollYProgress} />
        <HeritageSection scrollProgress={scrollYProgress} />
      </div>

      {/* Signatures Explorer — positioned immediately after the hero scroll */}
      <SignaturesExplorer />

      {/* The Final Signature Section, Testimonials & Footer */}
      <SignatureBentoSection />
      <AnimatedTestimonials />
      <Footer />
    </main>
  );
}
