"use client";

import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY_IMAGES = [
    "470239299_122134369388447194_8913346382883304492_n.webp",
    "470427378_122134369370447194_79530031044350779_n.webp",
    "470501039_122134369622447194_3560086823846797264_n.webp",
    "470510324_122134369472447194_7085644156492017319_n.webp",
    "470536343_122134370012447194_7416600185258547996_n.webp",
    "470575642_122134369304447194_210898972173602441_n.webp",
    "470620133_122134369676447194_1732803144363623891_n.webp",
    "470628418_122134369424447194_8401791020099921540_n.webp",
    "470654696_122134369748447194_3482822642315861223_n.webp",
    "470671015_122134369730447194_2018458749307412004_n.webp",
    "470683003_122134369682447194_6431635200829411406_n.webp",
    "470705649_122134369580447194_3658870689785888353_n.webp",
    "470822720_122134369802447194_1512760933354067981_n.webp"
];

export default function ExperiencePage() {
    return (
        <main className="relative bg-forest-green text-muted-gold min-h-screen">
            <PageHeader
                title="Experience"
                subtitle="A multisensory journey into the heart of the garden."
            />

            <section className="py-24 px-4 md:px-8">
                {/* Immersive Masonry-style Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-[1400px] mx-auto">
                    {GALLERY_IMAGES.map((img, idx) => (
                        <motion.div
                            key={img}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative break-inside-avoid rounded-2xl overflow-hidden border border-gold/10 bg-emerald/10 shadow-xl"
                        >
                            {/* Ensure next/image maintains original aspect ratios. Using width/height bounds. */}
                            <div className="relative w-full aspect-auto h-auto">
                                <Image
                                    src={`/experience-gallery/${img}`}
                                    alt={`Carmen's Garden Experience ${idx + 1}`}
                                    width={600}
                                    height={800}
                                    className="object-cover w-full h-auto brightness-90 group-hover:brightness-110 group-hover:scale-105 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-green/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Atmospheric Quote Section */}
            <section className="py-48 px-8 text-center bg-emerald/20 relative overflow-hidden">
                <AmbientGlow variant="top-left" className="opacity-30 mix-blend-screen w-[800px] h-[800px]" />
                <AmbientGlow variant="bottom-right" className="opacity-30 mix-blend-screen w-[800px] h-[800px]" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <h2 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-gold mb-12 drop-shadow-[0_0_20px_rgba(242,224,148,0.2)]">
                        The Sound of Clarity
                    </h2>
                    <p className="font-seasons text-2xl md:text-4xl text-muted-gold leading-relaxed italic">
                        "Escape the noise. In the garden, time slows to the rhythm of the drip and the whisper of the leaves."
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
