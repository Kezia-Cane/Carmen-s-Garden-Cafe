"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const menuItems = [
    {
        src: "/menu/Menu Left.png",
        alt: "Coffee and signature drinks menu",
        eyebrow: "Culinary Rhythm",
        title: "Signature Pour",
        description: "A layered menu reveal designed to feel immersive, polished, and easy to browse at any screen size.",
    },
    {
        src: "/menu/Menu Right.png",
        alt: "Main menu details and specialty offerings",
        eyebrow: "Craft Precision",
        title: "Curated Pairings",
        description: "Each panel arrives with subtle depth and motion so the next menu story glides over the last instead of snapping into place.",
    },
    {
        src: "/menu/2.png",
        alt: "Additional menu offerings and featured selections",
        eyebrow: "Final Reveal",
        title: "The Full Selection",
        description: "Built with a mobile-first stacked layout, refined overlays, and modern scroll choreography for a cleaner luxury feel.",
    },
];

function MenuPanel({
    item,
    index,
}: {
    item: (typeof menuItems)[number];
    index: number;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.03, 0.96]);
    const contentY = useTransform(scrollYProgress, [0, 1], [80, -40]);
    const contentOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.8], [0, 1, 1]);
    const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.45, 0.75]);
    const isEven = index % 2 === 0;

    return (
        <section
            ref={sectionRef}
            className={`relative h-[135svh] ${index === 0 ? "" : "-mt-[24svh] md:-mt-[30svh]"}`}
            style={{ zIndex: menuItems.length + 10 - index }}
        >
            <div className="sticky top-0 h-[100svh] overflow-hidden rounded-t-[2rem] border-t border-gold/10 bg-forest-green md:rounded-t-[2.75rem]">
                <motion.div
                    style={{ y: imageY, scale: imageScale }}
                    className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="object-contain object-center"
                    />
                </motion.div>

                <motion.div
                    style={{ opacity: veilOpacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,224,148,0.12),transparent_38%),linear-gradient(180deg,rgba(13,45,32,0.92)_0%,rgba(13,45,32,0.45)_34%,rgba(13,45,32,0.88)_100%)]"
                />

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,45,32,0.92)_0%,rgba(13,45,32,0.32)_42%,rgba(13,45,32,0.88)_100%)] md:hidden" />

                <div className="relative z-10 flex h-full items-end px-5 pb-12 pt-28 md:px-10 md:pb-16 lg:px-16">
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className={`max-w-xl rounded-[1.75rem] border border-gold/15 bg-[rgba(9,29,21,0.62)] p-6 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.3)] md:p-8 ${
                            isEven ? "md:ml-auto" : "md:mr-auto"
                        }`}
                    >
                        <p className="mb-3 font-montserrat text-[11px] uppercase tracking-[0.38em] text-gold/70 md:text-xs">
                            {item.eyebrow}
                        </p>
                        <h2 className="mb-4 font-cinzel text-3xl text-gold md:text-5xl">
                            {item.title}
                        </h2>
                        <p className="font-montserrat text-sm leading-7 text-muted-gold/85 md:text-base">
                            {item.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default function MenuPage() {
    return (
        <main className="relative min-h-screen bg-forest-green text-muted-gold">
            <div className="relative z-20 bg-forest-green">
                <PageHeader
                    title="The Menu"
                    subtitle="A cinematic menu presentation with layered motion and refined detail."
                />
            </div>

            <section className="relative isolate overflow-x-clip bg-forest-green pb-20">
                {menuItems.map((item, index) => (
                    <MenuPanel key={item.src} item={item} index={index} />
                ))}
            </section>

            <div className="relative z-30 bg-forest-green">
                <Footer />
            </div>
        </main>
    );
}
