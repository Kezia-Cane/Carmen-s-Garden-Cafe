"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const menuItems = [
    {
        id: "menu-page-1",
        src: "/menu/menu 1.jpeg",
        alt: "Carmen's Garden Cafe menu page 1",
        eyebrow: "Portrait I",
        title: "Opening Pour",
        description: "The first menu portrait, framed for a calmer and more cinematic browsing experience.",
    },
    {
        id: "menu-page-2",
        src: "/menu/menu 2.jpeg",
        alt: "Carmen's Garden Cafe menu page 2",
        eyebrow: "Portrait II",
        title: "Golden Selection",
        description: "A refined second chapter with hover depth, tactile motion, and an instant full-view reveal.",
    },
    {
        id: "menu-page-3",
        src: "/menu/menu 3.jpeg",
        alt: "Carmen's Garden Cafe menu page 3",
        eyebrow: "Portrait III",
        title: "Curated Spread",
        description: "Balanced spacing and layered overlays keep the menu easy to scan while still feeling elevated.",
    },
    {
        id: "menu-page-4",
        src: "/menu/menu 4.jpeg",
        alt: "Carmen's Garden Cafe menu page 4",
        eyebrow: "Portrait IV",
        title: "Final Reveal",
        description: "Tap into a full-photo view for the cleanest read of the final menu page and its fine detail.",
    },
] as const;

type MenuItem = (typeof menuItems)[number];

function MenuCard({
    item,
    index,
    onOpen,
}: {
    item: MenuItem;
    index: number;
    onOpen: () => void;
}) {
    const isOffset = index % 2 === 1;

    return (
        <motion.button
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{
                duration: 0.75,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -12 }}
            whileTap={{ scale: 0.985 }}
            className={`group relative block w-full text-left ${isOffset ? "md:mt-10 lg:mt-12" : ""}`}
        >
            <div className="absolute inset-5 rounded-[2rem] bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:inset-8" />

            <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-[linear-gradient(180deg,rgba(22,64,50,0.92)_0%,rgba(8,30,21,0.98)_100%)] p-2.5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-[transform,box-shadow,border-color] duration-500 group-hover:border-gold/35 group-hover:shadow-[0_32px_120px_rgba(0,0,0,0.42)] sm:p-3 md:rounded-[2.4rem] md:p-4">
                <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-gold/10 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-emerald/40 md:rounded-[2rem]">
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(9,29,21,0.08)_0%,rgba(9,29,21,0.18)_35%,rgba(9,29,21,0.82)_100%)]" />

                    <motion.div
                        whileHover={{ scale: 1.045, rotate: isOffset ? -0.35 : 0.35 }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="relative aspect-[4/5] origin-center"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            priority={index < 2}
                            sizes="(max-width: 768px) 88vw, (max-width: 1280px) 44vw, 32vw"
                            className="object-cover"
                        />
                    </motion.div>

                    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 sm:p-5 md:p-6">
                        <div className="rounded-full border border-gold/20 bg-[rgba(9,29,21,0.6)] px-3 py-1.5 backdrop-blur-md">
                            <span className="font-montserrat text-[10px] uppercase tracking-[0.32em] text-gold/80 md:text-[11px]">
                                {item.eyebrow}
                            </span>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-[rgba(9,29,21,0.62)] text-gold/85 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:text-gold sm:h-11 sm:w-11">
                            <Expand className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 md:p-6">
                        <div className="rounded-[1.4rem] border border-gold/15 bg-[rgba(9,29,21,0.58)] p-3.5 backdrop-blur-xl transition-colors duration-500 group-hover:border-gold/30 group-hover:bg-[rgba(9,29,21,0.68)] sm:p-4 md:p-5">
                            <div className="mb-3 flex items-center justify-between gap-4">
                                <h2 className="font-cinzel text-[1.65rem] leading-tight text-gold sm:text-2xl md:text-[2rem]">
                                    {item.title}
                                </h2>
                                <span className="hidden font-montserrat text-[11px] uppercase tracking-[0.32em] text-muted-gold/80 sm:block">
                                    Tap to open
                                </span>
                            </div>

                            <p className="max-w-md font-montserrat text-[13px] leading-6 text-muted-gold/88 sm:text-sm sm:leading-7 md:text-[15px]">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

function MenuLightbox({
    activeIndex,
    onClose,
}: {
    activeIndex: number;
    onClose: () => void;
}) {
    const activeItem = menuItems[activeIndex];

    return (
        <motion.div
            className="fixed inset-0 z-[120] bg-[rgba(5,16,12,0.82)] backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={onClose}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[18%] h-64 w-64 -translate-x-1/2 rounded-full bg-gold/12 blur-[120px] md:h-96 md:w-96" />
                <div className="absolute bottom-[12%] right-[10%] h-52 w-52 rounded-full bg-emerald/45 blur-[120px] md:h-80 md:w-80" />
            </div>

            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${activeItem.title} full menu view`}
                className="relative z-10 h-[100dvh] w-screen overflow-hidden bg-[linear-gradient(180deg,rgba(13,45,32,0.96)_0%,rgba(7,24,17,0.98)_100%)]"
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 18 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-2 top-2 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gold/18 bg-[rgba(9,29,21,0.62)] text-gold/90 backdrop-blur-md transition-colors duration-300 hover:border-gold/35 hover:text-gold sm:right-5 sm:top-5 sm:h-12 sm:w-12"
                    aria-label="Close full photo view"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="absolute inset-0 flex items-center justify-center p-1 sm:p-4 md:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,224,148,0.08),transparent_42%)]" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.id}
                            initial={{ opacity: 0, scale: 0.98, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.985, y: -12 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex h-full w-full items-center justify-center"
                        >
                            <Image
                                src={activeItem.src}
                                alt={activeItem.alt}
                                width={1131}
                                height={1600}
                                priority
                                sizes="100vw"
                                className="h-auto w-[calc(100vw-0.5rem)] max-h-[calc(100dvh-0.5rem)] max-w-none object-contain shadow-[0_28px_90px_rgba(0,0,0,0.36)] sm:w-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100vw-2rem)] md:max-h-[calc(100dvh-3rem)] md:max-w-[calc(100vw-3rem)]"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function MenuPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActiveIndex(null);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [activeIndex]);

    return (
        <main className="relative min-h-screen overflow-x-clip bg-forest-green text-muted-gold">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[140px]" />
                <div className="absolute left-[8%] top-[28rem] h-[24rem] w-[24rem] rounded-full bg-emerald/35 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[4%] h-[20rem] w-[20rem] rounded-full bg-gold/6 blur-[120px]" />
            </div>

            <div className="relative z-20 bg-forest-green">
                <PageHeader
                    title="The Menu"
                    subtitle="A garden-grown menu of signature pours, coolers, and comfort plates."
                />
            </div>

            <section className="relative z-20 px-4 pb-24 md:px-8 md:pb-28">
                <div className="mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8 grid gap-4 sm:mb-10 sm:gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]"
                    >
                        <div className="rounded-[2rem] border border-gold/12 bg-[linear-gradient(180deg,rgba(22,64,50,0.55)_0%,rgba(8,30,21,0.75)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-7 md:p-9">
                            <p className="mb-4 font-montserrat text-[11px] uppercase tracking-[0.36em] text-gold/70">
                                Garden Menu Highlights
                            </p>
                            <h2 className="max-w-3xl font-cinzel text-[2rem] leading-tight text-gold sm:text-3xl md:text-5xl">
                                A cultivated menu shaped for slow pours, fresh coolers, and comforting plates.
                            </h2>
                            <p className="mt-4 max-w-2xl font-montserrat text-sm leading-7 text-muted-gold/88 md:mt-5 md:text-base">
                                Carmen&apos;s Garden Cafe brings together espresso rituals, non-coffee refreshers, and kitchen favorites in one branded collection designed for easy browsing and beautiful full-menu viewing.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-[1.8rem] border border-gold/12 bg-[rgba(9,29,21,0.62)] p-4 backdrop-blur-xl sm:p-5">
                                <p className="font-cinzel text-3xl text-gold sm:text-4xl">27</p>
                                <p className="mt-3 font-montserrat text-[10px] uppercase tracking-[0.24em] text-muted-gold/80 sm:text-[11px] sm:tracking-[0.3em]">
                                    Coffee Creations
                                </p>
                            </div>
                            <div className="rounded-[1.8rem] border border-gold/12 bg-[rgba(9,29,21,0.62)] p-4 backdrop-blur-xl sm:p-5">
                                <p className="font-cinzel text-3xl text-gold sm:text-4xl">24</p>
                                <p className="mt-3 font-montserrat text-[10px] uppercase tracking-[0.24em] text-muted-gold/80 sm:text-[11px] sm:tracking-[0.3em]">
                                    Non-Coffee Sips
                                </p>
                            </div>
                            <div className="rounded-[1.8rem] border border-gold/12 bg-[rgba(9,29,21,0.62)] p-4 backdrop-blur-xl sm:p-5">
                                <p className="font-cinzel text-3xl text-gold sm:text-4xl">27</p>
                                <p className="mt-3 font-montserrat text-[10px] uppercase tracking-[0.24em] text-muted-gold/80 sm:text-[11px] sm:tracking-[0.3em]">
                                    Food Favorites
                                </p>
                            </div>
                            <div className="rounded-[1.8rem] border border-gold/12 bg-[rgba(9,29,21,0.62)] p-4 backdrop-blur-xl sm:p-5">
                                <p className="font-cinzel text-3xl text-gold sm:text-4xl">78</p>
                                <p className="mt-3 font-montserrat text-[10px] uppercase tracking-[0.24em] text-muted-gold/80 sm:text-[11px] sm:tracking-[0.3em]">
                                    Curated Selections
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:gap-8">
                        {menuItems.map((item, index) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                index={index}
                                onOpen={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {activeIndex !== null && (
                    <MenuLightbox
                        activeIndex={activeIndex}
                        onClose={() => setActiveIndex(null)}
                    />
                )}
            </AnimatePresence>

            <div className="relative z-30 bg-forest-green">
                <Footer />
            </div>
        </main>
    );
}
