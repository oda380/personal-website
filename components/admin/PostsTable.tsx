'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

export default function PostsTable({ posts }: { posts: Post[] }) {
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
            } catch (error) {
                toast.error('Error deleting post');
            }
        }
    };

    if (posts.length === 0) {
        return (
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-12 text-center text-[hsl(var(--muted-foreground))]">
                No posts yet. Create your first one!
            </div>
        );
    }

    return (
        <>
            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden md:block bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
                        <tr>
                            <th className="text-left p-4 font-semibold">Title</th>
                            <th className="text-left p-4 font-semibold">Status</th>
                            <th className="text-left p-4 font-semibold">Last Updated</th>
                            <th className="text-right p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b border-[hsl(var(--border))] last:border-0">
                                <td className="p-4">
                                    <div>
                                        <p className="font-medium">{post.title}</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{post.oneLiner}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs px-2 py-1 rounded-full ${post.status === 'published'
                                        ? 'bg-emerald-500/10 text-emerald-500'
                                        : post.status === 'draft'
                                            ? 'bg-amber-500/10 text-amber-500'
                                            : 'bg-gray-500/10 text-gray-500'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="p-4 text-[hsl(var(--muted-foreground))]">{post.lastUpdated}</td>
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
                        className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-4"
                    >
                        {/* Title & Description */}
                        <div className="mb-3">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2">{post.oneLiner}</p>
                        </div>

                        {/* Meta Row */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[hsl(var(--border))]">
                            <span className={`text-xs px-2 py-1 rounded-full ${post.status === 'published'
                                ? 'bg-emerald-500/10 text-emerald-500'
                                : post.status === 'draft'
                                    ? 'bg-amber-500/10 text-amber-500'
                                    : 'bg-gray-500/10 text-gray-500'
                                }`}>
                                {post.status}
                            </span>
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">{post.lastUpdated}</span>
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

