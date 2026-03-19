import Image from "next/image";

export default function Work() {
  return (
    <section className="flex flex-col items-center pt-12 pb-60 px-4">
      {/* Section title */}
      <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D] mb-10">
        MON TRAVAIL
      </h2>

      {/* LEX Card */}
      <div className="flex flex-col items-center max-w-xs">
        <Image
          src="/logo_lex.png"
          alt="LEX"
          width={24}
          height={24}
          className="w-6 h-6 mb-2"
        />
        <h3 className="font-inter font-bold text-[12px] tracking-[0.15em] mb-1">
          LEX
        </h3>
        <p className="font-inter text-[10px] text-[#999] text-center leading-relaxed">
          analyse automatiquement n&apos;importe quel contrat PDF
          <br />
          et génère un rapport juridique
        </p>
      </div>
    </section>
  );
}
