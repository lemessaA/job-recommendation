"use client";

import { useState } from "react";
import type { RecommendationResult } from "@/lib/types";

interface ResultsPanelProps {
  result: RecommendationResult | null;
  loading: boolean;
}

type Tab = "jobs" | "career" | "gaps" | "resume" | "salary" | "courses";

const TABS: { id: Tab; label: string }[] = [
  { id: "jobs", label: "Jobs" },
  { id: "career", label: "Career" },
  { id: "gaps", label: "Gaps" },
  { id: "resume", label: "Resume" },
  { id: "salary", label: "Salary" },
  { id: "courses", label: "Courses" },
];

function formatSalary(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ResultsPanel({ result, loading }: ResultsPanelProps) {
  const [tab, setTab] = useState<Tab>("jobs");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="card loading-card">
        <span className="spinner spinner-lg" aria-hidden />
        <p>Running expert analysis…</p>
        <p className="meta">Matching jobs, mapping career paths, analyzing gaps</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card empty-state">
        <p>Fill in your profile and click <strong>Get Recommendations</strong>.</p>
        <p className="meta" style={{ marginTop: "0.75rem" }}>
          Try <strong>Load demo</strong> for a quick example.
        </p>
      </div>
    );
  }

  return (
    <div className="results-panel">
      <div className="insight-box">
        <p><strong>AI Insights</strong></p>
        <p>{result.ai_insights}</p>
        <p className="meta" style={{ marginTop: "0.5rem" }}>{result.profile_summary}</p>
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`tab ${tab === t.id ? "tab-active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === "jobs" && (
              <span className="tab-count">{result.job_matches.length}</span>
            )}
            {t.id === "gaps" && result.skill_gaps.length > 0 && (
              <span className="tab-count">{result.skill_gaps.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="card tab-panel" role="tabpanel">
        {tab === "jobs" && (
          <ul className="match-list">
            {result.job_matches.map((job) => {
              const open = expandedJob === job.title;
              return (
                <li key={job.title} className={`match-item ${open ? "match-item-open" : ""}`}>
                  <button
                    type="button"
                    className="match-item-toggle"
                    onClick={() => setExpandedJob(open ? null : job.title)}
                    aria-expanded={open}
                  >
                    <div className="match-header">
                      <h3>{job.title}</h3>
                      <span className="badge badge-score">{Math.round(job.match_score * 100)}%</span>
                    </div>
                    <p className="meta">{job.company_type}</p>
                  </button>
                  {open && (
                    <div className="match-details">
                      <p>{job.description}</p>
                      <div className="tags">
                        {job.matched_skills.map((s) => (
                          <span key={s} className="tag tag-ok">✓ {s}</span>
                        ))}
                        {job.missing_skills.map((s) => (
                          <span key={s} className="tag tag-miss">○ {s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {tab === "career" && (
          <ul className="path-list">
            {result.career_paths.map((path) => (
              <li key={path.title} className="path-item">
                <div className="match-header">
                  <h3>{path.title}</h3>
                  <span className="badge badge-score">{path.level}</span>
                </div>
                <p className="meta">Timeline: {path.timeline_years} years</p>
                <p>{path.rationale}</p>
                <div className="tags">
                  {path.required_skills.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        {tab === "gaps" && (
          result.skill_gaps.length === 0 ? (
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
          )
        )}

        {tab === "resume" && (
          result.resume_feedback ? (
            <>
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
            </>
          ) : (
            <p className="meta">Add resume text in your profile to enable analysis.</p>
          )
        )}

        {tab === "salary" && (
          <div className="salary-grid">
            {result.salary_estimates.map((s) => (
              <div key={s.role} className="match-item">
                <h3 style={{ fontSize: "0.95rem" }}>{s.role}</h3>
                <p className="meta">{s.location}</p>
                <p className="salary-range">
                  {formatSalary(s.min_salary)} – {formatSalary(s.max_salary)}
                </p>
                <span className="badge badge-score">{s.confidence} confidence</span>
              </div>
            ))}
          </div>
        )}

        {tab === "courses" && (
          result.courses.length === 0 ? (
            <p className="meta">Your skills align well — no courses needed.</p>
          ) : (
            <ul className="match-list">
              {result.courses.map((c) => (
                <li key={c.title} className="match-item">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="course-link">
                    <h3>{c.title} ↗</h3>
                    <p className="meta">{c.provider} · {c.duration} · {c.skill}</p>
                  </a>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
