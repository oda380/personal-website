import { NextResponse } from 'next/server';
import { getLatestInfographic } from '@/lib/infographics';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const latest = await getLatestInfographic();
        return NextResponse.json(latest);
    } catch (error) {
        console.error('Error fetching latest infographic:', error);
        return NextResponse.json({ error: 'Failed to fetch latest infographic' }, { status: 500 });
    }
}
