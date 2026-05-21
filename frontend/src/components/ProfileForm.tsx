"use client";

import { useState } from "react";
import type { UserProfile } from "@/lib/types";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  loading: boolean;
}

function parseList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ProfileForm({ onSubmit, loading }: ProfileFormProps) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("python, sql, git");
  const [education, setEducation] = useState("B.S. Computer Science");
  const [experienceYears, setExperienceYears] = useState("2");
  const [interests, setInterests] = useState("machine learning, web development");
  const [locations, setLocations] = useState("United States");
  const [resumeText, setResumeText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      skills: parseList(skills),
      education,
      experience_years: parseFloat(experienceYears) || 0,
      interests: parseList(interests),
      preferred_locations: parseList(locations),
      resume_text: resumeText,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Your Profile</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" />
      </div>

      <div className="form-group">
        <label htmlFor="skills">Skills (comma-separated)</label>
        <input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="education">Education</label>
        <input id="education" value={education} onChange={(e) => setEducation(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="experience">Years of experience</label>
        <input
          id="experience"
          type="number"
          min="0"
          step="0.5"
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="interests">Interests (comma-separated)</label>
        <input id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="locations">Preferred locations</label>
        <input id="locations" value={locations} onChange={(e) => setLocations(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="resume">Resume text (optional)</label>
        <textarea
          id="resume"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste resume content for analysis..."
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Analyzing..." : "Get Recommendations"}
      </button>
    </form>
  );
}
