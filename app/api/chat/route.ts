import { NextRequest, NextResponse } from "next/server";

function buildFallbackResponse(prompt: string) {
  const lower = prompt.toLowerCase();

  if (lower.includes("code") || lower.includes("build") || lower.includes("app")) {
    return "Here is a clean plan: define the problem, choose a simple stack, build the core user flow, then add UI polish and deployment. If you want, I can generate a starter project or code for your app.";
  }

  if (lower.includes("marketing") || lower.includes("launch") || lower.includes("strategy")) {
    return "A strong launch plan starts with a targeted audience, one clear promise, and a simple value proposition. Build a landing page, capture leads, post consistent content, and test a conversion loop quickly.";
  }

  if (lower.includes("write") || lower.includes("email") || lower.includes("text")) {
    return "Here is a polished draft: 'Hi, I wanted to share a quick update and invite your feedback. I have been focused on building a simpler, faster, and more useful experience for you.'";
  }

  return "Jobidia can help with strategy, writing, coding, research, and product thinking. Share your goal and I will turn it into a concrete plan or draft.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = body.messages || [];
    const prompt = messages[messages.length - 1]?.content || "Hello";

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ content: buildFallbackResponse(prompt) });
    }

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Jobidia, a polished AI assistant. Answer clearly and helpfully.",
          },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    if (!completion.ok) {
      const errorText = await completion.text();
      return NextResponse.json({
        content: `AI service error: ${errorText || "Unknown error"}`,
      });
    }

    const data = await completion.json();
    const answer = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      content: answer || buildFallbackResponse(prompt),
    });
  } catch (error) {
    return NextResponse.json({
      content: "A runtime error occurred while preparing the response.",
    });
  }
}
