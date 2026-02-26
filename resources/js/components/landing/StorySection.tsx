
export default function StorySection() {
    const items = [
        {
            title: "VISUALISASI\n(NAHKODA)",
            text: "Kita adalah nahkoda bagi Kapal Kehidupan kita sendiri. Kita berlayar di lautan dunia dengan arah yang kita tentukan.",
            image: "/images/landing/nahkoda.png",
            overlayTheme: "from-black/95 via-black/50 to-transparent"
        },
        {
            title: "VISUALISASI\n(LAUTAN)",
            text: "Gelombang dan badai datang silih berganti. Kita berlayar ke tiap pelabuhan, membawa muatan yang kita kumpulkan.",
            image: "/images/landing/lautan.png",
            overlayTheme: "from-black/95 via-black/50 to-transparent"
        },
        {
            title: "VISUALISASI\n(TUJUAN)",
            text: "Pelayaran ini tidak hanya tentang bertahan. Tetapi sampai dengan selamat dan penuh makna.",
            image: "/images/landing/tujuan.png",
            overlayTheme: "from-black/95 via-black/50 to-transparent"
        }
    ];

    return (
        <section className="w-full py-28 md:py-40 bg-white">
            <div className="container px-4 md:px-6 mx-auto w-full max-w-[1200px] mb-12">
                <div className="flex flex-col items-center justify-center">
                    <div className="space-y-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">
                            Hidup adalah Pelayaran Panjang
                        </h2>
                    </div>
                </div>
            </div>

            {/* Full-width Image Grid Area */}
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 aspect-auto lg:aspect-2.5/1 overflow-hidden">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer w-full h-[400px] lg:h-full overflow-hidden"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.image})` }}
                            ></div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-linear-to-t ${item.overlayTheme} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}></div>

                            {/* Text Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                                <p className="text-white/90 text-center font-medium leading-relaxed text-sm pt-4 border-t border-white/20">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="py-12 px-4 flex items-center justify-center">
                <p className="text-center text-xl md:text-2xl font-semibold text-black max-w-[800px] leading-relaxed">
                    Agar kapal tetap kokoh, membawa muatan yang bernilai, dan sampai ke tujuan, ia membutuhkan pilar yang menopangnya.
                </p>
            </div>
        </section>
    );
}
