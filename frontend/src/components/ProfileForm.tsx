"use client";

import { useState } from "react";
import SkillInput from "@/components/SkillInput";
import type { UserProfile } from "@/lib/types";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  loading: boolean;
}

const DEMO_PROFILE: UserProfile = {
  name: "Alex Chen",
  skills: ["python", "sql", "machine learning", "git"],
  education: "B.S. Computer Science",
  experience_years: 3,
  interests: ["AI", "data science", "startups"],
  preferred_locations: ["United States", "Remote"],
  resume_text:
    "Built ML pipelines that improved model accuracy by 18%. Led a team of 3 engineers on a data platform migration.",
};

export default function ProfileForm({ onSubmit, loading }: ProfileFormProps) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>(["python", "sql", "git"]);
  const [education, setEducation] = useState("B.S. Computer Science");
  const [experienceYears, setExperienceYears] = useState("2");
  const [interests, setInterests] = useState<string[]>(["machine learning", "web development"]);
  const [locations, setLocations] = useState<string[]>(["United States"]);
  const [resumeText, setResumeText] = useState("");

  function buildProfile(): UserProfile {
    return {
      name,
      skills,
      education,
      experience_years: parseFloat(experienceYears) || 0,
      interests,
      preferred_locations: locations,
      resume_text: resumeText,
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(buildProfile());
  }

  function loadDemo() {
    setName(DEMO_PROFILE.name);
    setSkills(DEMO_PROFILE.skills);
    setEducation(DEMO_PROFILE.education);
    setExperienceYears(String(DEMO_PROFILE.experience_years));
    setInterests(DEMO_PROFILE.interests);
    setLocations(DEMO_PROFILE.preferred_locations);
    setResumeText(DEMO_PROFILE.resume_text);
  }

  function clearForm() {
    setName("");
    setSkills([]);
    setEducation("");
    setExperienceYears("0");
    setInterests([]);
    setLocations([]);
    setResumeText("");
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-header">
        <h2>Your Profile</h2>
        <div className="btn-row">
          <button type="button" className="btn-secondary" onClick={loadDemo} disabled={loading}>
            Load demo
          </button>
          <button type="button" className="btn-secondary" onClick={clearForm} disabled={loading}>
            Clear
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Optional"
          autoComplete="name"
        />
      </div>

      <SkillInput
        label="Skills"
        values={skills}
        onChange={setSkills}
        placeholder="e.g. python — press Enter"
      />

      <div className="form-group">
        <label htmlFor="education">Education</label>
        <input
          id="education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
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

      <SkillInput
        label="Interests"
        values={interests}
        onChange={setInterests}
        placeholder="e.g. AI — press Enter"
      />

      <SkillInput
        label="Preferred locations"
        values={locations}
        onChange={setLocations}
        placeholder="e.g. Remote — press Enter"
      />

      <div className="form-group">
        <label htmlFor="resume">Resume text (optional)</label>
        <textarea
          id="resume"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste resume content for analysis..."
          rows={5}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading || skills.length === 0}>
        {loading ? (
          <span className="btn-loading">
            <span className="spinner" aria-hidden />
            Analyzing your profile…
          </span>
        ) : (
          "Get Recommendations"
        )}
      </button>
    </form>
  );
}
