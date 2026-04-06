"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { BotanicalButton } from "@/components/ui/botanical-button";

const navItems = [
    { label: "Origins", href: "/origins" },
    { label: "The Craft", href: "/the-craft" },
    { label: "Menu", href: "/menu" },
    { label: "Experience", href: "/experience" },
] as const;

export default function Navbar({ isPreloaderDone = true }: { isPreloaderDone?: boolean }) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileCtaVisible, setIsMobileCtaVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const previousScrollY = useRef(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const syncMenuState = () => {
            if (mediaQuery.matches) {
                setIsMobileMenuOpen(false);
            }
        };

        syncMenuState();
        mediaQuery.addEventListener("change", syncMenuState);

        return () => {
            mediaQuery.removeEventListener("change", syncMenuState);
        };
    }, []);

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
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4 md:justify-between md:px-8 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "bg-forest-green/75 backdrop-blur-md border-b border-white/5" : "bg-transparent"
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

                <button
                    type="button"
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/15 bg-forest-green/85 text-gold shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-md transition-colors hover:bg-forest-green md:hidden"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* Navigation Links */}
                <nav className="hidden md:flex flex-1 justify-center space-x-12">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="font-montserrat text-sm tracking-[0.2em] text-muted-gold hover:text-gold transition-colors duration-300 uppercase"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA Button */}
                <div className="hidden md:flex md:flex-1 md:justify-end">
                    <BotanicalButton href="/#visit-garden" className="!py-3 !px-8 text-[10px] md:text-xs">
                        Visit the Garden
                    </BotanicalButton>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close mobile navigation"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px] md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        />

                        <motion.nav
                            id="mobile-navigation"
                            className="fixed inset-x-4 top-[92px] z-50 overflow-hidden rounded-[2rem] border border-gold/10 bg-forest-green/95 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.98 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="border-b border-gold/10 px-5 py-4">
                                <p className="font-montserrat text-[11px] uppercase tracking-[0.35em] text-gold/55">
                                    Navigate
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 p-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="rounded-[1.4rem] border border-gold/10 bg-white/[0.02] px-5 py-4 font-montserrat text-sm uppercase tracking-[0.22em] text-muted-gold transition-colors duration-300 hover:border-gold/20 hover:bg-gold/5 hover:text-gold"
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <Link
                                    href="/#visit-garden"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-2 rounded-[1.4rem] border border-gold/20 bg-gold/10 px-5 py-4 text-center font-montserrat text-sm uppercase tracking-[0.24em] text-gold transition-colors duration-300 hover:bg-gold/15"
                                >
                                    Visit the Garden
                                </Link>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>

            <motion.div
                className="fixed inset-x-0 bottom-0 z-50 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:hidden"
                initial={{ y: 120, opacity: 0 }}
                animate={{
                    y: isPreloaderDone && isMobileCtaVisible && !isMobileMenuOpen ? 0 : 120,
                    opacity: isPreloaderDone && isMobileCtaVisible && !isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isPreloaderDone && isMobileCtaVisible && !isMobileMenuOpen ? "auto" : "none",
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
