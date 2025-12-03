import Link from 'next/link';
import { getProjects } from '@/lib/db';
import { SignedIn } from '@clerk/nextjs';
import AdminProjectActions from '@/components/AdminProjectActions';
import ProjectCard from '@/components/ProjectCard';

export default async function ProjectsPage() {
    const projects = await getProjects();
    return (
        <div className="flex-1">
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Projects</h1>
                    <p className="text-xl text-[hsl(var(--muted-foreground))]">
                        Web3 products, developer tools, and experiments
                    </p>
                </div>

                <div className="grid gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index}>
                            <SignedIn>
                                <AdminProjectActions project={{ id: project.id!, title: project.title, slug: project.slug }} />
                            </SignedIn>
                        </ProjectCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
