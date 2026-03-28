import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";

export default function Home() {
  const agents = [
    { icon: "/images/icon-1.png", name: "Lex", desc: "Analyse n'importe quel contrat PDF et génère un rapport juridique complet avec les risques.", href: "/lex" },
    { icon: "/images/icon-2.png", name: "Contrats", desc: "Détecte les clauses abusives, dates clés et obligations dans vos contrats en quelques secondes.", href: "/agents/contrats" },
    { icon: "/images/icon-3.png", name: "Compta", desc: "Réconcilie vos factures fournisseurs avec votre relevé bancaire et identifie les anomalies.", href: "/agents/compta" },
    { icon: "/images/icon-4.png", name: "Leads", desc: "Score, enrichit et qualifie vos prospects, puis génère l'email de prospection personnalisé.", href: "/agents/leads" },
    { icon: "/images/icon-5.png", name: "RH", desc: "Génère le dossier d'onboarding complet : contrat, email, planning 30 jours et objectifs 90 jours.", href: "/agents/rh" },
  ];

  const outils = [
    { icon: "/images/icon-6.png", name: "Veille", desc: "Surveille vos sources, détecte les signaux forts et génère un rapport stratégique en temps réel.", href: "/agents/veille" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Illustration juste sous le header */}
        <div className="w-full px-3 sm:px-4 pt-24 sm:pt-28 max-w-6xl mx-auto">
          {/* Mobile illustration (vertical) */}
          <Image
            src="/images/outils-agents-mobile.svg"
            alt="Outils et agents pour entreprises"
            width={600}
            height={900}
            className="block sm:hidden w-full h-auto rounded-xl"
            priority
          />
          {/* Desktop illustration (horizontal) */}
          <Image
            src="/images/outils-agents-entreprises.svg"
            alt="Outils et agents pour entreprises"
            width={1200}
            height={600}
            className="hidden sm:block w-full h-auto rounded-2xl"
            priority
          />
          <div className="mt-3 sm:mt-4 h-px w-full bg-[#e1ccbb]" />
        </div>
        <Hero />

        {/* Section Les agents */}
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 mt-6 sm:mt-8">
          <div className="flex items-start justify-between mb-5 sm:mb-8">
            <h2 className="font-inter font-bold text-[22px] sm:text-[28px] md:text-[32px] text-[#1a1a1a]">Les agents</h2>
            <div className="flex flex-col items-end gap-1">
              <a href="/agents" className="bg-[#d4f538] text-[#1a1a1a] font-semibold text-[12px] sm:text-[13px] px-3 sm:px-5 py-2 rounded-md hover:opacity-90 transition-opacity whitespace-nowrap">
                Voir tous
              </a>
              <span className="text-[10px] sm:text-[11px] text-[#1a1a1a]/40">Une mise à jour est en cours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {agents.map((item, i) => {
              const showLine = i < agents.length - 2;
              return (
                <a key={item.name} href={item.href} className="flex flex-col active:bg-black/[0.03] hover:bg-black/[0.02] transition-colors px-1 sm:px-2">
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

        {/* Séparateur */}
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 mt-8 sm:mt-12">
          <div className="h-px w-full bg-[#e1ccbb]" />
        </div>

        {/* Section Les outils */}
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 mt-8 sm:mt-12 mb-8 sm:mb-12">
          <div className="flex items-start justify-between mb-5 sm:mb-8">
            <h2 className="font-inter font-bold text-[22px] sm:text-[28px] md:text-[32px] text-[#1a1a1a]">Les outils</h2>
            <div className="flex flex-col items-end gap-1">
              <a href="/outils" className="bg-[#d4f538] text-[#1a1a1a] font-semibold text-[12px] sm:text-[13px] px-3 sm:px-5 py-2 rounded-md hover:opacity-90 transition-opacity whitespace-nowrap">
                Voir tous
              </a>
              <span className="text-[10px] sm:text-[11px] text-[#1a1a1a]/40">Une mise à jour est en cours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {outils.map((item, i) => {
              const showLine = i < outils.length - 2;
              return (
                <a key={item.name} href={item.href} className="flex flex-col active:bg-black/[0.03] hover:bg-black/[0.02] transition-colors px-1 sm:px-2">
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

        <Articles />

        {/* Section Contact */}
        <section id="contact" className="flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 px-4">
          <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D] mb-6">
            CONTACT
          </h2>
          <a
            href="mailto:marvinlaurac.pro@gmail.com"
            className="font-inter text-[13px] sm:text-[14px] text-[#2D2D2D]/60 hover:text-[#2D2D2D] transition-colors break-all text-center"
          >
            marvinlaurac.pro@gmail.com
          </a>
        </section>

        {/* Footer dégradé */}
        <footer
          className="relative w-full flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #f2ede9 0%, #ffa100 100%)" }}
        >
          <Image
            src="/images/footer-text.png"
            alt="Marvin Laurac"
            width={1200}
            height={260}
            className="w-full h-auto object-contain"
            priority
          />
        </footer>
      </main>
    </>
  );
}
