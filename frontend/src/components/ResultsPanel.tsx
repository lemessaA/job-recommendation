"use client";

import type { RecommendationResult } from "@/lib/types";

interface ResultsPanelProps {
  result: RecommendationResult | null;
}

function formatSalary(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  if (!result) {
    return (
      <div className="card empty-state">
        <p>Enter your profile and click &quot;Get Recommendations&quot; to see job matches, career paths, skill gaps, salary estimates, and courses.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="insight-box">
        <p><strong>AI Insights:</strong> {result.ai_insights}</p>
        <p className="meta" style={{ marginTop: "0.5rem" }}>{result.profile_summary}</p>
      </div>

      <div className="card section">
        <h2>Job Matches</h2>
        <ul className="match-list">
          {result.job_matches.map((job) => (
            <li key={job.title} className="match-item">
              <div className="match-header">
                <h3>{job.title}</h3>
                <span className="badge badge-score">{Math.round(job.match_score * 100)}% match</span>
              </div>
              <p className="meta">{job.company_type} — {job.description}</p>
              <div className="tags">
                {job.matched_skills.map((s) => (
                  <span key={s} className="tag">✓ {s}</span>
                ))}
                {job.missing_skills.map((s) => (
                  <span key={s} className="tag" style={{ opacity: 0.7 }}>○ {s}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card section">
        <h2>Career Path</h2>
        <ul className="path-list">
          {result.career_paths.map((path) => (
            <li key={path.title} className="path-item">
              <div className="match-header">
                <h3>{path.title}</h3>
                <span className="badge badge-score">{path.level}</span>
              </div>
              <p className="meta">Timeline: {path.timeline_years} years</p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.35rem" }}>{path.rationale}</p>
              <div className="tags">
                {path.required_skills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card section">
        <h2>Skill Gap Analysis</h2>
        {result.skill_gaps.length === 0 ? (
          <p className="meta">No significant gaps for your top match.</p>
        ) : (
          <ul className="gap-list">
            {result.skill_gaps.map((gap) => (
              <li key={gap.skill} className="gap-item">
                <div className="match-header">
                  <h3>{gap.skill}</h3>
                  <span className={`badge badge-${gap.priority}`}>{gap.priority}</span>
                </div>
                <p className="meta">{gap.current_level} → {gap.target_level}</p>
                <ul className="bullets">
                  {gap.learning_resources.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {result.resume_feedback && (
        <div className="card section">
          <h2>Resume Analysis</h2>
          <div className="resume-header">
            <span className="score-ring">{result.resume_feedback.overall_score}</span>
            <div>
              <p style={{ fontWeight: 600 }}>Overall score</p>
              <p className="meta">Out of 100</p>
            </div>
          </div>
          <p style={{ fontWeight: 600, marginBottom: "0.35rem" }}>Strengths</p>
          <ul className="bullets">
            {result.resume_feedback.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p style={{ fontWeight: 600, margin: "0.75rem 0 0.35rem" }}>Improvements</p>
          <ul className="bullets">
            {result.resume_feedback.improvements.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {result.resume_feedback.keywords_to_add.length > 0 && (
            <>
              <p style={{ fontWeight: 600, margin: "0.75rem 0 0.35rem" }}>Keywords to add</p>
              <div className="tags">
                {result.resume_feedback.keywords_to_add.map((k) => (
                  <span key={k} className="tag">{k}</span>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="card section">
        <h2>Salary Estimates</h2>
        <div className="salary-grid">
          {result.salary_estimates.map((s) => (
            <div key={s.role} className="match-item">
              <h3 style={{ fontSize: "0.95rem" }}>{s.role}</h3>
              <p className="meta">{s.location}</p>
              <p style={{ marginTop: "0.35rem", fontWeight: 600 }}>
                {formatSalary(s.min_salary)} – {formatSalary(s.max_salary)}
              </p>
              <span className="badge badge-score" style={{ marginTop: "0.35rem" }}>
                {s.confidence} confidence
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card section">
        <h2>Training & Courses</h2>
        {result.courses.length === 0 ? (
          <p className="meta">No course recommendations — your skills align well.</p>
        ) : (
          <ul className="match-list">
            {result.courses.map((c) => (
              <li key={c.title} className="match-item">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="course-link">
                  <h3>{c.title}</h3>
                  <p className="meta">{c.provider} · {c.duration} · {c.skill}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
