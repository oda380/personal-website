import Link from 'next/link';
import { getPosts } from '@/lib/db';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PostsTable from '@/components/admin/PostsTable';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PostsManagementPage() {
    const posts = await getPosts();

    return (
        <div>
            <AdminPageHeader
                eyebrow="Writing Pipeline"
                title="Posts"
                description="Manage notes, drafts, and published writing with clear status and revision dates."
                action={
                    <Link href="/admin/posts/new">
                        <Button variant="primary" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create Post
                        </Button>
                    </Link>
                }
            />

            <PostsTable posts={posts} />
        </div>
    );
}
