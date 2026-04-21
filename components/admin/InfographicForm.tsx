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

        // Validate file size (max 10MB - Pinata supports much larger, but let's keep a reasonable limit)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }

        setUploading(true);
        try {
            // 1. Get temporary upload credentials
            const keyRes = await fetch('/api/pinata/key', { method: 'POST' });
            if (!keyRes.ok) throw new Error('Failed to get upload credentials');
            const keyData = await keyRes.json();
            const { JWT } = keyData;

            // 2. Upload directly to Pinata
            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
                body: formData,
            });

            if (!uploadRes.ok) throw new Error('Upload to Pinata failed');

            const uploadData = await uploadRes.json();
            const { IpfsHash } = uploadData;

            // 3. Set state
            // Use the gateway URL from env or fallback to public gateway
            const gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || 'https://gateway.pinata.cloud';
            const imageUrl = `${gateway}/ipfs/${IpfsHash}`;

            setImageUrl(imageUrl);
            setPinataCid(IpfsHash);
            toast.success('Image uploaded successfully!');

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
        } catch (error: unknown) {
            console.error('Save error:', error);
            toast.error((error as Error).message || 'Failed to save infographic');
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
