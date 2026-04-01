"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/Preloader";

const CanvasSequence = dynamic(() => import("@/components/CanvasSequence"), {
    ssr: false,
    loading: () => <div className="h-[100svh] bg-forest-green" />,
});

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
            {showCanvas && <CanvasSequence isPreloaderDone={isPreloaderDone} />}
        </>
    );
}
