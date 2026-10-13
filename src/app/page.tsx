"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getCoachReply,
  knowledgeEntries,
  supportedLanguages,
  type SupportedLanguage,
} from "@/lib/cricketKnowledge";

const officialSources = [
  {
    label: "MCC Laws of Cricket",
    href: "https://www.lords.org/mcc/the-laws-of-cricket",
  },
  {
    label: "ICC Playing Conditions",
    href: "https://www.icc-cricket.com/about/cricket/rules-and-regulations/playing-conditions",
  },
  {
    label: "ESPNcricinfo glossary",
    href: "https://www.espncricinfo.com/ci/content/story/209599.html",
  },
];

const suggestedQuestionIds = ["lbw-rule", "run-out", "no-ball", "cover-drive", "off-spin"];

type ChatMessage = {
  type: "user" | "coach";
  text: string;
  category?: string;
  responseType?: "local" | "ai" | "off_topic" | "clarification" | "unavailable";
  sources?: Array<{ title: string; url: string }>;
  videos?: Array<{ title: string; url: string }>;
};

export default function Home() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [category, setCategory] = useState<string>("All");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const latestAnswerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || messages[messages.length - 1]?.type !== "coach") return;

    latestAnswerRef.current?.scrollIntoView({ behavior: "instant", block: "center" });
  }, [isLoading, messages]);

  const categories = useMemo(
    () => ["All", ...new Set(knowledgeEntries.map((entry) => entry.category))],
    [],
  );

  const visibleQuestions = useMemo(() => {
    return knowledgeEntries.filter(
      (entry) =>
        suggestedQuestionIds.includes(entry.id) &&
        (category === "All" || entry.category === category),
    );
  }, [category]);

  const askCoach = async (nextQuestion: string) => {
    const trimmed = nextQuestion.trim();
    if (!trimmed) return;

    setQuestion("");
    setMessages((current) => [
      ...current,
      { type: "user", text: trimmed },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Coach request failed");
      }

      const payload = (await response.json()) as {
        answer: string;
        category: string;
        responseType?: ChatMessage["responseType"];
        sources?: Array<{ title: string; url: string }>;
        videos: Array<{ title: string; url: string }>;
        known?: boolean;
      };

      setMessages((current) => [
        ...current,
        {
          type: "coach",
          text: payload.answer,
          category: payload.category,
          responseType: payload.responseType,
          sources: payload.sources,
          videos: payload.videos,
        },
      ]);
    } catch {
      const fallback = getCoachReply(trimmed, language);

      setMessages((current) => [
        ...current,
        {
          type: "coach",
          text: fallback.answer,
          category: fallback.entry.category,
          responseType: fallback.known ? "local" : "unavailable",
          sources: fallback.entry.sources,
          videos: fallback.entry.videos,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleQuestion = (nextQuestion: string) => {
    void askCoach(nextQuestion);
  };

  const submitQuestion = () => {
    void askCoach(question);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-black text-slate-950">
              C
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
                CricketCoach
              </p>
              <p className="text-xs text-slate-400">Open-source guidance platform</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#coach" className="transition hover:text-white">
              Coach
            </a>
            <a href="#knowledge" className="transition hover:text-white">
              Knowledge Base
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section id="coach" className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">Coach panel</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Ask your cricket question</h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                <span>Language</span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                  className="bg-transparent text-white outline-none"
                  aria-label="Select language"
                >
                  {supportedLanguages.map((entry) => (
                    <option key={entry.code} value={entry.code} className="bg-slate-900">
                      {entry.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                <span>Topic</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="bg-transparent text-white outline-none"
                  aria-label="Select topic"
                >
                  {categories.map((entry) => (
                    <option key={entry} value={entry} className="bg-slate-900">
                      {entry}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <label htmlFor="coach-question" className="mb-2 block text-sm font-medium text-slate-200">
                Ask about a cricket law, technique, or match situation
              </label>
              <textarea
                id="coach-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submitQuestion();
                  }
                }}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400"
                placeholder="Type your cricket question here..."
              />
            </div>
            <button
              type="button"
              onClick={submitQuestion}
              disabled={isLoading}
              className="min-h-12 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-32"
            >
              {isLoading ? "Thinking..." : "Ask coach"}
            </button>
          </div>

          <div className="mt-4 space-y-2" aria-label="Suggested cricket questions">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleQuestions.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => handleSampleQuestion(entry.question)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-white"
                >
                  {entry.question}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6" aria-live="polite">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Coach answers
            </p>
            {messages.length === 0 && !isLoading ? (
              <p className="text-sm text-slate-400">Your answer will appear here.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isLatestAnswer = message.type === "coach" && index === messages.length - 1;

                  return (
                  <div
                    key={`${message.type}-${index}`}
                    ref={isLatestAnswer ? latestAnswerRef : undefined}
                    className={`max-w-3xl rounded-2xl border px-4 py-3 ${
                      message.type === "user"
                        ? "ml-auto border-emerald-400/30 bg-emerald-400/10 text-emerald-50"
                        : isLatestAnswer
                          ? "scroll-mt-24 border-emerald-400/40 bg-emerald-400/[0.06] text-slate-100 ring-1 ring-emerald-300/20 shadow-lg shadow-emerald-950/20"
                          : "border-white/10 bg-slate-950 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {message.type === "user"
                          ? "You"
                          : message.responseType === "off_topic"
                            ? "Outside cricket"
                            : message.responseType === "clarification"
                              ? "One detail needed"
                              : message.responseType === "ai"
                                ? "AI cricket coach"
                                : message.responseType === "unavailable"
                                  ? "Local knowledge only"
                                  : isLatestAnswer
                                    ? "Coach answer"
                                    : "Coach"}
                      </p>
                      {isLatestAnswer && message.category ? (
                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs text-emerald-200">
                          {message.category}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 whitespace-pre-line leading-7">{message.text}</p>
                    {message.videos?.length ? (
                      <div className="mt-3 space-y-2">
                        {message.videos.map((video) => (
                          <a
                            key={video.title}
                            href={video.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm text-emerald-300 underline decoration-emerald-400/60 underline-offset-4"
                          >
                            {video.title}
                          </a>
                        ))}
                      </div>
                    ) : null}
                    {message.sources?.length ? (
                      <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                        {message.sources.map((source) => (
                          <a
                            key={source.url}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm text-emerald-200 underline decoration-emerald-400/40 underline-offset-4"
                          >
                            Official source: {source.title}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  );
                })}
                {isLoading ? (
                  <div className="max-w-3xl rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-300">
                    Coach is thinking...
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </section>

        <section className="mt-14">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
              Free • multilingual • mobile-first
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Learn cricket with a coach that answers from trusted rules and examples.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Ask about LBW, no-balls, batting technique, swing bowling, fielding decisions,
              and match situations. The app blends open-source cricket documentation with
              YouTube search references and multilingual answers.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#coach-question"
                className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Ask coach
              </a>
              <a
                href="#knowledge"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore knowledge
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300">
              {[
                "MCC Laws",
                "Open-source docs",
                "YouTube references",
                "Indian language support",
                "Mobile-ready UX",
              ].map((feature) => (
                <span key={feature} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5">
                  {feature}
                </span>
              ))}
            </div>
          </div>

        </section>

        <section id="knowledge" className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">Knowledge base</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Official references, examples, and learning paths</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {officialSources.map((source) => (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-emerald-400/40 hover:bg-slate-800"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Reference</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{source.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Authoritative cricket guidance used as the foundation for the knowledge layer.
                </p>
                <p className="mt-4 text-sm font-medium text-emerald-200 transition group-hover:text-emerald-100">
                  Open source link →
                </p>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
