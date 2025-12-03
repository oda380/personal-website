'use client';

import Link from 'next/link';
import { Project } from '@/lib/types';

export default function ProjectsTable({ projects }: { projects: Project[] }) {
    const handleDelete = async (id: number, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    window.location.reload();
                } else {
                    alert('Failed to delete project');
                }
            } catch (error) {
                alert('Error deleting project');
            }
        }
    };

    return (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl overflow-hidden">
            <table className="w-full">
                <thead className="bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
                    <tr>
                        <th className="text-left p-4 font-semibold">Title</th>
                        <th className="text-left p-4 font-semibold">Type</th>
                        <th className="text-left p-4 font-semibold">Timeframe</th>
                        <th className="text-right p-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} className="border-b border-[hsl(var(--border))] last:border-0">
                            <td className="p-4">
                                <div>
                                    <p className="font-medium">{project.title}</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{project.oneLiner}</p>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]">
                                    {project.type}
                                </span>
                            </td>
                            <td className="p-4 text-[hsl(var(--muted-foreground))]">{project.timeframe}</td>
                            <td className="p-4 text-right space-x-2">
                                <Link
                                    href={`/admin/projects/${project.id}/edit`}
                                    className="text-sm text-[hsl(var(--primary))] hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id!, project.title)}
                                    className="text-sm text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {projects.length === 0 && (
                <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
                    No projects yet. Create your first one!
                </div>
            )}
        </div>
    );
}
