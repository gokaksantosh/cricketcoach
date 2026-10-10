"use client";

import { useMemo, useState } from "react";
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

const defaultQuestion = "What is the LBW rule in cricket?";

type ChatMessage = {
  type: "user" | "coach";
  text: string;
  category?: string;
  videos?: Array<{ title: string; url: string }>;
};

export default function Home() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [category, setCategory] = useState<string>("All");
  const [question, setQuestion] = useState(defaultQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: "coach",
      text: getCoachReply(defaultQuestion, "en").answer,
      category: "Laws",
      videos: getCoachReply(defaultQuestion, "en").entry.videos,
    },
  ]);

  const categories = useMemo(
    () => ["All", ...new Set(knowledgeEntries.map((entry) => entry.category))],
    [],
  );

  const visibleQuestions = useMemo(() => {
    const filtered =
      category === "All"
        ? knowledgeEntries
        : knowledgeEntries.filter((entry) => entry.category === category);

    return filtered.slice(0, 5);
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
        videos: Array<{ title: string; url: string }>;
        known?: boolean;
      };

      setMessages((current) => [
        ...current,
        {
          type: "coach",
          text: payload.answer,
          category: payload.category,
          videos: payload.videos,
        },
      ]);
    } catch (error) {
      const fallback = getCoachReply(trimmed, language);

      setMessages((current) => [
        ...current,
        {
          type: "coach",
          text: fallback.answer,
          category: fallback.entry.category,
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

  const handleQuestionFocus = () => {
    setQuestion((current) => (current === defaultQuestion ? "" : current));
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
            <a href="#stack" className="transition hover:text-white">
              Stack
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

          <div className="mt-5 space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.type}-${index}`}
                className={`max-w-3xl rounded-2xl border px-4 py-3 ${
                  message.type === "user"
                    ? "ml-auto border-emerald-400/30 bg-emerald-400/10 text-emerald-50"
                    : "border-white/10 bg-slate-950 text-slate-200"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {message.type === "user" ? "You" : "Coach"}
                </p>
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
              </div>
            ))}

            {isLoading ? (
              <div className="max-w-3xl rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-300">
                Coach is thinking...
              </div>
            ) : null}
          </div>

          <div className="mt-5">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onFocus={handleQuestionFocus}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submitQuestion();
                }
              }}
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-base text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400"
              placeholder="Ask about a law, technique, or match situation"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {visibleQuestions.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => handleSampleQuestion(entry.question)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-emerald-400/50 hover:text-white"
                >
                  {entry.question}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={submitQuestion}
              disabled={isLoading}
              className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Thinking..." : "Ask coach"}
            </button>
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
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
              <button
                type="button"
                onClick={() => void askCoach(defaultQuestion)}
                className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Ask coach
              </button>
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

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-emerald-950/20">
            <div className="rounded-2xl border border-emerald-400/20 bg-slate-900 p-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>Coach response</span>
                <span>{messages[messages.length - 1]?.category ?? "Laws"}</span>
              </div>

              <p className="mt-5 text-lg font-semibold text-white">
                {messages[messages.length - 1]?.type === "user"
                  ? "Your question"
                  : "Latest answer"}
              </p>

              <p className="mt-4 leading-7 text-slate-300">
                {messages[messages.length - 1]?.text ?? "Ask a cricket question to begin."}
              </p>

              <div className="mt-5 space-y-2">
                {(messages[messages.length - 1]?.videos ?? []).map((video) => (
                  <a
                    key={video.title}
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-emerald-200 transition hover:border-emerald-400/50 hover:bg-slate-800"
                  >
                    {video.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>
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

        <section id="stack" className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "RAG pipeline",
              body: "Use open-source embeddings, vector search, and a local LLM so the answer comes from cricket documentation rather than guesses.",
            },
            {
              title: "Multilingual layer",
              body: "Serve English, Hindi, Bengali, Tamil, Telugu, and German through translation models or pre-written language packs for fast, explainable answers.",
            },
            {
              title: "Video grounding",
              body: "Attach relevant YouTube lesson links to each answer so learners can watch the exact explanation and reinforce the concept visually.",
            },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">System design</p>
              <h3 className="mt-3 text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{card.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
