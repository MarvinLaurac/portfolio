"use client";
import Header from "@/components/Header";
import AgentSpecs from "@/components/AgentSpecs";
import NoticeBanner from "@/components/NoticeBanner";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Risque = "critique" | "eleve" | "modere";
type Importance = "critique" | "importante" | "info";

interface ClauseRisquee {
  titre: string; extrait: string; risque: Risque; explication: string; recommandation: string;
}
interface DateCle {
  label: string; date: string; importance: Importance;
}
interface Obligation {
  partie: string; obligation: string; penalite: string;
}
interface Analyse {
  type_contrat: string; parties: string[]; duree: string; montant: string; score_risque: number;
  clauses_risquees: ClauseRisquee[]; dates_cles: DateCle[]; obligations: Obligation[];
  points_reneg: string[]; synthese: string;
}

const risqueStyle: Record<Risque, string> = {
  critique: "bg-red-50 text-red-700 border-red-200",
  eleve: "bg-orange-50 text-orange-700 border-orange-200",
  modere: "bg-amber-50 text-amber-700 border-amber-200",
};
const risqueDot: Record<Risque, string> = { critique: "bg-red-500", eleve: "bg-orange-400", modere: "bg-amber-400" };
const importanceDot: Record<Importance, string> = { critique: "bg-red-500", importante: "bg-amber-400", info: "bg-slate-300" };

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#10b981";
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={`${(score / 100) * 251} 251`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <span className="text-[12px] text-[#1a1a1a]/50">Score de risque</span>
    </div>
  );
}

const TABS = ["Clauses risquées", "Dates clés", "Obligations", "Renégociation"] as const;
type Tab = typeof TABS[number];

export default function Home() {
  const [texte, setTexte] = useState("");
  const [analyse, setAnalyse] = useState<Analyse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Clauses risquées");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function analyser() {
    if (!texte.trim()) { setError("Collez le texte du contrat."); return; }
    setError(""); setLoading(true); setAnalyse(null); setChat([]);
    try {
      const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ texte }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnalyse(data);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  async function poserQuestion() {
    if (!question.trim() || !texte) return;
    const q = question;
    setQuestion(""); setChatLoading(true);
    setChat((c) => [...c, { role: "user", content: q }]);
    try {
      const res = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texte: `CONTRAT:\n${texte}\n\nQUESTION: ${q}\n\nRéponds en français de façon concise et précise. Retourne juste la réponse en texte simple (pas de JSON).` }) });
      const data = await res.json();
      const reponse = data.synthese || data.error || JSON.stringify(data);
      setChat((c) => [...c, { role: "assistant", content: reponse }]);
    } catch (e) { setChat((c) => [...c, { role: "assistant", content: "Erreur : " + (e as Error).message }]); }
    finally { setChatLoading(false); }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F7F4] text-[#1a1a1a]">

      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-24 pb-10">
        <NoticeBanner />
        <AgentSpecs
          icon="/images/icon-2.png"
          name="Contrats"
          tagline="Détection de clauses abusives et obligations contractuelles"
          modele="Claude Sonnet 4.6"
          raisonnement={4}
          vitesse={3}
          input="Texte du contrat"
          output="Rapport structuré"
          description="Collez le texte de votre contrat. L'agent identifie les clauses risquées, extrait les dates clés, liste les obligations de chaque partie et propose des points de renégociation."
          specs={["200 000 tokens de contexte", "Clauses risquées classifiées", "Dates clés extraites automatiquement", "Points de renégociation suggérés"]}
        />
        {!analyse ? (
          <>
            <p className="text-center text-[13px] text-[#1a1a1a]/50 mb-8 max-w-md mx-auto">
              Collez le texte de votre contrat. L&apos;agent identifie les clauses risquées, dates clés et obligations.
            </p>
            <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="font-semibold text-[13px]">Texte du contrat</span>
                </div>
                <span className="text-[11px] text-[#1a1a1a]/30">{texte.length} caractères</span>
              </div>
              <textarea value={texte} onChange={(e) => setTexte(e.target.value)}
                placeholder="Collez ici le texte complet de votre contrat (CDI, CDD, prestation, bail, NDA...)"
                className="w-full min-h-[300px] resize-none text-[13px] text-[#1a1a1a]/80 placeholder:text-[#1a1a1a]/20 outline-none leading-relaxed" />
            </div>
            {error && <p className="text-red-600 text-[13px] text-center mb-4">{error}</p>}
            <div className="flex justify-center">
              <button onClick={analyser} disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-[14px] font-semibold hover:bg-[#1a1a1a]/85 active:scale-[0.98] transition-all disabled:opacity-50">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyse en cours…</> : <>Analyser le contrat</>}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4 flex items-start justify-between gap-6">
              <div className="flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#1a1a1a]/30">{analyse.type_contrat}</span>
                <p className="text-[15px] font-semibold mt-1">{analyse.parties.join(" · ")}</p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  {[{ label: "Durée", value: analyse.duree }, { label: "Montant", value: analyse.montant }, { label: "Clauses risquées", value: `${analyse.clauses_risquees.length}` }].map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-[10px] text-[#1a1a1a]/35">{item.label}</span>
                      <span className="text-[13px] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-[#1a1a1a]/60 mt-4 leading-relaxed">{analyse.synthese}</p>
              </div>
              <ScoreGauge score={analyse.score_risque} />
            </div>

            <div className="flex gap-1 mb-4 bg-white rounded-xl border border-black/8 p-1 w-fit">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${tab === t ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"}`}>{t}</button>
              ))}
            </div>

            {tab === "Clauses risquées" && (
              <div className="space-y-3 mb-4">
                {analyse.clauses_risquees.map((c, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-black/8 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${risqueDot[c.risque]}`} />
                      <span className="font-semibold text-[14px]">{c.titre}</span>
                      <span className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full border ${risqueStyle[c.risque]}`}>{c.risque}</span>
                    </div>
                    <p className="text-[12px] text-[#1a1a1a]/40 italic mb-2 pl-5 border-l-2 border-[#1a1a1a]/10">&quot;{c.extrait}&quot;</p>
                    <p className="text-[13px] text-[#1a1a1a]/65 mb-1">{c.explication}</p>
                    <p className="text-[12px] text-blue-600 font-medium">→ {c.recommandation}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Dates clés" && (
              <div className="bg-white rounded-2xl border border-black/8 overflow-hidden mb-4">
                <div className="divide-y divide-black/5">
                  {analyse.dates_cles.map((d, i) => (
                    <div key={i} className="px-5 py-3 flex items-center gap-4">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${importanceDot[d.importance]}`} />
                      <span className="text-[13px] font-medium flex-1">{d.label}</span>
                      <span className="text-[13px] text-[#1a1a1a]/60 font-mono">{d.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "Obligations" && (
              <div className="space-y-3 mb-4">
                {analyse.obligations.map((o, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-black/8 p-4 flex items-start gap-4">
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-[#1a1a1a]/6 shrink-0">{o.partie}</span>
                    <div className="flex-1">
                      <p className="text-[13px] text-[#1a1a1a]/80">{o.obligation}</p>
                      {o.penalite && <p className="text-[12px] text-red-500 mt-1">Pénalité : {o.penalite}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Renégociation" && (
              <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
                <ul className="space-y-3">
                  {analyse.points_reneg.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px] text-[#1a1a1a]/75">
                      <span className="mt-1 text-[11px] font-bold bg-[#1a1a1a] text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0">{i + 1}</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
              <p className="text-[13px] font-semibold mb-3">Posez une question sur le contrat</p>
              {chat.map((m, i) => (
                <div key={i} className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] ${m.role === "user" ? "bg-[#1a1a1a] text-white" : "bg-[#1a1a1a]/6 text-[#1a1a1a]/80"}`}>{m.content}</div>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && poserQuestion()}
                  placeholder="Ex: Quelle est la clause de non-concurrence ?"
                  className="flex-1 text-[13px] px-3 py-2 rounded-xl border border-black/10 outline-none focus:border-[#1a1a1a]/30" />
                <button onClick={poserQuestion} disabled={chatLoading}
                  className="px-4 py-2 rounded-xl bg-[#1a1a1a] text-white text-[12px] font-medium disabled:opacity-50">
                  {chatLoading ? "…" : "Envoyer"}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={() => { setAnalyse(null); setTexte(""); setChat([]); }}
                className="px-5 py-2.5 rounded-full border border-black/15 text-[13px] font-medium hover:bg-black/5 transition-all">
                Nouveau contrat
              </button>
            </div>
          </>
        )}
      </div>
      <input ref={fileRef} type="file" className="hidden" />
    </main>
    </>
  );
}
