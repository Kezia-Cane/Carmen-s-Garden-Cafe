"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Preloader } from "./Preloader";

type WindowWithIdleCallbacks = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const HERO_POSTER_SRC =
  "/sequence/5a397c44-049b-4726-8441-d86e3a659452_000.webp";

function HeroPoster() {
  return (
    <div className="relative h-[100svh] overflow-hidden bg-[#082817]">
      <Image
        src={HERO_POSTER_SRC}
        alt="Carmen's Garden Cafe hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/28" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#061f13]/55 via-[#061f13]/18 to-[#061f13]/86" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/10 to-black/62" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#082817] via-[#082817]/75 to-transparent" />
    </div>
  );
}

const CanvasSequence = dynamic(() => import("./CanvasSequence"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

export function HomeHeroShell() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (!isPreloaderDone) {
      setShowCanvas(false);
      return;
    }

    const browserWindow = window as WindowWithIdleCallbacks;
    let idleCallbackId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let hasActivated = false;

    const cleanupListeners = () => {
      if (
        idleCallbackId !== null &&
        typeof browserWindow.cancelIdleCallback === "function"
      ) {
        browserWindow.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }

      window.removeEventListener("pointerdown", activateCanvas);
      window.removeEventListener("keydown", activateCanvas);
      window.removeEventListener("touchstart", activateCanvas);
      window.removeEventListener("wheel", activateCanvas);
    };

    const activateCanvas = () => {
      if (hasActivated) {
        return;
      }

      hasActivated = true;
      setShowCanvas(true);
      cleanupListeners();
    };

    if (typeof browserWindow.requestIdleCallback === "function") {
      idleCallbackId = browserWindow.requestIdleCallback(activateCanvas, {
        timeout: 1200,
      });
    } else {
      timeoutId = globalThis.setTimeout(activateCanvas, 450);
    }

    window.addEventListener("pointerdown", activateCanvas, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", activateCanvas, { once: true });
    window.addEventListener("touchstart", activateCanvas, {
      passive: true,
      once: true,
    });
    window.addEventListener("wheel", activateCanvas, {
      passive: true,
      once: true,
    });

    return () => {
      cleanupListeners();
    };
  }, [isPreloaderDone]);

  return (
    <>
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      {showCanvas ? (
        <CanvasSequence isPreloaderDone={isPreloaderDone} />
      ) : (
        <HeroPoster />
      )}
    </>
  );
}

export default HomeHeroShell;
