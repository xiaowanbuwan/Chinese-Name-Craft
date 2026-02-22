import { NextRequest, NextResponse } from "next/server";
import { validateSurname, validateGender } from "@/lib/validation";
import { generateNames } from "@/lib/claude";

const rateLimit = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 5;

  const timestamps = rateLimit.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);
  if (recent.length >= maxRequests) return false;

  recent.push(now);
  rateLimit.set(ip, recent);
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { surname, gender } = body;

    const surnameError = validateSurname(surname);
    if (surnameError) {
      return NextResponse.json({ error: surnameError }, { status: 400 });
    }

    const genderError = validateGender(gender);
    if (genderError) {
      return NextResponse.json({ error: genderError }, { status: 400 });
    }

    const names = await generateNames(surname, gender);
    return NextResponse.json({ names });
  } catch (error) {
    console.error("Name generation error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Failed to generate names: ${message}` },
      { status: 500 }
    );
  }
}
