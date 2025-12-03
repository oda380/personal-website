import Link from 'next/link';
import { getProjects } from '@/lib/db';
import { getPosts } from '@/lib/db';

export default async function AdminDashboard() {
    const projects = await getProjects();
    const posts = await getPosts();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6">
                    <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Total Projects</h3>
                    <p className="text-4xl font-bold">{projects.length}</p>
                    <Link href="/admin/projects" className="text-sm text-[hsl(var(--primary))] hover:underline mt-4 inline-block">
                        Manage Projects →
                    </Link>
                </div>

                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6">
                    <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Total Posts</h3>
                    <p className="text-4xl font-bold">{posts.length}</p>
                    <Link href="/admin/posts" className="text-sm text-[hsl(var(--primary))] hover:underline mt-4 inline-block">
                        Manage Posts →
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/projects/new"
                            className="px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 transition-colors"
                        >
                            Create Project
                        </Link>
                        <Link
                            href="/admin/posts/new"
                            className="px-6 py-3 border border-[hsl(var(--border))] rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        >
                            Create Post
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
