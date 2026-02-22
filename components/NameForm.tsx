"use client";

import { useState } from "react";

interface NameFormProps {
  onSubmit: (surname: string, gender: string) => void;
  isLoading: boolean;
}

export default function NameForm({ onSubmit, isLoading }: NameFormProps) {
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("female");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!surname.trim()) {
      setError("Please enter a surname.");
      return;
    }
    if (!/^[\u4e00-\u9fff]{1,2}$/.test(surname)) {
      setError("Please enter 1–2 Chinese characters for the surname.");
      return;
    }

    onSubmit(surname, gender);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5">
      <div>
        <label htmlFor="surname" className="block text-sm font-medium text-ink mb-1.5">
          Surname (姓氏)
        </label>
        <input
          id="surname"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="e.g. 李"
          className="w-full px-4 py-2.5 border border-ink/20 rounded-lg bg-white text-ink text-lg placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-vermillion/40 focus:border-vermillion transition"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-ink mb-1.5">
          Gender Preference
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-2.5 border border-ink/20 rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-vermillion/40 focus:border-vermillion transition"
          disabled={isLoading}
        >
          <option value="female">Female — Elegant &amp; Graceful</option>
          <option value="male">Male — Strong &amp; Ambitious</option>
          <option value="neutral">Neutral — Balanced</option>
        </select>
      </div>

      {error && (
        <p className="text-vermillion text-sm" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-vermillion text-white font-medium rounded-lg hover:bg-vermillion-light transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "Generating…" : "Generate Names"}
      </button>
    </form>
  );
}
