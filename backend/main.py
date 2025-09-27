from fastapi import FastAPI, HTTPException
from backend.models import Preferences
from backend.recommender import load_artifacts, build_user_vector, recommend_cities
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for stricter
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load pickle + encoders once at startup
artifacts = load_artifacts()

@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/recommend")
def recommend(prefs: Preferences):
    try:
        user_vec_scaled = build_user_vector(prefs, artifacts)
        results = recommend_cities(prefs, artifacts, user_vec_scaled)
        return {"recommendations": results}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))