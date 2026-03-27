"use client";
import Header from "@/components/Header";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Statut = "ok" | "ecart" | "manquant";
type Urgence = "haute" | "moyenne" | "faible";

interface Correspondance {
  description: string;
  montant_facture: number;
  montant_releve: number;
  statut: Statut;
  commentaire: string;
}

interface Anomalie {
  type: string;
  description: string;
  montant: number;
  urgence: Urgence;
  action_recommandee: string;
}

interface Rapport {
  resume: {
    total_factures: number;
    total_releve: number;
    ecart_global: number;
    nb_anomalies: number;
  };
  correspondances: Correspondance[];
  anomalies: Anomalie[];
  recommandations: string[];
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
}

const statutStyle: Record<Statut, string> = {
  ok: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ecart: "bg-amber-50 text-amber-700 border-amber-200",
  manquant: "bg-red-50 text-red-700 border-red-200",
};

const urgenceStyle: Record<Urgence, string> = {
  haute: "bg-red-100 text-red-700",
  moyenne: "bg-amber-100 text-amber-700",
  faible: "bg-slate-100 text-slate-600",
};

const urgenceDot: Record<Urgence, string> = {
  haute: "bg-red-500",
  moyenne: "bg-amber-400",
  faible: "bg-slate-400",
};

export default function Home() {
  const [facturesText, setFacturesText] = useState("");
  const [releveText, setReleveText] = useState("");
  const [rapport, setRapport] = useState<Rapport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const facturesRef = useRef<HTMLTextAreaElement>(null);
  const releveRef = useRef<HTMLTextAreaElement>(null);

  async function analyser() {
    if (!facturesText.trim() || !releveText.trim()) {
      setError("Veuillez renseigner les deux champs.");
      return;
    }
    setError("");
    setLoading(true);
    setRapport(null);
    try {
      const res = await fetch("/api/reconcile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factures: facturesText, releve: releveText }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRapport(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setRapport(null);
    setFacturesText("");
    setReleveText("");
    setError("");
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F7F4] text-[#1a1a1a]">

      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-24 pb-10">
        {!rapport ? (
          <>
            <div className="text-center mb-10">
              <p className="text-[13px] text-[#1a1a1a]/50 max-w-md mx-auto">
                Collez vos factures fournisseurs et votre relevé bancaire. L&apos;agent détecte automatiquement les écarts et anomalies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl border border-[#1a1a1a]/8 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-semibold text-[13px]">Factures fournisseurs</span>
                </div>
                <textarea
                  ref={facturesRef}
                  value={facturesText}
                  onChange={(e) => setFacturesText(e.target.value)}
                  placeholder={"Facture #001 - Fournisseur SARL\nDate: 15/03/2026\nMontant HT: 1 200,00 €\nTVA (20%): 240,00 €\nTotal TTC: 1 440,00 €\n\nFacture #002 - Tech Solutions\nDate: 18/03/2026\nTotal TTC: 1 020,00 €"}
                  className="flex-1 min-h-[220px] resize-none text-[13px] text-[#1a1a1a]/80 placeholder:text-[#1a1a1a]/20 outline-none leading-relaxed font-mono"
                />
              </div>

              <div className="bg-white rounded-2xl border border-[#1a1a1a]/8 p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="font-semibold text-[13px]">Relevé bancaire</span>
                </div>
                <textarea
                  ref={releveRef}
                  value={releveText}
                  onChange={(e) => setReleveText(e.target.value)}
                  placeholder={"16/03/2026 - Virement SARL FOURNISSEUR - 1 440,00 €\n19/03/2026 - Tech Solutions - 1 200,00 €\n20/03/2026 - Virement inconnu XYZ - 500,00 €\n22/03/2026 - Abonnement SaaS - 99,00 €"}
                  className="flex-1 min-h-[220px] resize-none text-[13px] text-[#1a1a1a]/80 placeholder:text-[#1a1a1a]/20 outline-none leading-relaxed font-mono"
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-[13px] text-center mb-4">{error}</p>}

            <div className="flex justify-center">
              <button onClick={analyser} disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-[14px] font-semibold hover:bg-[#1a1a1a]/85 active:scale-[0.98] transition-all disabled:opacity-50">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyse en cours…</>
                ) : (
                  <><svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>Lancer la réconciliation</>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total factures", value: fmt(rapport.resume.total_factures), color: "text-blue-600" },
                { label: "Total relevé", value: fmt(rapport.resume.total_releve), color: "text-violet-600" },
                { label: "Écart global", value: fmt(rapport.resume.ecart_global), color: rapport.resume.ecart_global === 0 ? "text-emerald-600" : "text-red-600" },
                { label: "Anomalies", value: `${rapport.resume.nb_anomalies}`, color: rapport.resume.nb_anomalies === 0 ? "text-emerald-600" : "text-amber-600" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-[#1a1a1a]/8 px-5 py-4">
                  <p className="text-[11px] text-[#1a1a1a]/40 mb-1">{item.label}</p>
                  <p className={`text-[20px] font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-[#1a1a1a]/8 mb-4 overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1a1a1a]/6">
                <h2 className="font-semibold text-[14px]">Correspondances</h2>
              </div>
              <div className="divide-y divide-[#1a1a1a]/5">
                {rapport.correspondances.map((c, i) => (
                  <div key={i} className="px-5 py-3 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate">{c.description}</p>
                      <p className="text-[12px] text-[#1a1a1a]/40 mt-0.5">{c.commentaire}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[12px] text-[#1a1a1a]/40">{fmt(c.montant_facture)}</span>
                      <span className="text-[#1a1a1a]/20">→</span>
                      <span className="text-[12px] font-medium">{fmt(c.montant_releve)}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statutStyle[c.statut]}`}>
                        {c.statut === "ok" ? "OK" : c.statut === "ecart" ? "Écart" : "Manquant"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {rapport.anomalies.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#1a1a1a]/8 mb-4 overflow-hidden">
                <div className="px-5 py-4 border-b border-[#1a1a1a]/6">
                  <h2 className="font-semibold text-[14px]">Anomalies détectées</h2>
                </div>
                <div className="divide-y divide-[#1a1a1a]/5">
                  {rapport.anomalies.map((a, i) => (
                    <div key={i} className="px-5 py-4 flex items-start gap-4">
                      <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${urgenceDot[a.urgence]}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[13px] font-medium">{a.description}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${urgenceStyle[a.urgence]}`}>{a.urgence}</span>
                        </div>
                        <p className="text-[12px] text-[#1a1a1a]/50">{a.action_recommandee}</p>
                      </div>
                      <span className="text-[13px] font-semibold shrink-0">{fmt(a.montant)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rapport.recommandations.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#1a1a1a]/8 mb-6 p-5">
                <h2 className="font-semibold text-[14px] mb-3">Recommandations</h2>
                <ul className="space-y-2">
                  {rapport.recommandations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#1a1a1a]/70">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#1a1a1a]/30 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center">
              <button onClick={reset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1a1a1a]/15 text-[13px] font-medium hover:bg-[#1a1a1a]/5 transition-all">
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
