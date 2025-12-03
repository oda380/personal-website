import PostForm from '@/components/admin/PostForm';
import { getPostById } from '@/lib/db';

type Params = Promise<{ id: string }>;

export default async function EditPostPage(props: { params: Params }) {
    const params = await props.params;
    const post = await getPostById(parseInt(params.id));

    return (
        <div className="p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
            <PostForm post={post} mode="edit" />
        </div>
    );
}
