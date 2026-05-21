# Job Recommendation Expert System

A full-stack career guidance system that matches users to jobs, maps career paths, analyzes skill gaps, reviews resumes, estimates salaries, and recommends training courses.

## Stack

| Layer | Technology |
|-------|------------|
| API | FastAPI |
| Expert workflow | LangGraph + LangChain (optional OpenAI for narrative insights) |
| Frontend | Next.js 15 (App Router) |
| Python deps | `pyproject.toml` (Hatchling) |

## Features

- **User profile input** — skills, education, experience, interests, locations, resume text
- **Job matching engine** — skill-overlap scoring against a job catalog
- **Career path recommendations** — staged progression for matched roles
- **Skill gap analysis** — prioritized gaps with learning resources
- **Resume analysis** — strengths, improvements, keyword suggestions, score
- **Salary estimation** — ranges adjusted by experience
- **Training/course recommendations** — mapped to skill gaps

## Project structure

```
job-recommendation/
├── backend/
│   ├── pyproject.toml
│   └── src/app/
│       ├── main.py              # FastAPI app
│       ├── graph/career_agent.py # LangGraph pipeline
│       ├── services/matching.py  # Rule-based expert logic
│       └── data/jobs.py          # Jobs, paths, courses
└── frontend/
    └── src/                     # Next.js UI
```

## LangGraph pipeline

```
profile_analysis → job_matching → career_paths → skill_gaps
  → resume_analysis → salary_estimation → course_recommendations → ai_insights
```

## Quick start

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e .
cp .env.example .env        # optional: set OPENAI_API_KEY for AI insights
fastapi dev
```

Or with uvicorn directly:

```bash
uvicorn app.main:app --reload --app-dir src --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The UI calls the API at `http://localhost:8000` by default.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/recommend` | Full recommendation pipeline |
| POST | `/api/profile/validate` | Validate profile payload |

### Example request

```bash
curl -X POST http://localhost:8000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex",
    "skills": ["python", "sql", "machine learning"],
    "education": "B.S. Computer Science",
    "experience_years": 3,
    "interests": ["AI", "data science"],
    "preferred_locations": ["United States"],
    "resume_text": "Built ML pipelines that improved accuracy by 15%."
  }'
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | — | Enables LLM-generated career insights |
| `OPENAI_MODEL` | `gpt-4o-mini` | Model for insights node |
| `CORS_ORIGINS` | `http://localhost:3000` | Allowed frontend origins |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Frontend API base URL |

Without `OPENAI_API_KEY`, the system runs fully on rule-based expert logic with a static insights summary.
