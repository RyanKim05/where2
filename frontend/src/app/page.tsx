"use client";

import { useState } from "react";
import { getRecommendations } from "@/lib/api";
import RecommendationCard from "@/components/RecommendationCard";
import type { Recommendation, RecommendationRequest } from "@/types/trip";

export default function Page() {
  // Basic preferences
  const [budget, setBudget] = useState(""); 
  const [culture, setCulture] = useState(2.5);
  const [adventure, setAdventure] = useState(2.5);
  const [nature, setNature] = useState(2.5);
  const [region, setRegion] = useState("");
  
  // Additional preferences
  const [beaches, setBeaches] = useState(2.5);
  const [nightlife, setNightlife] = useState(2.5);
  const [cuisine, setCuisine] = useState(2.5);
  const [wellness, setWellness] = useState(2.5);
  const [urban, setUrban] = useState(2.5);
  const [seclusion, setSeclusion] = useState(2.5);
  const [avgTemp, setAvgTemp] = useState(20);
  const [idealDuration, setIdealDuration] = useState("One week");
  
  const [results, setResults] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGetRecommendations() {
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const params: RecommendationRequest = {
        culture,
        adventure,
        nature,
        beaches,
        nightlife,
        cuisine,
        wellness,
        urban,
        seclusion,
        avg_temp: avgTemp,
        ideal_durations: [idealDuration],
        top_n: 5,
      };

      if (budget && budget !== "") {
        params.budget_level = budget;
      }

      if (region && region.trim() !== "") {
        params.region = region.trim();
      }

      console.log('Sending params:', params);
      
      const data = await getRecommendations(params);
      setResults(data.recommendations || []);
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  }

  const handleSaveAsTrip = (recommendation: Recommendation) => {
    // TODO: Implement save as trip functionality
    console.log('Save as trip:', recommendation);
    alert(`"${recommendation.city}, ${recommendation.country}" will be saved as a trip!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🌍 Travel Recommender</h1>
          <p className="text-gray-600">Discover your perfect destination with AI-powered recommendations</p>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Basic Preferences */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Preferences</h2>

              {/* Budget selector */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Budget Level</label>
                <select
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Any Budget</option>
                  <option value="Budget">Budget</option>
                  <option value="Mid-range">Mid-range</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              {/* Region input */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Preferred Region</label>
                <input
                  type="text"
                  placeholder="e.g. Europe, Asia, Africa"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>

              {/* Ideal Duration */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Ideal Trip Duration</label>
                <select
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={idealDuration}
                  onChange={(e) => setIdealDuration(e.target.value)}
                >
                  <option value="Weekend">Weekend</option>
                  <option value="One week">One week</option>
                  <option value="Two weeks">Two weeks</option>
                  <option value="One month">One month</option>
                  <option value="More than a month">More than a month</option>
                </select>
              </div>

              {/* Average Temperature */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Preferred Temperature: {avgTemp}°C
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={avgTemp}
                  onChange={(e) => setAvgTemp(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Cold (0°C)</span>
                  <span>Mild (20°C)</span>
                  <span>Hot (40°C)</span>
                </div>
              </div>
            </div>

            {/* Right Column - Interest Preferences */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interest Levels (0-5)</h2>

              {[
                { key: 'culture', value: culture, setter: setCulture, label: 'Culture', icon: '🏛️' },
                { key: 'adventure', value: adventure, setter: setAdventure, label: 'Adventure', icon: '⛰️' },
                { key: 'nature', value: nature, setter: setNature, label: 'Nature', icon: '🌿' },
                { key: 'beaches', value: beaches, setter: setBeaches, label: 'Beaches', icon: '🏖️' },
                { key: 'nightlife', value: nightlife, setter: setNightlife, label: 'Nightlife', icon: '🌃' },
                { key: 'cuisine', value: cuisine, setter: setCuisine, label: 'Cuisine', icon: '🍽️' },
                { key: 'wellness', value: wellness, setter: setWellness, label: 'Wellness', icon: '🧘' },
                { key: 'urban', value: urban, setter: setUrban, label: 'Urban', icon: '🏙️' },
                { key: 'seclusion', value: seclusion, setter: setSeclusion, label: 'Seclusion', icon: '🏝️' },
              ].map(({ key, value, setter, label, icon }) => (
                <div key={key}>
                  <label className="block mb-2 text-gray-700">
                    {icon} {label}: <span className="font-medium">{value}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={value}
                    onChange={(e) => setter(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleGetRecommendations}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Finding Perfect Destinations...
                </span>
              ) : (
                "🔍 Get Travel Recommendations"
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div>
          {results.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                🎯 Your Perfect Destinations
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((recommendation, i) => (
                  <RecommendationCard
                    key={i}
                    recommendation={recommendation}
                    onSaveAsTrip={handleSaveAsTrip}
                  />
                ))}
              </div>
            </div>
          ) : (
            !loading && !error && (
              <div className="text-center py-16 bg-white rounded-lg shadow-lg">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Ready to Discover Amazing Places?
                </h3>
                <p className="text-gray-600 text-lg">
                  Customize your preferences above and let AI find your perfect destination
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}