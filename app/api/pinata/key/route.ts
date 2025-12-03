import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST() {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Generate a temporary API key
        const keyName = `temp_upload_${Date.now()}`;
        const response = await fetch('https://api.pinata.cloud/users/generateApiKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.PINATA_API_JWT}`,
            },
            body: JSON.stringify({
                keyName: keyName,
                permissions: {
                    endpoints: {
                        pinning: {
                            pinFileToIPFS: true
                        }
                    }
                },
                maxUses: 1
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to generate Pinata key:', errorText);
            throw new Error('Failed to generate upload credentials');
        }

        const keyData = await response.json();
        return NextResponse.json(keyData);

    } catch (error) {
        console.error('Key generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate upload credentials' },
            { status: 500 }
        );
    }
}
