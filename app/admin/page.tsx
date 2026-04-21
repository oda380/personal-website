import Link from 'next/link';
import { getProjects } from '@/lib/db';
import { getPosts } from '@/lib/db';
import { getInfographics } from '@/lib/infographics';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const projects = await getProjects();
    const posts = await getPosts();
    const infographics = await getInfographics();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

                <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6">
                    <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Daily Crypto</h3>
                    <p className="text-4xl font-bold">{infographics.length}</p>
                    <Link href="/admin/infographics" className="text-sm text-[hsl(var(--primary))] hover:underline mt-4 inline-block">
                        Manage Infographics →
                    </Link>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/admin/projects/new">
                            <Button variant="primary">
                                Create Project
                            </Button>
                        </Link>
                        <Link href="/admin/posts/new">
                            <Button variant="outline">
                                Create Post
                            </Button>
                        </Link>
                        <Link href="/admin/infographics/new">
                            <Button variant="outline">
                                Add Today&apos;s Crypto
                            </Button>
                        </Link>
                        <Link href="/admin/settings">
                            <Button variant="outline">
                                Edit Settings
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
