"use client";

import { useState } from "react";
import { NameRecommendation } from "@/types";
import NameForm from "@/components/NameForm";
import NameCardList from "@/components/NameCardList";
import LoadingState from "@/components/LoadingState";

export default function Home() {
  const [names, setNames] = useState<NameRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequest, setLastRequest] = useState<{
    surname: string;
    gender: string;
  } | null>(null);

  async function handleGenerate(surname: string, gender: string) {
    setIsLoading(true);
    setError("");
    setNames([]);
    setLastRequest({ surname, gender });

    try {
      const res = await fetch("/api/generate-names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surname, gender }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setNames(data.names);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleGenerateAgain() {
    if (lastRequest) {
      handleGenerate(lastRequest.surname, lastRequest.gender);
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink mb-3">
          Chinese Name Craft
        </h1>
        <p className="text-lg text-ink/60 max-w-xl mx-auto">
          Discover a meaningful Chinese name drawn from classical poetry.
          Enter a surname and let centuries of literary tradition inspire your
          name.
        </p>
      </header>

      <section className="mb-12">
        <NameForm onSubmit={handleGenerate} isLoading={isLoading} />
      </section>

      {error && (
        <div className="text-center mb-8">
          <p className="text-vermillion" role="alert">{error}</p>
        </div>
      )}

      {isLoading && <LoadingState />}

      {!isLoading && names.length > 0 && (
        <NameCardList names={names} onGenerateAgain={handleGenerateAgain} />
      )}
    </main>
  );
}
