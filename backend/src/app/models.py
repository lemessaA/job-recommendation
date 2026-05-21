from pydantic import BaseModel, Field


class UserProfile(BaseModel):
    name: str = ""
    skills: list[str] = Field(default_factory=list)
    education: str = ""
    experience_years: float = 0
    interests: list[str] = Field(default_factory=list)
    preferred_locations: list[str] = Field(default_factory=list)
    resume_text: str = ""


class JobMatch(BaseModel):
    title: str
    company_type: str
    match_score: float
    matched_skills: list[str]
    missing_skills: list[str]
    description: str


class CareerPath(BaseModel):
    title: str
    level: str
    timeline_years: str
    required_skills: list[str]
    rationale: str


class SkillGap(BaseModel):
    skill: str
    priority: str
    current_level: str
    target_level: str
    learning_resources: list[str]


class ResumeFeedback(BaseModel):
    strengths: list[str]
    improvements: list[str]
    keywords_to_add: list[str]
    overall_score: float


class SalaryEstimate(BaseModel):
    role: str
    location: str
    min_salary: int
    max_salary: int
    currency: str = "USD"
    confidence: str


class CourseRecommendation(BaseModel):
    title: str
    provider: str
    skill: str
    url: str
    duration: str


class RecommendationResult(BaseModel):
    profile_summary: str
    job_matches: list[JobMatch]
    career_paths: list[CareerPath]
    skill_gaps: list[SkillGap]
    resume_feedback: ResumeFeedback | None
    salary_estimates: list[SalaryEstimate]
    courses: list[CourseRecommendation]
    ai_insights: str = ""
