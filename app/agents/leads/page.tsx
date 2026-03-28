"use client";
import Header from "@/components/Header";
import AgentSpecs from "@/components/AgentSpecs";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Niveau = "chaud" | "tiede" | "froid";

interface Lead {
  score: number; niveau: Niveau;
  profil: { type_decideur: string; budget_estime: string; urgence: string; potentiel: string };
  enrichissement: { taille_entreprise_estimee: string; secteur_detail: string; enjeux_probables: string[]; concurrents_probables: string[] };
  email_prospection: { objet: string; corps: string };
  arguments_vente: string[]; prochaine_action: string;
}

const niveauStyle: Record<Niveau, { bg: string; text: string; dot: string }> = {
  chaud: { bg: "bg-red-50 border-red-200", text: "text-red-700", dot: "bg-red-500" },
  tiede: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-400" },
  froid: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700", dot: "bg-blue-400" },
};

const TABS = ["Profil", "Email", "Arguments", "Action"] as const;
type Tab = typeof TABS[number];

export default function Home() {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", entreprise: "", poste: "", secteur: "" });
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Profil");
  const [copied, setCopied] = useState(false);

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function qualifier() {
    if (!form.prenom || !form.entreprise || !form.poste) { setError("Remplissez au minimum prénom, entreprise et poste."); return; }
    setError(""); setLoading(true); setLead(null);
    try {
      const res = await fetch("/api/qualify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setLead(data);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  function copyEmail() {
    if (!lead) return;
    navigator.clipboard.writeText(`Objet: ${lead.email_prospection.objet}\n\n${lead.email_prospection.corps}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F7F4] text-[#1a1a1a]">

      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-24 pb-10">
        <AgentSpecs
          icon="/images/icon-4.png"
          name="Leads"
          tagline="Qualification, scoring et enrichissement de prospects B2B"
          modele="Claude Sonnet 4.6"
          raisonnement={3}
          vitesse={3}
          input="Profil prospect"
          output="Score + Email"
          description="Renseignez un prospect — l'agent le score de 0 à 100, l'enrichit avec des données sectorielles et génère un email de prospection personnalisé prêt à envoyer."
          specs={["200 000 tokens de contexte", "Score de qualification 0–100", "Email de prospection personnalisé", "Arguments de vente sur mesure"]}
        />
        {!lead ? (
          <>
            <p className="text-center text-[13px] text-[#1a1a1a]/50 mb-8">Renseignez un lead — l&apos;agent le score, l&apos;enrichit et génère l&apos;email de prospection.</p>
            <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "prenom", label: "Prénom *", placeholder: "Marie" },
                  { key: "nom", label: "Nom", placeholder: "Dupont" },
                  { key: "email", label: "Email", placeholder: "marie@entreprise.fr" },
                  { key: "entreprise", label: "Entreprise *", placeholder: "Tech SARL" },
                  { key: "poste", label: "Poste *", placeholder: "Directrice des opérations" },
                  { key: "secteur", label: "Secteur", placeholder: "SaaS / Logistique / Finance…" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">{label}</label>
                    <input value={form[key as keyof typeof form]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
                      className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 text-[13px] outline-none focus:border-[#1a1a1a]/30" />
                  </div>
                ))}
              </div>
            </div>
            {error && <p className="text-red-600 text-[13px] text-center mb-4">{error}</p>}
            <div className="flex justify-center">
              <button onClick={qualifier} disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-[14px] font-semibold hover:bg-[#1a1a1a]/85 active:scale-[0.98] transition-all disabled:opacity-50">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Qualification…</> : "Qualifier ce lead"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`rounded-2xl border p-6 mb-4 flex items-center gap-6 ${niveauStyle[lead.niveau].bg}`}>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[48px] font-black leading-none">{lead.score}</span>
                <span className="text-[11px] font-semibold opacity-60">/ 100</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${niveauStyle[lead.niveau].dot}`} />
                  <span className={`text-[14px] font-bold capitalize ${niveauStyle[lead.niveau].text}`}>Lead {lead.niveau}</span>
                </div>
                <p className="text-[13px] opacity-70">{form.prenom} {form.nom} · {form.poste} chez {form.entreprise}</p>
                <p className="text-[13px] font-medium mt-2 opacity-80">→ {lead.prochaine_action}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4 bg-white rounded-xl border border-black/8 p-1 w-fit">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${tab === t ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"}`}>{t}</button>
              ))}
            </div>

            {tab === "Profil" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-2xl border border-black/8 p-5">
                  <h3 className="font-semibold text-[13px] mb-3">Profil décisionnaire</h3>
                  {[["Type", lead.profil.type_decideur], ["Budget estimé", lead.profil.budget_estime], ["Urgence", lead.profil.urgence], ["Potentiel", lead.profil.potentiel]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5 border-b border-black/5 last:border-0">
                      <span className="text-[12px] text-[#1a1a1a]/40">{k}</span>
                      <span className="text-[12px] font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-black/8 p-5">
                  <h3 className="font-semibold text-[13px] mb-3">Enrichissement</h3>
                  <p className="text-[12px] text-[#1a1a1a]/40">Taille : <span className="text-[#1a1a1a]/80 font-medium">{lead.enrichissement.taille_entreprise_estimee}</span></p>
                  <p className="text-[12px] text-[#1a1a1a]/40 mt-1">Secteur : <span className="text-[#1a1a1a]/80 font-medium">{lead.enrichissement.secteur_detail}</span></p>
                  <p className="text-[12px] font-semibold mt-3 mb-1">Enjeux probables</p>
                  <ul className="space-y-1">{lead.enrichissement.enjeux_probables.map((e, i) => <li key={i} className="text-[12px] text-[#1a1a1a]/65 flex gap-2"><span>·</span>{e}</li>)}</ul>
                </div>
              </div>
            )}

            {tab === "Email" && (
              <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[13px]">Email de prospection prêt à envoyer</h3>
                  <button onClick={copyEmail} className="text-[12px] px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white font-medium">
                    {copied ? "Copié ✓" : "Copier"}
                  </button>
                </div>
                <div className="bg-[#F8F7F4] rounded-xl p-4">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]/50 mb-1">Objet :</p>
                  <p className="text-[13px] font-medium mb-4">{lead.email_prospection.objet}</p>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]/50 mb-1">Corps :</p>
                  <p className="text-[13px] text-[#1a1a1a]/75 leading-relaxed whitespace-pre-wrap">{lead.email_prospection.corps}</p>
                </div>
              </div>
            )}

            {tab === "Arguments" && (
              <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
                <h3 className="font-semibold text-[13px] mb-3">Arguments de vente personnalisés</h3>
                <ul className="space-y-3">
                  {lead.arguments_vente.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-[13px] text-[#1a1a1a]/75">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === "Action" && (
              <div className="bg-white rounded-2xl border border-black/8 p-5 mb-4">
                <h3 className="font-semibold text-[13px] mb-3">Prochaine action recommandée</h3>
                <p className="text-[15px] font-medium text-[#1a1a1a]/80">{lead.prochaine_action}</p>
              </div>
            )}

            <div className="flex justify-center">
              <button onClick={() => { setLead(null); setForm({ prenom: "", nom: "", email: "", entreprise: "", poste: "", secteur: "" }); }}
                className="px-5 py-2.5 rounded-full border border-black/15 text-[13px] font-medium hover:bg-black/5 transition-all">
                Nouveau lead
              </button>
            </div>
          </>
        )}
      </div>
    </main>
    </>
  );
}
