import { NextResponse } from 'next/server';
import { getAvailableMonths } from '@/lib/infographics';

export async function GET() {
    try {
        const months = await getAvailableMonths();
        return NextResponse.json(months);
    } catch (error) {
        console.error('Error fetching available months:', error);
        return NextResponse.json({ error: 'Failed to fetch available months' }, { status: 500 });
    }
}
