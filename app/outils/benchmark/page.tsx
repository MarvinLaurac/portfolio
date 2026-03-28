"use client";

import Header from "@/components/Header";
import { useState } from "react";

type Raisonnement = 1 | 2 | 3 | 4 | 5;
type Vitesse = 1 | 2 | 3;

interface Model {
  name: string;
  provider: string;
  providerColor: string;
  raisonnement: Raisonnement;
  vitesse: Vitesse;
  contexte: string;
  prix_input: string;
  prix_output: string;
  specialite: string;
  score: number;
}

const MODELS: Model[] = [
  {
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    providerColor: "#d97706",
    raisonnement: 5,
    vitesse: 1,
    contexte: "200 000 tokens",
    prix_input: "$15 / M",
    prix_output: "$75 / M",
    specialite: "Raisonnement complexe, juridique, stratégie",
    score: 0,
  },
  {
    name: "Claude Sonnet 4.6",
    provider: "Anthropic",
    providerColor: "#d97706",
    raisonnement: 4,
    vitesse: 3,
    contexte: "200 000 tokens",
    prix_input: "$3 / M",
    prix_output: "$15 / M",
    specialite: "Équilibre performance / coût, usage général",
    score: 0,
  },
  {
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    providerColor: "#d97706",
    raisonnement: 2,
    vitesse: 3,
    contexte: "200 000 tokens",
    prix_input: "$0.8 / M",
    prix_output: "$4 / M",
    specialite: "Tâches rapides, classification, extraction",
    score: 0,
  },
  {
    name: "GPT-4o",
    provider: "OpenAI",
    providerColor: "#16a34a",
    raisonnement: 4,
    vitesse: 2,
    contexte: "128 000 tokens",
    prix_input: "$2.5 / M",
    prix_output: "$10 / M",
    specialite: "Multimodal, vision, code, analyse",
    score: 0,
  },
  {
    name: "o3",
    provider: "OpenAI",
    providerColor: "#16a34a",
    raisonnement: 5,
    vitesse: 1,
    contexte: "200 000 tokens",
    prix_input: "$10 / M",
    prix_output: "$40 / M",
    specialite: "Raisonnement avancé, mathématiques, science",
    score: 0,
  },
  {
    name: "GPT-4o mini",
    provider: "OpenAI",
    providerColor: "#16a34a",
    raisonnement: 2,
    vitesse: 3,
    contexte: "128 000 tokens",
    prix_input: "$0.15 / M",
    prix_output: "$0.6 / M",
    specialite: "Économique, haute fréquence, chatbots",
    score: 0,
  },
  {
    name: "Gemini 2.0 Flash",
    provider: "Google",
    providerColor: "#2563eb",
    raisonnement: 3,
    vitesse: 3,
    contexte: "1 000 000 tokens",
    prix_input: "$0.1 / M",
    prix_output: "$0.4 / M",
    specialite: "Contexte long, documents, multimodal",
    score: 0,
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    providerColor: "#2563eb",
    raisonnement: 5,
    vitesse: 2,
    contexte: "1 000 000 tokens",
    prix_input: "$1.25 / M",
    prix_output: "$10 / M",
    specialite: "Long contexte, analyse de documents massifs",
    score: 0,
  },
  {
    name: "Mistral Large",
    provider: "Mistral",
    providerColor: "#7c3aed",
    raisonnement: 3,
    vitesse: 2,
    contexte: "128 000 tokens",
    prix_input: "$2 / M",
    prix_output: "$6 / M",
    specialite: "Open-source, Europe, confidentialité",
    score: 0,
  },
];

const RAISONNEMENT_LABEL: Record<number, string> = {
  1: "Faible", 2: "Moyen", 3: "Élevé", 4: "Très élevé", 5: "Maximum",
};
const VITESSE_LABEL: Record<number, string> = {
  1: "Lente", 2: "Moyenne", 3: "Rapide",
};

function Dots({ count, max = 5, interactive, onSelect }: { count: number; max?: number; interactive?: boolean; onSelect?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onSelect?.(i + 1)}
          className={`w-3 h-3 rounded-full transition-all ${i < count ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/15"} ${interactive ? "cursor-pointer hover:scale-125" : ""}`}
        />
      ))}
    </div>
  );
}

function Bolts({ count, max = 3, interactive, onSelect }: { count: number; max?: number; interactive?: boolean; onSelect?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onSelect?.(i + 1)}
          className={`transition-all ${interactive ? "cursor-pointer hover:scale-125" : ""}`}
        >
          <svg viewBox="0 0 24 24" className={`w-4 h-4 ${i < count ? "text-[#1a1a1a]" : "text-[#1a1a1a]/15"}`} fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function scoreModel(model: Model, r: Raisonnement, v: Vitesse): number {
  const rDiff = Math.abs(model.raisonnement - r);
  const vDiff = Math.abs(model.vitesse - v);
  return Math.max(0, 100 - rDiff * 20 - vDiff * 15);
}

export default function BenchmarkPage() {
  const [raisonnement, setRaisonnement] = useState<Raisonnement>(4);
  const [vitesse, setVitesse] = useState<Vitesse>(2);

  const ranked = MODELS
    .map((m) => ({ ...m, score: scoreModel(m, raisonnement, vitesse) }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F8F7F4] text-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-24 pb-12">

          {/* Selector */}
          <div className="bg-white rounded-2xl border border-black/8 p-5 sm:p-6 mb-6">
            <p className="text-[11px] font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-5">Paramètres requis</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Raisonnement */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">Raisonnement</span>
                  <span className="text-[12px] text-[#1a1a1a]/50 font-medium">{RAISONNEMENT_LABEL[raisonnement]}</span>
                </div>
                <Dots count={raisonnement} interactive onSelect={(v) => setRaisonnement(v as Raisonnement)} />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-[#1a1a1a]/30">Faible</span>
                  <span className="text-[10px] text-[#1a1a1a]/30">Maximum</span>
                </div>
              </div>

              {/* Vitesse */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#1a1a1a]">Vitesse</span>
                  <span className="text-[12px] text-[#1a1a1a]/50 font-medium">{VITESSE_LABEL[vitesse]}</span>
                </div>
                <Bolts count={vitesse} interactive onSelect={(v) => setVitesse(v as Vitesse)} />
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-[#1a1a1a]/30">Lente</span>
                  <span className="text-[10px] text-[#1a1a1a]/30">Rapide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Meilleur match */}
          <div className="bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: top.providerColor + "30" }}>
              <span className="text-[13px] font-bold" style={{ color: top.providerColor }}>{top.name.split(" ")[0][0]}{top.name.split(" ")[1]?.[0] ?? ""}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white font-bold text-[16px]">{top.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: top.providerColor + "25", color: top.providerColor }}>{top.provider}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#d4f538]/20 text-[#d4f538] font-semibold">Meilleur match</span>
              </div>
              <p className="text-white/50 text-[12px] mt-0.5">{top.specialite}</p>
            </div>
            <span className="text-[28px] font-black text-white shrink-0">{top.score}<span className="text-[14px] text-white/40 font-normal">%</span></span>
          </div>

          {/* Classement complet */}
          <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
            <div className="px-5 py-4 border-b border-black/6">
              <h2 className="font-semibold text-[14px]">Classement des modèles</h2>
            </div>
            <div className="divide-y divide-black/5">
              {ranked.map((m, i) => (
                <div key={m.name} className="px-5 py-4 flex items-center gap-4">
                  <span className={`text-[13px] font-bold w-5 shrink-0 ${i === 0 ? "text-[#1a1a1a]" : "text-[#1a1a1a]/25"}`}>{i + 1}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-[13px]">{m.name}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: m.providerColor + "15", color: m.providerColor }}>{m.provider}</span>
                    </div>
                    <p className="text-[11px] text-[#1a1a1a]/40 mt-0.5 truncate">{m.specialite}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-5 shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-[#1a1a1a]/35 uppercase tracking-wide">Raison.</span>
                      <Dots count={m.raisonnement} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-[#1a1a1a]/35 uppercase tracking-wide">Vitesse</span>
                      <Bolts count={m.vitesse} />
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[10px] text-[#1a1a1a]/35 uppercase tracking-wide">Prix</span>
                      <span className="text-[12px] font-medium text-[#1a1a1a]/70">{m.prix_input}</span>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="w-14 shrink-0 text-right">
                    <span className={`text-[14px] font-bold ${i === 0 ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"}`}>{m.score}%</span>
                    <div className="h-1 rounded-full bg-black/5 mt-1">
                      <div className="h-1 rounded-full bg-[#1a1a1a] transition-all duration-500" style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contexte */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Contexte", value: top.contexte, icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
              { label: "Prix input", value: top.prix_input, icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
              { label: "Prix output", value: top.prix_output, icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-black/8 px-5 py-4 flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 text-[#1a1a1a]/30" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
                <div>
                  <p className="text-[11px] text-[#1a1a1a]/40">{stat.label}</p>
                  <p className="text-[14px] font-semibold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
