"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { articles } from "@/lib/articles";
import type { Article } from "@/lib/articles";

const INITIAL_SHOW = 3;

function ArticleCard({ a }: { a: Article }) {
  return (
    <div className="flex gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/14 transition-all duration-300 group">
      <div className="shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl select-none">
        {a.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-inter font-semibold text-[13px] text-white/90">Marvin Laurac</span>
          <span className="font-inter text-[12px] text-white/20">·</span>
          <span className="font-inter text-[12px] text-white/35">{a.date}</span>
          <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${a.tagColor}`}>
            {a.tag}
          </span>
        </div>
        <p className="font-inter text-[13px] text-white/55 leading-relaxed mb-3">{a.description}</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[12px] text-white/25">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{a.readTime} de lecture</span>
          </div>
          <Link
            href={`/articles/${a.slug}`}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-[12px] font-medium text-white/50 hover:bg-white/14 hover:text-white transition-all duration-200 group"
          >
            Lire l&apos;article
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Articles() {
  const [expanded, setExpanded] = useState(false);
  const [unstacked, setUnstacked] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const hiddenCount = articles.length - INITIAL_SHOW;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setUnstacked(true), 200); },
      { threshold: 0.25 }
    );
    if (stackRef.current) observer.observe(stackRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="articles"
      className="relative flex flex-col items-center py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #111111 0%, #1a1a1a 50%, #111111 100%)" }}
    >
      {/* Vignette radiale */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
      {/* Grain subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Titre */}
      <div className="relative flex flex-col items-center mb-10">
        <p className="font-inter text-[10px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-2">
          Marvin Laurac
        </p>
        <h2 className="font-inter text-[13px] font-semibold tracking-[0.22em] uppercase text-white/80">
          Veille Technologique
        </h2>
        <div className="mt-4 w-8 h-px bg-white/15" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Pile initiale */}
        <div ref={stackRef} className="relative flex flex-col">
          {articles.slice(0, INITIAL_SHOW).map((a, i) => (
            <div
              key={a.slug}
              style={{
                marginTop: i === 0 ? 0 : unstacked ? 12 : -108,
                transform: unstacked ? "scale(1)" : `scale(${1 - (INITIAL_SHOW - 1 - i) * 0.025})`,
                opacity: unstacked ? 1 : 1 - (INITIAL_SHOW - 1 - i) * 0.22,
                zIndex: INITIAL_SHOW - i,
                position: "relative",
                transitionProperty: "margin-top, transform, opacity",
                transitionDuration: "580ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                transitionDelay: unstacked ? `${i * 80}ms` : `${(INITIAL_SHOW - 1 - i) * 60}ms`,
              }}
            >
              <ArticleCard a={a} />
            </div>
          ))}
        </div>

        {/* Articles supplémentaires */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: expanded ? `${(articles.length - INITIAL_SHOW) * 280}px` : "0px",
            transition: "max-height 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="flex flex-col gap-3 pt-3">
            {articles.slice(INITIAL_SHOW).map((a, i) => (
              <div
                key={a.slug}
                style={{
                  opacity: expanded ? 1 : 0,
                  transform: expanded ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.4s ease ${i * 80 + 150}ms, transform 0.4s ease ${i * 80 + 150}ms`,
                }}
              >
                <ArticleCard a={a} />
              </div>
            ))}
          </div>
        </div>

        {/* Bouton voir plus / voir moins */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/6 border border-white/10 hover:bg-white/10 hover:border-white/18 transition-all duration-300 font-inter text-[12px] font-medium text-white/45 hover:text-white/80 group"
          >
            {expanded ? (
              <>
                Voir moins
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
              </>
            ) : (
              <>
                Voir plus
                <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold">
                  +{hiddenCount}
                </span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
