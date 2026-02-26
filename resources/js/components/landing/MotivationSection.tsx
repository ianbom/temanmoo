import { Button } from '@/components/ui/button';

export default function MotivationSection() {
    const leftPhotos = [
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", rotate: "-6deg", top: "5%", left: "8%", size: "120px" },
        { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", rotate: "4deg", top: "10%", left: "35%", size: "140px" },
        { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop", rotate: "-3deg", top: "32%", left: "5%", size: "130px" },
        { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", rotate: "7deg", top: "35%", left: "42%", size: "115px" },
        { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop", rotate: "-5deg", top: "58%", left: "15%", size: "135px" },
        { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", rotate: "3deg", top: "62%", left: "48%", size: "110px" },
        { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", rotate: "-8deg", top: "82%", left: "10%", size: "125px" },
    ];

    const rightPhotos = [
        { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", rotate: "5deg", top: "3%", right: "30%", size: "135px" },
        { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", rotate: "-4deg", top: "8%", right: "5%", size: "120px" },
        { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", rotate: "6deg", top: "30%", right: "15%", size: "145px" },
        { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", rotate: "-7deg", top: "38%", right: "45%", size: "110px" },
        { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop", rotate: "3deg", top: "58%", right: "8%", size: "130px" },
        { src: "https://images.unsplash.com/photo-1502767089025-6572583495f9?q=80&w=400&auto=format&fit=crop", rotate: "-5deg", top: "65%", right: "40%", size: "120px" },
        { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", rotate: "8deg", top: "83%", right: "20%", size: "115px" },
    ];

    return (
        <section className="relative w-full py-28 md:py-40 overflow-hidden bg-white">
            {/* Subtle radial fade for depth */}
            <div className="absolute inset-0 pointer-events-none" />

            {/* Left photo collage */}
            <div className="absolute top-0 left-0 w-[30%] h-full pointer-events-none hidden lg:block">
                {leftPhotos.map((photo, i) => (
                    <div
                        key={i}
                        className="absolute rounded-xl overflow-hidden shadow-lg border-2 border-white"
                        style={{
                            top: photo.top,
                            left: photo.left,
                            width: photo.size,
                            height: photo.size,
                            transform: `rotate(${photo.rotate})`,
                        }}
                    >
                        <img src={photo.src} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
                {/* Fade overlay on collage edges */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-white/90" />
            </div>

            {/* Right photo collage */}
            <div className="absolute top-0 right-0 w-[30%] h-full pointer-events-none hidden lg:block">
                {rightPhotos.map((photo, i) => (
                    <div
                        key={i}
                        className="absolute rounded-xl overflow-hidden shadow-lg border-2 border-white"
                        style={{
                            top: photo.top,
                            right: photo.right,
                            width: photo.size,
                            height: photo.size,
                            transform: `rotate(${photo.rotate})`,
                        }}
                    >
                        <img src={photo.src} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
                {/* Fade overlay on collage edges */}
                <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-white/90" />
            </div>

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-xl mx-auto">
                <h2 className="text-6xl md:text-[80px] lg:text-[96px] font-black text-gray-900 tracking-tighter leading-none mb-4">
                    1%
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                    Lebih Baik Setiap Hari
                </p>

                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                    Bangun fondasi hidupmu dengan 7 Pilar Kehidupan yang berbasis ilmu dan aplikatif. Benahi pola pikir, matangkan kualitas diri, dan wujudkan dampak nyata.
                </p>

                <Button
                    variant="outline"
                    className="rounded-full px-8 py-3 h-auto text-primary border-primary/40 hover:bg-primary hover:text-white font-semibold text-base transition-all duration-300"
                >
                    Mulai Perjalanan
                </Button>
            </div>
        </section>
    );
}
