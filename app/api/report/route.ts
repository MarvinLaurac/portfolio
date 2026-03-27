import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { urls, mots_cles, contenus } = await req.json();

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `Tu es un expert en veille stratégique. Analyse ces contenus web et génère un rapport de veille concurrentielle.

MOTS-CLÉS SURVEILLÉS : ${mots_cles.join(", ")}
SOURCES : ${urls.join(", ")}

CONTENUS RÉCUPÉRÉS :
${contenus}

Retourne UNIQUEMENT un JSON valide :
{
  "date_rapport": "string",
  "resume_executif": "string",
  "signaux_forts": [
    {
      "titre": "string",
      "source": "string",
      "description": "string",
      "impact": "positif" | "negatif" | "neutre",
      "urgence": "haute" | "moyenne" | "faible"
    }
  ],
  "tendances": ["string"],
  "opportunites": ["string"],
  "menaces": ["string"],
  "recommandations": ["string"]
}`,
      }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
