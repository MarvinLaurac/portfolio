import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, getAllSlugs } from "@/lib/articles";
import ArticleHeader from "@/components/ArticleHeader";
import SolenePlayer from "@/components/SolenePlayer";

const SITE_URL = "https://marvinlaurac.com";

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = `${SITE_URL}/articles/${article.slug}`;

  return {
    title: `${article.title} — Marvin Laurac`,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.isoDate,
      authors: ["Marvin Laurac"],
      locale: "fr_FR",
      siteName: "Marvin Laurac",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      creator: "@marvinlaurac",
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const url = `${SITE_URL}/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.isoDate,
    author: {
      "@type": "Person",
      name: "Marvin Laurac",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Marvin Laurac",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "fr-FR",
    articleSection: article.tag,
    timeRequired: `PT${article.readTime.replace(" min", "M")}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleHeader />
      <div className="min-h-screen px-4 py-24">
        {/* Retour */}
        <div className="max-w-[640px] mx-auto mb-12">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[#2D2D2D]/40 hover:text-[#2D2D2D] transition-colors duration-200 group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour
          </Link>
        </div>

        <article className="max-w-[640px] mx-auto">
          {/* Tag + date */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${article.tagColor}`}>
              {article.tag}
            </span>
            <time dateTime={article.isoDate} className="text-[12px] text-[#2D2D2D]/35">
              {article.date}
            </time>
            <span className="text-[12px] text-[#2D2D2D]/25">·</span>
            <span className="text-[12px] text-[#2D2D2D]/35">{article.readTime} de lecture</span>
          </div>

          {/* Titre */}
          <h1 className="font-inter font-bold text-[28px] md:text-[36px] text-[#1a1a1a] leading-[1.2] tracking-tight mb-5">
            {article.title}
          </h1>

          {/* Description */}
          <p className="font-inter text-[16px] text-[#2D2D2D]/60 leading-relaxed mb-6">
            {article.description}
          </p>

          {/* Illustration (optionnelle) */}
          {article.illustrationSrc && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-[#1a1a1a]/8">
              <Image
                src={article.illustrationSrc}
                alt={`Illustration — ${article.title}`}
                width={1200}
                height={630}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Solène – voix off */}
          <SolenePlayer
            text={`${article.title}. ${article.description}. ${article.content
              .map((s) => (s.type === "ul" ? s.items?.join(". ") : s.text))
              .filter(Boolean)
              .join(". ")}`}
          />

          {/* Auteur */}
          <div className="flex items-center gap-3 mb-12 border-t border-[#1a1a1a]/8 pt-8">
            <div className="w-8 h-8 rounded-full bg-[#1a1a1a]/8 flex items-center justify-center text-base select-none">
              {article.avatar}
            </div>
            <div>
              <p className="font-inter font-semibold text-[13px] text-[#1a1a1a]">Marvin Laurac</p>
              <p className="font-inter text-[11px] text-[#2D2D2D]/35">Veille technologique</p>
            </div>
          </div>

          {/* Contenu */}
          <div className="space-y-6">
            {article.content.map((section, i) => {
              if (section.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="font-inter font-bold text-[18px] text-[#1a1a1a] mt-10 mb-2"
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === "p") {
                return (
                  <p
                    key={i}
                    className="font-inter text-[15px] text-[#2D2D2D]/75 leading-[1.8]"
                  >
                    {section.text}
                  </p>
                );
              }
              if (section.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="border-l-2 border-[#1a1a1a]/15 pl-5 my-8"
                  >
                    <p className="font-inter text-[15px] italic text-[#2D2D2D]/55 leading-[1.8]">
                      &ldquo;{section.text}&rdquo;
                    </p>
                  </blockquote>
                );
              }
              if (section.type === "ul" && section.items) {
                return (
                  <ul key={i} className="space-y-2 my-6">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-[9px] shrink-0 w-1 h-1 rounded-full bg-[#2D2D2D]/25" />
                        <span className="font-inter text-[14px] text-[#2D2D2D]/65 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>

          {/* FAQ */}
          <div className="mt-16 pt-10 border-t border-[#1a1a1a]/8">
            <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D]/40 mb-6">
              Questions fréquentes
            </h2>
            <div className="space-y-6">
              {article.faq.map((item, i) => (
                <div key={i}>
                  <p className="font-inter font-semibold text-[14px] text-[#1a1a1a] mb-1.5">
                    {item.question}
                  </p>
                  <p className="font-inter text-[14px] text-[#2D2D2D]/65 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ressources */}
          <div className="mt-12 pt-10 border-t border-[#1a1a1a]/8">
            <h2 className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-[#2D2D2D]/40 mb-6">
              Pour aller plus loin
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {article.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 px-4 py-3.5 rounded-xl border border-[#1a1a1a]/10 bg-[#1a1a1a]/4 hover:bg-[#1a1a1a]/8 hover:border-[#1a1a1a]/20 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-inter font-semibold text-[13px] text-[#1a1a1a]">
                      {r.label}
                    </span>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 text-[#2D2D2D]/30 group-hover:text-[#2D2D2D]/60 transition-colors" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                  <span className="font-inter text-[12px] text-[#2D2D2D]/45 leading-relaxed">
                    {r.description}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer article */}
          <div className="mt-12 pt-10 border-t border-[#1a1a1a]/8 flex items-center justify-between">
            <Link
              href="/#articles"
              className="inline-flex items-center gap-2 text-[12px] font-medium text-[#2D2D2D]/40 hover:text-[#2D2D2D] transition-colors duration-200 group"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Tous les articles
            </Link>
            <span className="font-inter text-[12px] text-[#2D2D2D]/25">
              Marvin Laurac ·{" "}
              <time dateTime={article.isoDate}>{article.date}</time>
            </span>
          </div>
        </article>
      </div>
    </>
  );
}
