import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

type Params = Promise<{ id: string }>;

// GET /api/posts/[id] - Get single post (admin required because it may be a draft)
export async function GET(
    request: NextRequest,
    props: { params: Params }
) {
    const params = await props.params;
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const id = parseInt(params.id);
        const post = await getPostById(id);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' }, { status: 500 }
        );
    }
}

// PUT /api/posts/[id] - Update post (admin required)
export async function PUT(
    request: NextRequest,
    props: { params: Params }
) {
    const params = await props.params;
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const id = parseInt(params.id);
        const body = await request.json();
        const post = await updatePost(id, body);

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}

// DELETE /api/posts/[id] - Delete post (admin required)
export async function DELETE(
    request: NextRequest,
    props: { params: Params }
) {
    const params = await props.params;
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const id = parseInt(params.id);
        await deletePost(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}
