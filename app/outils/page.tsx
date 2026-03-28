import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const OUTILS = [
  { icon: "/images/icon-6.png", name: "Veille", desc: "Surveille vos sources, détecte les signaux forts et génère un rapport stratégique en temps réel.", href: "/agents/veille" },
  { icon: "/images/icon-7.png", name: "Benchmark IA", desc: "Choisissez votre niveau de raisonnement et vitesse — l'outil trouve le meilleur modèle pour vos agents.", href: "/outils/benchmark" },
];

export default function TousLesOutils() {
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
              <h1 className="font-inter font-bold text-[28px] sm:text-[40px] text-[#1a1a1a]">Les outils</h1>
            </div>
          </div>

          {/* Liste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {OUTILS.map((item, i) => {
              const showLine = i < OUTILS.length - 2;
              return (
                <a key={item.name} href={item.href} className="flex flex-col hover:bg-black/[0.02] transition-colors px-1 sm:px-2">
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
