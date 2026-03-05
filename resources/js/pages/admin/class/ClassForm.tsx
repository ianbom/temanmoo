import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type ClassItem = {
    id: number;
    name: string;
    color: string;
    poster_image: string | null;
    created_at: string;
    updated_at: string;
};

type ClassFormProps = {
    classItem?: ClassItem | null;
    onSuccess?: () => void;
};

export default function ClassForm({ classItem = null, onSuccess }: ClassFormProps) {
    const isEdit = !!classItem;

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        color: string;
        poster_image: File | null;
        _method?: string;
    }>({
        name: classItem?.name ?? '',
        color: classItem?.color ?? '#000000',
        poster_image: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (isEdit) {
            // Use POST with _method: PUT for file upload (multipart form)
            post(`/classes/${classItem!.id}`, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    onSuccess?.();
                },
            });
        } else {
            post('/classes', {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onSuccess?.();
                },
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
                <Label htmlFor="class-name">Nama Kelas</Label>
                <Input
                    id="class-name"
                    type="text"
                    placeholder="Contoh: Kelas Pemrograman"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    autoFocus
                />
                {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                )}
            </div>

            {/* Color Picker */}
            <div className="space-y-1.5">
                <Label htmlFor="class-color">Warna</Label>
                <div className="flex items-center gap-3">
                    <input
                        id="class-color"
                        type="color"
                        value={data.color}
                        onChange={(e) => setData('color', e.target.value)}
                        disabled={processing}
                        className="h-9 w-14 cursor-pointer rounded-md border border-input p-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Input
                        type="text"
                        value={data.color}
                        onChange={(e) => setData('color', e.target.value)}
                        disabled={processing}
                        className="w-28 font-mono text-sm"
                        maxLength={7}
                        placeholder="#000000"
                    />
                </div>
                {errors.color && (
                    <p className="text-destructive text-sm">{errors.color}</p>
                )}
            </div>

            {/* Poster Image */}
            <div className="space-y-1.5">
                <Label htmlFor="class-poster">Poster Image</Label>

                {/* Preview existing image on edit */}
                {isEdit && classItem?.poster_image && !data.poster_image && (
                    <div className="mt-1 mb-2">
                        <img
                            src={classItem.poster_image}
                            alt={classItem.name}
                            className="h-24 w-auto rounded-lg border object-cover"
                        />
                        <p className="text-muted-foreground mt-1 text-xs">Gambar saat ini</p>
                    </div>
                )}

                {/* Preview selected file */}
                {data.poster_image && (
                    <div className="mt-1 mb-2">
                        <img
                            src={URL.createObjectURL(data.poster_image)}
                            alt="Preview"
                            className="h-24 w-auto rounded-lg border object-cover"
                        />
                        <p className="text-muted-foreground mt-1 text-xs">Gambar baru</p>
                    </div>
                )}

                <Input
                    id="class-poster"
                    type="file"
                    accept="image/jpg,image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setData('poster_image', file);
                    }}
                    disabled={processing}
                />
                {errors.poster_image && (
                    <p className="text-destructive text-sm">{errors.poster_image}</p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Kelas'}
                </Button>
            </div>
        </form>
    );
}
