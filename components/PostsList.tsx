'use client';

import { useState } from 'react';
import { SignedIn } from '@clerk/nextjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AdminPostActions from '@/components/AdminPostActions';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/types';

const POSTS_PER_PAGE = 5;

export function PostsList({ posts }: { posts: Post[] }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, endIndex);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (posts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-[hsl(var(--muted-foreground))] mb-2">No posts yet</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Check back soon for new content</p>
            </div>
        );
    }

    return (
        <>
            {/* Posts List */}
            <div className="space-y-6">
                {currentPosts.map((post, index) => (
                    <PostCard key={post.slug} post={post} index={index}>
                        <SignedIn>
                            <AdminPostActions post={{ id: post.id!, title: post.title, slug: post.slug }} />
                        </SignedIn>
                    </PostCard>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, idx) => (
                            page === '...' ? (
                                <span key={`ellipsis-${idx}`} className="px-2 text-[hsl(var(--muted-foreground))]">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page as number)}
                                    className={`min-w-[40px] h-10 rounded-lg font-medium transition-all hover:scale-105 ${currentPage === page
                                        ? 'bg-[hsl(var(--primary))] text-white shadow-lg shadow-[hsl(var(--primary))]/20'
                                        : 'hover:bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
                <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mt-4">
                    Showing {startIndex + 1}-{Math.min(endIndex, posts.length)} of {posts.length} posts
                </p>
            )}
        </>
    );
}
