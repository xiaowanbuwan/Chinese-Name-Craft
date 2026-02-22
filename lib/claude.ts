import Anthropic from "@anthropic-ai/sdk";
import { NameRecommendation } from "@/types";

const client = new Anthropic({
  baseURL: process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com",
});

export async function generateNames(
  surname: string,
  gender: string
): Promise<NameRecommendation[]> {
  const genderGuide =
    gender === "male"
      ? "masculine, strong, and ambitious"
      : gender === "female"
        ? "elegant, graceful, and beautiful"
        : "balanced, suitable for any gender";

  const prompt = `You are a Chinese naming expert specializing in classical poetry. Generate exactly 5 Chinese given names for the surname "${surname}" (gender preference: ${gender} — names should feel ${genderGuide}).

Requirements:
- Each name's given name (名) must be 1-2 Chinese characters, using common characters (within the 3500 most-used Chinese characters).
- Every name MUST come from a REAL, verifiable classical Chinese poem or text. Do NOT invent or fabricate any poetry source.
- Provide the exact book name, chapter/poem title, and the original line the name is drawn from.
- Avoid characters with awkward homophones when combined with the surname.
- All fields must be bilingual (Chinese and English) as specified.

CRITICAL: In all JSON string values, do NOT use any quotation marks (neither Chinese quotes "" nor English quotes ""). Use 《》for book titles and「」for emphasis instead.

Return ONLY a JSON array of 5 objects with this exact structure (no markdown, no explanation):
[
  {
    "fullName": "full name in Chinese e.g. 李清照",
    "givenName": "given name only e.g. 清照",
    "pinyin": "full pinyin with tone marks e.g. lǐ qīng zhào",
    "source": {
      "book": "book name in Chinese e.g. 诗经",
      "bookEn": "book name in English e.g. Book of Songs",
      "chapter": "chapter/poem name in Chinese",
      "chapterEn": "chapter/poem name in English",
      "originalText": "the original Chinese line the name comes from",
      "translation": "English translation of that line"
    },
    "meaning": "Chinese explanation of the name's meaning and cultural significance",
    "meaningEn": "English explanation of the name's meaning and cultural significance"
  }
]`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  console.log("Raw AI response:", text);

  // Extract JSON array from response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Failed to parse name recommendations from AI response.");
  }

  // Clean up common JSON issues from AI output
  let jsonStr = jsonMatch[0];
  jsonStr = jsonStr.replace(/,\s*([}\]])/g, "$1"); // trailing commas
  jsonStr = jsonStr.replace(/(?<=:\s*"[^"]*)\u201c([^\u201d]*)\u201d/g, "\u300c$1\u300d"); // Chinese quotes inside values -> 「」
  jsonStr = jsonStr.replace(/[\u201c\u201d]/g, '"'); // remaining smart double quotes
  jsonStr = jsonStr.replace(/[\u2018\u2019]/g, "'"); // smart single quotes

  let names: NameRecommendation[];
  try {
    names = JSON.parse(jsonStr);
  } catch {
    console.error("JSON parse failed, raw string:", jsonStr);
    throw new Error("Failed to parse AI response as JSON.");
  }

  if (!Array.isArray(names) || names.length === 0) {
    throw new Error("No name recommendations returned.");
  }

  return names.slice(0, 5);
}
