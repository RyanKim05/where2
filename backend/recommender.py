import pickle
import numpy as np
from fastapi import HTTPException
from sklearn.metrics.pairwise import cosine_similarity
from backend.models import Preferences

def load_artifacts():
    with open("backend/artifacts/travel_recommender.pkl", "rb") as f:
        artifacts = pickle.load(f)
    return artifacts

def build_user_vector(prefs: Preferences, artifacts: dict):
    features = artifacts["features"]
    scaler = artifacts["scaler"]
    budget_encoder = artifacts.get("budget_encoder", None)

    vec = []
    for fname in features:
        if fname.startswith("duration_"):
            label = fname.replace("duration_", "")
            if prefs.ideal_durations and label in prefs.ideal_durations:
                vec.append(1)
            else:
                vec.append(0)
        elif fname == "budget_level_enc":
            if prefs.budget_level:
                if budget_encoder is None:
                    raise HTTPException(status_code=500, detail="budget encoder missing")
                try:
                    val = int(budget_encoder.transform([prefs.budget_level])[0])
                except Exception:
                    raise HTTPException(status_code=400, detail=f"Unknown budget_level: {prefs.budget_level}")
                vec.append(val)
            else:
                vec.append(0)
        elif fname == "avg_temp":
            val = prefs.avg_temp if prefs.avg_temp is not None else 0
            vec.append(val)
        else:
            val = getattr(prefs, fname, None)
            vec.append(val if val is not None else 0)

    user_vec = np.array(vec).reshape(1, -1)
    user_vec_scaled = scaler.transform(user_vec)
    return user_vec_scaled

def recommend_cities(prefs: Preferences, artifacts: dict, user_vec_scaled):
    X = artifacts["X"]
    cities = artifacts["cities"]

    if prefs.region:
        mask = cities["region"].str.lower() == prefs.region.lower()
        if mask.sum() == 0:
            raise HTTPException(status_code=404, detail=f"No cities found in region {prefs.region}")
        X_sub = X[mask.values]
        cities_sub = cities[mask.values].reset_index(drop=True)
    else:
        X_sub = X
        cities_sub = cities.reset_index(drop=True)

    sims = cosine_similarity(user_vec_scaled, X_sub)[0]
    top_n = prefs.top_n if prefs.top_n and prefs.top_n > 0 else 5
    idx = np.argsort(sims)[::-1][:top_n]

    results = []
    for i in idx:
        row = cities_sub.iloc[i].to_dict()
        row["score"] = float(sims[i])
        results.append(row)
    return results