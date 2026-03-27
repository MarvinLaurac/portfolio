import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { texte } = await req.json();
    if (!texte) return NextResponse.json({ error: "Texte manquant" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `Tu es un avocat d'affaires senior spécialisé en droit des contrats français. Analyse ce contrat et identifie tous les points importants.

CONTRAT :
${texte.slice(0, 15000)}

Retourne UNIQUEMENT un JSON valide (sans markdown) avec cette structure :
{
  "type_contrat": "string",
  "parties": ["string"],
  "duree": "string",
  "montant": "string",
  "score_risque": number,
  "clauses_risquees": [
    {
      "titre": "string",
      "extrait": "string",
      "risque": "critique" | "eleve" | "modere",
      "explication": "string",
      "recommandation": "string"
    }
  ],
  "dates_cles": [
    {
      "label": "string",
      "date": "string",
      "importance": "critique" | "importante" | "info"
    }
  ],
  "obligations": [
    {
      "partie": "string",
      "obligation": "string",
      "penalite": "string"
    }
  ],
  "points_reneg": ["string"],
  "synthese": "string"
}`,
      }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur lors de l'analyse" }, { status: 500 });
  }
}
