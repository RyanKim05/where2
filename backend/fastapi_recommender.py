from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

with open("travel_recommender.pkl", "rb") as f:
    artifacts = pickle.load(f)

X = artifacts["X"]
scaler = artifacts["scaler"]
cities = artifacts["cities"]
features = artifacts["features"]
budget_encoder = artifacts.get("budget_encoder", None)
duration_encoder = artifacts.get("duration_encoder", None)

class Preferences(BaseModel):
    budget_level: Optional[str] = None
    culture: Optional[float] = None
    adventure: Optional[float] = None
    nature: Optional[float] = None
    beaches: Optional[float] = None
    nightlife: Optional[float] = None
    cuisine: Optional[float] = None
    wellness: Optional[float] = None
    urban: Optional[float] = None
    seclusion: Optional[float] = None
    avg_temp: Optional[float] = None
    ideal_durations: Optional[List[str]] = None
    region: Optional[str] = None
    top_n: Optional[int] = 5

@app.get("/")
def read_root():
    return {"status": "ok"}

def build_user_vector(prefs: Preferences):
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

@app.post("/recommend")
def recommend(prefs: Preferences):
    user_vec_scaled = build_user_vector(prefs)
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
    return {"recommendations": results}
