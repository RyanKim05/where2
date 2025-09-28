"use client";

import { useState } from "react";
import { getRecommendations } from "@/lib/api";
import RecommendationCard from "@/components/RecommendationCard";
import type { Recommendation } from "@/types/trip";

interface InterestState {
  enabled: boolean;
  value: number;
}

export default function Page() {
  const [budget, setBudget] = useState("");
  const [region, setRegion] = useState("any");
  const [avgTemp, setAvgTemp] = useState(20);
  const [idealDuration, setIdealDuration] = useState("One week");

  const [interests, setInterests] = useState<Record<string, InterestState>>({
    culture: { enabled: false, value: 3 },
    adventure: { enabled: false, value: 3 },
    nature: { enabled: false, value: 3 },
    beaches: { enabled: false, value: 3 },
    nightlife: { enabled: false, value: 3 },
    cuisine: { enabled: false, value: 3 },
    wellness: { enabled: false, value: 3 },
    urban: { enabled: false, value: 3 },
    seclusion: { enabled: false, value: 3 },
  });

  const [results, setResults] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (key: keyof typeof interests) => {
    setInterests((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  const updateInterestValue = (key: keyof typeof interests, value: number) => {
    setInterests((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: value,
      },
    }));
  };

  async function handleGetRecommendations() {
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const params: any = {
        avg_temp: avgTemp,
        ideal_durations: [idealDuration],
        top_n: 6,
      };

      if (budget && budget !== "") {
        params.budget_level = budget;
      }

      if (region && region !== "any") {
        params.region = region;
      } else {
        params.region = null;
      }

      Object.entries(interests).forEach(([key, interest]) => {
        if (interest.enabled) {
          params[key] = interest.value;
        }
      });

      console.log("Sending params:", params);

      const data = await getRecommendations(params);
      setResults(data.recommendations || []);
    } catch (err) {
      console.error("Error getting recommendations:", err);
      setError(
        err instanceof Error ? err.message : "Failed to get recommendations"
      );
    } finally {
      setLoading(false);
    }
  }

  const handleSaveAsTrip = (recommendation: Recommendation) => {
    alert(
      `🎉 "${recommendation.city}, ${recommendation.country}" saved to your trips!`
    );
  };

  const interestOptions = [
    {
      key: "culture" as keyof typeof interests,
      label: "Culture & History",
      icon: "🏛️",
      description: "Museums, historical sites, art galleries",
    },
    {
      key: "adventure" as keyof typeof interests,
      label: "Adventure & Sports",
      icon: "⛰️",
      description: "Hiking, climbing, extreme sports",
    },
    {
      key: "nature" as keyof typeof interests,
      label: "Nature & Wildlife",
      icon: "🌿",
      description: "National parks, wildlife, landscapes",
    },
    {
      key: "beaches" as keyof typeof interests,
      label: "Beaches & Coast",
      icon: "🏖️",
      description: "Sandy beaches, coastal activities",
    },
    {
      key: "nightlife" as keyof typeof interests,
      label: "Nightlife & Entertainment",
      icon: "🌃",
      description: "Bars, clubs, entertainment venues",
    },
    {
      key: "cuisine" as keyof typeof interests,
      label: "Food & Cuisine",
      icon: "🍽️",
      description: "Local food, restaurants, culinary experiences",
    },
    {
      key: "wellness" as keyof typeof interests,
      label: "Wellness & Relaxation",
      icon: "🧘",
      description: "Spas, yoga retreats, peaceful environments",
    },
    {
      key: "urban" as keyof typeof interests,
      label: "City Life & Shopping",
      icon: "🏙️",
      description: "City attractions, shopping, urban culture",
    },
    {
      key: "seclusion" as keyof typeof interests,
      label: "Peace & Seclusion",
      icon: "🏝️",
      description: "Remote locations, tranquil environments",
    },
  ];

  const regionOptions = [
    { value: "any", label: "Any Region" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
    { value: "north_america", label: "North America" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "middle_east", label: "Middle East" },
    { value: "south_america", label: "South America" },
  ];

  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="brand-logo">🌍</div>
          <h1>Where2</h1>
          <p className="subtitle">
            Where2 was built with diversity and inclusion in mind, by promoting
            culture and travel destinations by user preference rather than
            standard marketing tactics. Choose what matters to you, and let our
            model find a match for your perfect travel destination!
          </p>
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="error-message">
            <span style={{ fontSize: "1.25rem" }}>⚠️</span>
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Basic Preferences
          </h2>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">💰 Budget</label>
              <select
                className="form-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Any Budget</option>
                <option value="Budget">Budget Friendly</option>
                <option value="Mid-range">Mid Range</option>
                <option value="Luxury">Luxury Experience</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">🌎 Region</label>
              <select
                className="form-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                {regionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">⏰ Duration</label>
              <select
                className="form-select"
                value={idealDuration}
                onChange={(e) => setIdealDuration(e.target.value)}
              >
                <option value="Weekend">Weekend Getaway</option>
                <option value="One week">One Week</option>
                <option value="Two weeks">Two Weeks</option>
                <option value="One month">One Month</option>
                <option value="More than a month">Extended Stay</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">🌡️ Temperature: {avgTemp}°C</label>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={avgTemp}
                onChange={(e) => setAvgTemp(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-info">
                <span>❄️ Cold</span>
                <span>🔥 Hot</span>
              </div>
            </div>
          </div>

          {/* Interest Preferences */}
          <div style={{ marginTop: "3rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              What Interests You?
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "#6b7280",
                marginBottom: "2rem",
                fontSize: "1rem",
              }}
            >
              Select the activities and experiences that matter to you, then
              adjust how important they are
            </p>

            <div className="interests-grid">
              {interestOptions.map(({ key, label, icon, description }) => {
                const interest = interests[key];
                return (
                  <div
                    key={key}
                    className={`interest-toggle ${
                      interest.enabled ? "active" : ""
                    }`}
                  >
                    <div
                      className="interest-item"
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: 0,
                      }}
                    >
                      <div
                        onClick={() => toggleInterest(key)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        <div
                          className={`toggle-checkbox ${
                            interest.enabled ? "checked" : ""
                          }`}
                        >
                          {interest.enabled && (
                            <span style={{ fontSize: "0.75rem" }}>✓</span>
                          )}
                        </div>

                        <span style={{ fontSize: "1.5rem" }}>{icon}</span>

                        <div style={{ flex: 1 }}>
                          <div className="interest-label-text">{label}</div>
                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: "#6b7280",
                              marginTop: "0.25rem",
                            }}
                          >
                            {description}
                          </div>
                        </div>
                      </div>

                      {interest.enabled && (
                        <div className="slider-container">
                          <div className="slider-controls">
                            <div className="slider-label">How important?</div>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              step="1"
                              value={interest.value}
                              onChange={(e) =>
                                updateInterestValue(
                                  key,
                                  parseInt(e.target.value)
                                )
                              }
                              className="slider"
                              style={{ flex: 1 }}
                            />
                            <div className="slider-value-display">
                              {interest.value}/5
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "#6b7280",
                              marginTop: "0.5rem",
                              textAlign: "center",
                            }}
                          >
                            1 = Slightly interested • 3 = Moderately interested
                            • 5 = Very interested
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <div style={{ marginBottom: "1rem", color: "#6b7280" }}>
              {
                Object.values(interests).filter((i) => i.enabled)
                  .length
              }{" "}
              interests selected
            </div>
            <button
              onClick={handleGetRecommendations}
              disabled={loading}
              className="btn btn-large"
            >
              {loading ? (
                <>
                  <span className="loading-spinner">🌍</span>
                  Finding Your Perfect Destinations...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Discover Amazing Places
                </>
              )}
            </button>
          </div>
        </div>

        {results.length > 0 ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                🎯 Your Perfect Travel Matches
              </h2>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                Based on your{" "}
                {
                  Object.values(interests).filter((i) => i.enabled)
                    .length
                }{" "}
                selected interests
              </p>
            </div>

            <div className="results-grid">
              {results.map((recommendation, i) => (
                <RecommendationCard
                  key={`${recommendation.city}-${recommendation.country}-${i}`}
                  recommendation={recommendation}
                  onSaveAsTrip={handleSaveAsTrip}
                />
              ))}
            </div>
          </div>
        ) : (
          !loading &&
          !error && (
            <div className="empty-state">
              <div className="empty-state-icon">🗺️</div>
              <h3>Ready to Find Your Perfect Destination?</h3>
              <p>
                Select the activities and experiences that interest you above,
                then let our machine learning model recommend destinations that
                match your preferences perfectly.
              </p>
              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <div className="feature-label">Choose What Matters</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <div className="feature-label">Set Priorities</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🤖</div>
                  <div className="feature-label">ML Recommendations</div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}