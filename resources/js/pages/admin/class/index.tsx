import { Head, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, Trash2Icon, EyeIcon, Link, SearchIcon, ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
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
import ClassForm, { type ClassItem } from './ClassForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelas', href: '/classes' },
];

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    classes: {
        data: ClassItem[];
        meta: {
            links: PaginationLink[];
            current_page: number;
            last_page: number;
            from: number | null;
            to: number | null;
            total: number;
        };
    };
    filters?: {
        search?: string;
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

export default function ClassIndex({ classes, filters }: Props) {
    const items = classes.data;
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<ClassItem | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Filters State
    const [search, setSearch] = useState(filters?.search || '');
    const debouncedSearch = useDebounce(search, 300);
    const [perPage, setPerPage] = useState(filters?.per_page || '10');
    const [sort, setSort] = useState(filters?.sort || 'created_at');
    const [direction, setDirection] = useState<'asc' | 'desc'>(filters?.direction || 'desc');

    const fetchItems = useCallback(() => {
        router.get(
            '/classes',
            { search: debouncedSearch, sort, direction, per_page: perPage },
            { preserveState: true, replace: true }
        );
    }, [debouncedSearch, sort, direction, perPage]);

    // Initial load / trigger fetch
    useEffect(() => {
        // Only trigger if at least one filter has changed from initial props
        if (
            debouncedSearch !== (filters?.search || '') ||
            sort !== (filters?.sort || 'created_at') ||
            direction !== (filters?.direction || 'desc') ||
            perPage !== (filters?.per_page || '10')
        ) {
            fetchItems();
        }
    }, [debouncedSearch, sort, direction, perPage, fetchItems, filters]);

    function handleDelete(id: number) {
        if (!confirm('Apakah kamu yakin ingin menghapus kelas ini?')) return;
        setDeletingId(id);
        router.delete(`/classes/${id}`, {
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
            <Head title="Kelas" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Kelas</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Kelola semua kelas yang tersedia.
                        </p>
                    </div>

                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Tambah Kelas
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Tambah Kelas</DialogTitle>
                            </DialogHeader>
                            <ClassForm onSuccess={() => setCreateOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:w-72">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari kelas..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
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
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-16">#</TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead>Poster</TableHead>
                                <TableHead 
                                    className="cursor-pointer hover:bg-muted/70 transition-colors"
                                    onClick={() => toggleSort('name')}
                                >
                                    <div className="flex items-center">
                                        Nama Kelas {renderSortIcon('name')}
                                    </div>
                                </TableHead>
                                <TableHead>Warna</TableHead>
                                <TableHead 
                                    className="cursor-pointer hover:bg-muted/70 transition-colors"
                                    onClick={() => toggleSort('created_at')}
                                >
                                    <div className="flex items-center">
                                        Dibuat Pada {renderSortIcon('created_at')}
                                    </div>
                                </TableHead>
                                <TableHead className="w-32 text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-muted-foreground py-12 text-center">
                                        {search ? 'Tidak ada kelas yang cocok dengan pencarian.' : 'Belum ada kelas. Tambahkan kelas pertamamu!'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item, index) => (
                                    <TableRow key={item.id} className="transition-colors hover:bg-muted/30">
                                        <TableCell className="text-muted-foreground font-medium">
                                            {/* Calculate global row index based on pagination */}
                                            {(classes.meta.current_page - 1) * parseInt(perPage) + index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {item.logo_image ? (
                                                <img
                                                    src={item.logo_image}
                                                    alt={`Logo ${item.name}`}
                                                    className="h-10 w-10 rounded-full border object-cover"
                                                />
                                            ) : (
                                                <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full border">
                                                    <span className="text-muted-foreground text-[8px]">No Logo</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.poster_image ? (
                                                <img
                                                    src={item.poster_image}
                                                    alt={item.name}
                                                    className="h-12 w-16 rounded-md border object-cover"
                                                />
                                            ) : (
                                                <div className="bg-muted flex h-12 w-16 items-center justify-center rounded-md border">
                                                    <span className="text-muted-foreground text-xs">No Image</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.name}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-6 w-6 rounded-full border shadow-sm"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <span className="text-muted-foreground font-mono text-sm">
                                                    {item.color}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    size="icon-sm"
                                                    variant="outline"
                                                    onClick={() => router.visit(`/${item.slug}`)}
                                                    title="Lihat halaman publik"
                                                >
                                                    <Link className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="icon-sm"
                                                    variant="outline"
                                                    onClick={() => router.visit(`/classes/${item.id}`)}
                                                    title="Buka moduls/posts kelas"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </Button>
                                                <Dialog
                                                    open={editItem?.id === item.id}
                                                    onOpenChange={(open) => setEditItem(open ? item : null)}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="icon-sm"
                                                            variant="outline"
                                                            onClick={() => setEditItem(item)}
                                                            title="Edit kelas"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Kelas</DialogTitle>
                                                        </DialogHeader>
                                                        <ClassForm
                                                            classItem={item}
                                                            onSuccess={() => setEditItem(null)}
                                                        />
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    size="icon-sm"
                                                    variant="destructive"
                                                    disabled={deletingId === item.id}
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Hapus kelas"
                                                >
                                                    <Trash2Icon className="h-4 w-4" />
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-muted-foreground text-sm">
                        {classes.meta.total > 0 ? (
                            <>Menampilkan {classes.meta.from} hingga {classes.meta.to} dari {classes.meta.total} kelas</>
                        ) : (
                            <>Tidak ada data</>
                        )}
                    </div>
                    
                    {/* Simplified Pagination Nav */}
                    {classes.meta.last_page > 1 && (
                        <div className="flex items-center space-x-2">
                            {classes.meta.links.map((link, i) => {
                                // Skip prev/next labels translation if using simple arrows
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
