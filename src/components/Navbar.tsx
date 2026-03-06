"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { BotanicalButton } from "@/components/ui/botanical-button";

export default function Navbar({ isPreloaderDone = true }: { isPreloaderDone?: boolean }) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-colors duration-500 ${isScrolled ? "bg-forest-green/75 backdrop-blur-md border-b border-white/5" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: isPreloaderDone ? 0 : -100 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Logo */}
            <div className="flex-1">
                <Link href="/" className="font-cinzel text-2xl tracking-widest text-gold text-glow font-bold hover:opacity-80 transition-opacity">
                    Carmen&apos;s Garden
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

            {/* CTA Button */}
            <div className="flex-1 flex justify-end">
                <BotanicalButton className="!py-3 !px-8 text-[10px] md:text-xs">Visit the Garden</BotanicalButton>
            </div>
        </motion.header>
    );
}
