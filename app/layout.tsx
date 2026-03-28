import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import TopBanner from "@/components/TopBanner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marvinlaurac.com"),
  title: "Marvin Laurac — Solutions IA pour entreprises",
  description:
    "Solutions intelligentes pour automatiser, simplifier et accélérer le travail des entreprises. Agents IA, outils métiers et veille sur l'intelligence artificielle de demain.",
  keywords: [
    "agents IA",
    "automatisation entreprise",
    "intelligence artificielle",
    "outils IA",
    "Marvin Laurac",
    "veille technologique IA",
  ],
  openGraph: {
    title: "Marvin Laurac — Solutions IA pour entreprises",
    description:
      "Solutions intelligentes pour automatiser, simplifier et accélérer le travail des entreprises. Agents IA, outils métiers et veille sur l'intelligence artificielle de demain.",
    url: "https://marvinlaurac.com",
    siteName: "Marvin Laurac",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvin Laurac — Solutions IA pour entreprises",
    description:
      "Solutions intelligentes pour automatiser, simplifier et accélérer le travail des entreprises. Agents IA, outils métiers et veille sur l'intelligence artificielle de demain.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://marvinlaurac.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://marvinlaurac.com/#website",
      url: "https://marvinlaurac.com",
      name: "Marvin Laurac",
      description:
        "Solutions intelligentes pour automatiser, simplifier et accélérer le travail des entreprises.",
      inLanguage: "fr-FR",
    },
    {
      "@type": "Person",
      "@id": "https://marvinlaurac.com/#person",
      name: "Marvin Laurac",
      url: "https://marvinlaurac.com",
      jobTitle: "Développeur IA & Automatisation",
      email: "marvinlaurac.pro@gmail.com",
      sameAs: ["https://marvinlaurac.com"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <TopBanner />
        {children}
      </body>
    </html>
  );
}
