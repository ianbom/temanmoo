import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export type ClassOption = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    class_id: number;
    name: string;
    class?: ClassOption;
    created_at: string;
    updated_at: string;
};

type CategoryFormProps = {
    classes: ClassOption[];
    category?: Category | null;
    onSuccess?: () => void;
};

export default function CategoryForm({ classes, category = null, onSuccess }: CategoryFormProps) {
    const isEdit = !!category;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        class_id: category?.class_id?.toString() ?? '',
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
                <Label htmlFor="category-class">Kelas</Label>
                <Select
                    value={data.class_id}
                    onValueChange={(value) => setData('class_id', value)}
                    disabled={processing}
                >
                    <SelectTrigger id="category-class">
                        <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((classItem) => (
                            <SelectItem key={classItem.id} value={classItem.id.toString()}>
                                {classItem.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.class_id && (
                    <p className="text-destructive text-sm">{errors.class_id}</p>
                )}
            </div>

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
