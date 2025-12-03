'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-[hsl(var(--card))]/50 backdrop-blur-sm border border-[hsl(var(--border))] rounded-xl p-8 hover:border-[hsl(var(--primary))]/50 transition-all shadow-sm hover:shadow-lg hover:shadow-[hsl(var(--primary))]/10"
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {project.role} • {project.timeframe}
                    </p>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20 whitespace-nowrap">
                    {project.type}
                </span>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] mb-6">
                {project.oneLiner}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <p className="text-[hsl(var(--foreground))] leading-relaxed mb-5">
                {project.summary}
            </p>

            <ul className="space-y-2 mb-6">
                {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                        <ArrowRight className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                    </li>
                ))}
            </ul>

            {project.link && (
                <div className="pt-4 border-t border-[hsl(var(--border))]">
                    <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors"
                    >
                        View Project
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}

            {children}
        </motion.article>
    );
}
