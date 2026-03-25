import { Head, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, Trash2Icon, SearchIcon, ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import CategoryForm, { type Category, type ClassOption } from './CategoryForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kategori', href: '/categories' },
];

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    categories: {
        data: Category[];
        meta: {
            links: PaginationLink[];
            current_page: number;
            last_page: number;
            from: number | null;
            to: number | null;
            total: number;
        };
    };
    classes: ClassOption[];
    filters?: {
        search?: string;
        class_id?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
        per_page?: string;
    };
};

// Hook for debouncing fast keyboard typings
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function CategoryIndex({ categories, classes, filters }: Props) {
    const items = categories.data;
    const [createOpen, setCreateOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Filters State
    const [search, setSearch] = useState(filters?.search || '');
    const debouncedSearch = useDebounce(search, 300);
    const [classId, setClassId] = useState(filters?.class_id || 'all');
    const [perPage, setPerPage] = useState(filters?.per_page || '10');
    const [sort, setSort] = useState(filters?.sort || 'created_at');
    const [direction, setDirection] = useState<'asc' | 'desc'>(filters?.direction || 'desc');

    const fetchItems = useCallback(() => {
        router.get(
            '/categories',
            { search: debouncedSearch, class_id: classId, sort, direction, per_page: perPage },
            { preserveState: true, replace: true }
        );
    }, [debouncedSearch, classId, sort, direction, perPage]);

    // Initial load / trigger fetch
    useEffect(() => {
        if (
            debouncedSearch !== (filters?.search || '') ||
            classId !== (filters?.class_id || 'all') ||
            sort !== (filters?.sort || 'created_at') ||
            direction !== (filters?.direction || 'desc') ||
            perPage !== (filters?.per_page || '10')
        ) {
            fetchItems();
        }
    }, [debouncedSearch, classId, sort, direction, perPage, fetchItems, filters]);

    function handleDelete(id: number) {
        if (!confirm('Apakah kamu yakin ingin menghapus kategori ini?')) return;
        setDeletingId(id);
        router.delete(`/categories/${id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    }

    const toggleSort = (field: string) => {
        if (sort === field) {
            setDirection(direction === 'asc' ? 'desc' : 'asc');
        } else {
            setSort(field);
            setDirection('asc');
        }
    };

    const renderSortIcon = (field: string) => {
        if (sort !== field) return <ArrowUpDownIcon className="ml-2 h-4 w-4 text-muted-foreground/50" />;
        return direction === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori" />

            <div className="flex flex-1 flex-col gap-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Kategori</h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Kelola semua kategori kursus yang tersedia.
                        </p>
                    </div>

                    {/* Create Dialog */}
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Tambah Kategori
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Kategori</DialogTitle>
                            </DialogHeader>
                            <CategoryForm
                                classes={classes}
                                onSuccess={() => setCreateOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row w-full gap-4 flex-1">
                        <div className="relative w-full sm:w-72">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari nama kategori..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Select value={classId} onValueChange={setClassId}>
                            <SelectTrigger className="w-full sm:w-56">
                                <SelectValue placeholder="Pilih Kelas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kelas</SelectItem>
                                {classes.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Per halaman:</span>
                        <Select value={perPage} onValueChange={setPerPage}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-16">#</TableHead>
                                <TableHead 
                                    className="cursor-pointer hover:bg-muted/70 transition-colors"
                                    onClick={() => toggleSort('class_id')}
                                >
                                    <div className="flex items-center">
                                        Kelas {renderSortIcon('class_id')}
                                    </div>
                                </TableHead>
                                <TableHead 
                                    className="cursor-pointer hover:bg-muted/70 transition-colors"
                                    onClick={() => toggleSort('name')}
                                >
                                    <div className="flex items-center">
                                        Nama Kategori {renderSortIcon('name')}
                                    </div>
                                </TableHead>
                                <TableHead 
                                    className="cursor-pointer hover:bg-muted/70 transition-colors"
                                    onClick={() => toggleSort('created_at')}
                                >
                                    <div className="flex items-center">
                                        Dibuat Pada {renderSortIcon('created_at')}
                                    </div>
                                </TableHead>
                                <TableHead className="text-right w-32">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-muted-foreground py-12"
                                    >
                                        {search || classId !== 'all' ? 'Tidak ada kategori yang cocok dengan pencarian.' : 'Belum ada kategori. Tambahkan kategori pertamamu!'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((category, index) => (
                                    <TableRow key={category.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-medium text-muted-foreground">
                                            {(categories.meta.current_page - 1) * parseInt(perPage) + index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {category.class?.name ?? '-'}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {category.name}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(category.created_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {/* Edit Dialog */}
                                                <Dialog
                                                    open={editCategory?.id === category.id}
                                                    onOpenChange={(open) =>
                                                        setEditCategory(open ? category : null)
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="icon-sm"
                                                            variant="outline"
                                                            title="Edit Kategori"
                                                            onClick={() => setEditCategory(category)}
                                                        >
                                                            <PencilIcon className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Kategori</DialogTitle>
                                                        </DialogHeader>
                                                        <CategoryForm
                                                            classes={classes}
                                                            category={category}
                                                            onSuccess={() => setEditCategory(null)}
                                                        />
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Delete */}
                                                <Button
                                                    size="icon-sm"
                                                    variant="destructive"
                                                    title="Hapus Kategori"
                                                    disabled={deletingId === category.id}
                                                    onClick={() => handleDelete(category.id)}
                                                >
                                                    <Trash2Icon className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination & Footer info */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                    <div className="text-muted-foreground text-sm">
                        {categories.meta.total > 0 ? (
                            <>Menampilkan {categories.meta.from} hingga {categories.meta.to} dari {categories.meta.total} kategori</>
                        ) : (
                            <>Tidak ada data</>
                        )}
                    </div>
                    
                    {/* Simplified Pagination Nav */}
                    {categories.meta.last_page > 1 && (
                        <div className="flex items-center space-x-2">
                            {categories.meta.links.map((link, i) => {
                                let label: ReactNode = link.label;
                                if (label.toString().includes('Previous')) {
                                    label = <ChevronLeftIcon className="h-4 w-4" />;
                                } else if (label.toString().includes('Next')) {
                                    label = <ChevronRightIcon className="h-4 w-4" />;
                                }

                                return (
                                    <Button
                                        key={i}
                                        variant={link.active ? "default" : "outline"}
                                        size={label === link.label ? "sm" : "icon-sm"}
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url) router.visit(link.url, { preserveScroll: true, preserveState: true });
                                        }}
                                        dangerouslySetInnerHTML={typeof label === 'string' ? { __html: label } : undefined}
                                        className={!link.active && !link.url ? "opacity-50 cursor-not-allowed" : ""}
                                    >
                                        {typeof label !== 'string' ? label : null}
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}
