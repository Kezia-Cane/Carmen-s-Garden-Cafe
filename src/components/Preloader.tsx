"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const isDev = process.env.NODE_ENV !== "production";

    useEffect(() => {
        const connection = typeof navigator !== "undefined" ? (navigator as any).connection : undefined;
        const shouldSkipPreloader =
            prefersReducedMotion ||
            connection?.saveData ||
            ["slow-2g", "2g", "3g"].includes(connection?.effectiveType);

        if (shouldSkipPreloader || isDev) {
            sessionStorage.setItem("preloaderSeen", "true");
            setIsLoading(false);
            onComplete?.();
            document.body.style.overflow = "auto";
            return;
        }

        // Prevent scrolling while preloader is active
        document.body.style.overflow = "hidden";

        // We want to wait for BOTH:
        // 1. A short, cinematic animation to play (ONLY on first visit).

        // Check if the user has already seen the preloader in this session
        const hasSeenPreloader = sessionStorage.getItem("preloaderSeen");
        const minimumWaitTime = hasSeenPreloader ? 0 : 800;

        const minimumTimePromise = new Promise((resolve) => setTimeout(resolve, minimumWaitTime));

        minimumTimePromise.then(() => {
            // Mark that the user has seen the preloader
            sessionStorage.setItem("preloaderSeen", "true");

            setIsLoading(false);
            // Re-enable scrolling slightly after the exit animation starts
            setTimeout(() => {
                document.body.style.overflow = "auto";
            }, 1000);
        });

        return () => {
            // Safety cleanup just in case component unmounts early
            document.body.style.overflow = "auto";
        };
    }, [onComplete, prefersReducedMotion, isDev]);

    // Set video playback rate to make the animation loop faster
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 16.0;
        }
    }, [isLoading]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                >
                    {/* The Cinematic Background Slide-Up */}
                    <motion.div
                        className="absolute inset-0 bg-forest-green"
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100%",
                            transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
                        }}
                    />

                    {/* The Video Logo Exit Animation */}
                    {!isDev ? (
                        <motion.video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                                filter: "blur(10px)",
                                transition: { duration: 0.6, ease: "easeInOut" }
                            }}
                            className="relative z-10 w-[350px] h-[350px] object-contain mix-blend-screen drop-shadow-2xl"
                        >
                            <source src="/videos/preloader.webm" type="video/webm" />
                        </motion.video>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                            className="relative z-10 px-6 py-3 rounded-full border border-gold/30 text-gold font-montserrat uppercase tracking-[0.4em] text-xs"
                        >
                            Loading
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
