import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vidéos IA — Marvin Laurac | Enquêtes & Décryptages Intelligence Artificielle",
  description:
    "Enquêtes vidéo sur l'intelligence artificielle : Mistral, Apple x Gemini, MCP, et les grandes batailles de l'IA. Décryptages exclusifs par Marvin Laurac.",
  keywords: [
    "vidéo intelligence artificielle",
    "enquête IA",
    "Mistral IA",
    "Apple Gemini",
    "MCP téléchargements",
    "Marvin Laurac vidéos",
    "décryptage IA",
    "YouTube IA France",
    "veille intelligence artificielle",
    "shorts IA",
  ],
  openGraph: {
    title: "Vidéos IA — Marvin Laurac | Enquêtes & Décryptages",
    description:
      "Enquêtes vidéo exclusives sur l'intelligence artificielle. Mistral, Apple, MCP et les grandes batailles tech décryptées par Marvin Laurac.",
    url: "https://marvinlaurac.com/videos",
    siteName: "Marvin Laurac",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://img.youtube.com/vi/-A_XfVD9Qic/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Vidéos IA — Marvin Laurac",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidéos IA — Marvin Laurac | Enquêtes & Décryptages",
    description:
      "Enquêtes vidéo exclusives sur l'intelligence artificielle. Mistral, Apple, MCP décryptés.",
    images: ["https://img.youtube.com/vi/-A_XfVD9Qic/maxresdefault.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://marvinlaurac.com/videos",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://marvinlaurac.com/videos#page",
      url: "https://marvinlaurac.com/videos",
      name: "Vidéos IA — Marvin Laurac",
      description:
        "Enquêtes et décryptages vidéo sur l'intelligence artificielle par Marvin Laurac.",
      inLanguage: "fr-FR",
      author: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
        sameAs: [
          "https://www.youtube.com/@Marvinlaurac_plus",
          "https://www.youtube.com/@marvinplus_off",
        ],
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://marvinlaurac.com/videos#apple-gemini",
      name: "Apple choisit Gemini : ce que personne ne t'a dit",
      description:
        "Apple signe avec Google pour intégrer Gemini dans l'iPhone. Une enquête sur l'accord qui change tout.",
      thumbnailUrl: "https://img.youtube.com/vi/-A_XfVD9Qic/maxresdefault.jpg",
      contentUrl: "https://www.youtube.com/watch?v=-A_XfVD9Qic",
      embedUrl: "https://www.youtube.com/embed/-A_XfVD9Qic",
      uploadDate: "2025-01-01",
      inLanguage: "fr-FR",
      author: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
      },
      publisher: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://marvinlaurac.com/videos#mistral",
      name: "Mistral écrase les géants : l'Europe vient de gagner une bataille de l'IA",
      description:
        "Mistral repousse les limites et s'impose face aux géants américains. Décryptage d'une victoire européenne.",
      thumbnailUrl: "https://img.youtube.com/vi/jMgKyGi_FHA/maxresdefault.jpg",
      contentUrl: "https://www.youtube.com/watch?v=jMgKyGi_FHA",
      embedUrl: "https://www.youtube.com/embed/jMgKyGi_FHA",
      uploadDate: "2025-01-01",
      inLanguage: "fr-FR",
      author: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
      },
      publisher: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://marvinlaurac.com/videos#mcp",
      name: "MCP franchit 97 millions de téléchargements mensuels SDK",
      description:
        "Le protocole MCP (Model Context Protocol) dépasse les 97 millions de téléchargements mensuels. Décryptage de cette explosion.",
      thumbnailUrl: "https://img.youtube.com/vi/R5wqeBblmdw/maxresdefault.jpg",
      contentUrl: "https://www.youtube.com/watch?v=R5wqeBblmdw",
      embedUrl: "https://www.youtube.com/embed/R5wqeBblmdw",
      uploadDate: "2025-01-01",
      inLanguage: "fr-FR",
      author: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
      },
      publisher: {
        "@type": "Person",
        name: "Marvin Laurac",
        url: "https://marvinlaurac.com",
      },
    },
  ],
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
