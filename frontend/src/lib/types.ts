export interface UserProfile {
  name: string;
  skills: string[];
  education: string;
  experience_years: number;
  interests: string[];
  preferred_locations: string[];
  resume_text: string;
}

export interface JobMatch {
  title: string;
  company_type: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  description: string;
}

export interface CareerPath {
  title: string;
  level: string;
  timeline_years: string;
  required_skills: string[];
  rationale: string;
}

export interface SkillGap {
  skill: string;
  priority: string;
  current_level: string;
  target_level: string;
  learning_resources: string[];
}

export interface ResumeFeedback {
  strengths: string[];
  improvements: string[];
  keywords_to_add: string[];
  overall_score: number;
}

export interface SalaryEstimate {
  role: string;
  location: string;
  min_salary: number;
  max_salary: number;
  currency: string;
  confidence: string;
}

export interface CourseRecommendation {
  title: string;
  provider: string;
  skill: string;
  url: string;
  duration: string;
}

export interface RecommendationResult {
  profile_summary: string;
  job_matches: JobMatch[];
  career_paths: CareerPath[];
  skill_gaps: SkillGap[];
  resume_feedback: ResumeFeedback | null;
  salary_estimates: SalaryEstimate[];
  courses: CourseRecommendation[];
  ai_insights: string;
}
