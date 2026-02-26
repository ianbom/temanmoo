import { Head } from '@inertiajs/react';
import BenefitsSection from '@/components/landing/BenefitsSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import HeroSection from '@/components/landing/HeroSection';
import MotivationSection from '@/components/landing/MotivationSection';
import Navbar from '@/components/landing/Navbar';
import PillarSection from '@/components/landing/PillarSection';
import StorySection from '@/components/landing/StorySection';
import VisionSection from '@/components/landing/VisionSection';

export default function Welcome() {
    return (
        <>
            <Head title="Temanmoo Belajar - 7 Pilar Kehidupan" />

            <div className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
                <Navbar />

                <main className="flex-1 flex flex-col">
                    <HeroSection />
                    <VisionSection />
                    <StorySection />
                    <PillarSection />
                    <BenefitsSection />
                    <MotivationSection />
                    <CtaSection />
                </main>

                <Footer />
            </div>
        </>
    );
}
