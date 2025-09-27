import type { Recommendation } from '@/types/trip';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSaveAsTrip?: (recommendation: Recommendation) => void;
}

export default function RecommendationCard({ 
  recommendation, 
  onSaveAsTrip 
}: RecommendationCardProps) {
  return (
    <div className="p-6 border rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900">
          {recommendation.city}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {(recommendation.score * 100).toFixed(1)}%
        </span>
      </div>
      
      <p className="text-gray-600 font-medium mb-2">{recommendation.country}</p>
      <p className="text-sm text-gray-500 mb-3 capitalize">{recommendation.region}</p>
      
      {recommendation.short_description && (
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {recommendation.short_description}
        </p>
      )}

      {onSaveAsTrip && (
        <button
          onClick={() => onSaveAsTrip(recommendation)}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Save as Trip
        </button>
      )}
    </div>
  );
}