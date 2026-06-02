import Link from 'next/link';
import { getProjects } from '@/lib/db';
import { getPosts } from '@/lib/db';
import { getInfographics } from '@/lib/infographics';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { BarChart3, FileText, FolderKanban, Plus, Settings } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const projects = await getProjects();
    const posts = await getPosts();
    const infographics = await getInfographics();

    const stats = [
        {
            label: 'Projects',
            value: projects.length,
            href: '/admin/projects',
            action: 'Manage projects',
            detail: 'Case studies and production work',
            icon: FolderKanban,
        },
        {
            label: 'Posts',
            value: posts.length,
            href: '/admin/posts',
            action: 'Manage posts',
            detail: 'Notes, writing, and drafts',
            icon: FileText,
        },
        {
            label: 'Daily Crypto',
            value: infographics.length,
            href: '/admin/infographics',
            action: 'Manage infographics',
            detail: 'Daily visual updates',
            icon: BarChart3,
        },
    ];

    return (
        <div>
            <AdminPageHeader
                eyebrow="Admin Console"
                title="Control Room"
                description="Monitor the portfolio surface, keep content current, and make small operational updates without leaving the system."
            />

            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <Link key={stat.href} href={stat.href} className="operator-panel operator-panel-hover block p-5">
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <p className="operator-label">{stat.label}</p>
                                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                                        {stat.detail}
                                    </p>
                                </div>
                                <div className="rounded-lg border border-[hsl(var(--primary))]/25 bg-[hsl(var(--primary))]/10 p-2 text-[hsl(var(--primary))]">
                                    <Icon className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between gap-4">
                                <p className="font-mono text-5xl font-semibold text-[hsl(var(--foreground))]">
                                    {stat.value}
                                </p>
                                <span className="mono-meta text-[hsl(var(--primary))]">{stat.action}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="operator-panel p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                        <p className="operator-label">Quick Actions</p>
                        <h2 className="mt-2 text-xl font-semibold">Ship a small update</h2>
                    </div>
                    <span className="signal-chip">
                        <span className="signal-dot" />
                        READY
                    </span>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/projects/new">
                        <Button variant="primary" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Project
                        </Button>
                    </Link>
                    <Link href="/admin/posts/new">
                        <Button variant="outline" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Post
                        </Button>
                    </Link>
                    <Link href="/admin/infographics/new">
                        <Button variant="outline" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Today&apos;s Crypto
                        </Button>
                    </Link>
                    <Link href="/admin/settings">
                        <Button variant="outline" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Edit Settings
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
