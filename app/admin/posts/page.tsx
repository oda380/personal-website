import Link from 'next/link';
import { getPosts } from '@/lib/db';
import PostsTable from '@/components/admin/PostsTable';

export default async function PostsManagementPage() {
    const posts = await getPosts();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Posts</h1>
                <Link
                    href="/admin/posts/new"
                    className="px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-lg hover:bg-[hsl(var(--primary))]/90 transition-colors"
                >
                    Create Post
                </Link>
            </div>

            <PostsTable posts={posts} />
        </div>
    );
}
