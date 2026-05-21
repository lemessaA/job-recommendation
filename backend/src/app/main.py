from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.graph.career_agent import run_recommendation
from app.models import RecommendationResult, UserProfile

app = FastAPI(
    title="Job Recommendation Expert System",
    description="Career guidance API powered by LangGraph",
    version="0.1.0",
)

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "job-recommendation-api"}


@app.post("/api/recommend", response_model=RecommendationResult)
def recommend(profile: UserProfile):
    """Run the full expert-system pipeline for a user profile."""
    return run_recommendation(profile)


@app.post("/api/profile/validate")
def validate_profile(profile: UserProfile):
    """Validate profile input without running the full pipeline."""
    return {
        "valid": True,
        "skill_count": len(profile.skills),
        "has_resume": bool(profile.resume_text.strip()),
    }
