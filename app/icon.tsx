import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: 'linear-gradient(to bottom right, #06b6d4, #0891b2)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '6px', // Slightly rounded corners
                    fontWeight: 700,
                    fontFamily: 'sans-serif',
                }}
            >
                林
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
