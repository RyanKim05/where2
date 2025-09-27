import { NextRequest, NextResponse } from 'next/server';
import type { Trip } from '@/types/trip';

const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL;

// In-memory storage for demo purposes
// In a real app, this would be a database
let trips: Trip[] = [
  {
    id: '1',
    name: 'European Culture Tour',
    destination: 'Paris, France',
    budget_level: 'Mid-range',
    culture: 5,
    adventure: 2,
    nature: 1,
    region: 'Europe'
  },
  {
    id: '2',
    name: 'Beach Paradise',
    destination: 'Maldives',
    budget_level: 'Luxury',
    beaches: 5,
    wellness: 4,
    seclusion: 5,
    region: 'Asia'
  }
];

export async function GET() {
  try {
    // Option 1: Return local trips
    return NextResponse.json(trips);

    // Option 2: Fetch from FastAPI backend (uncomment if you have /trips endpoint)
    /*
    if (!FASTAPI_BASE_URL) {
      console.error('FASTAPI_BASE_URL not configured');
      return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
    }

    const baseUrl = FASTAPI_BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}/trips`;
    
    console.log('Fetching from backend:', url);
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
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
    */
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch trips' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create new trip with generated ID
    const newTrip: Trip = {
      id: Date.now().toString(),
      ...body
    };

    // Add to local storage
    trips.push(newTrip);

    // Option: Also send to FastAPI backend if needed
    /*
    if (FASTAPI_BASE_URL) {
      const baseUrl = FASTAPI_BASE_URL.replace(/\/$/, '');
      const res = await fetch(`${baseUrl}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrip),
      });
    }
    */

    return NextResponse.json(newTrip);
  } catch (err) {
    console.error('Create trip error:', err);
    return NextResponse.json(
      { error: 'Failed to create trip' }, 
      { status: 500 }
    );
  }
}