import { getPosts } from '@/lib/db';
import { SignedIn } from '@clerk/nextjs';
import AdminPostActions from '@/components/AdminPostActions';
import PostCard from '@/components/PostCard';

export default async function WritingPage() {
    const posts = await getPosts();
    return (
        <div className="flex-1">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Writing</h1>
                    <p className="text-xl text-[hsl(var(--muted-foreground))]">
                        Thoughts on Web3 product, development, and building useful things
                    </p>
                </div>

                <div className="space-y-6">
                    {posts.map((post, index) => (
                        <PostCard key={post.slug} post={post} index={index}>
                            <SignedIn>
                                <AdminPostActions post={{ id: post.id!, title: post.title, slug: post.slug }} />
                            </SignedIn>
                        </PostCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
