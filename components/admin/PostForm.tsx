'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { calculateReadingTime } from '@/lib/blog-utils';
import { toast } from 'sonner';
import { Post } from '@/lib/types';

// Dynamically import markdown editor (client-side only)
const MDEditor = dynamic(
    () => import('@uiw/react-md-editor'),
    { ssr: false }
);

const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().optional(),
    featuredImageUrl: z.string().optional().refine(
        (val) => !val || val === '' || z.string().url().safeParse(val).success,
        { message: 'Must be a valid URL or empty' }
    ),
    status: z.enum(['planned', 'draft', 'published']),
    tags: z.array(z.object({ value: z.string() })).min(1, 'At least one tag required'),
    lastUpdated: z.string().min(1, 'Last updated date is required'),
    keyIdea: z.string().min(1, 'Key idea is required'),
    oneLiner: z.string().optional(), // Deprecated but kept for backward compatibility
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
    post?: Post | null;
    mode: 'create' | 'edit';
}

export default function PostForm({ post, mode }: PostFormProps) {
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [markdownContent, setMarkdownContent] = useState(post?.content || '');
    const [readingTime, setReadingTime] = useState(post?.readingTimeMinutes || 0);
    const [mounted, setMounted] = useState(false);

    // Determine the current theme for the markdown editor
    const editorTheme = resolvedTheme === 'dark' ? 'dark' : 'light';

    useEffect(() => {
        setMounted(true);
    }, []);

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: post ? {
            ...post,
            excerpt: post.excerpt || post.oneLiner,
            tags: post.tags?.map((v: string) => ({ value: v })) || [{ value: '' }],
            featuredImageUrl: post.featuredImageUrl || '',
        } : {
            tags: [{ value: '' }],
            status: 'planned',
            lastUpdated: new Date().toISOString().split('T')[0],
            excerpt: '',
            content: '',
            featuredImageUrl: '',
            oneLiner: '',
        },
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: 'tags',
    });

    // Update reading time when content changes
    useEffect(() => {
        if (markdownContent) {
            const time = calculateReadingTime(markdownContent);
            setReadingTime(time);
        }
    }, [markdownContent]);

    // Auto-generate slug from title
    const title = watch('title');
    useEffect(() => {
        if (mode === 'create' && title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', slug);
        }
    }, [title, mode, setValue]);

    const onSubmit = async (data: PostFormData) => {
        setIsSubmitting(true);

        const payload = {
            ...data,
            content: markdownContent,
            readingTimeMinutes: readingTime,
            excerpt: data.excerpt,
            oneLiner: data.excerpt, // Copy excerpt to oneLiner for backward compatibility
            tags: data.tags.map(t => t.value).filter(Boolean),
            featuredImageUrl: data.featuredImageUrl || undefined,
        };

        try {
            const url = mode === 'create' ? '/api/posts' : `/api/posts/${post?.id}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save post');

            toast.success(mode === 'create' ? 'Post created successfully!' : 'Post updated successfully!');
            router.push('/admin/posts');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save post');
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
                    placeholder="Your blog post title..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                    {...register('slug')}
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    placeholder="url-friendly-slug"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <input
                    {...register('excerpt')}
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    placeholder="A short description that appears on the blog listing..."
                />
                {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <input
                    {...register('featuredImageUrl')}
                    type="url"
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    placeholder="https://example.com/image.jpg"
                />
                {errors.featuredImageUrl && <p className="text-red-500 text-sm mt-1">{errors.featuredImageUrl.message}</p>}
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
                    rows={3}
                    placeholder="The main takeaway or insight from this post..."
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                {errors.keyIdea && <p className="text-red-500 text-sm mt-1">{errors.keyIdea.message}</p>}
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Content (Markdown)</label>
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                        ~{readingTime} min read
                    </span>
                </div>
                {mounted && (
                    <div data-color-mode={editorTheme}>
                        <MDEditor
                            value={markdownContent}
                            onChange={(val) => setMarkdownContent(val || '')}
                            height={500}
                            preview="live"
                            className="rounded-lg border border-[hsl(var(--border))] overflow-hidden"
                        />
                    </div>
                )}
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                    Supports GitHub Flavored Markdown. Preview shown on the right.
                </p>
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
