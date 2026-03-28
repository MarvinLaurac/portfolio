import Header from "@/components/Header";

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="bg-[#F8F7F4] min-h-screen">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-28 pb-16">
          <h1 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#1a1a1a] mb-8">
            Mentions légales
          </h1>

          <div className="text-[13px] sm:text-[14px] text-[#1a1a1a]/70 leading-relaxed">

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Éditeur du site
            </h2>
            <p>
              Le site <strong>marvinlaurac.com</strong> est édité par :<br />
              <strong>Marvin Laurac</strong>, auto-entrepreneur<br />
              Paris, France<br />
              Email : <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Directeur de la publication
            </h2>
            <p>
              Marvin Laurac
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Hébergement
            </h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133<br />
              Covina, CA 91723, États-Unis<br />
              Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">vercel.com</a>
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, graphismes, code, agents IA, outils) est la propriété exclusive de Marvin Laurac, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Limitation de responsabilité
            </h2>
            <p>
              Les informations présentes sur ce site sont fournies à titre indicatif. Marvin Laurac ne saurait être tenu responsable des erreurs ou omissions, ni des résultats obtenus suite à l'utilisation des outils et agents proposés.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Contact
            </h2>
            <p>
              Pour toute question relative au site :<br />
              <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>
            </p>

          </div>
        </div>
      </main>
    </>
  );
}
