import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-auth';

// GET /api/posts - List all posts (admin required because it includes drafts)
export async function GET() {
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const posts = await getPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

// POST /api/posts - Create new post (admin required)
export async function POST(request: NextRequest) {
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const body = await request.json();
        const post = await createPost(body);

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
