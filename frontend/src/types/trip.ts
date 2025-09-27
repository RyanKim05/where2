export type Trip = {
  id: string;
  name: string;
  destination: string;
  budget_level?: string;
  culture?: number;
  adventure?: number;
  nature?: number;
  beaches?: number;
  nightlife?: number;
  cuisine?: number;
  wellness?: number;
  urban?: number;
  seclusion?: number;
  avg_temp?: number;
  ideal_durations?: string[];
  region?: string;
  top_n?: number;
}

export type Recommendation = {
  city: string;
  country: string;
  region: string;
  short_description?: string;
  score: number;
}

export type RecommendationRequest = {
  culture: number;
  adventure: number;
  nature: number;
  beaches: number;
  nightlife: number;
  cuisine: number;
  wellness: number;
  urban: number;
  seclusion: number;
  avg_temp: number;
  ideal_durations: string[];
  budget_level?: string;
  region?: string;
  top_n?: number;
}

export type RecommendationResponse = {
  recommendations: Recommendation[];
}