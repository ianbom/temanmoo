export default function Footer() {
    const columns = [
        {
            heading: "Program",
            links: [
                { label: "Semua Program", href: "#" },
                { label: "Temanmoo Hijrah", href: "https://www.temanmoobelajar.id/hijrah" },
                { label: "Temanmoo Tumbuh", href: "https://www.temanmoobelajar.id/tumbuh" },
                { label: "7 Pilar Kehidupan", href: "#" },
            ]
        },
        {
            heading: "Tentang Kami",
            links: [
                { label: "Siapa Kami", href: "#" },
                { label: "Visi & Misi", href: "#" },
                { label: "Tim Pengajar", href: "#" },
                { label: "Bergabung", href: "#" },
            ]
        },
        {
            heading: "Pilar Kehidupan",
            links: [
                { label: "Diniyyah", href: "#" },
                { label: "Pengembangan Diri", href: "#" },
                { label: "Akademik", href: "#" },
                { label: "Skill & Keuangan", href: "#" },
            ]
        },
        {
            heading: "Media Sosial",
            links: [
                { label: "Instagram", href: "https://www.instagram.com/temanmoobelajar" },
                { label: "TikTok", href: "#" },
                { label: "YouTube", href: "#" },
                { label: "WhatsApp", href: "#" },
            ]
        },
        {
            heading: "Hubungi Kami",
            links: [
                { label: "Dukungan", href: "#" },
                { label: "Hubungi Kami", href: "#" },
                { label: "Kerjasama", href: "#" },
                { label: "Email", href: "#" },
            ]
        },
    ];

    return (
        <footer className="w-full bg-white border-t border-gray-100">
            {/* Main footer links */}
            <div className="container mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 pt-16 pb-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 md:gap-8">
                    {columns.map((col, i) => (
                        <div key={i}>
                            <h4 className="text-xl font-bold mb-4 tracking-wide">
                                {col.heading}
                            </h4>
                            <ul className="space-y-3">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            rel="noopener noreferrer"
                                            className="text-sm text-gray-500 hover:text-primary  transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100">
                <div className="container mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>© 2026 Temanmoo Belajar</span>
                        <span>·</span>
                        <a href="#" className="hover:text-gray-700 transition-colors">Syarat & Ketentuan</a>
                        <span>·</span>
                        <a href="#" className="hover:text-gray-700 transition-colors">Privasi</a>
                    </div>

                    <div className="flex items-center gap-5">
                        <a href="https://www.instagram.com/temanmoobelajar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="TikTok">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.02-.08z" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="WhatsApp">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
