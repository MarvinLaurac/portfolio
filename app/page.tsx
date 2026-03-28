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
    { icon: "/images/icon-7.png", name: "Benchmark IA", desc: "Choisissez votre niveau de raisonnement et vitesse — l'outil trouve le meilleur modèle pour vos agents.", href: "/outils/benchmark" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* Barre catégories */}
        <div className="w-full pt-28 sm:pt-32 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 px-3 sm:px-4 w-max mx-auto">
            {[
              {
                label: "Juridique",
                href: "/lex",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 0l-3 6H6l3 6 3-6 3 6 3-6h-3l-3-6zm0 1v17M3 21h18" />
                  </svg>
                ),
              },
              {
                label: "Contrats",
                href: "/agents/contrats",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                ),
              },
              {
                label: "Comptabilité",
                href: "/agents/compta",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-1.5m-6.75 4.5l3-3m0 0l3 3m-3-3v7.5m-4.5-4.5H4.5" />
                  </svg>
                ),
              },
              {
                label: "Commercial",
                href: "/agents/leads",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                ),
              },
              {
                label: "Ressources humaines",
                href: "/agents/rh",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
              },
              {
                label: "Veille stratégique",
                href: "/agents/veille",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
            ].map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#e8e3e0", color: "#68666a" }}
              >
                {cat.icon}
                {cat.label}
              </a>
            ))}
          </div>
        </div>

        {/* Illustration juste sous le header */}
        <div className="w-full px-3 sm:px-4 max-w-6xl mx-auto">
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
                      En savoir plus
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
                      En savoir plus
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
