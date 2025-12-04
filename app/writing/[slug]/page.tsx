import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getPostBySlug } from '@/lib/db';
import { MarkdownContent } from '@/components/MarkdownContent';
import { formatReadingTime } from '@/lib/blog-utils';

interface PageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const title = post.title;
    const description = post.excerpt || post.oneLiner;
    const images = post.featuredImageUrl
        ? [{ url: post.featuredImageUrl, width: 1200, height: 630, alt: title }]
        : [];

    return {
        title,
        description,
        keywords: post.tags,
        authors: [{ name: 'Kitaek Lim' }],
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: post.lastUpdated,
            authors: ['Kitaek Lim'],
            tags: post.tags,
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: post.featuredImageUrl ? [post.featuredImageUrl] : [],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const post = await getPostBySlug(params.slug);

    if (!post || post.status !== 'published') {
        notFound();
    }

    return (
        <div className="flex-1">
            {/* Back button */}
            <div className="max-w-4xl mx-auto px-6 pt-8">
                <Link
                    href="/writing"
                    className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Writing
                </Link>
            </div>

            {/* Hero Section */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Featured Image */}
                {post.featuredImageUrl && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={post.featuredImageUrl}
                            alt={post.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl font-bold mb-6 text-balance leading-tight">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-[hsl(var(--muted-foreground))] pb-8 border-b border-[hsl(var(--border))]">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time>{post.lastUpdated}</time>
                        </div>
                        {post.readingTimeMinutes && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{formatReadingTime(post.readingTimeMinutes)}</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Key Idea Callout */}
                {post.keyIdea && (
                    <div className="mb-12 p-6 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--secondary))]/10 border border-[hsl(var(--primary))]/20">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--primary))] mb-3">
                            Key Idea
                        </h3>
                        <p className="text-lg italic leading-relaxed text-[hsl(var(--foreground))]">
                            {post.keyIdea}
                        </p>
                    </div>
                )}

                {/* Content */}
                {post.content ? (
                    <MarkdownContent content={post.content} />
                ) : (
                    <div className="text-center py-16 text-[hsl(var(--muted-foreground))]">
                        <p>Content coming soon...</p>
                    </div>
                )}
            </article>
        </div>
    );
}
