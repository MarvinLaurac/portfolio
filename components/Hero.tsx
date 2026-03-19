import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Logo Laurac Marvin Hugues"
        width={72}
        height={72}
        className="w-[72px] h-[72px] mx-auto mb-8"
        priority
      />

      {/* Nom — une seule ligne */}
      <h1 className="text-center mb-3">
        <span className="font-inter font-bold text-[22px] md:text-[26px] tracking-[0.45em] uppercase">
          LAURAC
        </span>
        <span className="font-inter font-normal text-[22px] md:text-[26px] tracking-[0.35em] uppercase ml-3">
          MARVIN HUGUES
        </span>
      </h1>

    </section>
  );
}
