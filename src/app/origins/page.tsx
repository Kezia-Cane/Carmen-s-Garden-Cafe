"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { motion } from "framer-motion";

export default function OriginsPage() {
    return (
        <main className="relative bg-forest-green text-muted-gold min-h-screen">
            <PageHeader
                title="Origins"
                subtitle="A vision revived through structured excellence."
            />

            {/* Content Section 1: The Jonas Family Vision */}
            <section className="py-24 px-8 md:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="font-cinzel text-4xl md:text-5xl text-gold mb-8">A Family Legacy</h2>
                    <p className="font-montserrat text-lg leading-relaxed text-muted-gold/90 mb-6">
                        Carmen&apos;s Garden Café is a testament to the Jonas family&apos;s dedication to their community. Already established through their neighboring law office, surveying firm, and car dealership, the family envisioned a premium sanctuary where locals and professionals could gather.
                    </p>
                    <p className="font-montserrat text-lg leading-relaxed text-muted-gold/90">
                        What started as a tranquil garden concept required a powerful operational framework to reach its true potential as an unforgettable culinary and beverage destination.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-square bg-emerald rounded-2xl overflow-hidden border border-gold/10 shadow-2xl"
                >
                    {/* Placeholder for high-fidelity origin image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-green/20 via-transparent to-forest-green/40 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center text-gold/20 font-cinzel text-3xl uppercase tracking-[0.3em] text-center px-4">
                        The Jonas <br /> Foundation
                    </div>
                </motion.div>
            </section>

            {/* Content Section 2: The John Salde Partnership */}
            <section className="py-24 px-8 md:px-24 bg-emerald relative">
                <AmbientGlow variant="top-right" className="opacity-10" />
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-cinzel text-3xl md:text-5xl text-gold mb-12"
                    >
                        Structured Growth
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="font-montserrat text-xl leading-relaxed italic"
                    >
                        "When passion meets structured execution, businesses grow."
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="font-montserrat text-lg leading-relaxed mt-8 text-muted-gold/80"
                    >
                        To elevate the café to unparalleled standards, the Jonas family partnered with <strong>John Salde Consulting</strong>. Bringing authoritative expertise in food business growth, structured systems, and operational consistency, John Salde orchestrated a complete brand revival—bridging the gap between the family&apos;s passionate vision and scalable profitability.
                    </motion.p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
