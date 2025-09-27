import type { Recommendation } from '@/types/trip';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSaveAsTrip?: (recommendation: Recommendation) => void;
}

export default function RecommendationCard({ 
  recommendation, 
  onSaveAsTrip 
}: RecommendationCardProps) {
  const matchPercentage = (recommendation.score * 100).toFixed(1);

  return (
    <div className="result-card">
      {/* Header with City Name */}
      <div className="result-header">
        <div className="result-badge">
          <span>⭐</span>
          <span>{matchPercentage}%</span>
        </div>
        <h3 className="result-title">{recommendation.city}</h3>
      </div>

      {/* Content */}
      <div className="result-content">
        {/* Location Info */}
        <div className="result-location">
          <span style={{ fontSize: '1.25rem' }}>📍</span>
          <span className="result-country">{recommendation.country}</span>
          <span className="result-region">{recommendation.region}</span>
        </div>

        {/* Description */}
        {recommendation.short_description && (
          <div className="result-description">
            "{recommendation.short_description}"
          </div>
        )}

        {/* Single Centered Match Score */}
        <div className="result-stats">
          <div className="stat-item-full">
            <div className="stat-label-large">
              <span>🎯</span>
              Match Score
            </div>
            <div className="stat-value-large">{matchPercentage}%</div>
          </div>
        </div>

        {/* Save Button */}
        {onSaveAsTrip && (
          <button
            onClick={() => onSaveAsTrip(recommendation)}
            className="btn"
            style={{ width: '100%' }}
          >
            <span>✈️</span>
            Save as Trip
          </button>
        )}
      </div>
    </div>
  );
}