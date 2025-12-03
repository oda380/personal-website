import { NextResponse } from 'next/server';
import { getPostedDates } from '@/lib/infographics';

export async function GET() {
    try {
        const dates = await getPostedDates();
        return NextResponse.json(dates);
    } catch (error) {
        console.error('Error fetching posted dates:', error);
        return NextResponse.json({ error: 'Failed to fetch posted dates' }, { status: 500 });
    }
}
