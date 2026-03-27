import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prenom, nom, email, entreprise, poste, secteur } = await req.json();

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{
        role: "user",
        content: `Tu es un expert en qualification de leads B2B. Analyse ce lead et génère un dossier complet.

LEAD :
- Nom : ${prenom} ${nom}
- Email : ${email}
- Entreprise : ${entreprise}
- Poste : ${poste}
- Secteur : ${secteur}

Retourne UNIQUEMENT un JSON valide :
{
  "score": number (0-100),
  "niveau": "chaud" | "tiede" | "froid",
  "profil": {
    "type_decideur": "string",
    "budget_estime": "string",
    "urgence": "haute" | "moyenne" | "faible",
    "potentiel": "string"
  },
  "enrichissement": {
    "taille_entreprise_estimee": "string",
    "secteur_detail": "string",
    "enjeux_probables": ["string"],
    "concurrents_probables": ["string"]
  },
  "email_prospection": {
    "objet": "string",
    "corps": "string"
  },
  "arguments_vente": ["string"],
  "prochaine_action": "string"
}`,
      }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur analyse" }, { status: 500 });
  }
}
