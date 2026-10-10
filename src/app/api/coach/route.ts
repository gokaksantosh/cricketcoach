import { NextResponse } from "next/server";
import { getCoachReply, supportedLanguages } from "@/lib/cricketKnowledge";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      question?: string;
      language?: string;
    };

    const question = body.question?.trim() ?? "What is the LBW rule in cricket?";
    const language = supportedLanguages.some(
      (entry) => entry.code === body.language,
    )
      ? (body.language as (typeof supportedLanguages)[number]["code"])
      : "en";

    const { entry, answer } = getCoachReply(question, language);

    return NextResponse.json({
      answer,
      question,
      language,
      category: entry.category,
      sources: entry.sources,
      videos: entry.videos,
      matchedId: entry.id,
    });
  } catch (error) {
    console.error("Coach API error:", error);

    return NextResponse.json(
      {
        answer:
          "I could not answer that question from the cricket knowledge base at the moment. Please try a different cricket topic or ask again.",
        question: "",
        language: "en",
        category: "Laws",
        sources: [],
        videos: [],
        matchedId: "fallback",
      },
      { status: 500 },
    );
  }
}
