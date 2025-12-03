'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
    id: number;
    title: string;
    slug: string;
}

export default function AdminPostActions({ post }: { post: Post }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${post.title}"?`)) {
            return;
        }

        try {
            const res = await fetch(`/api/posts/${post.id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Post deleted successfully');
                router.refresh();
            } else {
                toast.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Error deleting post');
        }
    };

    return (
        <div className="flex gap-2 mt-4 pt-4 border-t border-[hsl(var(--border))] justify-end">
            <Link href={`/admin/posts/${post.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-2">
                    <Pencil className="w-4 h-4" />
                    Edit
                </Button>
            </Link>
            <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30"
            >
                <Trash2 className="w-4 h-4" />
                Delete
            </Button>
        </div>
    );
}
