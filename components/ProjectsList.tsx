'use client';

import { useState } from 'react';
import { SignedIn } from '@clerk/nextjs';
import AdminProjectActions from '@/components/AdminProjectActions';
import ProjectCard from '@/components/ProjectCard';
import { FilterButtons } from '@/components/FilterButtons';

interface Project {
    id?: number;
    title: string;
    slug: string;
    oneLiner: string;
    role: string;
    timeframe: string;
    stack: string[];
    summary: string;
    highlights: string[];
    link?: string;
    type: string;
}

export function ProjectsList({ projects }: { projects: Project[] }) {
    const [selectedType, setSelectedType] = useState<string>('All');

    // Get unique types
    const types = ['All', ...Array.from(new Set(projects.map(p => p.type)))];

    // Filter projects
    const filteredProjects = selectedType === 'All'
        ? projects
        : projects.filter(p => p.type === selectedType);

    return (
        <>
            {projects.length > 0 && (
                <div className="mb-8">
                    <FilterButtons
                        options={types}
                        selected={selectedType}
                        onSelect={setSelectedType}
                        label="Filter"
                    />
                </div>
            )}

            {filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-[hsl(var(--muted-foreground))] mb-2">
                        {selectedType === 'All' ? 'No projects yet' : `No ${selectedType} projects`}
                    </p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {selectedType !== 'All' && (
                            <button
                                onClick={() => setSelectedType('All')}
                                className="text-[hsl(var(--primary))] hover:underline"
                            >
                                View all projects
                            </button>
                        )}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index}>
                            <SignedIn>
                                <AdminProjectActions project={{ id: project.id!, title: project.title, slug: project.slug }} />
                            </SignedIn>
                        </ProjectCard>
                    ))}
                </div>
            )}
        </>
    );
}
