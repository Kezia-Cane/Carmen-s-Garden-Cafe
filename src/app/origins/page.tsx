"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { AnimatedQuoteStrip } from "@/components/sections/AnimatedQuoteStrip";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OriginsPage() {
    return (
        <main className="relative bg-forest-green text-muted-gold min-h-screen">
            <PageHeader
                title="Origins"
                subtitle="A vision revived through structured excellence."
            />

            {/* Content Section 1: The John Salde Partnership */}
            <section className="py-24 px-8 md:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-8">Structured Growth</h2>
                    <p className="font-montserrat text-xl leading-relaxed italic text-muted-gold/90 mb-6">
                        "When family vision is supported by structure and disciplined execution, meaningful growth becomes possible."
                    </p>
                    <p className="font-montserrat text-lg leading-relaxed text-muted-gold/80">
                        To elevate Carmen&apos;s Garden Café, the family partnered with <strong>John Salde Consulting</strong>. With expertise in beverage business growth, systems development, and operational consistency, the consultancy led a full brand and business revitalization, transforming the family&apos;s vision into a more refined, scalable, and profitable café.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-auto h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-gold/10"
                >
                    <Image
                        src="/origins/unnamed (4).jpg"
                        alt="John Salde Origin Consulting"
                        fill
                        className="object-cover brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Luxury Overlay Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-green/30 via-transparent to-forest-green/50 mix-blend-overlay" />
                    <div className="absolute inset-b-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-forest-green/80 to-transparent" />
                </motion.div>
            </section>

            <AnimatedQuoteStrip
                quote="Every great vision demands a foundation capable of holding it."
            />

            {/* Content Section 2: Sanctuary in the City */}
            <section className="py-32 px-8 md:px-24 bg-emerald relative overflow-hidden">
                <AmbientGlow variant="bottom-left" className="opacity-20 scale-150" />
                <AmbientGlow variant="top-right" className="opacity-10 scale-125" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold mb-10 text-glow"
                    >
                        A Sanctuary in the City
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="font-montserrat text-lg md:text-xl leading-loose text-muted-gold/90 max-w-3xl mx-auto mb-8"
                    >
                        Beyond the sophisticated systems lies the soul of Carmen’s Garden Café. Nestled quietly away from the urban rush, the rear garden offers a deeply immersive nature vibe.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="font-montserrat text-xl md:text-2xl leading-relaxed italic text-muted-gold/80"
                    >
                        It is an ultra-premium sanctuary designed for those who seek to escape the noise, chill in absolute tranquility, and enjoy a high-end atmosphere where every detail is in harmony.
                    </motion.p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
