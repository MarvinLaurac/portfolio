"use client";
import Header from "@/components/Header";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Impact = "positif" | "negatif" | "neutre";
type Urgence = "haute" | "moyenne" | "faible";

interface Signal {
  titre: string; source: string; description: string; impact: Impact; urgence: Urgence;
}
interface Rapport {
  date_rapport: string; resume_executif: string;
  signaux_forts: Signal[]; tendances: string[]; opportunites: string[]; menaces: string[]; recommandations: string[];
}

const impactColor: Record<Impact, string> = {
  positif: "text-emerald-600 bg-emerald-50 border-emerald-200",
  negatif: "text-red-600 bg-red-50 border-red-200",
  neutre: "text-slate-600 bg-slate-50 border-slate-200",
};
const urgenceDot: Record<Urgence, string> = { haute: "bg-red-500", moyenne: "bg-amber-400", faible: "bg-slate-300" };

const TABS = ["Signaux", "Tendances", "Opportunités & Menaces", "Recommandations"] as const;
type Tab = typeof TABS[number];

export default function Home() {
  const [urlsText, setUrlsText] = useState("");
  const [motsText, setMotsText] = useState("");
  const [rapport, setRapport] = useState<Rapport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Signaux");

  async function analyser() {
    const urls = urlsText.split("\n").map((u) => u.trim()).filter(Boolean);
    const mots_cles = motsText.split(",").map((m) => m.trim()).filter(Boolean);
    if (!urls.length || !mots_cles.length) { setError("Ajoutez au moins une URL et un mot-clé."); return; }
    setError(""); setLoading(true); setRapport(null);
    try {
      const scrapeRes = await fetch("/api/scrape", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ urls }) });
      const { results } = await scrapeRes.json();
      const contenus = results.map((r: { url: string; contenu: string }) => `=== ${r.url} ===\n${r.contenu}`).join("\n\n");
      const reportRes = await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ urls, mots_cles, contenus }) });
      const data = await reportRes.json();
      if (data.error) throw new Error(data.error);
      setRapport(data);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F7F4] text-[#1a1a1a]">

      <div className="max-w-4xl mx-auto px-3 sm:px-4 pt-24 pb-10">
        {!rapport ? (
          <>
            <p className="text-center text-[13px] text-[#1a1a1a]/50 mb-8">Renseignez des URLs à surveiller et des mots-clés. L&apos;agent analyse et génère un rapport stratégique.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-2xl border border-black/8 p-5">
                <p className="font-semibold text-[13px] mb-2">URLs à surveiller (une par ligne)</p>
                <textarea value={urlsText} onChange={(e) => setUrlsText(e.target.value)}
                  placeholder={"https://concurrent1.com\nhttps://concurrent2.com/blog"}
                  className="w-full min-h-[160px] resize-none text-[13px] font-mono placeholder:text-[#1a1a1a]/20 outline-none" />
              </div>
              <div className="bg-white rounded-2xl border border-black/8 p-5">
                <p className="font-semibold text-[13px] mb-2">Mots-clés surveillés (séparés par virgule)</p>
                <textarea value={motsText} onChange={(e) => setMotsText(e.target.value)}
                  placeholder="IA, automatisation, pricing, nouvelle fonctionnalité"
                  className="w-full min-h-[160px] resize-none text-[13px] placeholder:text-[#1a1a1a]/20 outline-none" />
              </div>
            </div>
            {error && <p className="text-red-600 text-[13px] text-center mb-4">{error}</p>}
            <div className="flex justify-center">
              <button onClick={analyser} disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-[14px] font-semibold hover:bg-[#1a1a1a]/85 active:scale-[0.98] transition-all disabled:opacity-50">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyse en cours…</> : "Générer le rapport de veille"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
              <p className="text-[11px] text-[#1a1a1a]/40 mb-1">Rapport du {rapport.date_rapport}</p>
              <p className="text-[13px] text-[#1a1a1a]/75 leading-relaxed">{rapport.resume_executif}</p>
            </div>

            <div className="flex gap-1 mb-4 bg-white rounded-xl border border-black/8 p-1 overflow-x-auto">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all whitespace-nowrap ${tab === t ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"}`}>{t}</button>
              ))}
            </div>

            {tab === "Signaux" && (
              <div className="space-y-3 mb-4">
                {rapport.signaux_forts.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-black/8 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-[13px] flex-1">{s.titre}</h3>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${impactColor[s.impact]}`}>{s.impact}</span>
                    </div>
                    <p className="text-[11px] text-[#1a1a1a]/40 mb-2">{s.source}</p>
                    <p className="text-[13px] text-[#1a1a1a]/65">{s.description}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${urgenceDot[s.urgence]}`} />
                      <span className="text-[11px] text-[#1a1a1a]/40">Urgence : {s.urgence}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Tendances" && (
              <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
                <ul className="space-y-3">
                  {rapport.tendances.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1a1a1a]/8 text-[11px] font-bold flex items-center justify-center shrink-0 text-[#1a1a1a]/60">{i + 1}</span>
                      <span className="text-[13px] text-[#1a1a1a]/75">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "Opportunités & Menaces" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-2xl border border-emerald-200 p-5">
                  <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-3">Opportunités</p>
                  <ul className="space-y-2">{rapport.opportunites.map((o, i) => <li key={i} className="text-[13px] text-[#1a1a1a]/70 flex gap-2"><span className="text-emerald-500">+</span>{o}</li>)}</ul>
                </div>
                <div className="bg-white rounded-2xl border border-red-200 p-5">
                  <p className="text-[11px] font-semibold text-red-600 uppercase tracking-wider mb-3">Menaces</p>
                  <ul className="space-y-2">{rapport.menaces.map((m, i) => <li key={i} className="text-[13px] text-[#1a1a1a]/70 flex gap-2"><span className="text-red-400">−</span>{m}</li>)}</ul>
                </div>
              </div>
            )}

            {tab === "Recommandations" && (
              <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
                <ul className="space-y-3">
                  {rapport.recommandations.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-[13px] text-[#1a1a1a]/75">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center">
              <button onClick={() => { setRapport(null); setUrlsText(""); setMotsText(""); }}
                className="px-5 py-2.5 rounded-full border border-black/15 text-[13px] font-medium hover:bg-black/5 transition-all">
                Nouvelle analyse
              </button>
            </div>
          </>
        )}
      </div>
    </main>
    </>
  );
}
