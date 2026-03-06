"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 82; // 000 to 081

export default function CanvasSequence({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Track scroll progress scoped to the hero container only (not full page)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map hero container scroll progress (0-1) to frame index (0-81)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Fade the canvas strictly to black/dark green across the last 15% of the scroll track
    const fadeOutOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    useEffect(() => {
        let isMobile = false;

        // Simple client-side detection for mobile sizing to swap assets
        if (typeof window !== 'undefined') {
            isMobile = window.innerWidth <= 768;
        }

        // 1. Initial critical path preload (first 15 frames)
        const CRITICAL_FRAMES = 15;

        const loadInitialImages = async () => {
            const promises = Array.from({ length: CRITICAL_FRAMES }).map((_, i) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    // Swap to mobile asset if detected
                    const suffix = isMobile ? "_mobile" : "";
                    img.src = `/sequence/5a397c44-049b-4726-8441-d86e3a659452_${paddedIndex}${suffix}.webp`;

                    // We need to preserve the array index for rendering
                    img.onload = () => resolve(img);
                });
            });

            const loadedInitial = await Promise.all(promises);

            // Safely update the ref array
            loadedInitial.forEach((img, index) => {
                imagesRef.current[index] = img;
            });

            setImagesLoaded(true);

            // 2. Lazy load the remaining frames in the background
            lazyLoadRemaining(isMobile);
        };

        const lazyLoadRemaining = (isMobile: boolean) => {
            // Use requestIdleCallback if available, otherwise fallback to setTimeout
            const loadChunk = () => {
                for (let i = CRITICAL_FRAMES; i < FRAME_COUNT; i++) {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    const suffix = isMobile ? "_mobile" : "";
                    img.src = `/sequence/5a397c44-049b-4726-8441-d86e3a659452_${paddedIndex}${suffix}.webp`;

                    img.onload = () => {
                        imagesRef.current[i] = img;
                    };
                }
            };

            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => loadChunk());
            } else {
                setTimeout(loadChunk, 500);
            }
        };

        loadInitialImages();
    }, []);

    // 2. Draw initial frame when loaded
    useEffect(() => {
        if (imagesLoaded && canvasRef.current && imagesRef.current.length > 0) {
            renderFrame(0);
        }
    }, [imagesLoaded]);

    // 3. Reactively draw frame when scroll changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (imagesLoaded) {
            // Use Math.round to snap to nearest integer frame
            renderFrame(Math.round(latest));
        }
    });

    const renderFrame = (index: number) => {
        if (!canvasRef.current || !imagesRef.current[index]) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Fast, simple clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = imagesRef.current[index];

        // Calculate aspect-ratio-preserving fit that covers the canvas (like object-fit: cover)
        // Or, for this specific art style ("floating in botanical void"), "contain" might be safer
        // The instructions say "centered and scaled to fit while preserving aspect ratio." Let's do object-fit: cover equivalent logic so it's truly full background:
        let scale = Math.max(canvas.width / img.width, canvas.height / img.height);

        // Slightly zoom out the image on narrow screens (mobile) to fit more of the cup
        if (canvas.width <= 768) {
            scale *= 0.85;
        }

        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // 4. Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;

            // Re-render current frame on active resize
            if (imagesLoaded) {
                renderFrame(Math.round(frameIndex.get()));
            }
        };

        window.addEventListener("resize", handleResize);
        // Initial size setting
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded, frameIndex]);

    return (
        <motion.div
            style={{ opacity: fadeOutOpacity }}
            className="fixed inset-0 z-0 pointer-events-none bg-forest-green"
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
            {/* Optional: subtle radial gradient overlay to soften edges leading into the dark void */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,theme(colors.forest-green)_100%)] opacity-80" />

            {/* Dark overlay specifically for mobile readability, invisible on md+ screens */}
            <div className="absolute inset-0 bg-black/60 md:hidden pointer-events-none" />
        </motion.div>
    );
}
