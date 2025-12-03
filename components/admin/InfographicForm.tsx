'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Upload, Loader2 } from 'lucide-react';

interface InfographicFormProps {
    initialData?: {
        id?: number;
        datePosted: string;
        imageUrl: string;
        pinataCid?: string;
    };
    mode: 'create' | 'edit';
}

export function InfographicForm({ initialData, mode }: InfographicFormProps) {
    const router = useRouter();
    const [datePosted, setDatePosted] = useState(
        initialData?.datePosted || new Date().toISOString().split('T')[0]
    );
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [pinataCid, setPinataCid] = useState(initialData?.pinataCid || '');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload-to-pinata', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const { imageUrl: url, cid } = await response.json();
            setImageUrl(url);
            setPinataCid(cid);
            toast.success('Image uploaded to Pinata successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageUrl || !datePosted) {
            toast.error('Please upload an image and select a date');
            return;
        }

        setSaving(true);
        try {
            const url = mode === 'create'
                ? '/api/infographics'
                : `/api/infographics/${initialData?.id}`;

            const method = mode === 'create' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ datePosted, imageUrl, pinataCid }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save');
            }

            toast.success(`Infographic ${mode === 'create' ? 'created' : 'updated'} successfully!`);
            router.push('/admin/infographics');
            router.refresh();
        } catch (error: any) {
            console.error('Save error:', error);
            toast.error(error.message || 'Failed to save infographic');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Picker */}
            <div>
                <label className="block text-sm font-medium mb-2">Date Posted</label>
                <input
                    type="date"
                    value={datePosted}
                    onChange={(e) => setDatePosted(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                    Date when this crypto news was published
                </p>
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-medium mb-2">Infographic Image</label>
                <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-lg p-8 text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 transition-colors disabled:opacity-50"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading to Pinata...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Choose Image
                            </>
                        )}
                    </label>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                        PNG or JPEG, max 10MB
                    </p>
                </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
                <div>
                    <label className="block text-sm font-medium mb-2">Preview</label>
                    <div className="border border-[hsl(var(--border))] rounded-lg overflow-hidden bg-[hsl(var(--muted))]/30">
                        <Image
                            src={imageUrl}
                            alt="Preview"
                            width={800}
                            height={800}
                            className="w-full h-auto"
                        />
                    </div>
                    {pinataCid && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                            CID: {pinataCid}
                        </p>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={uploading || saving || !imageUrl}
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Saving...
                        </>
                    ) : (
                        mode === 'create' ? 'Publish' : 'Update'
                    )}
                </Button>
            </div>
        </form>
    );
}
