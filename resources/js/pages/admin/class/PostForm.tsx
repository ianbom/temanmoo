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
import ImageCropper from '@/components/ImageCropper';

export type PostItem = {
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

export type CategoryOption = {
    id: number;
    name: string;
};

type PostFormProps = {
    classId: number;
    categories: CategoryOption[];
    post?: PostItem | null;
    onSuccess?: () => void;
};

export default function PostForm({ classId, categories, post = null, onSuccess }: PostFormProps) {
    const isEdit = !!post;

    const { data, setData, post: submitPost, processing, errors, reset } = useForm<{
        class_id: number;
        category_id: string;
        title: string;
        price: string;
        link: string;
        poster_image: File | null;
        _method?: string;
    }>({
        class_id: classId,
        category_id: post?.category_id?.toString() ?? '',
        title: post?.title ?? '',
        price: post?.price ?? '',
        link: post?.link ?? '',
        poster_image: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (isEdit) {
            submitPost(`/posts/${post!.id}`, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    onSuccess?.();
                },
            });
        } else {
            submitPost('/posts', {
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
            {/* Title */}
            <div className="space-y-1.5">
                <Label htmlFor="post-title">Judul</Label>
                <Input
                    id="post-title"
                    type="text"
                    placeholder="Contoh: Tutorial React Dasar"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    disabled={processing}
                    autoFocus
                />
                {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
                <Label htmlFor="post-category">Kategori</Label>
                <Select
                    value={data.category_id}
                    onValueChange={(value) => setData('category_id', value)}
                    disabled={processing}
                >
                    <SelectTrigger id="post-category">
                        <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && <p className="text-destructive text-sm">{errors.category_id}</p>}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
                <Label htmlFor="post-price">Harga (Rp)</Label>
                <Input
                    id="post-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Contoh: 150000"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    disabled={processing}
                />
                {errors.price && <p className="text-destructive text-sm">{errors.price}</p>}
            </div>

            {/* Link */}
            <div className="space-y-1.5">
                <Label htmlFor="post-link">Link</Label>
                <Input
                    id="post-link"
                    type="url"
                    placeholder="https://example.com/course"
                    value={data.link}
                    onChange={(e) => setData('link', e.target.value)}
                    disabled={processing}
                />
                {errors.link && <p className="text-destructive text-sm">{errors.link}</p>}
            </div>

            {/* Poster Image dengan Crop 1:1 */}
            <ImageCropper
                label="Poster Image"
                inputId="post-poster"
                aspect={1}
                aspectLabel="1:1"
                existingImageUrl={isEdit ? (post?.poster_image ?? null) : null}
                existingImageAlt={post?.title ?? 'Post'}
                onCropComplete={(file) => setData('poster_image', file)}
                error={errors.poster_image}
                disabled={processing}
            />

            <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Post'}
                </Button>
            </div>
        </form>
    );
}
