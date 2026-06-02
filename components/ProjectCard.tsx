'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

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

export default function ProjectCard({ project, index, children }: { project: Project; index: number; children?: React.ReactNode }) {
    const outcome = project.highlights[0] || project.oneLiner;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="operator-panel operator-panel-hover p-6 sm:p-7"
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                    <p className="mono-meta text-[hsl(var(--primary))] mb-2">{project.role}</p>
                    <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {project.timeframe}
                    </p>
                </div>
                <span className="signal-chip whitespace-nowrap">
                    {project.type}
                </span>
            </div>

            <div className="space-y-4 mb-6">
                <div className="grid grid-cols-[88px_1fr] gap-4 border-t border-[hsl(var(--border))] pt-4">
                    <span className="mono-meta text-[hsl(var(--primary))]">SIGNAL</span>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{project.oneLiner}</p>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-4 border-t border-[hsl(var(--border))] pt-4">
                    <span className="mono-meta text-[hsl(var(--primary))]">ACTION</span>
                    <p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">{project.summary}</p>
                </div>
                <div className="grid grid-cols-[88px_1fr] gap-4 border-t border-[hsl(var(--border))] pt-4">
                    <span className="mono-meta text-[hsl(var(--primary))]">OUTCOME</span>
                    <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{outcome}</p>
                </div>
            </div>

            {project.highlights.length > 1 && (
                <ul className="space-y-2 mb-6">
                    {project.highlights.slice(1).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                            <ArrowRight className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-[hsl(var(--muted))]/70 text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {project.link && (
                <div className="pt-4 border-t border-[hsl(var(--border))]">
                    <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors"
                    >
                        View receipt
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            )}

            {children}
        </motion.article>
    );
}
