'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    oneLiner: z.string().min(1, 'One-liner is required'),
    status: z.enum(['planned', 'draft', 'published']),
    tags: z.array(z.object({ value: z.string() })).min(1, 'At least one tag required'),
    lastUpdated: z.string().min(1, 'Last updated date is required'),
    keyIdea: z.string().min(1, 'Key idea is required'),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
    post?: any;
    mode: 'create' | 'edit';
}

export default function PostForm({ post, mode }: PostFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: post ? {
            ...post,
            tags: post.tags?.map((v: string) => ({ value: v })) || [{ value: '' }],
        } : {
            tags: [{ value: '' }],
            status: 'planned',
            lastUpdated: new Date().toISOString().split('T')[0],
        },
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: 'tags',
    });

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true);

        const payload = {
            ...data,
            tags: data.tags.map(t => t.value).filter(Boolean),
        };

        try {
            const url = mode === 'create' ? '/api/posts' : `/api/posts/${post.id}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save post');

            router.push('/admin/posts');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to save post');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                    {...register('title')}
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                    {...register('slug')}
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">One-Liner</label>
                <input
                    {...register('oneLiner')}
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                {errors.oneLiner && <p className="text-red-500 text-sm mt-1">{errors.oneLiner.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                        {...register('status')}
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    >
                        <option value="planned">Planned</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Last Updated</label>
                    <input
                        type="date"
                        {...register('lastUpdated')}
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                    {errors.lastUpdated && <p className="text-red-500 text-sm mt-1">{errors.lastUpdated.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="space-y-2">
                    {tagFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <input
                                {...register(`tags.${index}.value` as const)}
                                placeholder="e.g., web3"
                                className="flex-1 px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                            />
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => appendTag({ value: '' })}
                    className="mt-2 text-sm text-[hsl(var(--primary))] hover:underline"
                >
                    + Add Tag
                </button>
                {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Key Idea</label>
                <textarea
                    {...register('keyIdea')}
                    rows={4}
                    placeholder="The main takeaway or insight from this post..."
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                {errors.keyIdea && <p className="text-red-500 text-sm mt-1">{errors.keyIdea.message}</p>}
            </div>

            <div className="flex gap-4 pt-4 border-t border-[hsl(var(--border))]">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50 transition-colors"
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
