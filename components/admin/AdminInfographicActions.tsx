'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

interface AdminInfographicActionsProps {
    infographic: {
        id?: number;
        datePosted: string;
    };
    redirectOnDelete?: string;
}

export default function AdminInfographicActions({ infographic, redirectOnDelete }: AdminInfographicActionsProps) {
    const router = useRouter();

    if (!infographic.id) return null;

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this infographic?')) {
            return;
        }

        try {
            const response = await fetch(`/api/infographics/${infographic.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete');
            }

            toast.success('Infographic deleted successfully');

            if (redirectOnDelete) {
                router.push(redirectOnDelete);
            } else {
                router.refresh();
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete infographic');
        }
    };

    return (
        <div className="flex items-center gap-2 justify-end">
            <Link href={`/admin/infographics/${infographic.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-2">
                    <Pencil className="w-4 h-4" />
                    Edit
                </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleDelete} className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/30">
                <Trash2 className="w-4 h-4" />
                Delete
            </Button>
        </div>
    );
}
