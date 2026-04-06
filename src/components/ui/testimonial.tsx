"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        quote:
            "Lami kaayo ang kape diri, mura kog naa sa paraiso. Relaxing kaayo ang palibot. Bagay jud ni sa Carmen's.",
        name: "Maria Santos",
        designation: "Coffee Lover from Carmen",
        src: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "The best nga kape! Pinakalami sa Carmen. Balik-balikan jud namo kining lugara uban sa akong pamilya.",
        name: "Juan Dela Cruz",
        designation: "Local Guide",
        src: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "Nindot kaayo ang ambiance, perfect para trabaho or relax. Ang kalami sa kape dili jud mabayran.",
        name: "Elena Garcia",
        designation: "Freelancer",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "Ang view sa garden makapawala sa stress. Nindot pa jud ang scenery samtang naga-inom og bugnaw nga kape.",
        name: "Roberto Lim",
        designation: "Nature Enthusiast",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
        quote:
            "Diri nako nakit-an ang tinuod nga kape nga naay kasing-kasing. Ang garden perfect kaayo nga backdrop.",
        name: "Sofia Reyes",
        designation: "Artist",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    },
];

const TESTIMONIAL_ROTATIONS = [0, -6, 5, -4, 7];

export const AnimatedTestimonials = ({
    autoplay = true,
}: {
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(handleNext, 6000);
        return () => clearInterval(interval);
    }, [autoplay]);

    const getStackOffset = (index: number) => {
        // Calculates how far a card is from the active index (0 = active, 1 = right behind, etc.)
        return (index - active + testimonials.length) % testimonials.length;
    };

    return (
        <section className="relative z-20 bg-forest-green py-32 px-4 md:px-8 lg:px-12 overflow-x-clip content-visibility-auto">
            {/* Section Header */}
            <div className="mb-20 text-center">
                <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold tracking-wider">
                    Voices of the Garden
                </h2>
                <div className="h-[1px] w-24 bg-gold/30 mx-auto mt-6" />
            </div>

            {/* Testimonial Content */}
            <div className="mx-auto max-w-6xl">
                <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20 items-center">
                    {/* Image Stack Section */}
                    <div className="flex items-center justify-center">
                        <div className="relative h-[400px] w-full max-w-[320px]">
                            <AmbientGlow variant="center" size={600} className="opacity-40" />
                            <AnimatePresence>
                                {testimonials.map((testimonial, index) => {
                                    const offset = getStackOffset(index);
                                    const isFront = offset === 0;
                                    const isVisible = offset <= 2 || offset === testimonials.length - 1;

                                    if (!isVisible) return null;

                                    // Determine visibility dynamically based on depth
                                    let opacity = 0;
                                    if (isFront) opacity = 1;
                                    else if (offset === 1) opacity = 0.85;
                                    else if (offset === 2) opacity = 0.6;
                                    else opacity = 0.35;

                                    return (
                                        <motion.div
                                            key={testimonial.name}
                                            initial={{
                                                opacity: 0,
                                                scale: 0.9,
                                                y: 50,
                                                rotate: TESTIMONIAL_ROTATIONS[index] ?? 0,
                                            }}
                                            animate={{
                                                opacity: opacity,
                                                scale: prefersReducedMotion ? 1 : isFront ? 1 : 1 - Math.min(offset, 2) * 0.04,
                                                y: isFront ? 0 : offset * 12,
                                                zIndex: testimonials.length - offset,
                                                rotate: prefersReducedMotion || isFront ? 0 : (TESTIMONIAL_ROTATIONS[index] ?? 0),
                                            }}
                                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="absolute inset-0 origin-bottom"
                                        >
                                            <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl border border-gold/20 bg-[#0e2a1b]">
                                                <Image
                                                    src={testimonial.src}
                                                    alt={testimonial.name}
                                                    fill
                                                    sizes="(max-width: 768px) 80vw, 320px"
                                                    className="object-cover"
                                                    quality={70}
                                                    loading={isFront ? "eager" : "lazy"}
                                                />
                                                {/* Overlay to dim background cards strictly via CSS layer instead of relying solely on element opacity blending */}
                                                {!isFront && (
                                                    <div className="absolute inset-0 bg-[#0d2d20] mix-blend-multiply" style={{ opacity: offset * 0.2 }} />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Text & Controls Section — Name above Quote */}
                    <div className="flex flex-col justify-center py-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex flex-col"
                            >
                                {/* Name & Designation — ABOVE the quote */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-cinzel font-bold text-gold tracking-wide">
                                        {testimonials[active].name}
                                    </h3>
                                    <p className="text-sm font-montserrat uppercase tracking-[0.3em] text-gold/50 mt-1">
                                        {testimonials[active].designation}
                                    </p>
                                </div>

                                {/* Quote */}
                                <motion.p className="text-xl md:text-2xl font-seasons italic text-muted-gold/90 leading-relaxed">
                                    &ldquo;{testimonials[active].quote}&rdquo;
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Circular Navigation Buttons */}
                        <div className="flex gap-4 pt-12 relative z-50">
                            <button
                                onClick={handlePrev}
                                aria-label="Previous testimonial"
                                className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[#0e2a1b] transition-all hover:bg-gold hover:border-gold"
                            >
                                <ArrowLeft className="h-4 w-4 text-gold transition-all duration-300 group-hover:text-forest-green group-hover:-translate-x-0.5" />
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next testimonial"
                                className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-[#0e2a1b] transition-all hover:bg-gold hover:border-gold"
                            >
                                <ArrowRight className="h-4 w-4 text-gold transition-all duration-300 group-hover:text-forest-green group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
