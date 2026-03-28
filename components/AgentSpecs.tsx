import Image from "next/image";

interface AgentSpecsProps {
  icon: string;
  name: string;
  tagline: string;
  modele: string;
  raisonnement: 1 | 2 | 3 | 4 | 5;
  vitesse: 1 | 2 | 3;
  input: string;
  output: string;
  specs: string[];
  description: string;
}

function Dots({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex items-center gap-1 my-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${i < count ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]/15"}`}
        />
      ))}
    </div>
  );
}

function Bolts({ count, max = 3 }: { count: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5 my-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`w-4 h-4 ${i < count ? "text-[#1a1a1a]" : "text-[#1a1a1a]/15"}`} fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ))}
    </div>
  );
}

const RAISONNEMENT_LABEL: Record<number, string> = { 1: "Faible", 2: "Moyen", 3: "Élevé", 4: "Très élevé", 5: "Maximum" };
const VITESSE_LABEL: Record<number, string> = { 1: "Lente", 2: "Moyenne", 3: "Rapide" };

export default function AgentSpecs({ icon, name, tagline, modele, raisonnement, vitesse, input, output, specs, description }: AgentSpecsProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/8 p-5 sm:p-6 mb-6">
      {/* Header row */}
      <div className="flex items-start gap-4 mb-5">
        <Image src={icon} alt={name} width={56} height={56} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-inter font-bold text-[18px] sm:text-[20px] text-[#1a1a1a]">{name}</h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-black/10 text-[#1a1a1a]/50 font-medium">{modele}</span>
          </div>
          <p className="text-[12px] sm:text-[13px] text-[#1a1a1a]/50 mt-0.5">{tagline}</p>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-black/8 overflow-hidden mb-5 divide-x divide-y sm:divide-y-0 divide-black/8">
        {[
          { label: "RAISONNEMENT", visual: <Dots count={raisonnement} />, value: RAISONNEMENT_LABEL[raisonnement] },
          { label: "VITESSE",       visual: <Bolts count={vitesse} />,      value: VITESSE_LABEL[vitesse] },
          { label: "INPUT",         visual: <span className="text-[13px] font-medium text-[#1a1a1a] my-1.5 block">{input}</span>,  value: "" },
          { label: "OUTPUT",        visual: <span className="text-[13px] font-medium text-[#1a1a1a] my-1.5 block">{output}</span>, value: "" },
        ].map((col) => (
          <div key={col.label} className="px-4 py-3 flex flex-col min-w-0">
            <span className="text-[10px] font-semibold tracking-widest text-[#1a1a1a]/35 uppercase truncate">{col.label}</span>
            {col.visual}
            {col.value && <span className="text-[12px] text-[#1a1a1a]/50">{col.value}</span>}
          </div>
        ))}
      </div>

      {/* Description + specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p className="text-[13px] text-[#1a1a1a]/65 leading-relaxed">{description}</p>
        <ul className="space-y-2">
          {specs.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px] text-[#1a1a1a]/70">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#1a1a1a]/30" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
