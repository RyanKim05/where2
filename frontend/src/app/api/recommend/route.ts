import { NextRequest, NextResponse } from 'next/server';

// Temporary hardcode for testing
const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL || 'http://travel-recommender-alb-1110894612.us-east-1.elb.amazonaws.com';

export async function POST(request: NextRequest) {
  try {
    console.log('Using FASTAPI_BASE_URL:', FASTAPI_BASE_URL);
    
    const body = await request.json();
    const baseUrl = FASTAPI_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/recommend`;
    
    console.log('Sending recommendation request to:', url);
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Backend error response:', text);
      return NextResponse.json(
        { error: `Backend returned ${res.status}: ${text}` }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Recommend API route error:', err);
    return NextResponse.json(
      { error: 'Failed to get recommendations' }, 
      { status: 500 }
    );
  }
}