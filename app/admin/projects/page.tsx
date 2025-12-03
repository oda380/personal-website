import Link from 'next/link';
import { getProjects } from '@/lib/db';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function ProjectsManagementPage() {
    const projects = await getProjects();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 transition-colors"
                >
                    Create Project
                </Link>
            </div>

            <ProjectsTable projects={projects} />
        </div>
    );
}
