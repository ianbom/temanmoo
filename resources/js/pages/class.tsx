import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, SearchIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';

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
                    <div className="container mx-auto max-w-[1200px] flex h-16 items-center justify-between px-4 m              d:px-6               lg:px-8">

                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8                items-center justify-center rounded-full bg-white/20">
                                <BookOpen className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">
                                {classData.name}
                            </span>
                        </Link>

                        {/* Right Section */}
                        <div className="flex items-center gap-6">
                            <Link
                                href="#"
                                className="hidden md:block text-sm font-medium text-white hover:text-white transition-colors"
                            >
                                Belajar Lainnya
                            </Link>

                            <Link href="/login">
                                <Button className="rounded-full bg-white/20 hover:bg-white/30 text-white px-6 text-sm font-semibold shadow-sm backdrop-blur">
                                    Login
                                </Button>
                            </Link>
                        </div>

                    </div>
                </nav>

                {/* ─── Hero Section ─── */}
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

                {/* ─── Search + Filters ─── */}
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
                                                    <ShoppingCartIcon className="h-4 w-4" />
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
                    <div className="container mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                        <BookOpen className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-lg font-bold">Temanmoo Hijrah</span>
                                </div>
                                <p className="text-sm text-white/70 max-w-xs leading-relaxed">
                                    Temanmu lebih dekat dengan Allah dan lebih baik terhadap sesama.
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-white/60">Ikuti Kami</span>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors" aria-label="Instagram">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                    </a>
                                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors" aria-label="Globe">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
                                    </a>
                                    <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors" aria-label="Email">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
