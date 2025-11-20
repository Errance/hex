// src/app/api/ai/interpret/route.ts

import { NextRequest, NextResponse } from "next/server";
import type { InterpretRequest, InterpretResponse } from "@/types/divination";

const SYSTEM_PROMPT_EN = `
You are an experienced I Ching (Yijing) divination interpreter.

You receive:
- A hexagram (with English paraphrases of the judgement, image, and line texts)
- Optional changing hexagram info (moving lines)
- A short English description of the querent's real-life question
- A short initial summary of the hexagram

Your task:
1. Interpret the situation clearly in modern, natural English for an English-speaking audience.
2. Stay faithful to the provided hexagram content and lines.
3. Do NOT invent traditional rules or new hexagrams that are not in the input.
4. Avoid fatalistic or absolute language. Offer guidance, not doom.
5. Be practical, grounded, and psychologically supportive.

Return ONLY valid JSON in this exact TypeScript type:

type AiInterpretation = {
  summary: string;      // 1–3 sentence TL;DR
  mainReading: string;  // 3–8 paragraphs deep explanation
  risks: string;        // 1–3 paragraphs: pitfalls, blind spots, what to watch out for
  guidance: string;     // 3–7 bullet-style lines as plain text paragraphs with clear advice
};
`.trim();

const SYSTEM_PROMPT_ZH = `
你是一位经验丰富的易经占卜解读师。

你将收到：
- 一个卦象（包含卦辞、象传和爻辞的中文内容）
- 可选的变卦信息（动爻）
- 问卦者的具体问题描述
- 该卦象的初步解读摘要

你的任务：
1. 用现代、自然的中文为中文用户清晰地解读情况。
2. 忠实于提供的卦象内容和爻辞。
3. 不要编造不在输入中的传统规则或新卦象。
4. 避免宿命论或绝对化的语言。提供指引，而非厄运预言。
5. 实用、务实、心理上支持问卦者。

仅返回有效的JSON，格式如下：

type AiInterpretation = {
  summary: string;      // 1-3句话的简要概括
  mainReading: string;  // 3-8段深入的解读
  risks: string;        // 1-3段：陷阱、盲点、需要注意的事项
  guidance: string;     // 3-7条建议，以段落形式提供清晰的指导
};
`.trim();

function buildUserPrompt(payload: InterpretRequest): string {
  const { hexagramId, changingHexagramId, movingLines, question, context } = payload;
  const { baseHexagram, initialSummary } = context;

  const movingLinesStr =
    movingLines && movingLines.length > 0
      ? movingLines.join(", ")
      : "none (treat the hexagram as static)";

  const linesBlock = baseHexagram.lines
    .map(
      (line) =>
        `Line ${line.index}: ${line.text}${
          line.original ? ` (Original: ${line.original})` : ""
        }`
    )
    .join("\n");

  return `
Querent's question:
${question}

Base hexagram:
- ID: ${hexagramId}
- Name: ${baseHexagram.name}${baseHexagram.nameZh ? ` (${baseHexagram.nameZh})` : ""}
- Short description: ${baseHexagram.descriptionShort}

Judgement (paraphrased):
${baseHexagram.judgement}

Image (paraphrased):
${baseHexagram.imageText}

Lines:
${linesBlock}

Initial summary (high-level reading):
${initialSummary}

Changing hexagram information:
- Changing hexagram ID: ${changingHexagramId ?? "none"}
- Moving lines: ${movingLinesStr}

Now, interpret this situation in depth for the querent.
Remember to output ONLY valid JSON matching the AiInterpretation type.
`.trim();
}

export async function POST(req: NextRequest) {
  let body: InterpretRequest;
  try {
    body = (await req.json()) as InterpretRequest;
  } catch (err) {
    const res: InterpretResponse = {
      success: false,
      error: "Invalid JSON payload.",
    };
    return NextResponse.json(res, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl =
    process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
  const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

  if (!apiKey) {
    const res: InterpretResponse = {
      success: false,
      error: "OPENROUTER_API_KEY is not configured on the server.",
    };
    return NextResponse.json(res, { status: 500 });
  }

  const userPrompt = buildUserPrompt(body);
  const language = body.language || "en";
  const systemPrompt = language === "zh" ? SYSTEM_PROMPT_ZH : SYSTEM_PROMPT_EN;

  try {
    const openRouterRes = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // These headers are recommended by OpenRouter
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
        "X-Title": "Hex Oracle",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        // Ask the model to always return JSON
        response_format: { type: "json_object" },
      }),
    });

    if (!openRouterRes.ok) {
      const text = await openRouterRes.text();
      console.error("OpenRouter error:", text);
      const res: InterpretResponse = {
        success: false,
        error: "Upstream AI request failed.",
      };
      return NextResponse.json(res, { status: 502 });
    }

    const json = await openRouterRes.json();
    const content = json.choices?.[0]?.message?.content;

    if (!content) {
      const res: InterpretResponse = {
        success: false,
        error: "AI response did not contain any content.",
      };
      return NextResponse.json(res, { status: 500 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI JSON:", e, content);
      const res: InterpretResponse = {
        success: false,
        error: "AI response was not valid JSON.",
      };
      return NextResponse.json(res, { status: 500 });
    }

    const res: InterpretResponse = {
      success: true,
      data: parsed as any,
    };
    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.error("AI interpret error:", err);
    const res: InterpretResponse = {
      success: false,
      error: "Unexpected server error while calling AI.",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

