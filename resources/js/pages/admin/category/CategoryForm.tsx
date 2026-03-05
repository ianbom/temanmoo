import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type Category = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

type CategoryFormProps = {
    category?: Category | null;
    onSuccess?: () => void;
};

export default function CategoryForm({ category = null, onSuccess }: CategoryFormProps) {
    const isEdit = !!category;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: category?.name ?? '',
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (isEdit) {
            put(`/categories/${category!.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    onSuccess?.();
                },
            });
        } else {
            post('/categories', {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
                <Label htmlFor="category-name">Nama Kategori</Label>
                <Input
                    id="category-name"
                    type="text"
                    placeholder="Contoh: Web Development"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    autoFocus
                />
                {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Kategori'}
                </Button>
            </div>
        </form>
    );
}
