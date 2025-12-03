import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
    getInfographicById,
    updateInfographic,
    deleteInfographic,
} from '@/lib/infographics';

// GET /api/infographics/[id] - Get single infographic
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const infographic = await getInfographicById(parseInt(id));

        if (!infographic) {
            return NextResponse.json({ error: 'Infographic not found' }, { status: 404 });
        }

        return NextResponse.json(infographic);
    } catch (error) {
        console.error('Error fetching infographic:', error);
        return NextResponse.json({ error: 'Failed to fetch infographic' }, { status: 500 });
    }
}

// PUT /api/infographics/[id] - Update infographic
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();

        const infographic = await updateInfographic(parseInt(id), body);
        return NextResponse.json(infographic);
    } catch (error) {
        console.error('Error updating infographic:', error);
        return NextResponse.json({ error: 'Failed to update infographic' }, { status: 500 });
    }
}

// DELETE /api/infographics/[id] - Delete infographic
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await deleteInfographic(parseInt(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting infographic:', error);
        return NextResponse.json({ error: 'Failed to delete infographic' }, { status: 500 });
    }
}
