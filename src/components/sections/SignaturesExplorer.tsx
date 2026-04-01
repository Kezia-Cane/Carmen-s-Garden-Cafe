"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BotanicalButton } from "@/components/ui/botanical-button";
import { AmbientGlow } from "@/components/ui/ambient-glow";

const SIGNATURES = [
    {
        id: "dulce-de-leche",
        name: "Dulce De Leche",
        price: 160,
        description: "Velvety caramel kissed espresso, layered with slow-cooked dulce de leche and silky steamed milk. A golden indulgence.",
        callout: "House Favorite",
        src: "/images/signatures/dulce-de-leche.webp",
    },
    {
        id: "spanish-latte",
        name: "Slowdown Spanish Latte",
        price: 170,
        description: "Condensed milk meets bold espresso in a slow-pour ritual. Cinnamon-dusted, impossibly smooth.",
        callout: "Slow Ritual",
        src: "/images/signatures/slowdown-latte.webp",
    },
    {
        id: "campfire-cloud",
        name: "Campfire Cloud",
        price: 170,
        description: "Toasted marshmallow foam atop smoky espresso. A fireside moment captured in a glass.",
        callout: "Smoky & Sweet",
        src: "/images/signatures/campfire-cloud.webp",
    },
    {
        id: "tiramisu-latte",
        name: "Tiramisu Latte",
        price: 160,
        description: "Mascarpone cream folded into espresso, dusted with cocoa. The Italian classic, reimagined.",
        callout: "Italian Soul",
        src: "/images/signatures/tiramisu-latte.webp",
    },
    {
        id: "black-sunkist",
        name: "Black Sunkist",
        price: 140,
        description: "Bold black espresso meets fresh orange zest. A citrus-forward, zero-sugar awakening.",
        callout: "Zero Sugar",
        src: "/images/signatures/black-sunkist.webp",
    },
];

export function SignaturesExplorer() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = SIGNATURES[activeIndex];

    return (
        <section
            id="menu"
            className="relative z-20 bg-forest-green py-24 md:py-32 px-4 md:px-8 lg:px-12 overflow-x-clip min-h-screen flex items-center content-visibility-auto"
        >
            <AmbientGlow variant="right" className="opacity-30" />

            <div className="mx-auto max-w-7xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* LEFT COLUMN — Product Showcase */}
                    <div className="flex flex-col items-center text-center order-2 lg:order-1">
                        {/* Floating Product Image */}
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center mb-8">
                            {/* Glow ring behind the product */}
                            <div className="absolute inset-[15%] rounded-full bg-gold/[0.03] blur-3xl" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.92 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    {/* Magnetic hover effect wrapper */}
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        className="relative w-[85%] h-[85%]"
                                    >
                                        <Image
                                            src={active.src}
                                            alt={active.name}
                                            fill
                                            sizes="(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 420px"
                                            className="object-contain drop-shadow-[0_20px_60px_rgba(242,224,148,0.12)]"
                                            quality={70}
                                            priority={activeIndex === 0}
                                        />
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Product Info */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id + "-info"}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                                className="space-y-4"
                            >
                                <h3 className="font-cinzel text-3xl md:text-4xl text-gold tracking-wide">
                                    {active.name}
                                </h3>
                                <p className="font-montserrat text-sm md:text-base text-muted-gold/80 max-w-sm mx-auto leading-relaxed">
                                    {active.description}
                                </p>
                                <p className="font-seasons text-2xl text-muted-gold">
                                    ₱{active.price}.00
                                </p>

                                <div className="pt-4">
                                    <BotanicalButton>Add to Sip</BotanicalButton>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN — Interactive Card Stack */}
                    <div className="order-1 lg:order-2">
                        <div className="mb-10">
                            <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold tracking-wider mb-3">
                                Our Signatures
                            </h2>
                            <div className="h-[1px] w-16 bg-gold/30" />
                        </div>

                        {/* Card Stack */}
                        <div className="space-y-4">
                            {SIGNATURES.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => setActiveIndex(index)}
                                    initial={{ opacity: 0, x: 40, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.08,
                                        ease: [0.32, 0.72, 0, 1],
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    className={`w-full flex items-center gap-5 p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer group ${activeIndex === index
                                        ? "border-gold bg-gold/[0.08] shadow-[0_0_20px_rgba(242,224,148,0.15)]"
                                        : "border-gold/10 bg-[#0e2a1b] hover:border-gold/30 hover:bg-gold/[0.03]"
                                        }`}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 border transition-colors ${activeIndex === index ? "border-gold/40" : "border-gold/10"
                                            }`}
                                    >
                                        <Image
                                            src={item.src}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            sizes="80px"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            quality={60}
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Card Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4
                                                className={`font-cinzel text-sm md:text-base truncate transition-colors ${activeIndex === index ? "text-gold" : "text-muted-gold"
                                                    }`}
                                            >
                                                {item.name}
                                            </h4>
                                            {activeIndex === index && (
                                                <motion.span
                                                    layoutId="active-badge"
                                                    className="font-signature text-gold text-lg md:text-xl whitespace-nowrap drop-shadow-md"
                                                >
                                                    {item.callout}
                                                </motion.span>
                                            )}
                                        </div>

                                        <p
                                            className={`font-seasons text-base mt-1 transition-colors ${activeIndex === index ? "text-gold" : "text-muted-gold/70"
                                                }`}
                                        >
                                            ₱{item.price}.00
                                        </p>
                                    </div>

                                    {/* Active Indicator */}
                                    {activeIndex === index && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="w-1.5 h-10 rounded-full bg-gold flex-shrink-0"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
