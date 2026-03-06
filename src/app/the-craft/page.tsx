"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { motion } from "framer-motion";

export default function TheCraftPage() {
    return (
        <main className="relative bg-forest-green text-muted-gold min-h-screen">
            <PageHeader
                title="The Craft"
                subtitle="Where strategic operations meet the perfect brew."
            />

            <section className="py-24 px-8 md:px-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-cinzel text-4xl md:text-6xl text-gold mb-8 lg:mb-12"
                        >
                            The Architecture <br /> of Operations
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="font-montserrat text-lg text-muted-gold/80 max-w-xl mb-12 leading-loose"
                        >
                            A true luxury café isn&apos;t just built on beautiful interiors—it survives on bulletproof systems. Through the expertise of John Salde Consulting, Carmen&apos;s Garden Café was entirely transformed. John orchestrated a structural rebirth spanning from back-of-house workflow design and coffee menu formulation to a dominant digital marketing presence.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { label: "Operational Leadership", desc: "Redefined store workflows, barista performance systems, and inventory control for flawless daily execution." },
                                { label: "Digital Presence", desc: "A total rebranding effort culminating in a premium website, dynamic social media systems, and automated customer journeys." },
                                { label: "Menu Architecture", desc: "Scientific beverage formulation, precise costing models, and a curated culinary offering that scales profitably." },
                                { label: "Systems Integration", desc: "Implementation of advanced POS systems, lead capture ecosystems, and deep analytics to ensure data-driven growth." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 bg-emerald/50 border border-gold/10 rounded-xl hover:border-gold/30 transition-colors"
                                >
                                    <h3 className="font-cinzel text-xl text-gold mb-3">{item.label}</h3>
                                    <p className="font-montserrat text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex items-center justify-center">
                        <div className="relative w-full aspect-[4/5] bg-emerald rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] group">
                            <AmbientGlow className="opacity-20 transition-opacity group-hover:opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center text-gold/10 font-cinzel text-xl text-center px-12 uppercase tracking-[0.5em] rotate-90 leading-relaxed">
                                Profit First <br /> Systems
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
