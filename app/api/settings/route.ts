import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db-settings';
import { requireAdmin } from '@/lib/admin-auth';

// GET /api/settings - Get all settings
export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

// PUT /api/settings - Update settings (admin required)
export async function PUT(request: NextRequest) {
    try {
        const admin = await requireAdmin();

        if (!admin.authorized) {
            return NextResponse.json(
                { error: admin.error },
                { status: admin.status }
            );
        }

        const body = await request.json();
        await updateSettings(body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
