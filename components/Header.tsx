"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#work" },
  { label: "Veille", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    // Scroll pour l'ombre du header
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver pour l'onglet actif — se déclenche quand la section
    // occupe la zone centrale du viewport (entre 30% et 70% de hauteur)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );

    ["hero", "work", "articles", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center gap-2 pt-5 px-4 pointer-events-none">
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
        {/* Nav links */}
        {navLinks.map((link) => {
          const id = link.href.replace("#", "");
          return (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`
                relative px-4 py-2 rounded-full text-[13px] font-medium tracking-wide
                transition-all duration-300 ease-in-out
                ${
                  active === id
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white/90 hover:bg-white/5"
                }
              `}
            >
              {link.label}
            </button>
          );
        })}

        {/* Séparateur */}
        <div className="w-px h-4 bg-white/10 mx-1" />

        {/* Bouton GitHub */}
        <a
          href="https://github.com/MarvinLaurac"
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

      {/* Bouton LinkedIn séparé */}
      <a
        href="https://fr.linkedin.com/in/marvin-laurac-360182187"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`
          pointer-events-auto
          w-[52px] h-[52px] flex items-center justify-center flex-shrink-0
          rounded-full text-white/70
          transition-all duration-500 ease-in-out
          hover:scale-[1.05] active:scale-[0.97]
          ${
            scrolled
              ? "bg-[#1a1a1a]/90 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-white/10"
              : "bg-[#1a1a1a]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-white/5"
          }
        `}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
    </header>
  );
}
