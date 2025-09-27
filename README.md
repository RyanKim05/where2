# Where2: Travel Recommender

A personalized travel recommendation web application that helps users discover cities based on their preferences. Users can select their budget, interests, and region, and the system will suggest the best cities for them using a machine learning model.

---

## Features

- **User Preferences:** Users can set their travel interests such as culture, adventure, nature, and budget level.  
- **Machine Learning Backend:** FastAPI backend uses a pickled ML model to compute similarity scores and recommend top cities.  
- **Dynamic Recommendations:** Returns detailed information for recommended cities including region, short description, and recommendation score.  
- **Next.js Frontend:** Interactive sliders and dropdowns for preference selection with responsive design.  
- **Dockerized Backend:** Easily deployable backend container with all dependencies included.  

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Backend:** FastAPI, Python 3.12, scikit-learn, pickle  
- **Deployment:** Docker, AWS ECS/Fargate  
- **Other:** CORS middleware for frontend-backend communication  

---

## Project Structure

/backend
├─ main.py # FastAPI entrypoint
├─ models.py # Pydantic models for user preferences
├─ recommender.py # ML model loader and recommendation logic
├─ artifacts/ # Pickled model and encoders
└─ Dockerfile

/frontend
├─ app/page.tsx # Next.js frontend page
├─ components/ # React components
└─ lib/ # API helpers

/infra
├─ main.tf # Terraform configuration
├─ outputs.tf
└─ variables.tf

.env.local # Local environment variables
.gitignore

yaml
Copy code

---

## How It Works

1. User adjusts preferences (sliders/dropdowns) in the frontend.  
2. Frontend sends a `POST` request to `/recommend` with JSON payload of preferences.  
3. Backend loads the pickled model, encodes preferences, computes similarity scores, and returns the top `n` city recommendations.  
4. Frontend renders the recommendations dynamically.  

---

## Example API Request

```http
POST /recommend
Content-Type: application/json

{
  "budget_level": "medium",
  "culture": 0.8,
  "adventure": 0.5,
  "nature": 0.7,
  "region": "Europe",
  "top_n": 5
}
Response:

json
Copy code
{
  "recommendations": [
    {
      "city": "Pristina",
      "country": "Kosovo",
      "region": "Europe",
      "short_description": "A city where vibrant street life, intriguing history, and the aroma of freshly brewed coffee blend into a unique and welcoming atmosphere.",
      "score": 0.721
    },
    ...
  ]
}
Dataset Reference
This project uses city ratings, climate, and travel data as the source for recommendations. The dataset is available on Kaggle:
[Worldwide Travel Cities Ratings and Climate](https://www.kaggle.com/datasets/furkanima/worldwide-travel-cities-ratings-and-climate
)
