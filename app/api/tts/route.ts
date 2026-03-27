import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC_AUDIO = join(process.cwd(), "public", "audio");
const CACHE_DIR = join(process.cwd(), ".tts-cache");

[PUBLIC_AUDIO, CACHE_DIR].forEach((d) => {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
});

function cacheKey(body: object): string {
  return createHash("md5").update(JSON.stringify(body)).digest("hex");
}

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = cacheKey(body);

  // 1. Fichier pré-généré dans public/audio/
  const publicPath = join(PUBLIC_AUDIO, `${key}.wav`);
  if (existsSync(publicPath)) {
    return new NextResponse(readFileSync(publicPath), {
      headers: { "Content-Type": "audio/wav", "X-Cache": "PUBLIC" },
    });
  }

  // 2. Cache local (.tts-cache/)
  const cachePath = join(CACHE_DIR, `${key}.wav`);
  if (existsSync(cachePath)) {
    return new NextResponse(readFileSync(cachePath), {
      headers: { "Content-Type": "audio/wav", "X-Cache": "HIT" },
    });
  }

  // 3. Génère via Kokoro et met en cache
  try {
    const res = await fetch("http://localhost:8765/tts/bytes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json({ error: detail }, { status: res.status });
    }

    const audio = await res.arrayBuffer();
    const buffer = Buffer.from(audio);
    writeFileSync(cachePath, buffer);

    return new NextResponse(buffer, {
      headers: { "Content-Type": "audio/wav", "X-Cache": "MISS" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 });
  }
}
