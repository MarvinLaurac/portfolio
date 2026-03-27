import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { factures, releve } = await req.json();
    if (!factures || !releve) return NextResponse.json({ error: "Données manquantes" }, { status: 400 });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `Tu es un expert-comptable. Analyse ces documents financiers et effectue une réconciliation complète.

FACTURES FOURNISSEURS :
${factures}

RELEVÉ BANCAIRE :
${releve}

Retourne UNIQUEMENT un JSON valide avec cette structure exacte (sans markdown, sans texte avant ou après) :
{
  "resume": {
    "total_factures": number,
    "total_releve": number,
    "ecart_global": number,
    "nb_anomalies": number
  },
  "correspondances": [
    {
      "description": "string",
      "montant_facture": number,
      "montant_releve": number,
      "statut": "ok" | "ecart" | "manquant",
      "commentaire": "string"
    }
  ],
  "anomalies": [
    {
      "type": "doublon" | "montant_incorrect" | "non_comptabilise" | "suspect",
      "description": "string",
      "montant": number,
      "urgence": "haute" | "moyenne" | "faible",
      "action_recommandee": "string"
    }
  ],
  "recommandations": ["string"]
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
