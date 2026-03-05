import { Head, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, Trash2Icon, ExternalLinkIcon, FilterIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import PostForm, { type PostItem, type CategoryOption } from './PostForm';

type ClassItem = {
    id: number;
    name: string;
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
    per_page: number;
    total: number;
};

type Props = {
    classItem: { data: ClassItem };
    posts: PaginatedPosts;
    categories: CategoryOption[];
    filters: {
        category_id: number | null;
    };
};

export default function ClassShow({ classItem, posts, categories, filters }: Props) {
    const classData = classItem.data;
    const [createOpen, setCreateOpen] = useState(false);
    const [editPost, setEditPost] = useState<PostItem | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kelas', href: '/classes' },
        { title: classData.name, href: `/classes/${classData.id}` },
    ];

    function handleCategoryFilter(value: string) {
        const params: Record<string, string> = {};
        if (value !== 'all') {
            params.category_id = value;
        }

        router.get(`/classes/${classData.id}`, params, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function handleDelete(id: number) {
        if (!confirm('Apakah kamu yakin ingin menghapus post ini?')) return;
        setDeletingId(id);
        router.delete(`/posts/${id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    }

    function handlePageChange(url: string | null) {
        if (!url) return;
        router.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function formatPrice(price: string) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(price));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={classData.name} />

            <div className="flex flex-1 flex-col gap-6 p-6">

                {/* Class Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        {classData.poster_image && (
                            <img
                                src={classData.poster_image}
                                alt={classData.name}
                                className="h-16 w-24 rounded-lg border object-cover shadow-sm"
                            />
                        )}
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight">{classData.name}</h1>
                                <div
                                    className="h-4 w-4 rounded-full border shadow-sm"
                                    style={{ backgroundColor: classData.color }}
                                />
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {posts.total} post{posts.total !== 1 ? 's' : ''} dalam kelas ini
                            </p>
                        </div>
                    </div>

                    {/* Create Post Dialog */}
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon />
                                Tambah Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Tambah Post</DialogTitle>
                            </DialogHeader>
                            <PostForm
                                classId={classData.id}
                                categories={categories}
                                onSuccess={() => setCreateOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-3">
                    <FilterIcon className="text-muted-foreground h-4 w-4" />
                    <Select
                        value={filters.category_id?.toString() ?? 'all'}
                        onValueChange={handleCategoryFilter}
                    >
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Filter kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Posts Grid */}
                {posts.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-20 shadow-sm">
                        <p className="text-muted-foreground text-lg font-medium">Belum ada post</p>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Tambahkan post pertama untuk kelas ini.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Post Image */}
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    {post.poster_image ? (
                                        <img
                                            src={post.poster_image}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <span className="text-muted-foreground text-xs">No Image</span>
                                        </div>
                                    )}

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        {/* Edit */}
                                        <Dialog
                                            open={editPost?.id === post.id}
                                            onOpenChange={(open) => setEditPost(open ? post : null)}
                                        >
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="icon-xs"
                                                    variant="secondary"
                                                    className="shadow-sm"
                                                    onClick={() => setEditPost(post)}
                                                >
                                                    <PencilIcon />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Post</DialogTitle>
                                                </DialogHeader>
                                                <PostForm
                                                    classId={classData.id}
                                                    categories={categories}
                                                    post={post}
                                                    onSuccess={() => setEditPost(null)}
                                                />
                                            </DialogContent>
                                        </Dialog>

                                        {/* Delete */}
                                        <Button
                                            size="icon-xs"
                                            variant="destructive"
                                            className="shadow-sm"
                                            disabled={deletingId === post.id}
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            <Trash2Icon />
                                        </Button>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="flex flex-col gap-2 p-4">
                                    {post.category && (
                                        <Badge variant="secondary" className="w-fit text-xs">
                                            {post.category.name}
                                        </Badge>
                                    )}
                                    <h3 className="line-clamp-2 font-semibold leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-primary text-lg font-bold">
                                        {formatPrice(post.price)}
                                    </p>
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors"
                                    >
                                        <ExternalLinkIcon className="h-3 w-3" />
                                        Lihat selengkapnya
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {posts.links.map((link, idx) => (
                            <Button
                                key={idx}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => handlePageChange(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="min-w-9"
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
