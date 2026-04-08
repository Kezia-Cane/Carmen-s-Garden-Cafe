"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        quote:
            "Lami kaayo ang kape diri, mura gyud ug naa ka sa garden retreat. Peaceful ang place ug premium kaayo ang dating.",
        name: "Alyssa Ramos",
        designation: "Weekend Guest from Carmen",
        src: "/testimonials/alyssa-ramos.svg",
    },
    {
        quote:
            "Bisan first visit pa lang, dali kaayo ma-feel ang warmth sa lugar. Nice ang drinks, nice ang service, ug balik-balikan gyud.",
        name: "Paolo Mendoza",
        designation: "Creative Professional from Butuan",
        src: "/testimonials/paolo-mendoza.svg",
    },
];

const TESTIMONIAL_ROTATIONS = [0, -5];

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
        <section className="relative z-20 overflow-x-clip bg-forest-green px-4 py-24 content-visibility-auto md:px-8 md:py-32 lg:px-12">
            {/* Section Header */}
            <div className="mb-14 text-center md:mb-20">
                <h2 className="font-cinzel text-3xl tracking-wider text-gold sm:text-4xl md:text-5xl lg:text-6xl">
                    Voices of the Garden
                </h2>
                <div className="h-[1px] w-24 bg-gold/30 mx-auto mt-6" />
            </div>

            {/* Testimonial Content */}
            <div className="mx-auto max-w-6xl">
                <div className="relative grid grid-cols-1 items-center gap-y-10 md:grid-cols-2 md:gap-x-14 lg:gap-x-20">
                    {/* Image Stack Section */}
                    <div className="flex items-center justify-center">
                        <div className="relative h-[320px] w-full max-w-[260px] sm:h-[380px] sm:max-w-[300px] md:h-[400px] md:max-w-[320px]">
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
                    <div className="flex flex-col justify-center py-2 text-center md:py-4 md:text-left">
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
                                <div className="mb-6 md:mb-8">
                                    <h3 className="text-xl font-cinzel font-bold tracking-wide text-gold sm:text-2xl">
                                        {testimonials[active].name}
                                    </h3>
                                    <p className="mt-2 font-montserrat text-[11px] uppercase tracking-[0.26em] text-gold/50 sm:text-sm sm:tracking-[0.3em]">
                                        {testimonials[active].designation}
                                    </p>
                                </div>

                                {/* Quote */}
                                <motion.p className="font-seasons text-lg italic leading-8 text-muted-gold/90 sm:text-xl md:text-2xl">
                                    &ldquo;{testimonials[active].quote}&rdquo;
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Circular Navigation Buttons */}
                        <div className="relative z-50 flex justify-center gap-4 pt-10 md:justify-start md:pt-12">
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
