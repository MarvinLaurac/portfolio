"use client";
import Header from "@/components/Header";
import AgentSpecs from "@/components/AgentSpecs";
import NoticeBanner from "@/components/NoticeBanner";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SemaineJ { semaine: number; titre: string; activites: string[]; }
interface ChecklistCategorie { categorie: string; items: string[]; }
interface Dossier {
  contrat: { titre: string; corps: string };
  email_bienvenue: { objet: string; corps: string };
  planning_30j: SemaineJ[];
  checklist_it: ChecklistCategorie[];
  objectifs_90j: string[];
}

const TABS = ["Contrat", "Email", "Planning 30j", "Checklist IT", "Objectifs 90j"] as const;
type Tab = typeof TABS[number];
const CONTRAT_TYPES = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];
const TELETRAVAIL_OPTIONS = ["Non", "1 jour/sem", "2 jours/sem", "3 jours/sem", "Full remote"];

export default function Home() {
  const [form, setForm] = useState({ prenom: "", nom: "", poste: "", departement: "", date_arrivee: "", manager: "", type_contrat: "CDI", salaire: "", teletravail: "Non" });
  const [dossier, setDossier] = useState<Dossier | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Contrat");
  const [copied, setCopied] = useState<string | null>(null);

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function generer() {
    if (!form.prenom || !form.nom || !form.poste || !form.date_arrivee) { setError("Remplissez au minimum prénom, nom, poste et date d'arrivée."); return; }
    setError(""); setLoading(true); setDossier(null);
    try {
      const res = await fetch("/api/onboard", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setDossier(data);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key); setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F7F4] text-[#1a1a1a]">

      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-24 pb-10">
        <NoticeBanner />
        <AgentSpecs
          icon="/images/icon-5.png"
          name="RH"
          tagline="Génération complète du dossier d'onboarding employé"
          modele="Claude Sonnet 4.6"
          raisonnement={3}
          vitesse={3}
          input="Formulaire employé"
          output="5 documents"
          description="Renseignez le profil du nouvel employé — l'agent génère automatiquement le contrat, l'email de bienvenue, le planning 30 jours, la checklist IT et les objectifs 90 jours."
          specs={["200 000 tokens de contexte", "Contrat de travail généré", "Planning 30 jours structuré", "Objectifs 90 jours définis"]}
        />
        {!dossier ? (
          <>
            <p className="text-center text-[13px] text-[#1a1a1a]/50 mb-8">Renseignez le profil du nouvel employé — l&apos;agent génère contrat, email, planning 30 jours, checklist IT et objectifs 90 jours.</p>
            <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4">
              <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-4">Informations personnelles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { key: "prenom", label: "Prénom *", placeholder: "Sophie" },
                  { key: "nom", label: "Nom *", placeholder: "Martin" },
                  { key: "poste", label: "Poste *", placeholder: "Développeur Full Stack" },
                  { key: "departement", label: "Département", placeholder: "Ingénierie / Marketing / RH…" },
                  { key: "manager", label: "Manager direct", placeholder: "Jean Dupont" },
                  { key: "salaire", label: "Salaire brut mensuel (€)", placeholder: "3500" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">{label}</label>
                    <input value={form[key as keyof typeof form]} onChange={(e) => set(key, e.target.value)} placeholder={placeholder}
                      className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 text-[13px] outline-none focus:border-[#1a1a1a]/30" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-4">Conditions du poste</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Date d&apos;arrivée *</label>
                  <input type="date" value={form.date_arrivee} onChange={(e) => set("date_arrivee", e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 text-[13px] outline-none focus:border-[#1a1a1a]/30" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Type de contrat</label>
                  <select value={form.type_contrat} onChange={(e) => set("type_contrat", e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 text-[13px] outline-none bg-white">
                    {CONTRAT_TYPES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider">Télétravail</label>
                  <select value={form.teletravail} onChange={(e) => set("teletravail", e.target.value)}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-black/10 text-[13px] outline-none bg-white">
                    {TELETRAVAIL_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
            {error && <p className="text-red-600 text-[13px] text-center mb-4">{error}</p>}
            <div className="flex justify-center">
              <button onClick={generer} disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-[14px] font-semibold hover:bg-[#1a1a1a]/85 active:scale-[0.98] transition-all disabled:opacity-50">
                {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Génération en cours…</> : "Générer le dossier d'onboarding"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] text-white flex items-center justify-center text-[20px] font-bold shrink-0">
                {form.prenom[0]}{form.nom[0]}
              </div>
              <div className="flex-1">
                <h2 className="text-[18px] font-bold">{form.prenom} {form.nom}</h2>
                <p className="text-[13px] text-[#1a1a1a]/50">{form.poste}{form.departement ? ` · ${form.departement}` : ""}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#1a1a1a]/5 font-medium">{form.type_contrat}</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#1a1a1a]/5 font-medium">Arrivée : {form.date_arrivee}</span>
                  {form.teletravail !== "Non" && <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">{form.teletravail}</span>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-[#1a1a1a]/40">5 documents générés</p>
                <p className="text-[13px] font-semibold mt-0.5 text-emerald-600">✓ Prêts</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4 bg-white rounded-xl border border-black/8 p-1 overflow-x-auto">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all whitespace-nowrap ${tab === t ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"}`}>{t}</button>
              ))}
            </div>

            {tab === "Contrat" && (
              <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[14px]">{dossier.contrat.titre}</h3>
                  <button onClick={() => copy(dossier.contrat.corps, "contrat")} className="text-[12px] px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white font-medium">
                    {copied === "contrat" ? "Copié ✓" : "Copier"}
                  </button>
                </div>
                <div className="bg-[#F8F7F4] rounded-xl p-5 max-h-[500px] overflow-y-auto">
                  <p className="text-[11px] text-[#1a1a1a]/75 leading-relaxed whitespace-pre-wrap font-mono">{dossier.contrat.corps}</p>
                </div>
              </div>
            )}

            {tab === "Email" && (
              <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[14px]">Email de bienvenue</h3>
                  <button onClick={() => copy(`Objet: ${dossier.email_bienvenue.objet}\n\n${dossier.email_bienvenue.corps}`, "email")} className="text-[12px] px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white font-medium">
                    {copied === "email" ? "Copié ✓" : "Copier"}
                  </button>
                </div>
                <div className="bg-[#F8F7F4] rounded-xl p-5">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]/40 mb-1">Objet :</p>
                  <p className="text-[14px] font-medium mb-4">{dossier.email_bienvenue.objet}</p>
                  <p className="text-[12px] font-semibold text-[#1a1a1a]/40 mb-2">Corps :</p>
                  <p className="text-[13px] text-[#1a1a1a]/75 leading-relaxed whitespace-pre-wrap">{dossier.email_bienvenue.corps}</p>
                </div>
              </div>
            )}

            {tab === "Planning 30j" && (
              <div className="space-y-3 mb-4">
                {dossier.planning_30j.map((s) => (
                  <div key={s.semaine} className="bg-white rounded-2xl border border-black/8 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white text-[12px] font-bold flex items-center justify-center shrink-0">S{s.semaine}</span>
                      <h4 className="font-semibold text-[13px]">{s.titre}</h4>
                    </div>
                    <ul className="space-y-2">
                      {s.activites.map((a, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/30 shrink-0" />
                          <span className="text-[13px] text-[#1a1a1a]/70">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {tab === "Checklist IT" && (
              <div className="space-y-3 mb-4">
                {dossier.checklist_it.map((cat) => (
                  <div key={cat.categorie} className="bg-white rounded-2xl border border-black/8 p-5">
                    <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-3">{cat.categorie}</p>
                    <div className="space-y-2.5">
                      {cat.items.map((item, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                          <span className="w-5 h-5 rounded border border-black/15 group-hover:border-[#1a1a1a]/40 transition-colors shrink-0" />
                          <span className="text-[13px] text-[#1a1a1a]/70">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Objectifs 90j" && (
              <div className="bg-white rounded-2xl border border-black/8 p-6 mb-4">
                <h3 className="font-semibold text-[14px] mb-4">Objectifs des 90 premiers jours</h3>
                <ul className="space-y-3">
                  {dossier.objectifs_90j.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-[13px] text-[#1a1a1a]/75 leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center">
              <button onClick={() => { setDossier(null); setForm({ prenom: "", nom: "", poste: "", departement: "", date_arrivee: "", manager: "", type_contrat: "CDI", salaire: "", teletravail: "Non" }); }}
                className="px-5 py-2.5 rounded-full border border-black/15 text-[13px] font-medium hover:bg-black/5 transition-all">
                Nouvel employé
              </button>
            </div>
          </>
        )}
      </div>
    </main>
    </>
  );
}
