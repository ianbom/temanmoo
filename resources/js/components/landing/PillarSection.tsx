import { Play, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PillarSection() {
    const pillars = [
        {
            step: 1,
            title: "Diniyyah",
            subtitle: "Hubungan Spiritual — Kompas Hidup",
            description: "Memperkuat hubungan spiritual dengan Sang Pencipta sebagai landasan utama kehidupan. Tanpa kompas yang benar, kapal akan terombang-ambing tanpa tujuan yang pasti di tengah samudra kehidupan.",
            image: "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?q=80&w=800&auto=format&fit=crop",
            duration: "20 Menit Video",
            available: true,
            link: "https://www.temanmoobelajar.id/hijrah",
        },
        {
            step: 2,
            title: "Pengembangan Diri",
            subtitle: "Mindset — Ruang Kemudi",
            description: "Mengenali potensi diri, membangun mindset bertumbuh, dan manajemen emosi yang sehat. Seperti ruang kemudi, pikiran Anda menentukan arah dan respons terhadap setiap badai yang datang.",
            image: "https://images.unsplash.com/photo-1520690214124-2405c5217036?q=80&w=800&auto=format&fit=crop",
            duration: "25 Menit Video",
            available: true,
            link: "https://www.temanmoobelajar.id/tumbuh",
        },
        {
            step: 3,
            title: "Akademik",
            subtitle: "Wawasan — Peta Navigasi",
            description: "Pendidikan formal & non-formal untuk memperluas wawasan intelektual. Pengetahuan adalah peta yang membantu Anda menghindari karang dan menemukan rute tercepat menuju tujuan.",
            image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
            duration: "25 Menit Video",
            available: true,
        },
        {
            step: 4,
            title: "Skill",
            subtitle: "Kompetensi — Layar Kapal",
            description: "Keahlian praktis yang relevan untuk berkontribusi dalam dunia profesional. Skill adalah layar yang menangkap angin peluang dan mendorong kapal Anda melaju lebih cepat.",
            image: "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?q=80&w=800&auto=format&fit=crop",
            duration: "40 Menit Video",
            available: true,
        },
        {
            step: 5,
            title: "Keuangan",
            subtitle: "Finansial — Bahan Bakar",
            description: "Memahami pengelolaan keuangan yang sehat dan berkelanjutan. Seperti bahan bakar, keuangan yang dikelola dengan baik memberi tenaga agar perjalanan hidup Anda tidak berhenti di tengah jalan.",
            image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop",
            duration: "30 Menit Video",
            available: true,
        },
        {
            step: 6,
            title: "Kesehatan",
            subtitle: "Jasmani & Rohani — Lambung Kapal",
            description: "Menjaga kesehatan fisik dan mental agar tetap prima. Seperti lambung kapal yang harus kuat dan kedap air, tubuh dan jiwa yang sehat adalah fondasi agar Anda bisa terus berlayar.",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
            duration: "20 Menit Video",
            available: true,
        },
        {
            step: 7,
            title: "Relasi",
            subtitle: "Hubungan Sosial — Kru Kapal",
            description: "Membangun hubungan yang bermakna dengan keluarga, sahabat, dan komunitas. Seperti kru kapal yang saling menguatkan, relasi yang baik adalah kekuatan kolektif dalam perjalanan hidup.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
            duration: "25 Menit Video",
            available: true,
        }
    ];

    return (
        <section className="w-full py-28 md:py-40 bg-gray-50/70">
            <div className="container px-4 md:px-6 mx-auto w-full max-w-[1100px]">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight mb-5">
                        7 Pilar Kehidupan Temanmoo
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Fondasi utama untuk membangun kehidupan yang seimbang, bermakna, dan produktif. Kami fokus pada pengembangan menyeluruh.
                    </p>
                </div>

                {/* Pillar Cards */}
                <div className="space-y-8 md:space-y-12">
                    {pillars.map((pillar, index) => {
                        const isImageLeft = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-shadow duration-300`}
                            >
                                {/* Image Side */}
                                <div className="w-full md:w-[48%] shrink-0 h-[250px] md:h-auto md:min-h-[320px] relative group overflow-hidden">
                                    <img
                                        src={pillar.image}
                                        alt={pillar.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Dark overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                                    {/* Play button */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Play className="h-6 w-6 text-gray-800 fill-gray-800 ml-0.5" />
                                        </div>
                                    </div>

                                    {/* Duration badge */}
                                    {/* <div className="absolute bottom-4 right-4">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                                            <Eye className="w-3.5 h-3.5" />
                                            {pillar.duration}
                                        </div>
                                    </div> */}
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                                        Step {pillar.step}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-sm md:text-base font-medium text-gray-500 mb-5">
                                        {pillar.subtitle}
                                    </p>

                                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-8">
                                        {pillar.description}
                                    </p>

                                    <div className="flex items-center gap-4 flex-wrap">
                                        {pillar.available ? (
                                            <a href={pillar.link} target="_blank" rel="noopener noreferrer">
                                                <Button className="rounded-full px-6 h-10 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 shadow-md">
                                                    Ambil Kelas
                                                </Button>
                                            </a>
                                        ) : (
                                            <Button className="rounded-full px-6 h-10 text-sm font-semibold bg-primary hover:bg-primary/90 text-white border-0 shadow-md opacity-50 cursor-not-allowed" disabled>
                                                Ambil Kelas
                                            </Button>
                                        )}

                                        {/* <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                                            <Eye className="w-4 h-4" />
                                            Lihat Trailer
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
