import { Play, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <>
            <section className="w-full min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0a1628]/85" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 max-w-[800px] mx-auto py-20">
                    <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[64px] font-bold text-white tracking-tight leading-[1.1] mb-6">
                        7 Pilar Kehidupan Untuk{' '}
                        <br className="hidden sm:inline" />
                        Lebih Baik Setiap Hari
                    </h1>

                    <p className="text-white/70 text-lg md:text-xl italic max-w-[550px] leading-relaxed mb-10">
                        Temanimu belajar sepanjang hayat berbasis ilmu dan aplikatif. Bangun fondasi hidup yang kokoh.
                    </p>

                    {/* Stacked CTA Buttons */}
                    <div className="flex flex-col items-center gap-4 w-full max-w-[300px] mb-8">
                        <Button className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base uppercase tracking-widest shadow-lg">
                            Mulai Belajar
                        </Button>
                        <Button className="w-full h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-base uppercase tracking-widest shadow-lg border-0">
                            Lihat Program
                        </Button>
                    </div>

                    {/* Watch Video */}
                    <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest">
                        <Play className="w-4 h-4 fill-white/80" />
                        Tonton Video
                    </button>
                </div>
            </section>

            {/* Bottom Step Strip */}
            <div className="w-full bg-white border-b border-gray-100">
                <div className="container mx-auto max-w-[1200px] px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {[
                            { icon: BookOpen, label: "1. Tonton Kelas" },
                            { icon: Target, label: "2. Praktikkan Ilmunya" },
                            { icon: TrendingUp, label: "3. Tumbuh Lebih Baik" },
                        ].map((step, i) => (
                            <div key={i} className="flex items-center justify-center gap-3 py-5 md:py-6">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                    <step.icon className="w-5 h-5 text-gray-600" />
                                </div>
                                <span className="text-sm font-bold text-gray-800 tracking-wide">
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
