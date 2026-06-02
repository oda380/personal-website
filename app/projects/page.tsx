import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getProjects } from '@/lib/db';
import { ProjectsList } from '@/components/ProjectsList';
import { PageHeader } from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <div className="flex-1">
            <PageHeader
                title="Case Studies"
                subtitle="Signal / Intervention / Outcome"
                description="Web3 product, payments, wallet, and data work framed around the problem, the constraint, and what changed after shipping."
                action={
                    <SignedIn>
                        <Link href="/admin/projects/new">
                            <Button size="sm" className="gap-2">
                                <Plus className="w-4 h-4" />
                                Post
                            </Button>
                        </Link>
                    </SignedIn>
                }
            />

            <div className="max-w-5xl mx-auto px-6 py-16">
                <ProjectsList projects={projects} />
            </div>
        </div>
    );
}
