'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

export default function PostsTable({ posts }: { posts: Post[] }) {
    const statusClassName = (status: Post['status']) => {
        if (status === 'published') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500';
        if (status === 'draft') return 'border-amber-500/30 bg-amber-500/10 text-amber-500';
        return 'border-[hsl(var(--border))] bg-[hsl(var(--muted))]/60 text-[hsl(var(--muted-foreground))]';
    };

    const handleDelete = async (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success('Post deleted successfully');
                    window.location.reload();
                } else {
                    toast.error('Failed to delete post');
                }
            } catch {
                toast.error('Error deleting post');
            }
        }
    };

    if (posts.length === 0) {
        return (
            <div className="operator-panel border-dashed p-12 text-center">
                <p className="operator-label mb-2">No Records</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    No posts yet. Create your first one.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table - Hidden on mobile */}
            <div className="operator-panel hidden overflow-hidden md:block">
                <table className="w-full">
                    <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/45">
                        <tr>
                            <th className="mono-meta p-4 text-left font-semibold text-[hsl(var(--muted-foreground))]">Title</th>
                            <th className="mono-meta p-4 text-left font-semibold text-[hsl(var(--muted-foreground))]">Status</th>
                            <th className="mono-meta p-4 text-left font-semibold text-[hsl(var(--muted-foreground))]">Last Updated</th>
                            <th className="mono-meta p-4 text-right font-semibold text-[hsl(var(--muted-foreground))]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b border-[hsl(var(--border))] transition-colors last:border-0 hover:bg-[hsl(var(--muted))]/30">
                                <td className="p-4">
                                    <div>
                                        <p className="font-medium">{post.title}</p>
                                        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{post.oneLiner}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`signal-chip ${statusClassName(post.status)}`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="mono-meta p-4 text-[hsl(var(--muted-foreground))]">{post.lastUpdated}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/posts/${post.id}/edit`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(post.id!, post.title)}
                                            className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards - Hidden on desktop */}
            <div className="md:hidden space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="operator-panel p-4"
                    >
                        {/* Title & Description */}
                        <div className="mb-3">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">{post.oneLiner}</p>
                        </div>

                        {/* Meta Row */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[hsl(var(--border))]">
                            <span className={`signal-chip ${statusClassName(post.status)}`}>
                                {post.status}
                            </span>
                            <span className="mono-meta text-[hsl(var(--muted-foreground))]">{post.lastUpdated}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Link href={`/admin/posts/${post.id}/edit`} className="flex-1">
                                <Button variant="outline" size="sm" className="w-full gap-2">
                                    <Pencil className="w-4 h-4" />
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(post.id!, post.title)}
                                className="flex-1 gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
