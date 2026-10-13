import { NextResponse } from "next/server";
import {
  findRelevantKnowledgeEntries,
  getCoachReply,
  supportedLanguages,
} from "@/lib/cricketKnowledge";
import {
  GeminiApiError,
  getAiSetupMessage,
  getAiUnavailableMessage,
  getGeminiCoachReply,
  getOffTopicMessage,
} from "@/lib/geminiCoach";

const maxRequestBytes = 12_000;
const maxQuestionLength = 1_500;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return NextResponse.json({ error: "Question is too large." }, { status: 413 });
  }

  let body: { question?: unknown; language?: unknown };
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    body = parsed as { question?: unknown; language?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    return NextResponse.json({ error: "Enter a cricket question." }, { status: 400 });
  }
  if (question.length > maxQuestionLength) {
    return NextResponse.json(
      { error: `Question must be ${maxQuestionLength} characters or fewer.` },
      { status: 413 },
    );
  }

  const language = supportedLanguages.some((entry) => entry.code === body.language)
    ? (body.language as (typeof supportedLanguages)[number]["code"])
    : "en";

  const localReply = getCoachReply(question, language);
  if (localReply.known) {
    return NextResponse.json({
      answer: localReply.answer,
      question,
      language,
      category: localReply.entry.category,
      sources: localReply.entry.sources,
      videos: localReply.entry.videos,
      matchedId: localReply.entry.id,
      known: true,
      responseType: "local",
    });
  }

  const geminiFreeTierEnabled = process.env.GEMINI_FREE_TIER_ENABLED === "true";
  if (!geminiFreeTierEnabled || !process.env.GEMINI_API_KEY?.trim()) {
    return NextResponse.json({
      answer: getAiSetupMessage(language),
      question,
      language,
      category: "General",
      sources: [],
      videos: [],
      matchedId: "ai-not-configured",
      known: false,
      responseType: "unavailable",
    });
  }

  try {
    const generated = await getGeminiCoachReply(question, language);

    if (generated.classification === "off_topic") {
      return NextResponse.json({
        answer: getOffTopicMessage(language),
        question,
        language,
        category: "General",
        sources: [],
        videos: [],
        matchedId: "off-topic",
        known: false,
        responseType: "off_topic",
      });
    }

    return NextResponse.json({
      answer: generated.answer,
      question,
      language,
      category: generated.category,
      sources: generated.sources,
      videos: [],
      matchedId: generated.classification === "unclear" ? "needs-clarification" : "gemini-coach",
      known: false,
      responseType: generated.classification === "unclear" ? "clarification" : "ai",
    });
  } catch (error) {
    const diagnosticCode =
      error instanceof GeminiApiError
        ? error.diagnosticCode
        : error instanceof Error && error.name === "TimeoutError"
          ? "timeout"
          : "network_or_provider_error";
    console.error("Gemini coach request failed:", diagnosticCode);

    const context = findRelevantKnowledgeEntries(question, 1)[0];
    return NextResponse.json({
      answer: getAiUnavailableMessage(language),
      question,
      language,
      category: context?.category ?? "General",
      sources: [],
      videos: [],
      matchedId: "ai-unavailable",
      known: false,
      responseType: "unavailable",
      diagnosticCode,
    });
  }
}
