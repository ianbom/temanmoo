import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="w-full pt-16 pb-24 lg:pt-24 lg:pb-32 flex flex-col items-center bg-primary relative overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10 w-full max-w-[1200px] mx-auto">

                <div className="space-y-6 max-w-[800px]">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
                        7 Pilar Kehidupan Untuk <br className="hidden md:inline" /> Lebih Baik Setiap Hari
                    </h1>
                    <p className="mx-auto max-w-[650px] text-white/90 md:text-xl font-medium leading-relaxed">
                        Temanimu belajar sepanjang hayat berbasis ilmu dan aplikatif. Bangun fondasi hidup yang kokoh untuk masa depan yang lebih bermakna.
                    </p>
                </div>

                <div className="flex justify-center flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
                    <Button size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90 font-bold shadow-md h-12 text-base">
                        Mulai Belajar
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent text-white border-white hover:bg-white/10 font-bold h-12 text-base">
                        Lihat Program
                    </Button>
                </div>

                {/* Video Section */}
                <div className="mt-16 sm:mt-20 w-full max-w-[1100px] mx-auto relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] aspect-video border border-white/10 group cursor-pointer">
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors group-hover:bg-black/60">
                            <Play className="h-4 w-4 fill-white" />
                            <span>Trailer</span>
                        </div>
                    </div>

                    <iframe
                        className="w-full h-full absolute inset-0"
                        src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=0&controls=1&rel=0&modestbranding=1"
                        title="Temanmoo Belajar Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
