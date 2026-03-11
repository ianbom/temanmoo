import { Head, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, Trash2Icon, EyeIcon, Link } from 'lucide-react';
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
import ClassForm, { type ClassItem } from './ClassForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Kelas', href: '/classes' },
];

type Props = {
    classes: { data: ClassItem[] };
};

export default function ClassIndex({ classes }: Props) {
    const items = classes.data;
    const [createOpen, setCreateOpen] = useState(false);
    const [editItem, setEditItem] = useState<ClassItem | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete(id: number) {
        if (!confirm('Apakah kamu yakin ingin menghapus kelas ini?')) return;
        setDeletingId(id);
        router.delete(`/classes/${id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    }

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

                    {/* Create Dialog */}
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusIcon />
                                Tambah Kelas
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Tambah Kelas</DialogTitle>
                            </DialogHeader>
                            <ClassForm
                                onSuccess={() => setCreateOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-16">#</TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead>Poster</TableHead>
                                <TableHead>Nama Kelas</TableHead>
                                <TableHead>Warna</TableHead>
                                <TableHead>Dibuat Pada</TableHead>
                                <TableHead className="w-32 text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-muted-foreground py-12 text-center"
                                    >
                                        Belum ada kelas. Tambahkan kelas pertamamu!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((item, index) => (
                                    <TableRow key={item.id} className="transition-colors hover:bg-muted/30">
                                        <TableCell className="text-muted-foreground font-medium">
                                            {index + 1}
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
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    size="icon-sm"
                                                    variant="outline"
                                                    onClick={() => router.visit(`/kelas/${item.slug}`)}
                                                >
                                                    <Link />
                                                </Button>
                                                <Button
                                                    size="icon-sm"
                                                    variant="outline"
                                                    onClick={() => router.visit(`/classes/${item.id}`)}
                                                >
                                                    <EyeIcon />
                                                </Button>
                                                {/* Edit Dialog */}
                                                <Dialog
                                                    open={editItem?.id === item.id}
                                                    onOpenChange={(open) =>
                                                        setEditItem(open ? item : null)
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="icon-sm"
                                                            variant="outline"
                                                            onClick={() => setEditItem(item)}
                                                        >
                                                            <PencilIcon />
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

                                                {/* Delete */}
                                                <Button
                                                    size="icon-sm"
                                                    variant="destructive"
                                                    disabled={deletingId === item.id}
                                                    onClick={() => handleDelete(item.id)}
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
                {items.length > 0 && (
                    <p className="text-muted-foreground text-sm">
                        Total {items.length} kelas
                    </p>
                )}
            </div>
        </AppLayout>
    );
}
