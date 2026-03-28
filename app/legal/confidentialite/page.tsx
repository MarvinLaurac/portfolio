import Header from "@/components/Header";

export default function Confidentialite() {
  return (
    <>
      <Header />
      <main className="bg-[#F8F7F4] min-h-screen">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-28 pb-16">
          <h1 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#1a1a1a] mb-8">
            Politique de confidentialité
          </h1>

          <div className="text-[13px] sm:text-[14px] text-[#1a1a1a]/70 leading-relaxed">

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Responsable du traitement
            </h2>
            <p>
              Marvin Laurac, auto-entrepreneur, Paris, France.<br />
              Contact : <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Données collectées
            </h2>
            <p>
              Ce site ne collecte <strong>aucune donnée personnelle</strong> de manière automatique. La seule collecte possible intervient lorsque vous nous contactez par email à l'adresse <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>. Dans ce cas, vos données (nom, adresse email, contenu du message) sont utilisées uniquement pour répondre à votre demande et ne sont jamais transmises à des tiers.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Cookies
            </h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire, de tracking ou d'analyse comportementale n'est déposé. Pour en savoir plus, consultez notre <a href="/legal/cookies" className="underline hover:text-[#1a1a1a] transition-colors">politique cookies</a>.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Base légale du traitement
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), le traitement des données issues du contact par email repose sur votre consentement explicite lors de l'envoi du message.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Durée de conservation
            </h2>
            <p>
              Les données transmises par email sont conservées le temps nécessaire à la gestion de votre demande, et au maximum 3 ans à compter du dernier contact.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à :<br />
              <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>
            </p>
            <p className="mt-3">
              Vous avez également le droit d'introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">cnil.fr</a>).
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Hébergement
            </h2>
            <p>
              Le site est hébergé par Vercel Inc. (San Francisco, USA). Les données de navigation transitent par leurs serveurs conformément à leur propre politique de confidentialité, disponible sur <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">vercel.com</a>.
            </p>

          </div>
        </div>
      </main>
    </>
  );
}
