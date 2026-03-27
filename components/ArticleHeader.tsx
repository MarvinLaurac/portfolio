"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Projets", href: "/#work" },
  { label: "Veille", href: "/#articles" },
  { label: "Contact", href: "/#contact" },
];

export default function ArticleHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <nav
        className={`
          pointer-events-auto
          flex items-center gap-1 px-2 py-2
          rounded-full
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-[#1a1a1a]/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-white/10"
              : "bg-[#1a1a1a]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-white/5"
          }
        `}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide text-white/50 hover:text-white/90 hover:bg-white/5 transition-all duration-300 ease-in-out"
          >
            {link.label}
          </Link>
        ))}

        {/* Séparateur */}
        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* Bouton GitHub */}
        <a
          href="https://github.com/octoberone"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-2 px-4 py-2
            rounded-full
            bg-white text-[#1a1a1a]
            text-[13px] font-semibold tracking-wide
            transition-all duration-300 ease-in-out
            hover:bg-white/90 hover:scale-[1.03]
            active:scale-[0.97]
            shadow-sm
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </nav>
    </header>
  );
}
