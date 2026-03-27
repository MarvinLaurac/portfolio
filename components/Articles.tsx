"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/articles";
import type { Article } from "@/lib/articles";

const INITIAL_SHOW = 2;

const BRANDS: Record<string, string> = {
  "apple-siri-gemini-ios-26": "APPLE",
  "robot-humanoid-tennis-galbot": "GALBOT",
  "openclaw-rachat-openai": "OPENAI",
  "openai-valorisation-730-milliards": "OPENAI",
  "gpt-5-4-un-million-tokens": "OPENAI",
  "mit-ia-medicaments-proteines": "MIT",
  "minimax-m2-5-efficience": "MINIMAX",
  "meta-puces-mtia-nvidia": "META",
};

function ArticleCard({ a, showBrittany }: { a: Article; showBrittany: boolean }) {
  const brand = BRANDS[a.slug];
  return (
    <div className="rounded-2xl bg-[#e6e3df] p-3 sm:p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="relative shrink-0 w-16 h-16 sm:w-[80px] sm:h-[80px] rounded-xl sm:rounded-2xl bg-[#d4f538] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/logo-ml.png"
            alt="ML"
            fill
            className="object-cover"
          />
          {brand && (
            <span
              className="font-brittany absolute left-0 z-10 text-[#1a1a1a]/80 text-[13px] leading-none select-none pointer-events-none"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", padding: "4px 2px" }}
            >
              {brand}
            </span>
          )}
        </div>

        {/* Title + date */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-inter font-bold text-[16px] text-[#1a1a1a]">{a.title.split(":")[0].split(" ").slice(0, 3).join(" ")}</span>
            <span className="font-inter text-[12px] text-[#1a1a1a]/40">{a.date}</span>
          </div>
          <p className="font-inter text-[13px] text-[#1a1a1a]/60 leading-snug mt-1 line-clamp-3">
            {a.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5 text-[12px] text-[#1a1a1a]/40">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{a.readTime} de lecture</span>
        </div>
        <Link
          href={`/articles/${a.slug}`}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a]/20 text-[12px] font-medium text-[#1a1a1a]/60 hover:bg-[#1a1a1a]/5 transition-all"
        >
          Lire l&apos;article
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function Column({ title, items, showBrittany }: { title: string; items: Article[]; showBrittany: boolean }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? items : items.slice(0, INITIAL_SHOW);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-inter font-bold text-[20px] sm:text-[28px] text-[#1a1a1a] mb-2">{title}</h2>
      {displayed.map((a) => (
        <ArticleCard key={a.slug} a={a} showBrittany={showBrittany} />
      ))}
      {items.length > INITIAL_SHOW && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="self-start font-inter text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors mt-1"
        >
          {showAll ? "Voir moins" : `Voir plus +${items.length - INITIAL_SHOW}`}
        </button>
      )}
    </div>
  );
}

export default function Articles() {
  const grandPublic = articles.filter((a) => a.tag === "Grand public");
  const technique = articles.filter((a) => a.tag === "Technique");

  return (
    <section id="articles" className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <Column title="La ville grand publique" items={grandPublic} showBrittany={true} />
        <Column title="La ville grand technique" items={technique} showBrittany={false} />
      </div>
    </section>
  );
}
