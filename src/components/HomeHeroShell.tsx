"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Preloader } from "@/components/Preloader";

const HERO_POSTER_SRC = "/sequence/5a397c44-049b-4726-8441-d86e3a659452_000.webp";

const CanvasSequence = dynamic(() => import("@/components/CanvasSequence"), {
    ssr: false,
    loading: () => <HeroPoster />,
});

function HeroPoster() {
    return (
        <div className="relative z-10 h-[100svh] w-full overflow-hidden bg-forest-green">
            <Image
                src={HERO_POSTER_SRC}
                alt="Carmen's Garden Cafe hero poster"
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(13,45,32,0.95)_100%)]" />
            <div className="absolute inset-0 bg-black/35" />
        </div>
    );
}

export function HomeHeroShell() {
    const [isPreloaderDone, setIsPreloaderDone] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        if (!isPreloaderDone) return;

        let settled = false;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        let idleId: number | undefined;

        const reveal = () => {
            if (settled) return;
            settled = true;
            setShowCanvas(true);
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("pointerdown", reveal);
            window.removeEventListener("keydown", reveal);
        };

        if ("requestIdleCallback" in window) {
            idleId = (window as Window & {
                requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
                cancelIdleCallback: (handle: number) => void;
            }).requestIdleCallback(reveal, { timeout: 1200 });
        } else {
            timeoutId = setTimeout(reveal, 800);
        }

        window.addEventListener("scroll", reveal, { passive: true });
        window.addEventListener("pointerdown", reveal, { passive: true });
        window.addEventListener("keydown", reveal);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (idleId && "cancelIdleCallback" in window) {
                (window as Window & {
                    cancelIdleCallback: (handle: number) => void;
                }).cancelIdleCallback(idleId);
            }
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("pointerdown", reveal);
            window.removeEventListener("keydown", reveal);
        };
    }, [isPreloaderDone]);

    return (
        <>
            <Preloader onComplete={() => setIsPreloaderDone(true)} />
            {showCanvas ? <CanvasSequence isPreloaderDone={isPreloaderDone} /> : <HeroPoster />}
        </>
    );
}
