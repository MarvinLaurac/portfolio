import Header from "@/components/Header";

export default function CGU() {
  return (
    <>
      <Header />
      <main className="bg-[#F8F7F4] min-h-screen">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-28 pb-16">
          <h1 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#1a1a1a] mb-8">
            Conditions générales d'utilisation
          </h1>

          <div className="text-[13px] sm:text-[14px] text-[#1a1a1a]/70 leading-relaxed">

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Accès au site
            </h2>
            <p>
              Le site <strong>marvinlaurac.com</strong> est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais liés à l'accès au site (connexion Internet, matériel informatique) sont à la charge de l'utilisateur. L'accès au site peut être interrompu à tout moment pour des raisons de maintenance ou de mise à jour, sans préavis.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, graphismes, agents IA, outils, code source) est la propriété exclusive de <strong>Marvin Laurac</strong>, protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou transmission, totale ou partielle, sans autorisation écrite préalable de Marvin Laurac, est strictement interdite.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Usage non commercial
            </h2>
            <p>
              Le site et ses contenus sont mis à disposition à des fins d'information et d'usage personnel. Toute exploitation commerciale, revente ou utilisation à des fins lucratives des contenus, agents ou outils présentés sur ce site sans accord explicite de Marvin Laurac est interdite.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Limitation de responsabilité
            </h2>
            <p>
              Marvin Laurac s'efforce de fournir des informations exactes et à jour. Toutefois, il ne saurait garantir l'exactitude, l'exhaustivité ou l'actualité des informations diffusées sur ce site. L'utilisation des outils et agents IA est faite sous la seule responsabilité de l'utilisateur. Marvin Laurac ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Liens externes
            </h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre indicatif. Marvin Laurac n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Modification des CGU
            </h2>
            <p>
              Marvin Laurac se réserve le droit de modifier les présentes CGU à tout moment. L'utilisateur est invité à les consulter régulièrement.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Contact
            </h2>
            <p>
              Pour toute question :<br />
              <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>
            </p>

          </div>
        </div>
      </main>
    </>
  );
}
