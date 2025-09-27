import type { Trip, RecommendationRequest, RecommendationResponse } from '@/types/trip';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

// Trips API
export async function fetchTrips(): Promise<Trip[]> {
  try {
    console.log('Fetching trips from:', `${API_BASE}/trips`);
    const res = await fetch(`${API_BASE}/trips`, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to fetch trips: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function createTrip(trip: Omit<Trip, 'id'>): Promise<Trip> {
  try {
    const res = await fetch(`${API_BASE}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Create trip error:', errorText);
      throw new Error(`Failed to create trip: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Create trip error:', error);
    throw error;
  }
}

// Recommendations API
export async function getRecommendations(params: RecommendationRequest): Promise<RecommendationResponse> {
  try {
    console.log('Getting recommendations from:', `${API_BASE}/recommend`);
    console.log('Request params:', params);
    
    const res = await fetch(`${API_BASE}/recommend`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Recommendations API Error:', errorText);
      throw new Error(`Failed to fetch recommendations: ${res.status} - ${errorText}`);
    }
    
    const data = await res.json();
    console.log('Received recommendations:', data);
    return data;
  } catch (error) {
    console.error('Recommendations fetch error:', error);
    throw error;
  }
}