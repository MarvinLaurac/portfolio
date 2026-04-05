"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const videos = [
  {
    id: "-A_XfVD9Qic",
    title: "Apple choisit Gemini : ce que personne ne t'a dit",
    description: "Apple signe avec Google pour intégrer Gemini dans l'iPhone. Une enquête sur l'accord qui change tout.",
    category: "Enquête",
    thumbnail: "https://img.youtube.com/vi/-A_XfVD9Qic/maxresdefault.jpg",
  },
  {
    id: "jMgKyGi_FHA",
    title: "Mistral écrase les géants : l'Europe vient de gagner une bataille de l'IA",
    description: "Mistral repousse les limites et s'impose face aux géants américains. Décryptage d'une victoire européenne.",
    category: "Enquête",
    thumbnail: "https://img.youtube.com/vi/jMgKyGi_FHA/maxresdefault.jpg",
  },
  {
    id: "R5wqeBblmdw",
    title: "MCP franchit 97 millions de téléchargements mensuels SDK",
    description: "",
    category: "Enquête",
    thumbnail: "https://img.youtube.com/vi/R5wqeBblmdw/maxresdefault.jpg",
  },
];

type Short = { id: string; title: string; thumbnail: string; url: string };

function ShortsRow() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch("/api/shorts")
      .then((r) => r.json())
      .then((data) => setShorts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [shorts]);

  const scroll = (dir: "left" | "right") => {
    rowRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  if (shorts.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-10 pb-10">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30">
          Shorts
        </h2>
        <a
          href="https://www.youtube.com/@marvinplus_off/shorts"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-end gap-1.5"
          title="Voir tous les Shorts"
        >
          {/* Bouton en forme de vidéo verticale */}
          <div className="relative w-[22px] h-[30px] rounded-[4px] border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-200">
            <Play size={8} fill="white" className="text-white/60 ml-0.5" />
          </div>
          <span className="font-inter text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 group-hover:text-white/60 transition-colors pb-0.5">
            Voir +
          </span>
        </a>
      </div>

      {/* scroll wrapper */}
      <div className="relative">
        {/* left fade + arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-0 top-0 bottom-0 z-10 w-10 items-center justify-center bg-gradient-to-r from-[#0d0d0d] to-transparent"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {shorts.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-none snap-start w-[110px] sm:w-[130px]"
            >
              {/* vertical thumbnail 9:16 */}
              <div className="relative w-full rounded-lg overflow-hidden bg-white/5"
                style={{ aspectRatio: "9/16" }}>
                <Image
                  src={s.thumbnail}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="130px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play size={11} fill="#0d0d0d" className="ml-0.5" />
                  </div>
                </div>
                {/* short badge */}
                <div className="absolute bottom-2 left-2">
                  <span className="font-inter text-[8px] font-semibold tracking-[0.12em] uppercase bg-white/10 backdrop-blur-sm text-white/70 px-1.5 py-0.5 rounded-full">
                    Short
                  </span>
                </div>
              </div>
              <p className="font-inter text-[10px] font-medium text-white/60 group-hover:text-white/90 transition-colors leading-snug mt-2 line-clamp-2">
                {s.title}
              </p>
            </a>
          ))}
        </div>

        {/* right fade + arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-0 top-0 bottom-0 z-10 w-10 items-center justify-center bg-gradient-to-l from-[#0d0d0d] to-transparent"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function VideosPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0d0d0d]">
        {/* Hero banner */}
        <div className="relative w-full h-[45vh] sm:h-[60vh] overflow-hidden">
          <Image
            src={videos[0].thumbnail}
            alt={videos[0].title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 px-4 sm:px-10 pb-8 sm:pb-12 max-w-xl">
            <span className="inline-block font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
              {videos[0].category}
            </span>
            <h1 className="font-inter text-[20px] sm:text-[28px] font-bold text-white leading-tight mb-4">
              {videos[0].title}
            </h1>
            <p className="font-inter text-[12px] sm:text-[13px] text-white/60 leading-relaxed mb-6 hidden sm:block">
              {videos[0].description}
            </p>
            <a
              href={`https://youtu.be/${videos[0].id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0d0d0d] font-inter text-[12px] font-semibold tracking-wide hover:bg-white/90 transition-all"
            >
              <Play size={13} fill="#0d0d0d" />
              Regarder
            </a>
          </div>
        </div>

        {/* Shorts */}
        <ShortsRow />

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-10 py-10">
          <h2 className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-5">
            Toutes les vidéos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <a
                key={v.id}
                href={`https://youtu.be/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-white/5">
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play size={14} fill="#0d0d0d" className="ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="font-inter text-[9px] font-semibold tracking-[0.15em] uppercase bg-white/10 backdrop-blur-sm text-white/70 px-2 py-1 rounded-full">
                      {v.category}
                    </span>
                  </div>
                </div>
                <p className="font-inter text-[13px] font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                  {v.title}
                </p>
                <p className="font-inter text-[11px] text-white/30 mt-1">
                  {v.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div className="max-w-6xl mx-auto px-4 sm:px-10 pb-14">
          <div className="border border-white/5 rounded-lg p-8 flex flex-col items-center text-center">
            <p className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-2">
              Bientôt disponible
            </p>
            <p className="font-inter text-[13px] text-white/30 max-w-xs">
              D'autres enquêtes sont en cours de production. Abonne-toi pour ne rien rater.
            </p>
            <a
              href="https://www.youtube.com/@Marvinlaurac_plus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/40 font-inter text-[11px] font-semibold tracking-wide hover:border-white/20 hover:text-white/60 transition-all"
            >
              S'abonner sur YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
