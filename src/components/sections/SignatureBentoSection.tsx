import Image from "next/image";
import { BotanicalButton } from "@/components/ui/botanical-button";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { StoreStatusBadge } from "@/components/ui/store-status-badge";

// List of all 16 .webp stock images to build a PERFECT 4-column masonry grid
const GRID_IMAGES = [
    "/images/stock/470239299_122134369388447194_8913346382883304492_n.webp",
    "/images/stock/470427378_122134369370447194_79530031044350779_n.webp",
    "/images/stock/470501039_122134369622447194_3560086823846797264_n.webp",
    "/images/stock/470510324_122134369472447194_7085644156492017319_n.webp",
    "/images/stock/470536343_122134370012447194_7416600185258547996_n.webp",
    "/images/stock/470575642_122134369304447194_210898972173602441_n.webp",
    "/images/stock/470620133_122134369676447194_1732803144363623891_n.webp",
    "/images/stock/470628418_122134369424447194_8401791020099921540_n.webp",
    "/images/stock/470654696_122134369748447194_3482822642315861223_n.webp",
    "/images/stock/470671015_122134369730447194_2018458749307412004_n.webp",
    "/images/stock/470822720_122134369802447194_1512760933354067981_n.webp",
    "/images/stock/470705649_122134369580447194_3658870689785888353_n.webp",
    "/images/stock/470683003_122134369682447194_6431635200829411406_n.webp",
    "/images/stock/470683003_122134369682447194_6431635200829411406_n.webp",
    "/images/stock/470654696_122134369748447194_3482822642315861223_n.webp",
    "/images/stock/470671015_122134369730447194_2018458749307412004_n.webp",
];

function GridItem({ src, index, spanClass }: { src: string, index: number, spanClass: string }) {
    return (
        <div
            className={`relative group overflow-hidden rounded-2xl bg-[#091d15] border border-gold/10 ${spanClass} opacity-100 translate-y-0`}
        >
            <Image
                src={src}
                alt={`Garden Reveal ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                quality={60}
                loading="lazy"
            />
            {/* Ambient Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>
    );
}

export function SignatureBentoSection() {
    return (
        <section
            className="relative z-30 bg-forest-green py-32 px-4 md:px-8 lg:px-12 w-full min-h-screen overflow-x-clip content-visibility-auto"
        >
            <AmbientGlow variant="left" className="opacity-30" />
            <AmbientGlow variant="right" className="opacity-30" />
            {/* The Hook */}
            <div className="w-full text-center mb-24 md:mb-40 opacity-100">
                <p className="font-cinzel text-4xl md:text-5xl lg:text-7xl text-muted-gold tracking-wide">
                    &ldquo;Crafted for the senses.&rdquo;
                </p>
                <div className="h-[1px] w-24 bg-gold/30 mx-auto mt-8 mb-4" />
                <p className="font-montserrat text-sm tracking-[0.4em] uppercase text-gold/60">The Complete Experience</p>
            </div>

            {/* Modern Masonry Grid */}
            <div className="relative w-full max-w-[100rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-6 mb-40 auto-rows-[300px] md:auto-rows-[450px]">
                {GRID_IMAGES.map((src, index) => {
                    let spanClass = "col-span-1 row-span-1";

                    // Controlled Masonry Spans for a PERFECT 24-slot fill (4 columns x 6 rows)
                    if (index === 0) spanClass = "md:col-span-2 md:row-span-2";
                    if (index === 9) spanClass = "md:col-span-2 md:row-span-2";
                    if (index === 14) spanClass = "md:col-span-2";
                    if (index === 15) spanClass = "md:col-span-2";

                    return (
                        <GridItem key={`${src}-${index}`} src={src} index={index} spanClass={spanClass} />
                    )
                })}
            </div>

            {/* The Final Invitation with Google Maps */}
            <div id="visit-garden" className="w-full relative z-20 pb-16 opacity-100 scroll-mt-28">
                <div className="text-center mb-20">
                    <h2 className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-gold text-glow mb-4 tracking-tighter">
                        Your Table Awaits.
                    </h2>
                    <p className="font-montserrat text-sm tracking-[0.4em] uppercase text-gold/50">Find us in the garden</p>
                </div>

                {/* Map + Info Grid */}
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Google Maps */}
                    <div className="relative rounded-2xl overflow-hidden border border-gold/10 shadow-2xl min-h-[400px]">
                        <a
                            href="https://maps.app.goo.gl/bN1jafo2aLR6oLp7A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-forest-green/90 backdrop-blur-sm border border-gold/20 text-gold text-xs font-montserrat uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-gold hover:text-forest-green transition-all"
                        >
                            Open in Maps
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126619.9195388865!2d125.57238804767667!3d7.368186832405333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f94f00249b3bc5%3A0x259aa5a7c785466c!2sCarmen&#39;s%20Garden%20Cafe!5e0!3m2!1sen!2sph!4v1772635389590!5m2!1sen!2sph"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "400px" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Carmen's Garden Cafe Location"
                            className="w-full h-full"
                        />
                    </div>

                    {/* Right: Info Cards */}
                    <div className="flex flex-col gap-6">
                        {/* Hours Card */}
                        <div className="rounded-2xl border border-gold/10 bg-[#0e2a1b] p-8">
                            <StoreStatusBadge />

                            <div className="space-y-5">
                                <div className="flex justify-between items-center">
                                    <span className="font-montserrat text-sm font-semibold text-white">Monday to Saturday</span>
                                    <span className="font-montserrat text-sm text-muted-gold">10:00 AM - 12:00 AM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-montserrat text-sm font-semibold text-white">Sunday</span>
                                    <span className="font-montserrat text-sm text-muted-gold">1:00 PM - 10:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Amenities Card */}
                        <div className="rounded-2xl border border-gold/10 bg-[#0e2a1b] p-8">
                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-2 bg-gold/5 border border-gold/15 text-gold/80 text-xs font-montserrat uppercase tracking-wider px-5 py-2.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
                                    Free Wi-Fi
                                </span>
                                <span className="inline-flex items-center gap-2 bg-gold/5 border border-gold/15 text-gold/80 text-xs font-montserrat uppercase tracking-wider px-5 py-2.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
                                    Power Outlets
                                </span>
                                <span className="inline-flex items-center gap-2 bg-gold/5 border border-gold/15 text-gold/80 text-xs font-montserrat uppercase tracking-wider px-5 py-2.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                    Work-Friendly
                                </span>
                                <span className="inline-flex items-center gap-2 bg-gold/5 border border-gold/15 text-gold/80 text-xs font-montserrat uppercase tracking-wider px-5 py-2.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    Pet-Friendly
                                </span>
                                <span className="inline-flex items-center gap-2 bg-gold/5 border border-gold/15 text-gold/80 text-xs font-montserrat uppercase tracking-wider px-5 py-2.5 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    Garden Seating
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button — Below the Map */}
                <div className="text-center mt-16">
                    <BotanicalButton href="/#visit-garden">Visit the Garden</BotanicalButton>
                </div>
            </div>
        </section>
    );
}
