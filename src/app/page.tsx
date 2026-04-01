import { Footer } from "@/components/Footer";
import { HomeHeroShell } from "@/components/HomeHeroShell";
import { AnimatedQuoteStrip } from "@/components/sections/AnimatedQuoteStrip";
import { ParallaxImageReveal } from "@/components/sections/ParallaxImageReveal";
import { SignatureBentoSection } from "@/components/sections/SignatureBentoSection";
import { SignaturesExplorer } from "@/components/sections/SignaturesExplorer";
import { AnimatedTestimonials } from "@/components/ui/testimonial";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-forest-green text-muted-gold">
            <HomeHeroShell />

            <AnimatedQuoteStrip
                quote="A sanctuary where precision and nature coexist in absolute harmony."
                author="The Heritage"
            />

            <ParallaxImageReveal
                imageSrc="/origins/unnamed (4).jpg"
                imageAlt="Coffee Heritage"
                title="Elevate Your Ritual"
                text="Discover a menu engineered for clarity, designed to awaken your senses and redefine your daily routine."
            />

            <SignaturesExplorer />
            <SignatureBentoSection />
            <AnimatedTestimonials />
            <Footer />
        </main>
    );
}
