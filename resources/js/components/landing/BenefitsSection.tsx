export default function BenefitsSection() {
    return (
        <section className="w-full py-28 md:py-40 bg-white">
            <div className="container px-4 md:px-6 mx-auto w-full max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 grid-flow-row-dense auto-rows-[300px] md:auto-rows-[320px]">

                    {/* Title Block (1x1) */}
                    <div className="flex flex-col justify-center py-6 md:pr-6">
                        <h2 className="text-4xl md:text-[44px] font-semibold tracking-tight  leading-[1.1] mb-5">
                            Mengapa Belajar<br />di Temanmoo
                        </h2>
                        <p className="text-gray-500 text-[17px] leading-relaxed">
                            Bukan sekadar kursus online biasa. Ini adalah sebuah transformasi.
                        </p>
                    </div>

                    {/* Point 1 (1x1 Image) */}
                    <div className="rounded-[32px] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop"
                            alt="Berbasis Ilmu"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <h3 className="text-[22px] font-semibold text-white tracking-tight drop-shadow-sm">Berbasis Ilmu</h3>
                            <p className="text-white/90 leading-relaxed font-medium drop-shadow-sm">
                                Pembelajaran dirancang aplikatif agar ilmu yang didapat langsung bisa dipraktikkan.
                            </p>
                        </div>
                    </div>

                    {/* Point 2 (1x1 Image) */}
                    <div className="rounded-[32px] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop"
                            alt="Pengajar Kompeten"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <h3 className="text-[22px] font-semibold text-white tracking-tight drop-shadow-sm">Pengajar Kompeten</h3>
                            <p className="text-white/90 leading-relaxed font-medium drop-shadow-sm">
                                Dapatkan bimbingan eksklusif dari para praktisi ahli dan berpengalaman.
                            </p>
                        </div>
                    </div>

                    {/* Point 3 (2x1 Image) */}
                    <div className="md:col-span-2 rounded-[32px] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                            alt="Sistem Terstruktur"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <h3 className="text-[22px] font-semibold text-white tracking-tight drop-shadow-sm">Sistem Terstruktur</h3>
                            <p className="text-white/90 leading-relaxed font-medium drop-shadow-sm md:max-w-[70%]">
                                Kurikulum terpadu langkah demi langkah yang memudahkan proses Anda dari awal hingga mahir.
                            </p>
                        </div>
                    </div>

                    {/* Point 4 (1x1 Image) */}
                    <div className="rounded-[32px] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=600&auto=format&fit=crop"
                            alt="Akses Mudah"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80"></div>
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <h3 className="text-[22px] font-semibold text-white tracking-tight drop-shadow-sm">Akses Mudah</h3>
                            <p className="text-white/90 leading-relaxed font-medium drop-shadow-sm">
                                Akses materi kapanpun dengan jaminan pembaruan berkala.
                            </p>
                        </div>
                    </div>

                    {/* Point 5 (3x1 Image Full Width) */}
                    <div className="md:col-span-2 lg:col-span-3 rounded-[32px] overflow-hidden relative group shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                            alt="Komunitas Supportif"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ objectPosition: 'center 40%' }}
                        />
                        <div className="absolute inset-0 bg-black/40 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
                        <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r "></div>
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end md:justify-center">
                            <h3 className="text-[28px] md:text-3xl font-semibold text-white mb-3 tracking-tight drop-shadow-sm">Komunitas Supportif</h3>
                            <p className="text-white/90 text-lg md:text-[19px] font-medium drop-shadow-sm max-w-[600px] leading-relaxed">
                                Bergabung dengan lingkungan positif yang siap mendukung dan bertumbuh bersama Anda di setiap langkah.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
