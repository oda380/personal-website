import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getPosts } from '@/lib/db';
import { PostsList } from '@/components/PostsList';
import { PageHeader } from '@/components/PageHeader';

export default async function WritingPage() {
    const allPosts = await getPosts();
    const publishedPosts = allPosts.filter(post => post.status === 'published');

    return (
        <div className="flex-1">
            <PageHeader
                title="Writing"
                subtitle="Thoughts & Insights"
                description="Thoughts on Web3 product, development, and building useful things"
                action={
                    <SignedIn>
                        <Link href="/admin/posts/new">
                            <Button size="sm" className="gap-2">
                                <Plus className="w-4 h-4" />
                                Post
                            </Button>
                        </Link>
                    </SignedIn>
                }
            />

            <div className="max-w-4xl mx-auto px-6 py-16">
                <PostsList posts={publishedPosts} />
            </div>
        </div>
    );
}
