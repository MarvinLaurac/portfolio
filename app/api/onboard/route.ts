import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: `Tu es un DRH expert. Génère un dossier d'onboarding complet pour ce nouvel employé.

INFORMATIONS :
- Prénom : ${data.prenom}
- Nom : ${data.nom}
- Poste : ${data.poste}
- Département : ${data.departement}
- Date d'arrivée : ${data.date_arrivee}
- Manager : ${data.manager}
- Type de contrat : ${data.type_contrat}
- Salaire brut mensuel : ${data.salaire} €
- Télétravail : ${data.teletravail}

Retourne UNIQUEMENT un JSON valide :
{
  "contrat": {
    "titre": "string",
    "corps": "string"
  },
  "email_bienvenue": {
    "objet": "string",
    "corps": "string"
  },
  "planning_30j": [
    {
      "semaine": number,
      "titre": "string",
      "activites": ["string"]
    }
  ],
  "checklist_it": [
    {
      "categorie": "string",
      "items": ["string"]
    }
  ],
  "objectifs_90j": ["string"]
}`,
      }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    return NextResponse.json({ error: "Erreur génération" }, { status: 500 });
  }
}
