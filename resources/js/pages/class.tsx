import { Head, Link, router } from '@inertiajs/react';
import { ArrowRightIcon, BookOpen, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, SearchIcon, ShoppingCartIcon, SparklesIcon } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Ripple } from '@/components/ui/ripple';
import { Arrow } from '@radix-ui/react-dropdown-menu';

type CategoryOption = {
    id: number;
    name: string;
};

type PostItem = {
    id: number;
    class_id: number;
    category_id: number;
    title: string;
    price: string;
    link: string;
    poster_image: string | null;
    category?: { id: number; name: string };
    created_at: string;
    updated_at: string;
};

type ClassItem = {
    id: number;
    name: string;
    slug: string;
    color: string;
    poster_image: string | null;
    logo_image: string | null;
    footer_text: string | null;
    instagram_url: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedPosts = {
    data: PostItem[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
};

type Props = {
    classItem: { data: ClassItem };
    posts: PaginatedPosts;
    categories: CategoryOption[];
    filters: {
        category_id: number | null;
        search: string | null;
    };
};

function formatPrice(price: string) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number(price));
}

export default function ClassPage({ classItem, posts, categories, filters }: Props) {
    const classData = classItem.data;
    const [searchInput, setSearchInput] = useState(filters.search ?? '');

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        const params: Record<string, string> = {};
        if (searchInput.trim()) params.search = searchInput.trim();
        if (filters.category_id) params.category_id = String(filters.category_id);
        router.get(`/kelas/${classData.slug}`, params, { preserveState: true, preserveScroll: true });
    }

    function handleCategoryFilter(catId: number | null) {
        const params: Record<string, string> = {};
        if (catId) params.category_id = String(catId);
        if (filters.search) params.search = filters.search;
        router.get(`/kelas/${classData.slug}`, params, { preserveState: true, preserveScroll: true });
    }

    function handlePageChange(url: string | null) {
        if (!url) return;
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    }

    return (
        <>
            <Head title={`${classData.name} - Temanmoo Hijrah`} />

            <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900 antialiased overflow-x-hidden">

                {/* ─── Navbar ─── */}
                <nav className="sticky top-0 z-50 w-full shadow-sm" style={{ backgroundColor: classData.color }}>
                    <div className="container mx-auto max-w-[1200px] flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2.5">
                            {classData.logo_image ? (
                                <img
                                    src={classData.logo_image}
                                    alt={`Logo ${classData.name}`}
                                    className="h-9 w-9 rounded-md object-cover border border-white/20"
                                />
                            ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
                                    <BookOpen className="h-4 w-4 text-white" />
                                </div>
                            )}
                            <span className="text-lg font-bold tracking-tight text-white">
                                {classData.name}
                            </span>
                        </Link>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors"
                            >
                                Belajar Sekarang
                            </Link>
                            <Link href="/login">
                                <Button className="rounded-full bg-white/20 hover:bg-white/30 text-white px-6 text-sm font-semibold shadow-sm backdrop-blur-sm border border-white/10">
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <section className="relative w-full overflow-hidden rounded-4xl shadow-sm aspect-21/9 sm:aspect-21/7">
                        {/* Poster image background */}
                        <div className="absolute inset-0">
                            {classData.poster_image ? (
                                <img
                                    src={classData.poster_image}
                                    alt={classData.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center" style={{ backgroundColor: classData.color }}>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                                        {classData.name}
                                    </h1>
                                    <span className="text-white/80 font-medium tracking-wide text-sm">
                                        Poster belum tersedia
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* ─── Category Filter Pills ─── */}
                <section className="w-full py-6">
                    <div className="container mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 flex flex-col items-center gap-5">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="w-full max-w-lg">
                            <div className="relative">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari Produk atau Materi…"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-full rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-11 text-sm text-gray-700 placeholder:text-gray-400 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                                />
                            </div>
                        </form>

                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <button
                                onClick={() => handleCategoryFilter(null)}
                                className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                                style={!filters.category_id
                                    ? { backgroundColor: classData.color, color: '#fff' }
                                    : { backgroundColor: '#fff', color: '#4b5563', border: '1px solid #e5e7eb' }
                                }
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryFilter(cat.id)}
                                    className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                                    style={filters.category_id === cat.id
                                        ? { backgroundColor: classData.color, color: '#fff' }
                                        : { backgroundColor: '#fff', color: '#4b5563', border: '1px solid #e5e7eb' }
                                    }
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Posts Grid ─── */}
                <section className="flex-1 w-full pb-10">
                    <div className="container mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">

                        {posts.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <p className="text-gray-400 text-lg font-medium">Tidak ada materi ditemukan</p>
                                <p className="text-gray-400 text-sm mt-1">Coba ubah filter atau kata pencarian.</p>
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {posts.data.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        {/* Image with green left accent */}
                                        <div className="relative overflow-hidden">
                                            <div className="aspect-[4/3] bg-gray-100">
                                                {post.poster_image ? (
                                                    <img
                                                        src={post.poster_image}
                                                        alt={post.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center">
                                                        <span className="text-gray-300 text-xs">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col gap-1.5 p-4 pb-5">
                                            <h3 className="text-sm font-bold leading-tight text-gray-900 line-clamp-1">
                                                {post.title}
                                            </h3>
                                            {post.category && (
                                                <p className="text-xs text-gray-400 line-clamp-2">
                                                    {post.category.name}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm font-bold" style={{ color: classData.color }}>
                                                    {formatPrice(post.price)}
                                                </span>
                                                <a
                                                    href={post.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                                                    style={{ backgroundColor: `${classData.color}15`, color: classData.color }}
                                                >
                                                    <ArrowRightIcon className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <div className="mt-10 flex items-center justify-center gap-1">
                                {posts.links.map((link, idx) => {
                                    // First link is "Previous"
                                    if (idx === 0) {
                                        return (
                                            <button
                                                key={idx}
                                                disabled={!link.url}
                                                onClick={() => handlePageChange(link.url)}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-40"
                                            >
                                                <ChevronLeftIcon className="h-4 w-4" />
                                            </button>
                                        );
                                    }
                                    // Last link is "Next"
                                    if (idx === posts.links.length - 1) {
                                        return (
                                            <button
                                                key={idx}
                                                disabled={!link.url}
                                                onClick={() => handlePageChange(link.url)}
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-40"
                                            >
                                                <ChevronRightIcon className="h-4 w-4" />
                                            </button>
                                        );
                                    }
                                    // Number buttons
                                    return (
                                        <button
                                            key={idx}
                                            disabled={!link.url && !link.active}
                                            onClick={() => handlePageChange(link.url)}
                                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${link.active
                                                ? 'bg-green-700 text-white shadow-sm'
                                                : link.url
                                                    ? 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                    : 'text-gray-400'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* ─── Footer ─── */}
                <footer className="w-full text-white" style={{ backgroundColor: classData.color }}>
                    {/* Top wave */}
                    <div className="w-full -mb-1">
                        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-8 md:h-12">
                            <path d="M0 0L1440 0L1440 30C1440 30 1200 60 720 60C240 60 0 30 0 30L0 0Z" fill="#f9fafb" />
                        </svg>
                    </div>

                    <div className="container mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-12">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-2.5 mb-3">
                                    {classData.logo_image ? (
                                        <img
                                            src={classData.logo_image}
                                            alt={`Logo ${classData.name}`}
                                            className="h-9 w-9 rounded-md object-cover border border-white/20"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
                                            <BookOpen className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                    <span className="text-lg font-bold">{classData.name}</span>
                                </div>
                                <p className="text-sm text-white/65 max-w-sm leading-relaxed">
                                    {classData.footer_text || 'Temanmu lebih dekat dengan Allah dan lebih baik terhadap sesama.'}
                                </p>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">Ikuti Kami</span>
                                <div className="flex items-center gap-2.5">
                                    {/* WhatsApp */}
                                    <a href="https://wa.me/6285168603299" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all" aria-label="WhatsApp">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    </a>
                                    {/* Instagram */}
                                    {classData.instagram_url && (
                                        <a href={classData.instagram_url} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all" aria-label="Instagram">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                            <span>© 2026 Temanmoo Hijrah. Seluruh hak cipta dilindungi.</span>
                            <div className="flex items-center gap-4">
                                <a href="#" className="hover:text-white/70 transition-colors">Kebijakan Privasi</a>
                                <a href="#" className="hover:text-white/70 transition-colors">Syarat & Ketentuan</a>
                            </div>
                        </div> */}
                    </div>
                </footer>
            </div>
        </>
    );
}
