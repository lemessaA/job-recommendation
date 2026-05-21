"use client";

import { useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import ResultsPanel from "@/components/ResultsPanel";
import { fetchRecommendations } from "@/lib/api";
import type { RecommendationResult, UserProfile } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(profile: UserProfile) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecommendations(profile);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <header className="hero">
        <h1>Job Recommendation Expert System</h1>
        <p>
          Discover suitable careers from your skills, education, and interests.
          Get job matches, career paths, skill gaps, resume feedback, salary ranges, and courses.
        </p>
      </header>

      <div className="grid grid-two">
        <ProfileForm onSubmit={handleSubmit} loading={loading} />
        <div>
          {error && <p className="error">{error}</p>}
          <ResultsPanel result={result} />
        </div>
      </div>
    </main>
  );
}
