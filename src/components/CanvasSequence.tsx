"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Coffee } from "lucide-react";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import NextImage from "next/image";

const FRAME_COUNT = 82; // 000 to 081
const MOBILE_FALLBACK_SRC = "/sequence-mobile/5a397c44-049b-4726-8441-d86e3a659452_040_mobile.webp";

type ConnectionInfo = {
    saveData?: boolean;
    effectiveType?: string;
};

type IdleWindow = Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
};

export default function CanvasSequence({ isPreloaderDone = true }: { isPreloaderDone?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const [shouldReduceData, setShouldReduceData] = useState<boolean | null>(null);
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    // Frame and Phase Management
    const [phase, setPhase] = useState(0);
    // Phase 0: Initial (No text, just prompt)
    // Phase 1: Center Text (Frame 27)
    // Phase 2: Left Text (Frame 54)
    // Phase 3: Right Text (Frame 81)

    // Status lock state
    const [isFinished, setIsFinished] = useState(false);
    const isAnimatingRef = useRef(false);
    const frameRef = useRef(0);
    const phaseRef = useRef(0);

    // Touch variables for mobile swipe
    const touchStartRef = useRef(0);
    const touchEndRef = useRef(0);

    // --- ASSET LOADING LOGIC ---
    useEffect(() => {
        const connection = typeof navigator !== "undefined"
            ? ((navigator as Navigator & { connection?: ConnectionInfo }).connection)
            : undefined;
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
        const effectiveType = connection?.effectiveType ?? "";
        setIsMobileViewport(isMobile);
        setShouldReduceData(
            Boolean(connection?.saveData || ["slow-2g", "2g", "3g"].includes(effectiveType))
        );
    }, []);

    useEffect(() => {
        if (!isPreloaderDone || shouldReduceData === null || isMobileViewport) return;

        let isCancelled = false;
        const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
        const cleanupCallbacks: Array<{ type: "idle" | "timeout"; id: number }> = [];

        const CRITICAL_FRAMES = prefersReducedMotion || shouldReduceData ? 6 : 12;
        const BATCH_SIZE = prefersReducedMotion || shouldReduceData ? 4 : 8;
        const loadInitialImages = async () => {
            const promises = Array.from({ length: CRITICAL_FRAMES }).map((_, i) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new window.Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    const suffix = isMobile ? "_mobile" : "";
                    img.src = `/sequence/5a397c44-049b-4726-8441-d86e3a659452_${paddedIndex}${suffix}.webp`;
                    img.onload = () => resolve(img);
                });
            });

            const loadedInitial = await Promise.all(promises);
            if (isCancelled) return;
            loadedInitial.forEach((img, index) => {
                imagesRef.current[index] = img;
            });
            setImagesLoaded(true);
            lazyLoadRemaining(isMobile, CRITICAL_FRAMES, BATCH_SIZE);
        };

        const lazyLoadRemaining = (isMobile: boolean, startIndex: number, batchSize: number) => {
            let nextIndex = startIndex;
            const loadBatch = () => {
                const end = Math.min(nextIndex + batchSize, FRAME_COUNT);
                for (let i = nextIndex; i < end; i++) {
                    const img = new window.Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    const suffix = isMobile ? "_mobile" : "";
                    img.src = `/sequence/5a397c44-049b-4726-8441-d86e3a659452_${paddedIndex}${suffix}.webp`;
                    img.onload = () => {
                        if (isCancelled) return;
                        imagesRef.current[i] = img;
                    };
                }
                nextIndex = end;
                if (!isCancelled && nextIndex < FRAME_COUNT) {
                    scheduleNextBatch();
                }
            };
            const scheduleNextBatch = () => {
                const idleWindow = window as IdleWindow;
                if (idleWindow.requestIdleCallback) {
                    const callbackId = idleWindow.requestIdleCallback(loadBatch, { timeout: 1000 });
                    cleanupCallbacks.push({ type: "idle", id: callbackId });
                } else {
                    const timeoutId = window.setTimeout(loadBatch, 200);
                    cleanupCallbacks.push({ type: "timeout", id: timeoutId });
                }
            };
            scheduleNextBatch();
        };

        loadInitialImages();
        return () => {
            isCancelled = true;
            cleanupCallbacks.forEach((entry) => {
                const idleWindow = window as IdleWindow;
                if (entry.type === "idle" && idleWindow.cancelIdleCallback) {
                    idleWindow.cancelIdleCallback(entry.id);
                } else if (entry.type === "timeout") {
                    clearTimeout(entry.id);
                }
            });
        };
    }, [isPreloaderDone, prefersReducedMotion, shouldReduceData, isMobileViewport]);

    // --- RENDERING LOGIC ---
    const renderFrame = (index: number) => {
        if (!canvasRef.current || !imagesRef.current[index]) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = imagesRef.current[index];

        let scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        if (canvas.width <= 768) {
            scale *= 0.85; // Slight zoom out for mobile
        }

        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    useEffect(() => {
        if (imagesLoaded && canvasRef.current && imagesRef.current.length > 0) {
            renderFrame(0);
        }
    }, [imagesLoaded]);

    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            if (imagesLoaded) {
                renderFrame(frameRef.current);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded]);

    // --- STEPPED SCROLL AUTOPLAY LOGIC ---
    const playToFrame = (targetFrame: number, durationMs: number, onComplete?: () => void) => {
        isAnimatingRef.current = true;
        const startFrame = frameRef.current;
        const distance = targetFrame - startFrame;
        const startTime = performance.now();

        const draw = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);

            // easeInOutCubic for a distinctly cinematic acceleration/deceleration
            const easeValue = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            const nextFrame = Math.round(startFrame + distance * easeValue);

            if (nextFrame !== frameRef.current) {
                frameRef.current = nextFrame;
                renderFrame(nextFrame);
            }

            if (progress < 1) {
                requestAnimationFrame(draw);
            } else {
                isAnimatingRef.current = false;
                if (onComplete) onComplete();
            }
        };
        requestAnimationFrame(draw);
    };

    const onAdvance = useEffectEvent(() => {
        if (isAnimatingRef.current || !imagesLoaded || !isPreloaderDone) return;

        const p = phaseRef.current;
        if (p === 0) {
            setPhase(1); phaseRef.current = 1;
            playToFrame(27, 1200);
        } else if (p === 1) {
            setPhase(2); phaseRef.current = 2;
            playToFrame(54, 1200);
        } else if (p === 2) {
            setPhase(3); phaseRef.current = 3;
            playToFrame(81, 1200);
        } else if (p === 3 && !isFinished) {
            setIsFinished(true);
            document.body.style.overflow = "";
            document.body.style.overscrollBehavior = "";
        }
    });

    const onRevert = useEffectEvent(() => {
        if (isAnimatingRef.current || !imagesLoaded || !isPreloaderDone) return;

        const p = phaseRef.current;
        if (p === 1) {
            setPhase(0); phaseRef.current = 0;
            playToFrame(0, 1200);
        } else if (p === 2) {
            setPhase(1); phaseRef.current = 1;
            playToFrame(27, 1200);
        } else if (p === 3) {
            setPhase(2); phaseRef.current = 2;
            playToFrame(54, 1200);
        }
    });

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (isAnimatingRef.current) {
                if (!isFinished && e.cancelable) e.preventDefault();
                return;
            }

            if (!isFinished) {
                if (e.cancelable) e.preventDefault();
                // Debounce small scrolls
                if (e.deltaY > 30) onAdvance();
                else if (e.deltaY < -30) onRevert();
            } else {
                // If native scrolling is unlocked and user reaches top of page, re-lock to reverse the animation
                if (window.scrollY <= 0 && e.deltaY < -30) {
                    setIsFinished(false);
                    onRevert();
                }
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowDown", "ArrowUp", "Space", "PageDown", "PageUp"].includes(e.code)) {
                if (!isFinished && e.cancelable) e.preventDefault();
                if (isAnimatingRef.current) return;

                if (!isFinished) {
                    if (["ArrowDown", "Space", "PageDown"].includes(e.code)) onAdvance();
                    else onRevert();
                } else {
                    if (window.scrollY <= 0 && ["ArrowUp", "PageUp"].includes(e.code)) {
                        setIsFinished(false);
                        onRevert();
                    }
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isFinished && e.cancelable) e.preventDefault();
            touchEndRef.current = e.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            if (isAnimatingRef.current) return;
            if (touchEndRef.current === 0) return; // Prevent tap without move

            const distance = touchStartRef.current - touchEndRef.current;

            if (!isFinished) {
                if (distance > 50) onAdvance();
                else if (distance < -50) onRevert();
            } else {
                if (window.scrollY <= 0 && distance < -50) {
                    setIsFinished(false);
                    onRevert();
                }
            }

            touchStartRef.current = 0;
            touchEndRef.current = 0;
        };

        // Lock document body only if not finished
        if (!isFinished && isPreloaderDone) {
            document.body.style.overflow = "hidden";
            document.body.style.overscrollBehavior = "none";
        } else {
            document.body.style.overflow = "";
            document.body.style.overscrollBehavior = "";
        }

        // Always listen, because we need to intercept scroll-up at the top of the page even if finished
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKeyDown, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: false });

        return () => {
            document.body.style.overflow = "";
            document.body.style.overscrollBehavior = "";
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isFinished, imagesLoaded, isPreloaderDone]);


    if (isMobileViewport) {
        return (
            <div className="relative z-10 h-[100svh] w-full overflow-hidden bg-forest-green select-none">
                <NextImage
                    src={MOBILE_FALLBACK_SRC}
                    alt="Carmen's Garden Cafe hero"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(13,45,32,0.92)_100%)]" />
                <div className="absolute inset-0 bg-black/45 md:hidden" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <h1 className="mb-6 font-cinzel text-5xl text-gold text-glow md:text-7xl lg:text-8xl">
                        Carmen&apos;s Garden Cafe
                    </h1>
                    <p className="font-seasons text-lg tracking-[0.2em] text-muted-gold md:text-2xl">
                        Cultivated in nature, perfected in glass.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[100svh] z-10 bg-forest-green overflow-hidden select-none">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

            {/* Dark gradient overlay so text remains readable */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,theme(colors.forest-green)_100%)] opacity-80 pointer-events-none" />

            {/* Mobile high-contrast overlay */}
            <div className="absolute inset-0 bg-black/60 md:hidden pointer-events-none" />

            {/* Cinematic Fade to Black when finished (3rd scroll complete) */}
            <AnimatePresence>
                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-black/60 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* --- 1. PROMPT / INITIAL --- */}
            <AnimatePresence>
                {phase === 0 && isPreloaderDone && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8 }}
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none text-gold drop-shadow-[0_0_15px_rgba(242,224,148,0.5)]"
                    >
                        <p className="font-montserrat text-lg md:text-xl tracking-[0.4em] uppercase font-bold text-glow mb-6 text-center">
                            Scroll to Begin
                        </p>
                        <Coffee className="w-10 h-10 mb-4" />
                        <motion.div
                            className="w-[2px] h-20 bg-gradient-to-b from-gold to-transparent"
                            animate={{ y: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 2. PHASE 1: CENTER --- */}
            <AnimatePresence>
                {phase === 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(5px)" }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
                    >
                        <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-gold text-glow mb-6 tracking-wide drop-shadow-2xl">
                            Carmen’s Garden Café
                        </h1>
                        <p className="font-seasons text-xl md:text-2xl text-muted-gold tracking-widest uppercase drop-shadow-lg">
                            Cultivated in nature, perfected in glass.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 3. PHASE 2: LEFT --- */}
            <AnimatePresence>
                {phase === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-1/4 left-8 md:left-24 max-w-md pointer-events-none"
                    >
                        <AmbientGlow variant="top-left" className="opacity-30 scale-150 absolute -z-10" />
                        <h2 className="font-cinzel text-4xl md:text-5xl text-gold text-glow mb-6 text-left">
                            Structured Excellence.
                        </h2>
                        <p className="font-montserrat text-lg leading-relaxed text-muted-gold/90 text-left">
                            Curated selections of signature beverages and artisanal coffee creations deliver exceptional clarity. Every detail is tuned for balance and depth.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 4. PHASE 3: RIGHT --- */}
            <AnimatePresence>
                {phase === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                        transition={{ duration: 0.8 }}
                        className="absolute bottom-1/4 right-8 md:right-24 max-w-md text-right pointer-events-none"
                    >
                        <AmbientGlow variant="bottom-right" className="opacity-30 scale-150 absolute -z-10" />
                        <h2 className="font-cinzel text-4xl md:text-5xl text-gold text-glow mb-8 text-right">
                            The Architecture of Flavor.
                        </h2>
                        <ul className="space-y-6 font-montserrat text-lg text-muted-gold/90 text-right">
                            <li className="flex items-center justify-end gap-4">
                                <span>Signature roast profiles reveal hidden notes.</span>
                                <span className="w-8 h-[1px] bg-gold/50 block"></span>
                            </li>
                            <li className="flex items-center justify-end gap-4">
                                <span>Silky milk textures balanced by robust intensity.</span>
                                <span className="w-8 h-[1px] bg-gold/50 block"></span>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
