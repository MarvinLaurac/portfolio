import { articles } from "../lib/articles";
import { createHash } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const OUT_DIR = join(process.cwd(), "public", "audio");
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const CHUNK_SIZE = 400;
const KOKORO_URL = "http://localhost:8765/tts/bytes";

function splitIntoChunks(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if ((current + " " + trimmed).trim().length > CHUNK_SIZE) {
      if (current) chunks.push(current.trim());
      if (trimmed.length > CHUNK_SIZE) {
        for (let i = 0; i < trimmed.length; i += CHUNK_SIZE)
          chunks.push(trimmed.slice(i, i + CHUNK_SIZE));
        current = "";
      } else {
        current = trimmed;
      }
    } else {
      current = (current + " " + trimmed).trim();
    }
  }
  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

function chunkKey(text: string): string {
  return createHash("md5")
    .update(JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }))
    .digest("hex");
}

async function generateChunk(text: string): Promise<void> {
  const key = chunkKey(text);
  const path = join(OUT_DIR, `${key}.wav`);
  if (existsSync(path)) {
    console.log(`  ✓ cache   ${key.slice(0, 8)}…`);
    return;
  }
  const res = await fetch(KOKORO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }),
  });
  if (!res.ok) throw new Error(`Kokoro ${res.status}: ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(path, buf);
  console.log(`  ✓ généré  ${key.slice(0, 8)}… (${(buf.length / 1024).toFixed(0)} KB)`);
}

async function main() {
console.log("\n🎙  Génération audio Solène\n");

for (const article of articles) {
  const fullText = [
    article.title,
    article.description,
    ...article.content.map((s) =>
      s.type === "ul" ? s.items?.join(". ") : s.text
    ),
  ]
    .filter(Boolean)
    .join(". ");

  const chunks = splitIntoChunks(fullText);
  console.log(`\n📄 ${article.slug} (${chunks.length} chunks)`);

  for (const chunk of chunks) {
    await generateChunk(chunk);
  }
}

console.log("\n✅ Terminé — fichiers dans public/audio/\n");
}

main();
