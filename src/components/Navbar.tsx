"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BotanicalButton } from "@/components/ui/botanical-button";

export default function Navbar({ isPreloaderDone = true }: { isPreloaderDone?: boolean }) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileCtaVisible, setIsMobileCtaVisible] = useState(false);
    const previousScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const nextIsScrolled = latest > 50;
        setIsScrolled((prev) => (prev === nextIsScrolled ? prev : nextIsScrolled));

        const delta = latest - previousScrollY.current;

        if (latest <= 24) {
            setIsMobileCtaVisible(false);
            previousScrollY.current = latest;
            return;
        }

        if (delta > 6) {
            setIsMobileCtaVisible(true);
        } else if (delta < -6) {
            setIsMobileCtaVisible(false);
        }

        previousScrollY.current = latest;
    });

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4 md:justify-between md:px-8 transition-colors duration-500 ${isScrolled ? "bg-forest-green/75 backdrop-blur-md border-b border-white/5" : "bg-transparent"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: isPreloaderDone ? 0 : -100 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Logo */}
                <div className="flex justify-center md:flex-1 md:justify-start">
                    <Link href="/#home-hero" className="inline-flex items-center hover:opacity-80 transition-opacity">
                        <Image
                            src="/carmens-garden-logo.png"
                            alt="Carmen's Garden Cafe"
                            width={260}
                            height={144}
                            priority
                            className="h-auto w-[220px] md:w-[220px] lg:w-[260px]"
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex flex-1 justify-center space-x-12">
                    {["Origins", "The Craft", "Menu", "Experience"].map((item) => {
                        const path = `/${item.toLowerCase().replace(" ", "-")}`;
                        return (
                            <Link
                                key={item}
                                href={path}
                                className="font-montserrat text-sm tracking-[0.2em] text-muted-gold hover:text-gold transition-colors duration-300 uppercase"
                            >
                                {item}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop CTA Button */}
                <div className="hidden md:flex md:flex-1 md:justify-end">
                    <BotanicalButton href="/#visit-garden" className="!py-3 !px-8 text-[10px] md:text-xs">
                        Visit the Garden
                    </BotanicalButton>
                </div>
            </motion.header>

            <motion.div
                className="fixed inset-x-0 bottom-0 z-50 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:hidden"
                initial={{ y: 120, opacity: 0 }}
                animate={{
                    y: isPreloaderDone && isMobileCtaVisible ? 0 : 120,
                    opacity: isPreloaderDone && isMobileCtaVisible ? 1 : 0,
                    pointerEvents: isPreloaderDone && isMobileCtaVisible ? "auto" : "none",
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="mx-auto w-full max-w-md rounded-2xl border border-gold/10 bg-forest-green/85 p-3 shadow-[0_-12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md">
                    <BotanicalButton href="/#visit-garden" className="!block !w-full !px-6 !py-4 text-[11px]">
                        Visit the Garden
                    </BotanicalButton>
                </div>
            </motion.div>
        </>
    );
}
