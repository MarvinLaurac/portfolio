import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const AGENTS = [
  { icon: "/images/icon-1.png", name: "Lex", desc: "Analyse n'importe quel contrat PDF et génère un rapport juridique complet avec les risques.", href: "/lex" },
  { icon: "/images/icon-2.png", name: "Contrats", desc: "Détecte les clauses abusives, dates clés et obligations dans vos contrats en quelques secondes.", href: "/agents/contrats" },
  { icon: "/images/icon-3.png", name: "Compta", desc: "Réconcilie vos factures fournisseurs avec votre relevé bancaire et identifie les anomalies.", href: "/agents/compta" },
  { icon: "/images/icon-4.png", name: "Leads", desc: "Score, enrichit et qualifie vos prospects, puis génère l'email de prospection personnalisé.", href: "/agents/leads" },
  { icon: "/images/icon-5.png", name: "RH", desc: "Génère le dossier d'onboarding complet : contrat, email, planning 30 jours et objectifs 90 jours.", href: "/agents/rh" },
];

export default function TousLesAgents() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 pt-24 sm:pt-28 pb-12 sm:pb-20">

          {/* Header */}
          <div className="flex items-start justify-between mb-6 sm:mb-10">
            <div>
              <Link href="/" className="font-inter text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors mb-3 inline-block">
                ← Retour
              </Link>
              <h1 className="font-inter font-bold text-[28px] sm:text-[40px] text-[#1a1a1a]">Les agents</h1>
            </div>
          </div>

          {/* Liste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {AGENTS.map((item, i) => {
              const showLine = i < AGENTS.length - 2;
              return (
                <a key={item.name} href={item.href} className="flex flex-col hover:bg-black/[0.02] transition-colors px-1 sm:px-2">
                  <div className="flex items-center gap-3 sm:gap-4 py-4 sm:py-5">
                    <Image src={item.icon} alt={item.name} width={80} height={80} className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shrink-0" />
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                      <h3 className="font-inter font-bold text-[16px] sm:text-[18px] text-[#1a1a1a] mb-1">{item.name}</h3>
                      <p className="font-inter text-[12px] sm:text-[13px] text-[#1a1a1a]/50 leading-snug">{item.desc}</p>
                    </div>
                    <span className="shrink-0 bg-[#e8e8ed] text-[#007aff] font-semibold text-[13px] px-4 py-1.5 rounded-full hover:bg-[#dddde3] transition-colors">
                      Obtenir
                    </span>
                  </div>
                  {showLine && <div className="h-px w-full bg-[#e1ccbb]" />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer dégradé */}
        <footer
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #f2ede9 0%, #ffa100 100%)", minHeight: "260px" }}
        >
          <Image src="/images/footer-text.png" alt="Marvin Laurac" width={1200} height={260} className="w-full h-auto object-contain" priority />
        </footer>
      </main>
    </>
  );
}
