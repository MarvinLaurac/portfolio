"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Scale, Upload, FileText, X, Loader2, Download, ArrowLeft } from "lucide-react";
import { analyzePDF, downloadReport } from "@/lib/lexService";
import type { LexAnalysis, LexRiskClause } from "@/lib/lexService";

const RISK_STYLES: Record<string, string> = {
  red: "border-red-200 bg-red-50/60 text-[#2D2D2D]",
  orange: "border-orange-200 bg-orange-50/60 text-[#2D2D2D]",
  green: "border-green-200 bg-green-50/60 text-[#2D2D2D]",
};

const RISK_DOT: Record<string, string> = {
  red: "bg-red-400",
  orange: "bg-orange-400",
  green: "bg-green-400",
};

const GLOBAL_LABEL: Record<string, string> = {
  red: "Risque élevé",
  orange: "Risque modéré",
  green: "Risque faible",
};

function globalRisk(clauses: LexRiskClause[]): "red" | "orange" | "green" {
  const levels = clauses.map((c) => c.level);
  if (levels.includes("red")) return "red";
  if (levels.includes("orange")) return "orange";
  return "green";
}

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#2D2D2D]/10 last:border-none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2D2D2D]">
          {title}
        </span>
        <span className="font-inter text-[#2D2D2D]/40 text-xs ml-4">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

export default function LexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    analysis: LexAnalysis;
    report_base64: string;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setError("Seuls les fichiers PDF sont acceptés.");
      return;
    }
    setFile(f);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzePDF(file);
      setResult({ analysis: res.analysis, report_base64: res.report_base64 });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de l'analyse."
      );
    } finally {
      setLoading(false);
    }
  };

  const risk = result ? globalRisk(result.analysis.risk_clauses) : null;

  return (
    <div className="min-h-screen bg-[#F0EDE8]">
      {/* Header minimal */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium tracking-wide text-white/50 hover:text-white/90 hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={13} />
            Retour
          </Link>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <span className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium tracking-wide text-white/90">
            <Scale size={13} />
            LEX
          </span>
        </nav>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-32 pb-24">
        {/* Title */}
        <div className="mb-12">
          <h1 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D] mb-3">
            ANALYSE DE CONTRAT
          </h1>
          <p className="font-inter text-[13px] text-[#2D2D2D]/50 leading-relaxed">
            Dépose un contrat PDF — LEX détecte les clauses à risque,
            les obligations et génère un rapport en 30 secondes.
          </p>
        </div>

        {/* Upload zone */}
        <div
          onClick={() => !loading && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          className={`border border-dashed rounded-lg p-8 text-center transition-all mb-3
            ${loading ? "cursor-default opacity-50" : "cursor-pointer"}
            ${
              dragging
                ? "border-[#2D2D2D]/40 bg-[#2D2D2D]/5"
                : "border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40"
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText size={14} className="text-[#2D2D2D]/50 shrink-0" />
              <span className="font-inter text-[12px] text-[#2D2D2D] truncate max-w-[260px]">
                {file.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setResult(null);
                }}
                className="text-[#2D2D2D]/30 hover:text-[#2D2D2D] transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={18} className="text-[#2D2D2D]/25" />
              <p className="font-inter text-[12px] text-[#2D2D2D]/40">
                Dépose ton PDF ici · max 10 MB
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="font-inter text-[11px] text-red-500 mb-3">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="w-full py-3 rounded-lg font-inter text-[12px] font-semibold tracking-[0.1em] uppercase
            bg-[#2D2D2D] text-[#F0EDE8] hover:bg-[#1a1a1a]
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all mb-12"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={13} className="animate-spin" />
              Analyse en cours...
            </span>
          ) : "Analyser"}
        </button>

        {/* Results */}
        {result && risk && (
          <div>
            {/* Global risk */}
            <div className="flex items-center gap-2 mb-8">
              <div className={`w-2 h-2 rounded-full ${RISK_DOT[risk]}`} />
              <span className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2D2D2D]">
                {GLOBAL_LABEL[risk]}
              </span>
            </div>

            <div className="border border-[#2D2D2D]/10 rounded-lg divide-y divide-[#2D2D2D]/10">
              <div className="px-5">
                <Section title="Résumé" defaultOpen>
                  <p className="font-inter text-[12px] text-[#2D2D2D]/70 leading-relaxed">
                    {result.analysis.simple_summary}
                  </p>
                </Section>
              </div>

              <div className="px-5">
                <Section
                  title={`Clauses à risque (${result.analysis.risk_clauses.length})`}
                  defaultOpen
                >
                  {result.analysis.risk_clauses.length === 0 ? (
                    <p className="font-inter text-[12px] text-[#2D2D2D]/40">
                      Aucune clause à risque.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {result.analysis.risk_clauses.map((c, i) => (
                        <div
                          key={i}
                          className={`border rounded-md p-3 ${RISK_STYLES[c.level]}`}
                        >
                          <p className="font-inter text-[11px] font-semibold mb-1">
                            {c.clause}
                          </p>
                          <p className="font-inter text-[11px] text-[#2D2D2D]/60">
                            {c.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Section>
              </div>

              <div className="px-5">
                <Section title="Points manquants">
                  {result.analysis.missing_points.length === 0 ? (
                    <p className="font-inter text-[12px] text-[#2D2D2D]/40">
                      Aucun point manquant.
                    </p>
                  ) : (
                    <ul className="space-y-1">
                      {result.analysis.missing_points.map((p, i) => (
                        <li
                          key={i}
                          className="font-inter text-[12px] text-[#2D2D2D]/70 flex gap-2"
                        >
                          <span className="text-[#2D2D2D]/30">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </Section>
              </div>

              <div className="px-5">
                <Section title="Obligations">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="font-inter text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2D2D2D]/40 mb-2">
                        Partie A
                      </p>
                      <ul className="space-y-1">
                        {result.analysis.party_a_obligations.map((o, i) => (
                          <li
                            key={i}
                            className="font-inter text-[12px] text-[#2D2D2D]/70 flex gap-2"
                          >
                            <span className="text-[#2D2D2D]/30">—</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-inter text-[10px] font-semibold tracking-[0.15em] uppercase text-[#2D2D2D]/40 mb-2">
                        Partie B
                      </p>
                      <ul className="space-y-1">
                        {result.analysis.party_b_obligations.map((o, i) => (
                          <li
                            key={i}
                            className="font-inter text-[12px] text-[#2D2D2D]/70 flex gap-2"
                          >
                            <span className="text-[#2D2D2D]/30">—</span>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Section>
              </div>

              {result.analysis.termination_conditions && (
                <div className="px-5">
                  <Section title="Résiliation">
                    <p className="font-inter text-[12px] text-[#2D2D2D]/70 leading-relaxed">
                      {result.analysis.termination_conditions}
                    </p>
                  </Section>
                </div>
              )}
            </div>

            {/* Download */}
            <button
              onClick={() =>
                downloadReport(result.report_base64, "lex_rapport.docx")
              }
              className="w-full mt-4 py-3 rounded-lg font-inter text-[12px] font-semibold tracking-[0.1em] uppercase
                border border-[#2D2D2D]/20 text-[#2D2D2D] hover:bg-[#2D2D2D]/5
                transition-all"
            >
              Télécharger le rapport .docx
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
