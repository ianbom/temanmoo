import { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

type Props = {
    /** Label untuk input */
    label?: string;
    /** id input file */
    inputId?: string;
    /** Rasio aspek crop (cth: 1 untuk 1:1, 19/6 untuk kelas) */
    aspect: number;
    /** Hint teks aspek rasio yang ditampilkan di UI */
    aspectLabel?: string;
    /** File gambar yang sudah di-crop (dipakai oleh parent untuk set ke form data) */
    onCropComplete: (file: File) => void;
    /** Preview URL gambar existing (mode edit) */
    existingImageUrl?: string | null;
    /** Nama item untuk alt text */
    existingImageAlt?: string;
    error?: string;
    disabled?: boolean;
};

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
        mediaWidth,
        mediaHeight,
    );
}

export default function ImageCropper({
    label = 'Poster Image',
    inputId = 'image-upload',
    aspect,
    aspectLabel,
    onCropComplete,
    existingImageUrl,
    existingImageAlt = 'Preview',
    error,
    disabled,
}: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [srcImg, setSrcImg] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setSrcImg(reader.result as string);
            setDialogOpen(true);
        };
        reader.readAsDataURL(file);
        // Reset input so same file can be re-selected
        e.target.value = '';
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        const initialCrop = centerAspectCrop(naturalWidth, naturalHeight, aspect);
        setCrop(initialCrop);
    }

    const applyCrop = useCallback(async () => {
        if (!imgRef.current || !completedCrop) return;

        const canvas = document.createElement('canvas');
        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = Math.floor(completedCrop.width * scaleX);
        canvas.height = Math.floor(completedCrop.height * scaleY);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height,
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setCroppedPreviewUrl(url);
            onCropComplete(croppedFile);
            setDialogOpen(false);
        }, 'image/jpeg', 0.92);
    }, [completedCrop, onCropComplete]);

    function handleCancel() {
        setDialogOpen(false);
        setSrcImg(null);
    }

    return (
        <div className="space-y-1.5">
            <Label htmlFor={inputId}>
                {label}
                {aspectLabel && (
                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                        (Rasio {aspectLabel})
                    </span>
                )}
            </Label>

            {/* Existing image preview (edit mode, belum dipilih file baru) */}
            {existingImageUrl && !croppedPreviewUrl && (
                <div className="mt-1 mb-2">
                    <img
                        src={existingImageUrl}
                        alt={existingImageAlt}
                        className="rounded-lg border object-cover h-24 w-auto"
                    />
                    <p className="text-muted-foreground mt-1 text-xs">Gambar saat ini</p>
                </div>
            )}

            {/* Cropped image preview */}
            {croppedPreviewUrl && (
                <div className="mt-1 mb-2">
                    <img
                        src={croppedPreviewUrl}
                        alt="Preview hasil crop"
                        className="rounded-lg border object-cover h-24 w-auto"
                    />
                    <p className="text-muted-foreground mt-1 text-xs">Gambar baru (sudah di-crop)</p>
                </div>
            )}

            {/* Upload trigger button */}
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {croppedPreviewUrl ? 'Ganti Gambar' : 'Pilih Gambar'}
                </Button>
                {croppedPreviewUrl && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={disabled}
                        onClick={() => {
                            setCroppedPreviewUrl(null);
                            setSrcImg(null);
                        }}
                        className="text-destructive hover:text-destructive"
                    >
                        Hapus
                    </Button>
                )}
            </div>

            <input
                ref={fileInputRef}
                id={inputId}
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={onFileSelect}
                disabled={disabled}
            />

            {error && <p className="text-destructive text-sm">{error}</p>}

            {/* Crop Dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) handleCancel(); }}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Crop Gambar</DialogTitle>
                    </DialogHeader>

                    <div className="overflow-auto max-h-[60vh] flex items-center justify-center bg-muted rounded-lg p-2">
                        {srcImg && (
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                                className="max-w-full"
                            >
                                <img
                                    ref={imgRef}
                                    src={srcImg}
                                    alt="Crop preview"
                                    onLoad={onImageLoad}
                                    style={{ maxHeight: '55vh', maxWidth: '100%' }}
                                />
                            </ReactCrop>
                        )}
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Batal
                        </Button>
                        <Button
                            type="button"
                            onClick={applyCrop}
                            disabled={!completedCrop?.width || !completedCrop?.height}
                        >
                            Terapkan Crop
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
