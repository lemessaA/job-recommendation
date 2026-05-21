# Job Recommendation Expert System

**Project description for class presentation**

---

## Overview

The **Job Recommendation Expert System** is a full-stack web application that helps users discover suitable careers based on their personal profile. Users enter skills, education, experience, interests, and optional resume text. The system then returns job matches, career paths, skill gaps, resume feedback, salary estimates, and course recommendations.

> **In one sentence:** An intelligent career coach that turns your profile into a personalized job and learning plan.

---

## The Problem

Many students and job seekers face the same challenges:

- They do not know which jobs fit their current skills
- They lack a clear path from their level to a target role
- They struggle to identify what skills to learn next
- They need help improving resumes and understanding salary expectations

Career counseling is valuable but hard to scale. This project automates that guidance using an expert-system workflow powered by modern AI tools.

---

## Our Solution

We built a web application with two main parts:

| Part | Technology | Purpose |
|------|------------|---------|
| **Frontend** | Next.js 15 | Profile form and interactive results dashboard |
| **Backend** | FastAPI + LangGraph | Analysis pipeline and REST API |

The user fills in a profile, clicks **Get Recommendations**, and receives a full report in seconds.

---

## Features

### 1. User Profile Input

Collects:

- Skills (interactive tags)
- Education
- Years of experience
- Interests
- Preferred locations
- Resume text (optional)

### 2. Job Matching Engine

- Compares user skills against a job catalog
- Calculates a match score for each role
- Shows which skills match and which are missing

### 3. Career Path Recommendations

- Maps a progression path for the top-matched role
- Example: Junior Developer → Software Engineer → Senior Engineer
- Includes timeline and required skills per stage

### 4. Skill Gap Analysis

- Lists skills the user still needs
- Assigns priority (high / medium)
- Suggests learning resources

### 5. Resume Analysis

- Scores the resume (0–100)
- Highlights strengths
- Suggests improvements and keywords to add

### 6. Salary Estimation

- Estimates salary range per matched role
- Adjusts based on years of experience

### 7. Training & Course Recommendations

- Recommends online courses linked to skill gaps
- Includes provider, duration, and links

---

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│  Frontend          Next.js 15 + React                   │
│  Backend API       FastAPI                              │
│  Workflow Engine   LangGraph                            │
│  AI (optional)     LangChain + OpenAI                   │
│  Python Config     pyproject.toml                       │
└─────────────────────────────────────────────────────────┘
```

| Layer | Tool | Why we use it |
|-------|------|---------------|
| UI | Next.js | Modern React framework with fast dev experience |
| API | FastAPI | Fast, typed REST API with auto-generated docs |
| Orchestration | LangGraph | Runs multi-step expert pipeline in order |
| Insights | LangChain | Optional natural-language career summary |
| Packaging | pyproject.toml | Standard Python dependency management |

---

## How It Works

### System flow

```
User  →  Web UI  →  FastAPI  →  LangGraph Pipeline  →  Results  →  User
```

### LangGraph pipeline (8 steps)

Each step runs in sequence. Output from one step feeds the next.

```
1. Profile analysis
        ↓
2. Job matching
        ↓
3. Career path recommendations
        ↓
4. Skill gap analysis
        ↓
5. Resume analysis
        ↓
6. Salary estimation
        ↓
7. Course recommendations
        ↓
8. AI insights
```

### Project structure

```
job-recommendation/
├── backend/
│   ├── pyproject.toml
│   ├── main.py                 ← FastAPI entry (fastapi dev)
│   └── src/app/
│       ├── main.py             ← API routes
│       ├── graph/career_agent.py   ← LangGraph workflow
│       ├── services/matching.py     ← Matching & analysis logic
│       └── data/jobs.py             ← Jobs, paths, courses
│
└── frontend/
    └── src/
        ├── app/                  ← Pages & API proxy
        └── components/           ← Form, results, tabs
```

---

## Live Demo Script

Use this order during your presentation:

| Step | Action | What to say |
|------|--------|-------------|
| 1 | Open `http://localhost:3000` | "This is our career guidance dashboard." |
| 2 | Click **Load demo** | "We pre-filled a sample profile for a quick demo." |
| 3 | Show skill chips | "Users can add or remove skills interactively." |
| 4 | Click **Get Recommendations** | "The backend runs our 8-step LangGraph pipeline." |
| 5 | **Jobs** tab | "Here are the top matching roles with scores." |
| 6 | Click a job card | "Expanding shows matched and missing skills." |
| 7 | **Career** tab | "This is the suggested career progression." |
| 8 | **Gaps** tab | "These are skills to learn, with priority." |
| 9 | **Resume** tab | "Resume gets a score and improvement tips." |
| 10 | **Salary** tab | "Estimated ranges based on experience." |
| 11 | **Courses** tab | "Recommended training for skill gaps." |

**Before the demo, start both servers:**

```bash
# Terminal 1 — Backend
cd backend
fastapi dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

---

## Why This Project Matters

- **Real-world problem** — Career guidance affects many people
- **Expert systems** — Uses rules, scoring, and a knowledge base (jobs, paths, courses)
- **Modern AI** — LangGraph orchestrates steps; optional LLM adds narrative insights
- **Full-stack skills** — UI, API, workflow engine, and data layer work together
- **Modular design** — Each pipeline step can be improved independently

---

## Limitations

| Limitation | Explanation |
|------------|-------------|
| Sample job data | Jobs and salaries come from a built-in catalog, not live job boards |
| Rule-based matching | Uses skill overlap scoring, not machine-learning embeddings |
| Optional AI | LLM insights need an OpenAI API key; otherwise rule-based text is used |

---

## Future Improvements

- Connect to real job APIs (LinkedIn, Indeed, etc.)
- User accounts and saved profiles
- PDF resume upload and parsing
- Chatbot for follow-up career questions
- Support for multiple languages

---

## Presentation Closing (30 seconds)

> Our **Job Recommendation Expert System** helps users answer: *"What can I do with my skills, and how do I get there?"*
>
> It delivers matched jobs, a career roadmap, skill gaps to close, resume feedback, salary expectations, and courses to take—all powered by a **LangGraph workflow** behind a **FastAPI** backend and **Next.js** frontend.
>
> Thank you. Questions?

---

## Quick Reference

| Item | Value |
|------|-------|
| Frontend URL | http://localhost:3000 |
| Backend URL | http://localhost:8000 |
| API docs | http://localhost:8000/docs |
| Main endpoint | `POST /api/recommend` |

---

*Job Recommendation Expert System — Class Presentation*
