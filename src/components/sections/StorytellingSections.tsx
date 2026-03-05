"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Coffee } from "lucide-react";
import { AmbientGlow } from "@/components/ui/ambient-glow";

// Helper hook to create opacity & y transforms for a specific scroll range
const useSectionAnim = (scrollYProgress: MotionValue<number>, start: number, end: number) => {
    // Fade in during the first 20% of the section, hold, fade out during last 20%
    const opacity = useTransform(
        scrollYProgress,
        [start - 0.05, start, end - 0.05, end],
        [0, 1, 1, 0]
    );

    // Slide up slightly
    const y = useTransform(
        scrollYProgress,
        [start - 0.05, start, end - 0.05, end],
        [50, 0, 0, -50]
    );

    return { opacity, y };
};

// 0–20% scroll
export function HeroSection({ scrollProgress, isPreloaderDone = true }: { scrollProgress: MotionValue<number>, isPreloaderDone?: boolean }) {
    // Title fades in on early scroll (0 to 2%), holds during the explosion, then fades out later at 35% for readability
    const textOpacity = useTransform(scrollProgress, [0, 0.02, 0.25, 0.35], [0, 1, 1, 0]);
    const textY = useTransform(scrollProgress, [0, 0.02, 0.25, 0.35], [30, 0, 0, -50]);

    // Scroll indicator fades out slowly as they start scrolling between 0-5%
    const indicatorOpacity = useTransform(scrollProgress, [0, 0.05], [1, 0]);

    return (
        <motion.section
            className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center px-4"
        >
            <motion.div style={{ opacity: textOpacity, y: textY }}>
                <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-gold text-glow mb-6 tracking-wide drop-shadow-2xl">
                    Carmen’s Garden Café
                </h1>
                <p className="font-seasons text-xl md:text-2xl text-muted-gold tracking-widest uppercase drop-shadow-lg">
                    Cultivated in nature, perfected in glass.
                </p>
            </motion.div>

            {/* Premium Scroll Indicator - Animates in from bottom, fades out on scroll */}
            <motion.div
                style={{ opacity: indicatorOpacity }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: isPreloaderDone ? 0 : 150, opacity: isPreloaderDone ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center gap-6 text-gold drop-shadow-[0_0_15px_rgba(242,224,148,0.5)]"
                >
                    <p className="font-montserrat text-lg md:text-xl tracking-[0.4em] uppercase font-bold text-glow">Scroll to Reveal</p>
                    <div className="relative flex flex-col items-center">
                        <Coffee className="w-10 h-10 opacity-100 mb-4" />
                        {/* Animated vertical line */}
                        <motion.div
                            className="w-[2px] h-20 bg-gradient-to-b from-gold to-transparent"
                            animate={{ y: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

// 20–45% scroll
export function ArtisanalRevealSection({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const { opacity, y } = useSectionAnim(scrollProgress, 0.20, 0.45);

    return (
        <motion.section
            style={{ opacity, y }}
            className="fixed inset-0 z-10 flex flex-col justify-center pointer-events-none px-8 md:px-24"
        >
            <AmbientGlow variant="top-left" className="opacity-20 scale-150" />
            <div className="max-w-md relative z-10">
                <h2 className="font-cinzel text-4xl md:text-5xl text-gold text-glow mb-6">
                    Purity in every element.
                </h2>
                <p className="font-montserrat text-lg leading-relaxed text-muted-gold/90">
                    Sustainably sourced, family-farmed beans and artisanal ice deliver exceptional clarity. Every harvest is tuned for balance and depth.
                </p>
            </div>
        </motion.section>
    );
}

// 45–70% scroll
export function AlchemySection({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const { opacity, y } = useSectionAnim(scrollProgress, 0.48, 0.70);

    return (
        <motion.section
            style={{ opacity, y }}
            className="fixed inset-0 z-10 flex flex-col justify-center items-end pointer-events-none px-8 md:px-24 text-right"
        >
            <AmbientGlow variant="top-right" className="opacity-20 scale-150" />
            <div className="max-w-md relative z-10">
                <h2 className="font-cinzel text-4xl md:text-5xl text-gold text-glow mb-8">
                    The Architecture of Flavor.
                </h2>
                <ul className="space-y-6 font-montserrat text-lg text-muted-gold/90">
                    <li className="flex items-center justify-end gap-4">
                        <span>Signature roast profiles reveal hidden notes.</span>
                        <span className="w-8 h-[1px] bg-gold/50 block"></span>
                    </li>
                    <li className="flex items-center justify-end gap-4">
                        <span>Silky milk textures balanced by robust intensity.</span>
                        <span className="w-8 h-[1px] bg-gold/50 block"></span>
                    </li>
                    <li className="flex items-center justify-end gap-4">
                        <span>A masterpiece of temperature and time.</span>
                        <span className="w-8 h-[1px] bg-gold/50 block"></span>
                    </li>
                </ul>
            </div>
        </motion.section>
    );
}

// 70–90% scroll
export function HeritageSection({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const { opacity, y } = useSectionAnim(scrollProgress, 0.73, 0.90);

    return (
        <motion.section
            style={{ opacity, y }}
            className="fixed inset-0 z-10 flex flex-col justify-center pointer-events-none px-8 md:px-24"
        >
            <AmbientGlow variant="bottom-left" className="opacity-20 scale-150" />
            <div className="max-w-md relative z-10">
                <h2 className="font-cinzel text-4xl md:text-5xl text-gold text-glow mb-6">
                    A Legacy of Craft.
                </h2>
                <p className="font-montserrat text-lg leading-relaxed text-muted-gold/90 mb-4">
                    Rooted in the garden, inspired by tradition. Our gold-standard dedication to flavor restores clarity to the coffee experience.
                </p>
            </div>
        </motion.section>
    );
}

// Reassembly CTA Section removed as requested to transition directly to Signature Bento.
