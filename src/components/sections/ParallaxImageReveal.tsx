"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxImageRevealProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    text: string;
}

export const ParallaxImageReveal = ({ imageSrc, imageAlt, title, text }: ParallaxImageRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Moves the image slower than the scroll to map a parallax effect
    const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    // Fades and translates the text up smoothly
    const textY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] overflow-hidden group content-visibility-auto">
            <motion.div style={{ y: yImage }} className="absolute inset-x-0 -top-[20%] -bottom-[20%] w-full h-[140%]">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-50 transition-all duration-[1500ms]"
                    sizes="100vw"
                />
            </motion.div>

            {/* Luxury Gradients to blend with forest green background */}
            <div className="absolute inset-0 bg-gradient-to-b from-forest-green via-transparent to-forest-green opacity-90" />
            <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="max-w-2xl text-center space-y-6"
                >
                    <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold drop-shadow-2xl">
                        {title}
                    </h2>
                    <p className="font-montserrat text-lg md:text-xl leading-relaxed text-muted-gold/90 drop-shadow-md">
                        {text}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
