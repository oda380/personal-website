'use client';

import { SignedIn } from '@clerk/nextjs';
import AdminPostActions from '@/components/admin/AdminPostActions';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/types';

export function PostsList({ posts }: { posts: Post[] }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-xl text-[hsl(var(--muted-foreground))] mb-2">No posts yet</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Check back soon for new content</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index}>
                    <SignedIn>
                        <AdminPostActions post={{ id: post.id!, title: post.title, slug: post.slug }} />
                    </SignedIn>
                </PostCard>
            ))}
        </div>
    );
}

