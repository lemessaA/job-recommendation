"use client";

import { useEffect, useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import ResultsPanel from "@/components/ResultsPanel";
import { checkBackendHealth, fetchRecommendations } from "@/lib/api";
import type { RecommendationResult, UserProfile } from "@/lib/types";

export default function CareerApp() {
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    checkBackendHealth().then(setBackendOnline);
  }, []);

  async function handleSubmit(profile: UserProfile) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fetchRecommendations(profile);
      setResult(data);
      setBackendOnline(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResult(null);
      checkBackendHealth().then(setBackendOnline);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="hero">
        <h1>Job Recommendation Expert System</h1>
        <p>
          Discover suitable careers from your skills, education, and interests.
          Get job matches, career paths, skill gaps, resume feedback, salary ranges, and courses.
        </p>
        <div className={`status-pill ${backendOnline === false ? "status-offline" : backendOnline ? "status-online" : ""}`}>
          {backendOnline === null && "Checking API…"}
          {backendOnline === true && "● API connected"}
          {backendOnline === false && "● API offline — run: cd backend && fastapi dev"}
        </div>
      </header>

      <div className="grid grid-two">
        <ProfileForm onSubmit={handleSubmit} loading={loading} />
        <div>
          {error && (
            <div className="error-banner" role="alert">
              {error}
            </div>
          )}
          <ResultsPanel result={result} loading={loading} />
        </div>
      </div>
    </>
  );
}
