'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    oneLiner: z.string().min(1, 'One-liner is required'),
    role: z.string().min(1, 'Role is required'),
    timeframe: z.string().min(1, 'Timeframe is required'),
    stack: z.array(z.object({ value: z.string() })).min(1, 'At least one technology required'),
    summary: z.string().min(1, 'Summary is required'),
    highlights: z.array(z.object({ value: z.string() })).min(1, 'At least one highlight required'),
    link: z.string().optional(),
    type: z.enum(['web3', 'web2', 'mobile', 'other']),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    project?: any;
    mode: 'create' | 'edit';
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: project ? {
            ...project,
            stack: project.stack?.map((v: string) => ({ value: v })) || [{ value: '' }],
            highlights: project.highlights?.map((v: string) => ({ value: v })) || [{ value: '' }],
        } : {
            stack: [{ value: '' }],
            highlights: [{ value: '' }],
            type: 'web3',
        },
    });

    const { fields: stackFields, append: appendStack, remove: removeStack } = useFieldArray({
        control,
        name: 'stack',
    });

    const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
        control,
        name: 'highlights',
    });

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);

        const payload = {
            ...data,
            stack: data.stack.map(s => s.value).filter(Boolean),
            highlights: data.highlights.map(h => h.value).filter(Boolean),
        };

        try {
            const url = mode === 'create' ? '/api/projects' : `/api/projects/${project.id}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save project');

            router.push('/admin/projects');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to save project');
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
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <input
                        {...register('role')}
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Timeframe</label>
                    <input
                        {...register('timeframe')}
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                    {errors.timeframe && <p className="text-red-500 text-sm mt-1">{errors.timeframe.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Tech Stack</label>
                <div className="space-y-2">
                    {stackFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <input
                                {...register(`stack.${index}.value` as const)}
                                placeholder="e.g., Next.js"
                                className="flex-1 px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                            />
                            <button
                                type="button"
                                onClick={() => removeStack(index)}
                                className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => appendStack({ value: '' })}
                    className="mt-2 text-sm text-[hsl(var(--primary))] hover:underline"
                >
                    + Add Technology
                </button>
                {errors.stack && <p className="text-red-500 text-sm mt-1">{errors.stack.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Summary</label>
                <textarea
                    {...register('summary')}
                    rows={4}
                    className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                />
                {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Highlights</label>
                <div className="space-y-2">
                    {highlightFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <input
                                {...register(`highlights.${index}.value` as const)}
                                placeholder="Key achievement or feature"
                                className="flex-1 px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                            />
                            <button
                                type="button"
                                onClick={() => removeHighlight(index)}
                                className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => appendHighlight({ value: '' })}
                    className="mt-2 text-sm text-[hsl(var(--primary))] hover:underline"
                >
                    + Add Highlight
                </button>
                {errors.highlights && <p className="text-red-500 text-sm mt-1">{errors.highlights.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Link (Optional)</label>
                    <input
                        {...register('link')}
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                        {...register('type')}
                        className="w-full px-4 py-2 border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--card))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                    >
                        <option value="web3">Web3</option>
                        <option value="web2">Web2</option>
                        <option value="mobile">Mobile</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[hsl(var(--border))]">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50 transition-colors"
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Project' : 'Update Project'}
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
