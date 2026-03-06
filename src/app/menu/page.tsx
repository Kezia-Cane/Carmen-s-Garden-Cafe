"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MenuPage() {
    return (
        <main className="relative bg-forest-green text-muted-gold min-h-screen">
            <PageHeader
                title="The Menu"
                subtitle="A showcase of culinary and beverage mastery."
            />

            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-center gap-8 mb-12"
                >
                    <div className="flex-1 w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gold/10 relative aspect-[3/4]">
                        <Image
                            src="/menu/Menu Left.png"
                            alt="Menu Left Side"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="flex-1 w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gold/10 relative aspect-[3/4]">
                        <Image
                            src="/menu/Menu Right.png"
                            alt="Menu Right Side"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center"
                >
                    <div className="w-full max-w-[500px] mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gold/10 relative aspect-[3/4]">
                        <Image
                            src="/menu/2.png"
                            alt="Additional Menu Items"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
