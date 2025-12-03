import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
        }

        // Upload to Pinata
        const pinataFormData = new FormData();
        pinataFormData.append('file', file);

        const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PINATA_API_JWT}`,
            },
            body: pinataFormData,
        });

        if (!pinataResponse.ok) {
            const error = await pinataResponse.text();
            console.error('Pinata upload error:', error);
            return NextResponse.json({ error: 'Failed to upload to Pinata' }, { status: 500 });
        }

        const { IpfsHash } = await pinataResponse.json();
        const imageUrl = `${process.env.PINATA_GATEWAY_URL}/ipfs/${IpfsHash}`;

        return NextResponse.json({
            imageUrl,
            cid: IpfsHash
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
