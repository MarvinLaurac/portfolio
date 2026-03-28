/**
 * Génère les fichiers audio pour tous les articles via Kokoro.
 * Usage : node scripts/generate-audio.mjs
 * Prérequis : Kokoro server lancé sur http://localhost:8765
 */

import { createHash } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "audio");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const KOKORO_URL = "http://localhost:8765/tts/bytes";
const CHUNK_SIZE = 400;

function splitIntoChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
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

function chunkKey(text) {
  return createHash("md5")
    .update(JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }))
    .digest("hex");
}

async function generateChunk(text) {
  const key = chunkKey(text);
  const path = join(OUT_DIR, `${key}.wav`);
  if (existsSync(path)) {
    console.log(`  ✓ cache  ${key.slice(0, 8)}…`);
    return key;
  }
  const res = await fetch(KOKORO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }),
  });
  if (!res.ok) throw new Error(`Kokoro ${res.status}: ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(path, buf);
  console.log(`  ✓ généré ${key.slice(0, 8)}… (${buf.length} bytes)`);
  return key;
}

// Import dynamique des articles
const { articles } = await import("../lib/articles.ts", {
  with: { type: "json" },
}).catch(async () => {
  // Fallback : lire le fichier TS et extraire les articles manuellement
  const { createRequire } = await import("module");
  return { articles: null };
});

// Si l'import TS échoue, on utilise tsx
const { execSync } = await import("child_process");

console.log("\n🎙  Génération audio Solène — tous les articles\n");

// Lance via tsx pour supporter TypeScript
const script = `
import { articles } from "./lib/articles.ts";
import { createHash } from "crypto";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const OUT_DIR = "./public/audio";
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const CHUNK_SIZE = 400;
const KOKORO_URL = "http://localhost:8765/tts/bytes";

function splitIntoChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = "";
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if ((current + " " + trimmed).trim().length > CHUNK_SIZE) {
      if (current) chunks.push(current.trim());
      if (trimmed.length > CHUNK_SIZE) {
        for (let i = 0; i < trimmed.length; i += CHUNK_SIZE)
          chunks.push(trimmed.slice(i, i + CHUNK_SIZE));
        current = "";
      } else { current = trimmed; }
    } else { current = (current + " " + trimmed).trim(); }
  }
  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

function chunkKey(text) {
  return createHash("md5")
    .update(JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }))
    .digest("hex");
}

async function generateChunk(text) {
  const key = chunkKey(text);
  const path = join(OUT_DIR, key + ".wav");
  if (existsSync(path)) { console.log("  ✓ cache  " + key.slice(0,8)); return key; }
  const res = await fetch(KOKORO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: "ff_siwis", speed: 0.95, language: "fr" }),
  });
  if (!res.ok) throw new Error("Kokoro " + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(path, buf);
  console.log("  ✓ généré " + key.slice(0,8) + " (" + buf.length + " bytes)");
  return key;
}

for (const article of articles) {
  const fullText = [article.title, article.description,
    ...article.content.map(s => s.type === "ul" ? s.items?.join(". ") : s.text)
  ].filter(Boolean).join(". ");

  const chunks = splitIntoChunks(fullText);
  console.log("\\n📄 " + article.slug + " — " + chunks.length + " chunks");

  for (const chunk of chunks) {
    await generateChunk(chunk);
  }
}

console.log("\\n✅ Terminé — fichiers dans public/audio/");
`;

writeFileSync(join(ROOT, "scripts", "_gen_audio_tmp.ts"), script);

try {
  execSync("npx tsx scripts/_gen_audio_tmp.ts", {
    cwd: ROOT,
    stdio: "inherit",
  });
} finally {
  const { unlinkSync } = await import("fs");
  try { unlinkSync(join(ROOT, "scripts", "_gen_audio_tmp.ts")); } catch {}
}
