"use client";

import { useState, KeyboardEvent } from "react";

interface SkillInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function SkillInput({ label, values, onChange, placeholder }: SkillInputProps) {
  const [draft, setDraft] = useState("");

  function addValue(raw: string) {
    const items = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!items.length) return;
    const next = [...values];
    for (const item of items) {
      if (!next.some((v) => v.toLowerCase() === item.toLowerCase())) {
        next.push(item);
      }
    }
    onChange(next);
    setDraft("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue(draft);
    }
    if (e.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="chip-input">
        {values.map((v, i) => (
          <button
            key={`${v}-${i}`}
            type="button"
            className="chip"
            onClick={() => removeAt(i)}
            title="Click to remove"
          >
            {v} <span aria-hidden>×</span>
          </button>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => draft && addValue(draft)}
          placeholder={placeholder ?? "Type and press Enter"}
        />
      </div>
    </div>
  );
}
