"use client";

import { motion } from "framer-motion";

interface AnimatedQuoteStripProps {
    quote: string;
    author?: string;
}

export const AnimatedQuoteStrip = ({ quote, author }: AnimatedQuoteStripProps) => {
    return (
        <section className="w-full py-24 md:py-32 bg-forest-green flex items-center justify-center px-6 border-y border-gold/10 content-visibility-auto">
            <div className="max-w-4xl text-center">
                <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-seasons text-2xl md:text-4xl lg:text-5xl leading-tight text-gold italic mb-8 mx-auto"
                >
                    "{quote}"
                </motion.p>

                {author && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center justify-center gap-4 text-muted-gold font-montserrat tracking-[0.2em] uppercase text-sm"
                    >
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                        {author}
                        <span className="w-12 h-[1px] bg-gold/50"></span>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
