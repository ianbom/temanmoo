import { Head, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

type Props = {
    categories: Category[];
    classes: ClassOption[];
};

export default function CategoryIndex({ categories, classes }: Props) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete(id: number) {
        if (!confirm('Apakah kamu yakin ingin menghapus kategori ini?')) return;
        setDeletingId(id);
        router.delete(`/categories/${id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

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
                                <PlusIcon />
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

                {/* Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-16">#</TableHead>
                                <TableHead>Kelas</TableHead>
                                <TableHead>Nama Kategori</TableHead>
                                <TableHead>Dibuat Pada</TableHead>
                                <TableHead className="text-right w-32">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-muted-foreground py-12"
                                    >
                                        Belum ada kategori. Tambahkan kategori pertamamu!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category, index) => (
                                    <TableRow key={category.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-medium text-muted-foreground">
                                            {index + 1}
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
                                                month: 'long',
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
                                                            onClick={() => setEditCategory(category)}
                                                        >
                                                            <PencilIcon />
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
                                                    disabled={deletingId === category.id}
                                                    onClick={() => handleDelete(category.id)}
                                                >
                                                    <Trash2Icon />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer info */}
                {categories.length > 0 && (
                    <p className="text-muted-foreground text-sm">
                        Total {categories.length} kategori
                    </p>
                )}
            </div>
        </AppLayout>
    );
}
