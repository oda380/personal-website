import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PostForm from '@/components/admin/PostForm';
import { getPostById } from '@/lib/db';

type Params = Promise<{ id: string }>;

export default async function EditPostPage(props: { params: Params }) {
    const params = await props.params;
    const post = await getPostById(parseInt(params.id));

    return (
        <div className="max-w-5xl">
            <AdminPageHeader
                eyebrow="Writing Editor"
                title="Edit Post"
                description="Refine the public note, update metadata, or move it through the publishing pipeline."
            />
            <div className="operator-panel p-5 md:p-6">
                <PostForm post={post} mode="edit" />
            </div>
        </div>
    );
}
