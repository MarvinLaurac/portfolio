import Image from "next/image";
import Link from "next/link";

export default function Work() {
  return (
    <section id="work" className="flex flex-col items-center pt-12 pb-20 px-4">
      {/* Section title */}
      <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D] mb-10">
        MON TRAVAIL
      </h2>

      {/* LEX Card */}
      <Link href="/lex" className="flex flex-col items-center max-w-xs group">
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
    </section>
  );
}
