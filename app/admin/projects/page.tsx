import Link from 'next/link';
import { getProjects } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ProjectsTable from '@/components/admin/ProjectsTable';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProjectsManagementPage() {
    const projects = await getProjects();

    return (
        <div>
            <AdminPageHeader
                eyebrow="Case Study Registry"
                title="Projects"
                description="Keep production work, experiments, and operational proof points ordered for the public portfolio."
                action={
                    <Link href="/admin/projects/new">
                        <Button variant="primary" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Project
                        </Button>
                    </Link>
                }
            />

            <ProjectsTable projects={projects} />
        </div>
    );
}
