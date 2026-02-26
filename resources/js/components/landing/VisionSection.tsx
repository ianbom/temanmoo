export default function VisionSection() {
    const items = [
        {
            number: "1",
            title: "Belajar",
            subtitle: "Benahi Cara Berpikir",
            description: "Sebagai langkah awal, Anda mendapatkan akses penuh ke materi fundamental yang akan membantu membenahi pola pikir dan memantapkan arah langkah kehidupan."
        },
        {
            number: "2",
            title: "Bertumbuh",
            subtitle: "Matangkan Kualitas Diri",
            description: "Kelas on-demand dan webinar eksklusif memberikan Anda rencana terstruktur yang mudah diimplementasikan untuk mengoptimalkan potensi dan kualitas diri."
        },
        {
            number: "3",
            title: "Berkarya",
            subtitle: "Wujudkan Dampak Nyata",
            description: "Dengan panduan yang telah terbukti efektivitasnya, Anda akan takjub melihat bagaimana keyakinan diri Anda meningkat pesat dan dapat memberi dampak nyata."
        }
    ];

    return (
        <section className="w-full py-28 md:py-40 bg-white">
            <div className="container px-4 md:px-6 mx-auto w-full max-w-[1100px]">
                {/* Heading */}
                <h2 className="text-3xl md:text-[42px] font-bold text-center text-[#0a1628] leading-[1.2] tracking-tight mb-5 max-w-3xl mx-auto">
                    Langkah Anda Untuk Bertumbuh Bersama
                </h2>
                <p className="text-center text-gray-400 text-lg mb-20">
                    Mulai dari sini, satu langkah demi satu langkah
                </p>

                {/* 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white px-10 py-12 group hover:bg-gray-50/80 transition-colors duration-300"
                        >
                            {/* Vis Label */}
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-6">
                                Visi {item.number}
                            </span>

                            {/* Title */}
                            <h3 className="text-3xl md:text-4xl font-black text-[#0a1628] leading-none mb-3">
                                {item.title}
                            </h3>

                            {/* Divider */}
                            <div className="w-8 h-0.5 bg-primary mb-5 group-hover:w-14 transition-all duration-500" />

                            {/* Subtitle */}
                            <p className="text-base font-semibold text-gray-600 mb-5">
                                {item.subtitle}
                            </p>

                            {/* Description */}
                            <p className="text-gray-500 text-[15px] leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
