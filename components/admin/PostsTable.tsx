'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { Post } from '@/lib/types';

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

    return (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
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
                            <td className="p-4 text-right space-x-2">
                                <Link
                                    href={`/admin/posts/${post.id}/edit`}
                                    className="text-sm text-[hsl(var(--primary))] hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id!, post.title)}
                                    className="text-sm text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {posts.length === 0 && (
                <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
                    No posts yet. Create your first one!
                </div>
            )}
        </div>
    );
}
