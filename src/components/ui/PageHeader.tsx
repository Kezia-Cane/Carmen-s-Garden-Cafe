"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
            >
                <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-gold text-glow mb-6 tracking-wide drop-shadow-2xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="font-seasons text-xl md:text-2xl text-muted-gold tracking-widest uppercase drop-shadow-lg">
                        {subtitle}
                    </p>
                )}
            </motion.div>

            {/* Elegant Separator */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-[1px] bg-gold/30 mt-12 origin-center"
            />
        </section>
    );
}
