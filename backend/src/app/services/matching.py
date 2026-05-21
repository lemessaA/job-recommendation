from app.data.jobs import CAREER_PATHS, COURSES, JOBS
from app.models import (
    CareerPath,
    CourseRecommendation,
    JobMatch,
    ResumeFeedback,
    SalaryEstimate,
    SkillGap,
    UserProfile,
)


def _normalize(skills: list[str]) -> set[str]:
    return {s.strip().lower() for s in skills if s.strip()}


def match_jobs(profile: UserProfile, top_n: int = 5) -> list[JobMatch]:
    user_skills = _normalize(profile.skills)
    matches: list[JobMatch] = []

    for job in JOBS:
        required = _normalize(job["required_skills"])
        matched = user_skills & required
        missing = required - user_skills
        score = len(matched) / max(len(required), 1)
        interest_boost = 0.0
        for interest in profile.interests:
            if interest.lower() in job["title"].lower() or interest.lower() in job["description"].lower():
                interest_boost = 0.1
        score = min(1.0, score + interest_boost)

        matches.append(
            JobMatch(
                title=job["title"],
                company_type=job["company_type"],
                match_score=round(score, 2),
                matched_skills=sorted(matched),
                missing_skills=sorted(missing),
                description=job["description"],
            )
        )

    matches.sort(key=lambda m: m.match_score, reverse=True)
    return matches[:top_n]


def recommend_career_paths(top_job_title: str, profile: UserProfile) -> list[CareerPath]:
    key = top_job_title.lower()
    paths_data = None
    for career_key, paths in CAREER_PATHS.items():
        if career_key in key or key in career_key:
            paths_data = paths
            break

    if not paths_data:
        paths_data = CAREER_PATHS.get("software engineer", [])

    user_skills = _normalize(profile.skills)
    results: list[CareerPath] = []
    for step in paths_data:
        required = _normalize(step["required_skills"])
        gap_count = len(required - user_skills)
        rationale = (
            f"Aligns with your {profile.experience_years:.0f} years of experience. "
            f"You cover {len(required & user_skills)}/{len(required)} core skills."
            if gap_count == 0
            else f"Develop {gap_count} more skills to reach this stage."
        )
        results.append(
            CareerPath(
                title=step["title"],
                level=step["level"],
                timeline_years=step["timeline_years"],
                required_skills=step["required_skills"],
                rationale=rationale,
            )
        )
    return results


def analyze_skill_gaps(profile: UserProfile, job_matches: list[JobMatch]) -> list[SkillGap]:
    if not job_matches:
        return []

    top = job_matches[0]
    gaps: list[SkillGap] = []
    user_skills = _normalize(profile.skills)

    for skill in top.missing_skills[:8]:
        priority = "high" if skill in top.missing_skills[:3] else "medium"
        current = "none" if skill not in user_skills else "intermediate"
        gaps.append(
            SkillGap(
                skill=skill,
                priority=priority,
                current_level=current,
                target_level="proficient",
                learning_resources=[f"Practice projects involving {skill}", f"Online course for {skill}"],
            )
        )
    return gaps


def analyze_resume(profile: UserProfile) -> ResumeFeedback | None:
    text = profile.resume_text.strip()
    if not text:
        return None

    words = text.split()
    word_count = len(words)
    has_metrics = any(c.isdigit() for c in text)
    has_action_verbs = any(
        v in text.lower()
        for v in ["built", "led", "designed", "implemented", "improved", "managed", "developed"]
    )

    strengths: list[str] = []
    improvements: list[str] = []
    keywords: list[str] = []

    if word_count >= 150:
        strengths.append("Resume has sufficient detail for screening.")
    else:
        improvements.append("Expand resume to at least 150 words with quantified achievements.")

    if has_metrics:
        strengths.append("Includes measurable outcomes (numbers/metrics).")
    else:
        improvements.append("Add metrics (%, $, time saved) to demonstrate impact.")

    if has_action_verbs:
        strengths.append("Uses strong action verbs.")
    else:
        improvements.append("Start bullet points with action verbs (Built, Led, Designed).")

    for skill in profile.skills[:5]:
        if skill.lower() not in text.lower():
            keywords.append(skill)

    if keywords:
        improvements.append(f"Highlight these skills explicitly: {', '.join(keywords[:5])}")

    score = 50.0
    if word_count >= 150:
        score += 15
    if has_metrics:
        score += 20
    if has_action_verbs:
        score += 15
    score = min(100.0, score)

    return ResumeFeedback(
        strengths=strengths or ["Resume submitted for review."],
        improvements=improvements or ["No major issues detected."],
        keywords_to_add=keywords[:8],
        overall_score=round(score, 1),
    )


def estimate_salaries(profile: UserProfile, job_matches: list[JobMatch]) -> list[SalaryEstimate]:
    estimates: list[SalaryEstimate] = []
    exp_multiplier = 1.0 + min(profile.experience_years * 0.05, 0.4)
    location = profile.preferred_locations[0] if profile.preferred_locations else "United States"

    for match in job_matches[:3]:
        job = next((j for j in JOBS if j["title"] == match.title), None)
        if not job:
            continue
        low, high = job["salary_range"]
        estimates.append(
            SalaryEstimate(
                role=match.title,
                location=location,
                min_salary=int(low * exp_multiplier),
                max_salary=int(high * exp_multiplier),
                confidence="medium" if profile.experience_years >= 2 else "low",
            )
        )
    return estimates


def recommend_courses(skill_gaps: list[SkillGap]) -> list[CourseRecommendation]:
    gap_skills = {g.skill.lower() for g in skill_gaps}
    courses: list[CourseRecommendation] = []

    for course in COURSES:
        if course["skill"] in gap_skills:
            courses.append(CourseRecommendation(**course))

    seen: set[str] = set()
    unique: list[CourseRecommendation] = []
    for c in courses:
        if c.skill not in seen:
            seen.add(c.skill)
            unique.append(c)
    return unique[:6]
