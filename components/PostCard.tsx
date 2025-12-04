'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { formatReadingTime } from '@/lib/blog-utils';

interface Post {
    id?: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    featuredImageUrl?: string;
    readingTimeMinutes?: number;
    oneLiner: string;
    keyIdea: string;
    tags: string[];
    lastUpdated: string;
    status: 'draft' | 'published' | 'archived' | 'planned';
}

export default function PostCard({ post, index, children }: { post: Post; index: number; children?: React.ReactNode }) {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'published':
                return 'bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border border-[hsl(var(--success))]/20';
            case 'draft':
                return 'bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border border-[hsl(var(--warning))]/20';
            default:
                return 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))]';
        }
    };

    const hasContent = post.content && post.content.trim().length > 0;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -2, scale: 1.005 }}
            className="bg-[hsl(var(--card))]/50 backdrop-blur-sm border border-[hsl(var(--border))] rounded-xl overflow-hidden hover:border-[hsl(var(--primary))]/50 transition-all shadow-sm hover:shadow-lg hover:shadow-[hsl(var(--primary))]/10"
        >
            {/* Featured Image */}
            {post.featuredImageUrl && (
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        src={post.featuredImageUrl}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-bold flex-1">{post.title}</h2>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap ${getStatusStyles(post.status)}`}>
                        {post.status}
                    </span>
                </div>

                {/* Excerpt */}
                <p className="text-[hsl(var(--muted-foreground))] mb-5 leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-5 text-sm text-[hsl(var(--muted-foreground))]">
                    <span>{post.lastUpdated}</span>
                    {post.readingTimeMinutes && post.readingTimeMinutes > 0 && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-2.5 py-1 rounded-md bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Read More Link */}
                {hasContent && post.status === 'published' && (
                    <Link
                        href={`/writing/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[hsl(var(--primary))] hover:gap-3 transition-all font-medium group"
                    >
                        Read full article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                )}

                {children}
            </div>
        </motion.article>
    );
}
