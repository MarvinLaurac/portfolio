import Header from "@/components/Header";

export default function Cookies() {
  return (
    <>
      <Header />
      <main className="bg-[#F8F7F4] min-h-screen">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-28 pb-16">
          <h1 className="font-inter font-bold text-[28px] sm:text-[32px] text-[#1a1a1a] mb-8">
            Politique de gestion des cookies
          </h1>

          <div className="text-[13px] sm:text-[14px] text-[#1a1a1a]/70 leading-relaxed">

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Qu'est-ce qu'un cookie ?
            </h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet au site de mémoriser certaines informations relatives à votre navigation.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Cookies utilisés sur ce site
            </h2>
            <p>
              Le site <strong>marvinlaurac.com</strong> utilise <strong>uniquement des cookies techniques strictement nécessaires</strong> au bon fonctionnement du site. Ces cookies permettent d'assurer la navigation et d'utiliser les fonctionnalités essentielles du site.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Cookies publicitaires et de tracking
            </h2>
            <p>
              Ce site <strong>n'utilise aucun cookie publicitaire</strong>, aucun cookie de suivi comportemental (tracking), et aucun cookie d'analyse d'audience de type Google Analytics ou équivalent. Vos habitudes de navigation ne sont ni enregistrées ni revendues à des tiers.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Durée de conservation
            </h2>
            <p>
              Les cookies techniques déposés sont des cookies de session : ils sont automatiquement supprimés à la fermeture de votre navigateur. Aucun cookie persistant n'est déposé sur votre terminal.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Gestion des cookies
            </h2>
            <p>
              Vous pouvez à tout moment paramétrer votre navigateur pour refuser ou supprimer les cookies. Voici les liens vers les guides des principaux navigateurs :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">Google Chrome</a>
              </li>
              <li>
                <a href="https://support.mozilla.org/fr/kb/autoriser-bloquer-cookies-preferences-sites" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">Mozilla Firefox</a>
              </li>
              <li>
                <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">Safari</a>
              </li>
              <li>
                <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1a1a1a] transition-colors">Microsoft Edge</a>
              </li>
            </ul>
            <p className="mt-3">
              Notez que la désactivation des cookies techniques peut affecter le bon fonctionnement de certaines fonctionnalités du site.
            </p>

            <h2 className="font-semibold text-[16px] text-[#1a1a1a] mt-8 mb-3">
              Contact
            </h2>
            <p>
              Pour toute question relative aux cookies :<br />
              <a href="mailto:marvinlaurac.pro@gmail.com" className="underline hover:text-[#1a1a1a] transition-colors">marvinlaurac.pro@gmail.com</a>
            </p>

          </div>
        </div>
      </main>
    </>
  );
}
