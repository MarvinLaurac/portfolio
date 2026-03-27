import Image from "next/image";
import Link from "next/link";

const AGENTS = [
  {
    href: "/agents/compta",
    label: "COMPTA",
    desc: "charge factures + relevés, détecte les écarts\net génère un rapport d'anomalies",
  },
  {
    href: "/agents/contrats",
    label: "CONTRATS",
    desc: "analyse un contrat texte, identifie les clauses\nrisquées, dates clés et obligations cachées",
  },
  {
    href: "/agents/leads",
    label: "LEADS",
    desc: "score un lead B2B, l'enrichit\net génère l'email de prospection personnalisé",
  },
  {
    href: "/agents/veille",
    label: "VEILLE",
    desc: "scrape des URLs, surveille des mots-clés\net génère un rapport stratégique hebdomadaire",
  },
  {
    href: "/agents/rh",
    label: "RH",
    desc: "génère contrat, email de bienvenue, planning\n30 jours, checklist IT et objectifs 90 jours",
  },
];

export default function Work() {
  return (
    <section id="work" className="flex flex-col items-center pt-12 pb-20 px-4">
      {/* Section title */}
      <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D] mb-6">
        MON TRAVAIL
      </h2>

<div className="flex flex-col items-center gap-10 w-full max-w-xs">
        {/* LEX Card */}
        <Link href="/lex" className="flex flex-col items-center group w-full">
          <Image
            src="/logo_lex.png"
            alt="LEX"
            width={24}
            height={24}
            className="w-6 h-6 mb-2"
          />
          <h3 className="font-inter font-bold text-[12px] tracking-[0.15em] mb-1 group-hover:text-[#2D2D2D] transition-colors">
            LEX
          </h3>
          <p className="font-inter text-[10px] text-[#999] text-center leading-relaxed">
            analyse automatiquement n&apos;importe quel contrat PDF
            <br />
            et génère un rapport juridique
          </p>
          <span className="font-inter text-[10px] text-[#2D2D2D]/30 mt-2 group-hover:text-[#2D2D2D]/60 transition-colors">
            Essayer →
          </span>
        </Link>

        {/* Séparateur Agents IA */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-[#2D2D2D]/8" />
          <span className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-[#2D2D2D]/30">Agents IA</span>
          <div className="flex-1 h-px bg-[#2D2D2D]/8" />
        </div>

        {/* 5 Agent Cards */}
        {AGENTS.map((agent) => (
          <Link key={agent.href} href={agent.href} className="flex flex-col items-center group w-full">
            <h3 className="font-inter font-bold text-[12px] tracking-[0.15em] mb-1 group-hover:text-[#2D2D2D] transition-colors">
              {agent.label}
            </h3>
            <p className="font-inter text-[10px] text-[#999] text-center leading-relaxed whitespace-pre-line">
              {agent.desc}
            </p>
            <span className="font-inter text-[10px] text-[#2D2D2D]/30 mt-2 group-hover:text-[#2D2D2D]/60 transition-colors">
              Essayer →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
