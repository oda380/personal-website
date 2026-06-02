import { NextRequest, NextResponse } from 'next/server';
import {
    getInfographics,
    createInfographic,
} from '@/lib/infographics';
import { requireAdmin } from '@/lib/admin-auth';

// GET /api/infographics - Get all infographics
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
        const month = searchParams.get('month');
        const year = searchParams.get('year');

        const infographics = await getInfographics(
            limit ? parseInt(limit) : undefined,
            undefined, // offset
            month ? parseInt(month) : undefined,
            year ? parseInt(year) : undefined
        );
        return NextResponse.json(infographics);
    } catch (error) {
        console.error('Error fetching infographics:', error);
        return NextResponse.json({ error: 'Failed to fetch infographics' }, { status: 500 });
    }
}

// POST /api/infographics - Create new infographic
export async function POST(request: NextRequest) {
    const admin = await requireAdmin();
    if (!admin.authorized) {
        return NextResponse.json({ error: admin.error }, { status: admin.status });
    }

    try {
        const body = await request.json();
        const { datePosted, imageUrl, pinataCid } = body;

        if (!datePosted || !imageUrl) {
            return NextResponse.json(
                { error: 'datePosted and imageUrl are required' },
                { status: 400 }
            );
        }

        const infographic = await createInfographic({
            datePosted,
            imageUrl,
            pinataCid,
        });

        return NextResponse.json(infographic, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating infographic:', error);

        // Check for unique constraint violation
        if ((error as Error).message?.includes('unique')) {
            return NextResponse.json(
                { error: 'An infographic for this date already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json({ error: 'Failed to create infographic' }, { status: 500 });
    }
}
