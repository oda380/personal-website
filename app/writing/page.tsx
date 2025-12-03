import { getPosts } from '@/lib/db';
import { PostsList } from '@/components/PostsList';

export default async function WritingPage() {
    const allPosts = await getPosts();
    const publishedPosts = allPosts.filter(post => post.status === 'published');

    return (
        <div className="flex-1">
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Writing</h1>
                    <p className="text-xl text-[hsl(var(--muted-foreground))]">
                        Thoughts on Web3 product, development, and building useful things
                    </p>
                </div>

                <PostsList posts={publishedPosts} />
            </div>
        </div>
    );
}
