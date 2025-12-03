'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Project {
    id: number;
    title: string;
    slug: string;
}

export default function AdminProjectActions({ project }: { project: Project }) {
    const router = useRouter();
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete project');
                setIsDeleting(false);
            }
        } catch (error) {
            alert('Error deleting project');
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex gap-2 mt-4 pt-4 border-t border-[hsl(var(--border))]">
            <Link
                href={`/admin/projects/${project.id}/edit`}
                className="px-3 py-1.5 text-sm bg-[hsl(var(--primary))] text-white rounded-md hover:bg-[hsl(var(--primary))]/90 transition-colors"
            >
                Edit
            </Link>

            {!isConfirming ? (
                <button
                    onClick={() => setIsConfirming(true)}
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Confirm?'}
                    </button>
                    <button
                        onClick={() => setIsConfirming(false)}
                        disabled={isDeleting}
                        className="px-3 py-1.5 text-sm border border-[hsl(var(--border))] rounded-md hover:bg-[hsl(var(--muted))] transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
