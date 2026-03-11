import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import ImageCropper from '@/components/ImageCropper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type ClassItem = {
    id: number;
    name: string;
    color: string;
    slug: string;
    poster_image: string | null;
    logo_image: string | null;
    footer_text: string | null;
    instagram_url: string | null;
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
        logo_image: File | null;
        footer_text: string;
        instagram_url: string;
        _method?: string;
    }>({
        name: classItem?.name ?? '',
        color: classItem?.color ?? '#000000',
        poster_image: null,
        logo_image: null,
        footer_text: classItem?.footer_text ?? '',
        instagram_url: classItem?.instagram_url ?? '',
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (isEdit) {
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
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Two-column grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* ─── Left Column ─── */}
                <div className="space-y-4">
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

                    {/* Footer Text */}
                    <div className="space-y-1.5">
                        <Label htmlFor="class-footer-text">Teks Footer</Label>
                        <Input
                            id="class-footer-text"
                            type="text"
                            placeholder="Contoh: Temanmu lebih dekat dengan Allah"
                            value={data.footer_text}
                            onChange={(e) => setData('footer_text', e.target.value)}
                            disabled={processing}
                        />
                        {errors.footer_text && (
                            <p className="text-destructive text-sm">{errors.footer_text}</p>
                        )}
                    </div>

                    {/* Instagram URL */}
                    <div className="space-y-1.5">
                        <Label htmlFor="class-instagram">Instagram URL</Label>
                        <Input
                            id="class-instagram"
                            type="url"
                            placeholder="https://instagram.com/akun"
                            value={data.instagram_url}
                            onChange={(e) => setData('instagram_url', e.target.value)}
                            disabled={processing}
                        />
                        {errors.instagram_url && (
                            <p className="text-destructive text-sm">{errors.instagram_url}</p>
                        )}
                    </div>
                </div>

                {/* ─── Right Column ─── */}
                <div className="space-y-4">
                    {/* Logo Image dengan Crop 1:1 */}
                    <ImageCropper
                        label="Logo Kelas"
                        inputId="class-logo"
                        aspect={1}
                        aspectLabel="1:1"
                        existingImageUrl={isEdit ? (classItem?.logo_image ?? null) : null}
                        existingImageAlt={classItem?.name ?? 'Logo Kelas'}
                        onCropComplete={(file) => setData('logo_image', file)}
                        error={errors.logo_image}
                        disabled={processing}
                    />

                    {/* Poster Image dengan Crop 19:6 */}
                    <ImageCropper
                        label="Poster Image"
                        inputId="class-poster"
                        aspect={19 / 6}
                        aspectLabel="19:6"
                        existingImageUrl={isEdit ? (classItem?.poster_image ?? null) : null}
                        existingImageAlt={classItem?.name ?? 'Kelas'}
                        onCropComplete={(file) => setData('poster_image', file)}
                        error={errors.poster_image}
                        disabled={processing}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Kelas'}
                </Button>
            </div>
        </form>
    );
}
