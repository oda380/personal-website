'use client';

import { useState } from 'react';
import { SignedIn } from '@clerk/nextjs';
import AdminPostActions from '@/components/AdminPostActions';
import PostCard from '@/components/PostCard';
import { FilterButtons } from '@/components/FilterButtons';
import { Post } from '@/lib/types';

export function PostsList({ posts }: { posts: Post[] }) {
    const [selectedStatus, setSelectedStatus] = useState<string>('All');

    // Get unique statuses from published posts (for public view)
    const statuses = ['All', ...Array.from(new Set(posts.map(p => p.status)))];

    // Filter posts
    const filteredPosts = selectedStatus === 'All'
        ? posts
        : posts.filter(p => p.status === selectedStatus);

    return (
        <>
            {posts.length > 1 && (
                <div className="mb-8">
                    <FilterButtons
                        options={statuses}
                        selected={selectedStatus}
                        onSelect={setSelectedStatus}
                        label="Status"
                    />
                </div>
            )}

            {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-[hsl(var(--muted-foreground))] mb-2">No posts yet</p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Check back soon for new content</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredPosts.map((post, index) => (
                        <PostCard key={post.slug} post={post} index={index}>
                            <SignedIn>
                                <AdminPostActions post={{ id: post.id!, title: post.title, slug: post.slug }} />
                            </SignedIn>
                        </PostCard>
                    ))}
                </div>
            )}
        </>
    );
}
