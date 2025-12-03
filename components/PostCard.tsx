'use client';

import { motion } from 'framer-motion';

interface Post {
    id?: number;
    title: string;
    slug: string;
    oneLiner: string;
    keyIdea: string;
    tags: string[];
    lastUpdated: string;
    status: 'draft' | 'published' | 'archived' | 'planned';
}

export default function PostCard({ post, index, children }: { post: Post; index: number; children?: React.ReactNode }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="bg-[hsl(var(--card))]/50 backdrop-blur-sm border border-[hsl(var(--border))] rounded-xl p-8 hover:border-[hsl(var(--primary))]/50 transition-all shadow-sm hover:shadow-lg hover:shadow-[hsl(var(--primary))]/5"
        >
            <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-2xl font-bold flex-1">{post.title}</h2>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${post.status === 'published'
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : post.status === 'draft'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]'
                    }`}>
                    {post.status}
                </span>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] mb-5">
                {post.oneLiner}
            </p>

            <div className="bg-[hsl(var(--muted))]/50 border border-[hsl(var(--border))] rounded-lg p-4 mb-5">
                <p className="text-sm italic text-[hsl(var(--foreground))] leading-relaxed">
                    {post.keyIdea}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-medium px-2.5 py-1 rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] ml-auto">
                    {post.lastUpdated}
                </span>
            </div>

            {children}
        </motion.article>
    );
}
