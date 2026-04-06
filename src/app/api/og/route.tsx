import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('image') || '';
  const platform = searchParams.get('platform') || 'Letterboxd';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#050505',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' }}>
          CineSkin Profile Background
        </h1>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Profile background"
            style={{
              width: '1000px',
              height: '450px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '40px',
            }}
          />
        )}
        <p style={{ fontSize: '24px', textAlign: 'center' }}>
          Custom {platform} profile background created with CineSkin
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
