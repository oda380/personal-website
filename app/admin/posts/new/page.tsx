import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
    return (
        <div className="max-w-5xl">
            <AdminPageHeader
                eyebrow="New Note"
                title="Create Post"
                description="Draft a useful note with a clear status, excerpt, and markdown body."
            />
            <div className="operator-panel p-5 md:p-6">
                <PostForm mode="create" />
            </div>
        </div>
    );
}
