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
        // 1. Preload all images
        const loadImages = async () => {
            const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    // Pad number with leading zeroes
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `/sequence/5a397c44-049b-4726-8441-d86e3a659452_${paddedIndex}.webp`;
                    img.onload = () => resolve(img);
                });
            });

            imagesRef.current = await Promise.all(promises);
            setImagesLoaded(true);
        };

        loadImages();
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
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
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
        </motion.div>
    );
}
