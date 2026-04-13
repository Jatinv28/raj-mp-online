import { NextResponse } from 'next/server';
import https from 'https';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('URL parameter is missing', { status: 400 });
  }

  // Ensure it's a valid remote URL
  try {
    new URL(imageUrl);
  } catch (e) {
    return new NextResponse('Invalid URL provided', { status: 400 });
  }

  try {
    const buffer: Buffer = await new Promise((resolve, reject) => {
      https.get(imageUrl, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Upstream returned ${res.statusCode}`));
          return;
        }

        const data: Uint8Array[] = [];
        res.on('data', (chunk) => data.push(chunk));
        res.on('end', () => resolve(Buffer.concat(data)));
      }).on('error', reject);
    });

    // We strip away Facebook's cross-origin-resource-policy constraints and return the raw image
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
      },
    });
  } catch (error) {
    console.error('Image Proxy Error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
