import Link from 'next/link';
import { getProjects } from '@/lib/db';
import { ProjectsList } from '@/components/ProjectsList';

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <div className="flex-1">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Projects</h1>
                    <p className="text-xl text-[hsl(var(--muted-foreground))]">
                        Web3 products, developer tools, and experiments
                    </p>
                </div>

                <ProjectsList projects={projects} />
            </div>
        </div>
    );
}
