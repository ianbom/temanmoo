import { Button } from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section className="w-full mt-28 py-28 md:py-40 px-4 md:px-6 bg-linear-to-r from-primary/15 via-white to-primary/10 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl md:text-[56px] lg:text-[64px] font-bold tracking-tight text-[#111827] leading-[1.1] mb-4">
                    Mulai Pelayaranmu Bersama Temanmoo Belajar
                </h2>

                <Button className="rounded-full px-10 h-14 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg transition-transform hover:scale-105 border-0">
                    Daftar Sekarang
                </Button>
            </div>
        </section>
    );
}
