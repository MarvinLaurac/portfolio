import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();
    const results: { url: string; contenu: string }[] = [];

    for (const url of urls.slice(0, 5)) {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; VeilleBot/1.0)" },
          signal: AbortSignal.timeout(8000),
        });
        const html = await res.text();
        const texte = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 3000);
        results.push({ url, contenu: texte });
      } catch {
        results.push({ url, contenu: "Impossible d'accéder à cette URL." });
      }
    }

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Erreur scraping" }, { status: 500 });
  }
}
