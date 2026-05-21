"""LangGraph workflow orchestrating the job recommendation expert system."""

from typing import TypedDict

from langgraph.graph import END, StateGraph

from app.config import settings
from app.models import RecommendationResult, UserProfile
from app.services.matching import (
    analyze_resume,
    analyze_skill_gaps,
    estimate_salaries,
    match_jobs,
    recommend_career_paths,
    recommend_courses,
)


class AgentState(TypedDict):
    profile: dict
    profile_summary: str
    job_matches: list
    career_paths: list
    skill_gaps: list
    resume_feedback: dict | None
    salary_estimates: list
    courses: list
    ai_insights: str


def _build_profile_summary(profile: UserProfile) -> str:
    skills = ", ".join(profile.skills[:10]) or "none listed"
    interests = ", ".join(profile.interests[:5]) or "none listed"
    return (
        f"Candidate with {profile.experience_years:.0f} years experience, "
        f"education: {profile.education or 'not specified'}. "
        f"Skills: {skills}. Interests: {interests}."
    )


def node_profile_analysis(state: AgentState) -> AgentState:
    profile = UserProfile(**state["profile"])
    return {**state, "profile_summary": _build_profile_summary(profile)}


def node_job_matching(state: AgentState) -> AgentState:
    profile = UserProfile(**state["profile"])
    matches = match_jobs(profile)
    return {**state, "job_matches": [m.model_dump() for m in matches]}


def node_career_paths(state: AgentState) -> AgentState:
    profile = UserProfile(**state["profile"])
    from app.models import JobMatch

    matches = [JobMatch(**m) for m in state["job_matches"]]
    top_title = matches[0].title if matches else "Software Engineer"
    paths = recommend_career_paths(top_title, profile)
    return {**state, "career_paths": [p.model_dump() for p in paths]}


def node_skill_gaps(state: AgentState) -> AgentState:
    profile = UserProfile(**state["profile"])
    from app.models import JobMatch

    matches = [JobMatch(**m) for m in state["job_matches"]]
    gaps = analyze_skill_gaps(profile, matches)
    return {**state, "skill_gaps": [g.model_dump() for g in gaps]}


def node_resume_analysis(state: AgentState) -> AgentState:
    profile = UserProfile(**state["profile"])
    feedback = analyze_resume(profile)
    return {
        **state,
        "resume_feedback": feedback.model_dump() if feedback else None,
    }


def node_salary_estimation(state: AgentState) -> AgentState:
    profile = UserProfile(**state["profile"])
    from app.models import JobMatch

    matches = [JobMatch(**m) for m in state["job_matches"]]
    salaries = estimate_salaries(profile, matches)
    return {**state, "salary_estimates": [s.model_dump() for s in salaries]}


def node_course_recommendations(state: AgentState) -> AgentState:
    from app.models import SkillGap

    gaps = [SkillGap(**g) for g in state["skill_gaps"]]
    courses = recommend_courses(gaps)
    return {**state, "courses": [c.model_dump() for c in courses]}


def node_ai_insights(state: AgentState) -> AgentState:
    """Optional LLM synthesis when OPENAI_API_KEY is configured."""
    if not settings.openai_api_key:
        top = state["job_matches"][0]["title"] if state["job_matches"] else "tech roles"
        insights = (
            f"Based on your profile, {top} is your strongest match. "
            "Focus on closing high-priority skill gaps and tailoring your resume "
            "with role-specific keywords for better outcomes."
        )
        return {**state, "ai_insights": insights}

    try:
        from langchain_openai import ChatOpenAI
        from langchain_core.messages import HumanMessage, SystemMessage

        llm = ChatOpenAI(model=settings.openai_model, api_key=settings.openai_api_key, temperature=0.3)
        prompt = f"""You are a career advisor. Summarize these recommendations in 3-4 sentences:
Profile: {state['profile_summary']}
Top jobs: {[m['title'] for m in state['job_matches'][:3]]}
Skill gaps: {[g['skill'] for g in state['skill_gaps'][:5]]}
"""
        response = llm.invoke(
            [
                SystemMessage(content="Be concise, actionable, and encouraging."),
                HumanMessage(content=prompt),
            ]
        )
        return {**state, "ai_insights": response.content}
    except Exception:
        return {
            **state,
            "ai_insights": "Recommendations generated. Configure OPENAI_API_KEY for AI-powered narrative insights.",
        }


def build_career_graph():
    graph = StateGraph(AgentState)

    graph.add_node("profile_analysis", node_profile_analysis)
    graph.add_node("job_matching", node_job_matching)
    graph.add_node("career_paths", node_career_paths)
    graph.add_node("skill_gaps", node_skill_gaps)
    graph.add_node("resume_analysis", node_resume_analysis)
    graph.add_node("salary_estimation", node_salary_estimation)
    graph.add_node("course_recommendations", node_course_recommendations)
    graph.add_node("ai_insights", node_ai_insights)

    graph.set_entry_point("profile_analysis")
    graph.add_edge("profile_analysis", "job_matching")
    graph.add_edge("job_matching", "career_paths")
    graph.add_edge("career_paths", "skill_gaps")
    graph.add_edge("skill_gaps", "resume_analysis")
    graph.add_edge("resume_analysis", "salary_estimation")
    graph.add_edge("salary_estimation", "course_recommendations")
    graph.add_edge("course_recommendations", "ai_insights")
    graph.add_edge("ai_insights", END)

    return graph.compile()


_career_graph = None


def get_career_graph():
    global _career_graph
    if _career_graph is None:
        _career_graph = build_career_graph()
    return _career_graph


def run_recommendation(profile: UserProfile) -> RecommendationResult:
    graph = get_career_graph()
    initial: AgentState = {
        "profile": profile.model_dump(),
        "profile_summary": "",
        "job_matches": [],
        "career_paths": [],
        "skill_gaps": [],
        "resume_feedback": None,
        "salary_estimates": [],
        "courses": [],
        "ai_insights": "",
    }
    result = graph.invoke(initial)
    return RecommendationResult(
        profile_summary=result["profile_summary"],
        job_matches=result["job_matches"],
        career_paths=result["career_paths"],
        skill_gaps=result["skill_gaps"],
        resume_feedback=result["resume_feedback"],
        salary_estimates=result["salary_estimates"],
        courses=result["courses"],
        ai_insights=result["ai_insights"],
    )
