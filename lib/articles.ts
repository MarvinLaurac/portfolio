export type Article = {
  slug: string;
  tag: string;
  tagColor: string;
  avatar: string;
  title: string;
  description: string;
  date: string;
  isoDate: string;
  readTime: string;
  illustrationSrc?: string;
  content: Section[];
  faq: { question: string; answer: string }[];
  resources: { label: string; url: string; description: string }[];
};

type Section = {
  type: "h2" | "p" | "quote" | "ul";
  text?: string;
  items?: string[];
};

export const articles: Article[] = [
  {
    slug: "apple-siri-gemini-ios-26",
    tag: "Grand public",
    tagColor: "bg-blue-500/20 text-blue-300",
    avatar: "🤖",
    title: "Apple repense Siri avec Gemini : ce que ça change vraiment",
    description:
      "Avec iOS 26.4, Apple intègre le modèle Gemini de Google dans Siri via Private Cloud Compute. Un tournant discret mais profond pour des centaines de millions d'utilisateurs.",
    date: "2 mars 2026",
    isoDate: "2026-03-02",
    readTime: "4 min",
    illustrationSrc: "/images/articles/siri-gemini-timeline.png",
    content: [
      {
        type: "p",
        text: "Pendant des années, Siri a été la blague préférée des utilisateurs Apple. Lente, imprécise, incapable de tenir une conversation de plus de deux échanges. Quand ChatGPT est apparu en 2022, l'écart est devenu impossible à ignorer. Apple a mis trois ans à répondre. Avec iOS 26.4, la réponse est enfin là.",
      },
      {
        type: "h2",
        text: "Un partenariat inattendu entre deux rivaux",
      },
      {
        type: "p",
        text: "Apple a choisi Google et son modèle Gemini pour alimenter la nouvelle Siri. Le choix peut surprendre : deux géants technologiques rivaux qui s'associent sur l'une des fonctionnalités les plus visibles de l'iPhone. Mais la logique est implacable. Google dispose aujourd'hui du modèle multimodal le plus performant sur les tâches du quotidien, et Apple a besoin d'un résultat immédiat.",
      },
      {
        type: "p",
        text: "Ce n'est pas la première fois qu'Apple externalise une technologie critique plutôt que de la développer en interne. Safari repose sur le moteur WebKit, les cartes ont longtemps utilisé des données TomTom, et le moteur de recherche par défaut est Google depuis des années. Gemini s'inscrit dans cette logique de pragmatisme stratégique.",
      },
      {
        type: "quote",
        text: "Nous ne faisons pas de compromis sur la vie privée. Private Cloud Compute garantit que vos données ne quittent jamais votre appareil sans votre consentement explicite.",
      },
      {
        type: "h2",
        text: "Private Cloud Compute : l'infrastructure qui rend tout possible",
      },
      {
        type: "p",
        text: "Le vrai pari d'Apple n'est pas Gemini, c'est l'architecture qui l'entoure. Private Cloud Compute crée une enclave sécurisée entre votre appareil et les serveurs Apple. Les requêtes sont traitées sans être stockées, sans être associées à votre identité, et sans être accessibles aux ingénieurs d'Apple eux-mêmes. C'est une promesse forte, et Apple a publié le code source de l'architecture pour permettre une vérification indépendante.",
      },
      {
        type: "ul",
        items: [
          "Traitement des requêtes en mémoire volatile uniquement, aucune persistance",
          "Requêtes non associées à votre Apple ID ni à votre adresse IP",
          "Audit de sécurité indépendant publié chaque trimestre",
          "Code de l'enclave open source depuis janvier 2026",
          "Compatible RGPD, PIPEDA et California Privacy Rights Act",
        ],
      },
      {
        type: "h2",
        text: "Ce que ça change au quotidien",
      },
      {
        type: "p",
        text: "La nouvelle Siri comprend le contexte. Elle retient ce que vous avez dit deux échanges plus tôt. Elle peut orchestrer des actions complexes à travers plusieurs applications. Pour la première fois, demander à Siri de réserver un restaurant pour vendredi, pas trop loin du bureau, quelque chose de calme, produit un résultat utile. Elle ouvre Plans, filtre par notation et ambiance, propose trois options et confirme la réservation directement.",
      },
      {
        type: "p",
        text: "Les actions inter-applicatives sont particulièrement impressionnantes. Siri peut maintenant lire un email, en extraire une date de réunion, créer l'événement dans Calendrier, envoyer un message de confirmation au contact concerné et ajouter un rappel de préparation, le tout en une seule instruction vocale.",
      },
      {
        type: "h2",
        text: "Les limites à connaître",
      },
      {
        type: "p",
        text: "La nouvelle Siri n'est pas disponible sur tous les appareils. Elle exige un iPhone 16 ou un Mac avec puce M3 minimum. Les utilisateurs d'appareils plus anciens conservent l'ancienne Siri, sans mise à niveau possible. C'est un changement de paradigme silencieux qui creuse le fossé entre les générations d'appareils Apple.",
      },
      {
        type: "p",
        text: "Pas de keynote fracassante, pas de nom de produit accrocheur. Juste une mise à jour logicielle qui transforme l'expérience de 1,2 milliard d'iPhone actifs dans le monde, pour ceux qui ont le bon matériel.",
      },
    ],
    faq: [
      {
        question: "Tous les iPhone sont-ils concernés par la nouvelle Siri ?",
        answer: "Non. La mise à jour nécessite un iPhone 16 minimum ou un Mac avec puce M3. Les appareils plus anciens conservent l'ancienne version de Siri sans possibilité de mise à niveau.",
      },
      {
        question: "Mes conversations avec Siri sont-elles envoyées à Google ?",
        answer: "Non, selon Apple. Private Cloud Compute traite les requêtes dans une enclave sécurisée sans les stocker ni les associer à votre identité. Apple a publié le code source de l'architecture pour permettre une vérification indépendante.",
      },
      {
        question: "Quand cette mise à jour est-elle disponible ?",
        answer: "iOS 26.4 est disponible depuis le 2 mars 2026 pour les appareils compatibles, via les paramètres de mise à jour classiques.",
      },
    ],
    resources: [
      {
        label: "Apple Intelligence et confidentialité",
        url: "https://www.apple.com/privacy/",
        description: "La politique de confidentialité d'Apple et les détails sur Private Cloud Compute",
      },
      {
        label: "Google DeepMind : Gemini",
        url: "https://deepmind.google/",
        description: "La recherche et la documentation officielle sur le modèle Gemini",
      },
    ],
  },

  {
    slug: "robot-humanoid-tennis-galbot",
    tag: "Grand public",
    tagColor: "bg-blue-500/20 text-blue-300",
    avatar: "🎾",
    title: "Un robot joue au tennis. 96% de réussite. 5h d'entraînement.",
    description:
      "Galbot Robotics a présenté un robot humanoïde capable de tenir des échanges de tennis en temps réel avec un humain. La prouesse technique derrière ce résultat change notre compréhension de l'apprentissage automatique.",
    date: "10 mars 2026",
    isoDate: "2026-03-10",
    readTime: "5 min",
    illustrationSrc: "/images/articles/robot-tennis-chart.png",
    content: [
      {
        type: "p",
        text: "Le tennis est l'un des sports les plus exigeants pour un robot. Balle rapide, trajectoires imprévisibles, surface variable, adversaire humain émotionnel dont le style change à chaque échange. Galbot Robotics, une startup fondée en 2023 à Shenzhen, vient de démontrer qu'aucun de ces obstacles n'est insurmontable, et l'a fait avec un budget d'entraînement qui défie l'entendement.",
      },
      {
        type: "h2",
        text: "5 heures de données, des résultats de classe mondiale",
      },
      {
        type: "p",
        text: "Ce qui rend la démonstration de Galbot remarquable n'est pas le résultat, c'est le coût d'entraînement. Seulement cinq heures de données de mouvement fragmentées ont suffi pour atteindre 96% de réussite sur le coup droit. Les approches précédentes, comme celles de Boston Dynamics sur des tâches similaires, nécessitaient des centaines voire des milliers d'heures de données capturées en conditions réelles.",
      },
      {
        type: "p",
        text: "Les cinq heures de Galbot ne sont pas des données continues et idéales. Ce sont des fragments récupérés auprès de trois joueurs de niveau club, filmés dans des conditions d'éclairage variables, avec du matériel grand public. La qualité des données était délibérément médiocre pour tester la robustesse du modèle face à des conditions imparfaites.",
      },
      {
        type: "quote",
        text: "Nous n'avons pas appris au robot à jouer au tennis. Nous lui avons appris à apprendre à jouer au tennis.",
      },
      {
        type: "h2",
        text: "L'architecture derrière la performance",
      },
      {
        type: "p",
        text: "Galbot utilise une approche hybride appelée Sim-to-Real Bridging. Un modèle de physique simulée est d'abord entraîné dans un environnement virtuel avec des millions d'échanges synthétiques. Ce modèle développe une intuition des trajectoires balistiques, des effets de spin et de l'interaction balle-surface. La phase réelle ne sert qu'à calibrer les écarts entre la simulation et la réalité physique.",
      },
      {
        type: "ul",
        items: [
          "Capteurs de profondeur 3D à 240 Hz pour le suivi de balle en temps réel",
          "Latence motrice totale inférieure à 8 millisecondes",
          "Adaptation en temps réel aux conditions d'éclairage et de surface",
          "Modèle de prédiction de trajectoire à horizon 400ms",
          "Poids du robot : 62 kg, autonomie batterie : 4h en conditions de jeu",
        ],
      },
      {
        type: "h2",
        text: "La démonstration publique",
      },
      {
        type: "p",
        text: "La vidéo publiée le 10 mars montre un échange de 34 coups consécutifs entre le robot et un joueur humain de niveau intermédiaire. Le robot ajuste ses coups en fonction de la position de l'adversaire, varie les angles et produit des effets différents selon la situation. Ce niveau d'adaptation tactique était inédit pour un système robotique.",
      },
      {
        type: "p",
        text: "Sur les 200 échanges testés lors de la démonstration interne, le taux de réussite global atteint 91%. Le coup droit culmine à 96%. Le revers est plus modeste à 84%. Le service reste le point faible à 71% : la complexité du mouvement de lancer combiné à la frappe dépasse encore les capacités actuelles du système.",
      },
      {
        type: "h2",
        text: "Les implications au-delà du sport",
      },
      {
        type: "p",
        text: "Le tennis n'est qu'un prétexte. Ce que Galbot démontre, c'est une capacité générale d'adaptation motrice fine avec très peu de données réelles. Cette approche pourrait transformer la chirurgie robotique, la logistique de précision dans des environnements non structurés, et la réhabilitation médicale assistée.",
      },
      {
        type: "p",
        text: "Les investisseurs semblent l'avoir compris. Galbot a annoncé une levée de 180 millions de dollars en Série B le lendemain de la publication, avec une valorisation de 1,4 milliard. La vitesse de cette décision, moins de 72 heures entre la vidéo et l'annonce, suggère que les négociations étaient déjà avancées avant la démonstration publique.",
      },
    ],
    faq: [
      {
        question: "Le robot peut-il battre un joueur professionnel ?",
        answer: "Pas encore. Les tests ont été réalisés face à des joueurs de niveau club. Le service, point faible à 71%, et l'adaptation tactique avancée restent des obstacles pour rivaliser avec des joueurs de haut niveau.",
      },
      {
        question: "Quelles autres applications sont envisagées ?",
        answer: "La chirurgie robotique, la logistique de précision et la réhabilitation médicale sont les trois domaines prioritaires mentionnés par l'équipe de Galbot après la démonstration.",
      },
      {
        question: "Combien coûte ce robot ?",
        answer: "Galbot n'a pas communiqué de prix officiel. La startup se positionne pour l'instant sur des applications industrielles et médicales plutôt que sur le grand public.",
      },
    ],
    resources: [
      {
        label: "IEEE Robotics and Automation",
        url: "https://www.ieee.org/",
        description: "Publications scientifiques de référence sur les avancées en robotique humanoïde",
      },
      {
        label: "Boston Dynamics : état de l'art de la robotique",
        url: "https://bostondynamics.com/",
        description: "Référence mondiale en robotique, pour comprendre l'écosystème dans lequel s'inscrit Galbot",
      },
    ],
  },

  {
    slug: "openclaw-rachat-openai",
    tag: "Grand public",
    tagColor: "bg-blue-500/20 text-blue-300",
    avatar: "🌊",
    title: "OpenClaw racheté par OpenAI : la fin de l'open source ?",
    description:
      "Le projet open-source le plus étoilé de GitHub en mars 2026, devant React et Linux, a été acquis par OpenAI quelques semaines après son explosion virale. Un signal fort sur l'avenir de l'IA ouverte.",
    date: "7 mars 2026",
    isoDate: "2026-03-07",
    readTime: "4 min",
    illustrationSrc: "/images/articles/openclaw-openai-illustration.png",
    content: [
      {
        type: "p",
        text: "OpenClaw est apparu sur GitHub début février avec une proposition simple : un framework d'agents IA entièrement open source, sans dépendances propriétaires, déployable sur n'importe quelle infrastructure. Pas de clé API requise. Pas d'abonnement. Pas de vendor lock-in. En trois semaines, il dépassait React en nombre d'étoiles. En cinq semaines, il était racheté.",
      },
      {
        type: "h2",
        text: "Ce qu'était OpenClaw",
      },
      {
        type: "p",
        text: "Le projet permettait de construire des pipelines d'agents autonomes capables de naviguer sur le web, d'écrire et d'exécuter du code, de gérer des fichiers et d'interagir avec des APIs tierces, sans passer par les services d'OpenAI, Anthropic ou Google. Il supportait nativement les modèles open source comme Llama, Mistral et DeepSeek, et proposait une interface visuelle pour construire des workflows sans écrire de code.",
      },
      {
        type: "p",
        text: "Son succès viral tenait à une combinaison rare : la qualité technique était au niveau des outils commerciaux, la documentation était exceptionnelle, et l'équipe de six personnes répondait aux issues GitHub en quelques heures. La communauté a reconnu quelque chose de sérieux dès les premières semaines.",
      },
      {
        type: "quote",
        text: "OpenClaw restera open source. Nous intégrons l'équipe pour accélérer ce qu'ils ont construit, pas pour le fermer.",
      },
      {
        type: "h2",
        text: "La vitesse de l'acquisition",
      },
      {
        type: "p",
        text: "L'acquisition s'est conclue en moins de six semaines entre le premier contact et l'annonce publique. Une rapidité inhabituelle même pour le secteur tech, qui témoigne de l'importance stratégique qu'OpenAI accorde à l'écosystème d'agents autonomes. Le montant n'a pas été divulgué officiellement, mais plusieurs sources proches du dossier évoquent une fourchette entre 200 et 400 millions de dollars pour une équipe de six personnes.",
      },
      {
        type: "ul",
        items: [
          "247 000 étoiles GitHub en 3 semaines, record historique toutes catégories",
          "Acquisition estimée entre 200M et 400M de dollars",
          "12 contributeurs principaux intégrés à OpenAI",
          "Licence MIT maintenue pour les versions existantes (v1.x)",
          "Développement futur sous gouvernance OpenAI",
        ],
      },
      {
        type: "h2",
        text: "La promesse tenue, ou pas",
      },
      {
        type: "p",
        text: "La communauté reste sceptique, et les précédents historiques lui donnent raison. MySQL a été racheté par Sun puis Oracle, et la communauté a forké pour créer MariaDB. Elasticsearch a modifié sa licence après son acquisition partielle par Amazon. Redis a changé de modèle de licensing en 2024. Les promesses de maintien de l'open source s'effritent souvent avec les cycles économiques.",
      },
      {
        type: "p",
        text: "La réaction la plus significative est venue de la communauté elle-même : un fork nommé FreeClaw a été créé dans les 48 heures suivant l'annonce, avec déjà 31 000 étoiles. L'histoire open source se répète.",
      },
    ],
    faq: [
      {
        question: "Puis-je encore utiliser OpenClaw gratuitement ?",
        answer: "Les versions existantes (v1.x) restent sous licence MIT et sont donc librement utilisables et modifiables. Le développement futur est désormais sous contrôle d'OpenAI.",
      },
      {
        question: "Qu'est-ce que FreeClaw, le fork mentionné ?",
        answer: "FreeClaw est un fork communautaire créé dans les 48h suivant l'acquisition, pour continuer le développement indépendamment d'OpenAI. Il est disponible sur GitHub sous licence MIT.",
      },
      {
        question: "Pourquoi OpenAI a-t-il acheté un outil qui permettait de se passer de ses services ?",
        answer: "L'acquisition permet à OpenAI de contrôler l'écosystème des agents autonomes et d'intégrer les innovations d'OpenClaw dans ses propres produits, tout en éliminant un concurrent indirect à son API.",
      },
    ],
    resources: [
      {
        label: "GitHub : explorer les projets open source",
        url: "https://github.com/explore",
        description: "Les projets open source les plus actifs du moment, dont les forks d'OpenClaw",
      },
      {
        label: "OpenAI : actualités officielles",
        url: "https://openai.com/news/",
        description: "Les annonces officielles d'OpenAI sur ses acquisitions et partenariats",
      },
    ],
  },

  {
    slug: "openai-valorisation-730-milliards",
    tag: "Grand public",
    tagColor: "bg-blue-500/20 text-blue-300",
    avatar: "💰",
    title: "OpenAI à 730 milliards : l'IA est devenue une infrastructure",
    description:
      "OpenAI vient de lever 110 milliards de dollars auprès d'Amazon, Nvidia et SoftBank. Ce chiffre dit quelque chose de fondamental sur la nature de l'IA en 2026.",
    date: "14 mars 2026",
    isoDate: "2026-03-14",
    readTime: "3 min",
    illustrationSrc: "/images/articles/openai-730-milliards-illustration.png",
    content: [
      {
        type: "p",
        text: "Il y a trois ans, une valorisation de 730 milliards pour une entreprise sans actifs physiques majeurs aurait semblé absurde. Aujourd'hui, elle semble presque logique. OpenAI n'est plus une startup d'IA : c'est une couche d'infrastructure mondiale, au même titre qu'AWS ou Cloudflare. Et les marchés l'évaluent en conséquence.",
      },
      {
        type: "h2",
        text: "Pourquoi Amazon, Nvidia et SoftBank",
      },
      {
        type: "p",
        text: "Ces trois investisseurs ne parient pas sur OpenAI, ils sécurisent leur position dans l'écosystème. Amazon veut garantir l'accès prioritaire à GPT pour ses clients AWS entreprise, où la demande explose. Nvidia lie son destin matériel à la demande computationnelle d'OpenAI : chaque nouveau modèle GPT nécessite des dizaines de milliers de GPU supplémentaires. SoftBank joue l'IA comme thèse macro-économique décennale, après avoir raté l'essentiel de la vague cloud.",
      },
      {
        type: "quote",
        text: "L'IA générale n'est plus un objectif de recherche. C'est un produit en cours de déploiement.",
      },
      {
        type: "h2",
        text: "Ce que signifie être une infrastructure",
      },
      {
        type: "p",
        text: "Quand une technologie devient infrastructure, son évaluation change de nature. On ne l'évalue plus sur ses profits actuels, on l'évalue sur son caractère irremplaçable. Internet a été valorisé à des niveaux absurdes en 2000 ; ceux qui ont survécu sont devenus les fondations de l'économie mondiale. Le cloud a suivi la même trajectoire dans les années 2010. L'IA suit ce chemin, et OpenAI en est aujourd'hui le nœud central.",
      },
      {
        type: "p",
        text: "OpenAI traite aujourd'hui plus de 2 milliards de requêtes par jour, réparties sur 175 pays et des milliers d'applications intégrées. Sa plateforme API est devenue un standard de fait. Des équipes entières de développeurs ont appris à construire sur GPT sans envisager d'alternative. Ce lock-in cognitif est, en pratique, plus puissant que n'importe quel lock-in contractuel.",
      },
      {
        type: "ul",
        items: [
          "110 milliards levés en Série G, le plus grand tour de financement tech de l'histoire",
          "Valorisation pré-money : 730 milliards (contre 80Mds en 2023)",
          "2 milliards de requêtes API traitées par jour",
          "GPT intégré dans plus de 4 000 applications en production",
        ],
      },
    ],
    faq: [
      {
        question: "OpenAI est-il rentable à 730 milliards de valorisation ?",
        answer: "Non, OpenAI n'est pas encore rentable. Ses coûts d'infrastructure et de recherche dépassent ses revenus actuels. La valorisation reflète les anticipations de revenus futurs, pas la situation financière présente.",
      },
      {
        question: "Qui détient OpenAI ?",
        answer: "La structure est complexe. Une entité à but non lucratif contrôle une entité commerciale à profit limité. Microsoft est le principal investisseur externe, suivi d'Amazon, Nvidia et SoftBank à l'issue de ce tour de table.",
      },
      {
        question: "GPT pourrait-il être remplacé par un concurrent ?",
        answer: "C'est possible. MiniMax, Anthropic et Google Gemini représentent des alternatives sérieuses. Mais l'avance en termes d'intégrations, d'écosystème développeur et de notoriété est aujourd'hui significative.",
      },
    ],
    resources: [
      {
        label: "OpenAI : site officiel",
        url: "https://openai.com/",
        description: "Produits, recherches et actualités officielles d'OpenAI",
      },
      {
        label: "Nvidia : accélérateurs IA",
        url: "https://www.nvidia.com/",
        description: "Le fournisseur de GPU sur lequel repose une grande partie de l'infrastructure d'OpenAI",
      },
    ],
  },

  {
    slug: "gpt-5-4-un-million-tokens",
    tag: "Technique",
    tagColor: "bg-purple-500/20 text-purple-300",
    avatar: "⚡",
    title: "GPT-5.4 : 1 million de tokens et le seuil de l'expert humain",
    description:
      "OpenAI publie GPT-5.4 Thinking avec une fenêtre de contexte d'un million de tokens et un score GDPVal de 83%. Ce que ces chiffres signifient concrètement.",
    date: "5 mars 2026",
    isoDate: "2026-03-05",
    readTime: "6 min",
    illustrationSrc: "/images/articles/gpt-5-4-illustration.png",
    content: [
      {
        type: "p",
        text: "Un million de tokens. Pour donner une intuition de l'échelle : c'est environ 750 000 mots, soit l'équivalent de sept romans de longueur moyenne, ou d'une base de code de 50 000 lignes avec tests et documentation inclus. GPT-5.4 peut traiter tout ça en une seule requête, maintenir la cohérence sur l'ensemble, et raisonner à travers des dépendances distribuées sur des centaines de fichiers.",
      },
      {
        type: "h2",
        text: "Ce que GDPVal mesure vraiment",
      },
      {
        type: "p",
        text: "Le benchmark GDPVal (General Domain Professional Validation) a été conçu en 2025 par un consortium de laboratoires indépendants pour pallier les limitations des benchmarks traditionnels comme MMLU ou HumanEval. L'idée centrale : évaluer les modèles sur des tâches à valeur économique réelle, pas sur des QCM standardisés.",
      },
      {
        type: "p",
        text: "Concrètement, GDPVal soumet les modèles à des problèmes issus de cabinets juridiques, d'hôpitaux, de fonds d'investissement et d'équipes d'ingénierie. Les réponses sont évaluées par des experts humains qui ignorent si elles proviennent d'un humain ou d'un modèle. Un score de 83% signifie que GPT-5.4 produit des réponses jugées meilleures que celles d'un expert humain dans 83% des cas testés. La référence humaine est à 78%.",
      },
      {
        type: "quote",
        text: "Nous ne mesurons plus les capacités des modèles en termes d'exactitude sur des QCM. Nous mesurons la valeur économique qu'ils peuvent produire.",
      },
      {
        type: "h2",
        text: "L'architecture Thinking",
      },
      {
        type: "p",
        text: "La variante Thinking de GPT-5.4 introduit une chaîne de raisonnement interne avant chaque réponse. Le modèle génère un brouillon non visible par l'utilisateur, une séquence de tokens internes où il structure sa réflexion, identifie les contradictions, explore plusieurs approches et évalue leur pertinence avant de répondre. Ce mécanisme est similaire à ce que fait un expert humain qui réfléchit avant de parler.",
      },
      {
        type: "p",
        text: "Cette délibération interne a un coût : la latence augmente de 40 à 200% selon la complexité de la tâche. OpenAI a introduit un paramètre de contrôle du budget de réflexion. Les développeurs peuvent calibrer le compromis entre vitesse et profondeur de raisonnement selon leur cas d'usage.",
      },
      {
        type: "ul",
        items: [
          "Fenêtre de contexte : 1 000 000 tokens (contre 128K pour GPT-4o)",
          "Score GDPVal : 83% (référence humaine experte : 78%)",
          "Budget de réflexion configurable : fast, balanced, deep",
          "Intégration native Excel, PowerPoint, Word via Microsoft 365",
          "Latence réduite de 40% sur les tâches courtes sans Thinking activé",
          "Support natif de 47 langues avec performances quasi-équivalentes",
        ],
      },
      {
        type: "h2",
        text: "Applications concrètes du contexte long",
      },
      {
        type: "p",
        text: "Le million de tokens débloque des cas d'usage impossibles jusqu'ici. Un cabinet d'avocats peut soumettre l'intégralité d'un dossier de due diligence, 2 000 pages de contrats et annexes, et demander une synthèse des risques juridiques avec références précises aux clauses concernées. Une équipe d'ingénieurs peut soumettre une base de code entière et demander une analyse d'architecture ou la localisation de vulnérabilités de sécurité.",
      },
      {
        type: "p",
        text: "En finance, les gestionnaires de fonds utilisent déjà le contexte long pour analyser plusieurs années de rapports annuels d'une entreprise en une seule requête. Ce type d'analyse prenait auparavant plusieurs jours à une équipe d'analystes juniors.",
      },
      {
        type: "h2",
        text: "Les limites que personne ne mentionne",
      },
      {
        type: "p",
        text: "Un million de tokens en contexte, ça coûte cher. Une requête utilisant la fenêtre maximale peut atteindre plusieurs dizaines de dollars. Pour la plupart des usages professionnels, la fenêtre utile reste entre 32K et 128K tokens. Le million de tokens est une capacité de pointe réservée à des cas d'usage spécifiques à haute valeur ajoutée.",
      },
      {
        type: "p",
        text: "Il y a aussi un phénomène documenté dit \"lost in the middle\" : les modèles ont tendance à mieux traiter les informations au début et à la fin du contexte qu'au milieu. Sur un million de tokens, cet effet peut être significatif. OpenAI affirme l'avoir atténué dans GPT-5.4, mais des tests indépendants suggèrent qu'il persiste sur les requêtes les plus longues.",
      },
    ],
    faq: [
      {
        question: "GDPVal est-il le seul benchmark qui compte ?",
        answer: "Non. GDPVal mesure la valeur économique, mais d'autres benchmarks restent pertinents : MMLU pour le raisonnement général, HumanEval pour le code, MATH-500 pour les mathématiques. Aucun benchmark unique ne capture toutes les capacités d'un modèle.",
      },
      {
        question: "Combien coûte une requête de 1 million de tokens ?",
        answer: "Entre 30 et 50 dollars selon le mode de facturation et la proportion de tokens en entrée vs en sortie. Pour un usage quotidien, la fenêtre utile reste entre 32K et 128K tokens.",
      },
      {
        question: "Quelle est la différence entre GPT-5.4 et GPT-5.4 Thinking ?",
        answer: "GPT-5.4 est le modèle standard, optimisé pour la vitesse. La variante Thinking ajoute une chaîne de raisonnement interne qui améliore les performances sur les tâches complexes, au prix d'une latence plus élevée.",
      },
    ],
    resources: [
      {
        label: "OpenAI Platform : documentation API",
        url: "https://platform.openai.com/docs/",
        description: "Documentation officielle pour utiliser GPT-5.4 dans vos applications",
      },
      {
        label: "Papers With Code : benchmarks LLM",
        url: "https://paperswithcode.com/",
        description: "Comparaison des performances des modèles sur les principaux benchmarks publics",
      },
    ],
  },

  {
    slug: "mit-ia-medicaments-proteines",
    tag: "Technique",
    tagColor: "bg-purple-500/20 text-purple-300",
    avatar: "🧬",
    title: "MIT : l'IA qui conçoit des médicaments à partir de protéines",
    description:
      "Des chercheurs du MIT ont développé un modèle génératif capable de prédire comment des protéines synthétiques interagissent avec des cibles biologiques. Une avancée qui pourrait réduire le temps de développement médicamenteux de dix à deux ans.",
    date: "18 mars 2026",
    isoDate: "2026-03-18",
    readTime: "7 min",
    illustrationSrc: "/images/articles/mit-ia-medicaments-illustration.png",
    content: [
      {
        type: "p",
        text: "Le développement d'un médicament prend en moyenne douze ans et coûte entre un et trois milliards de dollars. L'étape la plus longue est la phase de découverte : identifier parmi des milliards de molécules candidates celle dont la structure interagira précisément avec la cible thérapeutique souhaitée. C'est un problème combinatoire d'une complexité vertigineuse. Le modèle du MIT s'y attaque directement.",
      },
      {
        type: "h2",
        text: "Le problème du repliement des protéines",
      },
      {
        type: "p",
        text: "Pour comprendre l'enjeu, il faut saisir ce qu'est une protéine dans ce contexte. Une protéine est une chaîne d'acides aminés qui se replie dans l'espace tridimensionnel pour former une forme spécifique. C'est cette forme 3D qui détermine ses propriétés biologiques : avec quelles autres molécules elle interagit, à quelle vitesse, et avec quelle affinité.",
      },
      {
        type: "p",
        text: "AlphaFold de DeepMind avait déjà résolu en grande partie le problème de la prédiction du repliement : donner une séquence, prédire la structure 3D. Le MIT va plus loin : donner une cible thérapeutique et une interaction souhaitée, générer une protéine synthétique dont la structure produira cette interaction. C'est le problème inverse, et il est significativement plus difficile.",
      },
      {
        type: "quote",
        text: "Nous ne cherchons plus une aiguille dans une botte de foin. Nous redessinons l'aiguille pour qu'elle s'adapte parfaitement au trou qu'on veut traverser.",
      },
      {
        type: "h2",
        text: "Comment le modèle fonctionne",
      },
      {
        type: "p",
        text: "Le modèle est un diffusion model adapté aux données structurales de protéines. Il est entraîné sur 340 millions de structures protéiques documentées, avec leurs séquences d'acides aminés, leurs formes tridimensionnelles et leurs interactions mesurées expérimentalement. Le modèle apprend la distribution statistique des structures qui produisent des interactions spécifiques.",
      },
      {
        type: "p",
        text: "En inférence, on lui soumet une cible thérapeutique et une description de l'interaction souhaitée. Le modèle génère 100 à 1000 séquences candidates, classées par probabilité estimée d'efficacité. Les chercheurs ne synthétisent ensuite que les cinq à dix meilleures candidates pour les tests expérimentaux.",
      },
      {
        type: "h2",
        text: "Résultats préliminaires sur le cancer",
      },
      {
        type: "p",
        text: "Les équipes ont testé le modèle sur six cibles thérapeutiques : deux liées au cancer colorectal, deux à la leucémie myéloïde aiguë, et deux à des maladies auto-immunes. Dans les six cas, au moins un des dix candidats générés a montré une interaction expérimentalement mesurable. Le taux de succès moyen au premier test est de 91%, contre 2 à 5% avec les méthodes de criblage classiques.",
      },
      {
        type: "ul",
        items: [
          "91% de corrélation entre simulations et résultats expérimentaux sur 6 cibles",
          "Temps de génération d'un candidat : 4 heures contre 18 à 24 mois en méthode classique",
          "Coût de génération par candidat : environ 200 dollars de compute",
          "Testé sur 6 cibles thérapeutiques dans 3 domaines pathologiques",
          "Publication dans Nature Biotechnology, mars 2026",
          "Code et poids du modèle disponibles sous licence Creative Commons",
        ],
      },
      {
        type: "h2",
        text: "Les partenariats déjà en place",
      },
      {
        type: "p",
        text: "Le laboratoire du MIT a conclu des accords de collaboration avec trois laboratoires pharmaceutiques, dont Novartis et Sanofi. Ces accords permettent aux industriels d'accéder au modèle en échange de données propriétaires sur des interactions protéiques non publiées. C'est un modèle de co-développement qui accélère à la fois la recherche académique et les pipelines industriels.",
      },
      {
        type: "h2",
        text: "Ce que ça ne résout pas encore",
      },
      {
        type: "p",
        text: "La prédiction computationnelle reste une approximation. Les effets secondaires, la pharmacocinétique, la toxicité à long terme, les interactions médicamenteuses : aucune de ces variables n'est modélisée de façon fiable. L'IA accélère la phase de découverte, mais les phases 1, 2 et 3 des essais cliniques restent incontournables. C'est là que se joue l'économie du médicament.",
      },
    ],
    faq: [
      {
        question: "Quand ces médicaments seront-ils disponibles pour les patients ?",
        answer: "Les premières molécules générées par le modèle entrent en phase préclinique fin 2026. Les essais cliniques en 3 phases prennent en moyenne 7 à 10 ans. Les premiers médicaments issus de cette approche ne seront pas disponibles avant 2033-2035 au plus tôt.",
      },
      {
        question: "Le modèle est-il accessible aux chercheurs indépendants ?",
        answer: "Oui. Le code source et les poids du modèle sont disponibles sous licence Creative Commons depuis la publication dans Nature Biotechnology en mars 2026.",
      },
      {
        question: "AlphaFold et ce modèle du MIT font-ils la même chose ?",
        answer: "Non. AlphaFold prédit la structure 3D d'une protéine à partir de sa séquence. Le modèle du MIT résout le problème inverse : il génère des séquences de protéines qui produiront une interaction spécifique avec une cible thérapeutique donnée.",
      },
    ],
    resources: [
      {
        label: "Nature Biotechnology",
        url: "https://www.nature.com/nbt/",
        description: "La revue scientifique où a été publiée l'étude originale du MIT",
      },
      {
        label: "MIT : Computer Science and AI Lab",
        url: "https://www.csail.mit.edu/",
        description: "Le laboratoire du MIT à l'origine de cette recherche sur les protéines",
      },
    ],
  },

  {
    slug: "minimax-m2-5-efficience",
    tag: "Technique",
    tagColor: "bg-purple-500/20 text-purple-300",
    avatar: "🏎️",
    title: "MiniMax M2.5 : quand l'efficience bat la puissance brute",
    description:
      "MiniMax M2.5 rivalise avec Claude Opus 4.6 sur les benchmarks principaux, à un coût d'inférence trois fois inférieur. Un signal important sur la direction que prend la compétition entre modèles.",
    date: "11 mars 2026",
    isoDate: "2026-03-11",
    readTime: "5 min",
    illustrationSrc: "/images/articles/minimax-m2-5-illustration.png",
    content: [
      {
        type: "p",
        text: "Depuis deux ans, la course aux modèles de langage ressemblait à une course aux armements : plus de paramètres, plus de données, plus de compute. GPT-4 avait 1,8 trillion de paramètres estimés. Claude 3 Opus approchait des niveaux similaires. La logique était simple : plus grand égale meilleur. MiniMax M2.5 propose une thèse radicalement différente, et les benchmarks lui donnent raison.",
      },
      {
        type: "h2",
        text: "Les benchmarks en détail",
      },
      {
        type: "p",
        text: "Sur MMLU, HumanEval et MATH-500, M2.5 score à moins de 3 points de pourcentage de Claude Opus 4.6, un modèle qui coûte environ 0,90 dollar par million de tokens en entrée. Sur certaines tâches de code génératif, notamment la complétion de fonctions Python avec contexte long, M2.5 le dépasse marginalement. Le coût d'inférence de M2.5 est de 0,30 dollar par million de tokens.",
      },
      {
        type: "p",
        text: "Pour les équipes qui déploient des modèles à grande échelle, cette différence de coût est structurante. Sur un volume de 100 millions de tokens par jour, passer de Claude Opus à M2.5 représente une économie de 60 000 dollars par mois. Pour des startups en phase de croissance, c'est souvent la différence entre la rentabilité et la dépendance permanente aux investisseurs.",
      },
      {
        type: "quote",
        text: "La prochaine frontière n'est pas le modèle le plus puissant. C'est le meilleur ratio performance/coût à l'échelle.",
      },
      {
        type: "h2",
        text: "L'architecture Mixture-of-Experts étendue",
      },
      {
        type: "p",
        text: "M2.5 utilise une architecture Mixture-of-Experts (MoE) avec 128 experts spécialisés, dont seulement 8 sont activés par token. En pratique : le modèle a une capacité totale de plusieurs centaines de milliards de paramètres, mais n'en utilise qu'une fraction à chaque inférence. Cela réduit drastiquement le compute par requête tout en maintenant une capacité d'ensemble élevée.",
      },
      {
        type: "p",
        text: "L'innovation de MiniMax est dans le mécanisme de routage. Les approches précédentes utilisaient des routeurs simples basés sur la similarité sémantique. M2.5 utilise un routeur hiérarchique entraîné conjointement avec le reste du modèle, qui apprend à distribuer les tokens non pas par similarité de surface mais par type de raisonnement requis.",
      },
      {
        type: "ul",
        items: [
          "128 experts, 8 actifs par token, capacité totale estimée à 400 milliards de paramètres",
          "Coût d'inférence : 0,30 dollar par million de tokens (contre 0,90 dollar pour Opus 4.6)",
          "Entraîné sur 4,2 trillions de tokens en 32 langues",
          "Fenêtre de contexte : 256K tokens",
          "Temps de réponse médian : 1,2 seconde sur des requêtes de 2K tokens",
        ],
      },
      {
        type: "h2",
        text: "Les cas d'usage où M2.5 s'impose",
      },
      {
        type: "p",
        text: "M2.5 n'est pas le meilleur modèle sur toutes les tâches. Sur des raisonnements complexes en plusieurs étapes, des analyses juridiques nuancées ou des tâches créatives longues, les modèles frontière d'Anthropic et OpenAI conservent un avantage mesurable. Mais pour les cas d'usage industriels à volume élevé, classification de documents, extraction d'informations structurées, génération de réponses à partir d'un contexte donné, M2.5 est aujourd'hui le choix le plus rationnel.",
      },
      {
        type: "p",
        text: "Plusieurs équipes engineering ont déjà publié leurs retours de migration. Le consensus : sur des tâches bien définies avec des prompts optimisés, la différence de qualité perçue par les utilisateurs finaux est inférieure à 5%, pour un coût divisé par trois.",
      },
    ],
    faq: [
      {
        question: "MiniMax M2.5 est-il disponible via API ?",
        answer: "Oui. MiniMax propose un accès API avec une tarification à 0,30 dollar par million de tokens en entrée. Une version gratuite avec limitations est disponible pour les développeurs qui veulent tester le modèle.",
      },
      {
        question: "Pour quels cas d'usage M2.5 est-il moins bon qu'Opus ?",
        answer: "Sur des raisonnements complexes en plusieurs étapes, des analyses juridiques nuancées ou des tâches créatives longues, Claude Opus 4.6 conserve un avantage mesurable. M2.5 est optimal sur des tâches bien définies avec des volumes élevés.",
      },
      {
        question: "Qu'est-ce que l'architecture Mixture-of-Experts ?",
        answer: "C'est une architecture où le modèle est divisé en sous-réseaux spécialisés appelés experts. Pour chaque token traité, seul un sous-ensemble d'experts est activé. Cela permet d'avoir une grande capacité totale tout en limitant le coût de chaque inférence.",
      },
    ],
    resources: [
      {
        label: "MiniMax : site officiel",
        url: "https://www.minimax.io/",
        description: "Accès à l'API MiniMax et documentation technique du modèle M2.5",
      },
      {
        label: "Papers With Code : Mixture of Experts",
        url: "https://paperswithcode.com/methods/category/mixture-of-experts",
        description: "Ressources scientifiques sur l'architecture MoE utilisée par M2.5",
      },
    ],
  },

  {
    slug: "meta-puces-mtia-nvidia",
    tag: "Technique",
    tagColor: "bg-purple-500/20 text-purple-300",
    avatar: "🔩",
    title: "Meta MTIA : la stratégie pour sortir de la dépendance Nvidia",
    description:
      "Meta annonce quatre nouvelles générations de puces IA maison, MTIA 300 à 500. Une initiative qui s'inscrit dans une tendance lourde : les grandes plateformes tech veulent contrôler leur stack silicium.",
    date: "20 mars 2026",
    isoDate: "2026-03-20",
    readTime: "6 min",
    illustrationSrc: "/images/articles/meta-mtia-illustration.png",
    content: [
      {
        type: "p",
        text: "Nvidia contrôle aujourd'hui plus de 80% du marché des accélérateurs pour l'IA. Cette position dominante, construite sur dix ans d'avance technologique et un écosystème logiciel CUDA quasi-impossible à contourner, a créé une dépendance structurelle pour toutes les entreprises qui entraînent ou déploient des modèles à grande échelle. Meta, avec Apple, Google et Amazon, a décidé de reprendre le contrôle de son destin silicium.",
      },
      {
        type: "h2",
        text: "Quatre générations simultanées",
      },
      {
        type: "p",
        text: "L'annonce de quatre générations en même temps, MTIA 300, 400, 450 et 500, n'est pas un accident de communication. C'est une stratégie délibérée pour couvrir simultanément différents niveaux du stack computationnel de Meta. Chaque génération est conçue pour un cas d'usage précis, optimisée pour ce seul cas, et ne prétend pas être un accélérateur généraliste.",
      },
      {
        type: "ul",
        items: [
          "MTIA 300 : inférence légère, ranking de contenu en temps réel (Feed, Reels, Ads)",
          "MTIA 400 : inférence générative moyenne charge, assistants, résumés, modération",
          "MTIA 450 : inférence haute performance sur des modèles Llama 70B et supérieurs",
          "MTIA 500 : préentraînement et fine-tuning à grande échelle",
        ],
      },
      {
        type: "h2",
        text: "Ce que Meta cherche à optimiser",
      },
      {
        type: "p",
        text: "Les MTIA ne sont pas conçus pour battre les H100 ou H200 de Nvidia sur des benchmarks génériques. Ils sont conçus pour être optimaux sur les charges de travail spécifiques de Meta. La recommandation de contenu représente à elle seule plus de 60% de la charge computationnelle quotidienne de Meta. C'est une tâche très différente de l'entraînement de LLMs : latences en millisecondes, volumes en milliards de requêtes par heure, modèles relativement petits mais exécutés en permanence.",
      },
      {
        type: "p",
        text: "Sur cette charge spécifique, les MTIA 300 affichent une efficacité énergétique 2,4 fois supérieure aux GPU H100 équivalents, selon les chiffres publiés par Meta. Pour une entreprise dont les datacenters consomment plusieurs gigawatts, cette différence se traduit directement en milliards de dollars d'économies sur la durée de vie des équipements.",
      },
      {
        type: "quote",
        text: "Nous ne construisons pas une puce. Nous construisons une plateforme silicium qui couvre l'ensemble du spectre de nos besoins computationnels.",
      },
      {
        type: "h2",
        text: "Le défi de l'écosystème logiciel",
      },
      {
        type: "p",
        text: "Le plus grand obstacle pour Meta n'est pas le silicium, c'est le logiciel. L'écosystème CUDA de Nvidia est profondément ancré dans tous les outils de ML modernes : PyTorch, JAX, TensorFlow. Les bibliothèques d'optimisation, les kernels custom, les outils de profilage, tout a été écrit pour CUDA.",
      },
      {
        type: "p",
        text: "Meta a une longueur d'avance sur ce point : l'entreprise est le principal contributeur à PyTorch, le framework de deep learning le plus utilisé au monde. Cela lui donne la capacité d'adapter le framework à ses propres puces sans dépendre de contributeurs externes. Les équipes MTIA et PyTorch sont co-localisées, ce qui raccourcit considérablement les cycles d'intégration.",
      },
      {
        type: "h2",
        text: "L'enjeu stratégique au-delà des coûts",
      },
      {
        type: "p",
        text: "Contrôler son silicium, c'est contrôler sa roadmap. Meta n'a plus besoin d'attendre que Nvidia lance un nouveau GPU pour progresser sur ses cas d'usage prioritaires. Elle peut concevoir une puce optimisée pour les Llama 4 ou 5 avant même que ces modèles soient finalisés, en parallèle du développement du modèle.",
      },
      {
        type: "p",
        text: "C'est une forme d'autonomie stratégique que toutes les grandes plateformes cherchent à atteindre. Apple a lancé les Apple Silicon en 2020. Google a ses TPU depuis 2016. Amazon a ses Trainium et Inferentia. Dans ce contexte, Meta était en retard. L'annonce des MTIA 300 à 500 est une correction de trajectoire.",
      },
    ],
    faq: [
      {
        question: "Les MTIA vont-ils remplacer complètement les GPU Nvidia chez Meta ?",
        answer: "Non, pas à court terme. Meta continuera à utiliser des GPU Nvidia pour les charges de travail que ses puces maison ne couvrent pas encore. L'objectif est une réduction progressive de la dépendance, pas une substitution totale.",
      },
      {
        question: "PyTorch fonctionne-t-il nativement sur les MTIA ?",
        answer: "Oui. Meta a développé une backend MTIA pour PyTorch, qui permet d'exécuter des modèles PyTorch sur ses puces sans réécrire le code. L'intégration est maintenue par les équipes MTIA et PyTorch co-localisées.",
      },
      {
        question: "D'autres entreprises peuvent-elles acheter les puces MTIA ?",
        answer: "Non. Les MTIA sont des puces propriétaires développées exclusivement pour l'infrastructure interne de Meta. Elles ne sont pas commercialisées.",
      },
    ],
    resources: [
      {
        label: "Meta AI : recherche et infrastructure",
        url: "https://ai.meta.com/",
        description: "Les travaux de recherche en IA de Meta, dont les avancées sur l'architecture MTIA",
      },
      {
        label: "PyTorch : framework officiel",
        url: "https://pytorch.org/",
        description: "Le framework de deep learning open source maintenu par Meta, compatible avec les MTIA",
      },
    ],
  },
];

// =============================================================================
// TEMPLATE POUR UN NOUVEL ARTICLE
// Copier-coller ce bloc, remplir les champs, ajouter à la liste articles[]
// =============================================================================
//
// {
//   slug: "mot-cle-du-sujet",
//   tag: "Grand public",                 // "Grand public" ou "Technique"
//   tagColor: "bg-blue-500/20 text-blue-300",   // Grand public
//   // tagColor: "bg-purple-500/20 text-purple-300", // Technique
//   avatar: "🔍",
//   title: "Titre accrocheur : sous-titre",     // Pas de tiret "—", utiliser ":"
//   description: "Résumé en 1-2 phrases. Max 160 caractères.",
//   date: "27 mars 2026",
//   isoDate: "2026-03-27",
//   readTime: "5 min",
//   illustrationSrc: "/images/articles/nom-fichier.png",  // optionnel
//
//   content: [
//     { type: "p", text: "Paragraphe d'intro. Pas de tiret em, pas de parenthèses AI-like." },
//     { type: "p", text: "Deuxième paragraphe de contexte." },
//     { type: "h2", text: "Titre de section" },
//     { type: "p", text: "Contenu. Chaque paragraphe = une idée complète." },
//     { type: "quote", text: "Citation sans guillemets, ils sont ajoutés automatiquement." },
//     { type: "h2", text: "Deuxième section" },
//     { type: "p", text: "Contenu." },
//     { type: "ul", items: ["Point factuel chiffré", "Point factuel chiffré"] },
//     { type: "h2", text: "Conclusion" },
//     { type: "p", text: "Implication plus large, ce que ça change vraiment." },
//   ],
//
//   faq: [
//     { question: "Question naturelle ?", answer: "Réponse directe et utile." },
//     { question: "Deuxième question ?", answer: "Réponse directe et utile." },
//     { question: "Troisième question ?", answer: "Réponse directe et utile." },
//   ],
//
//   resources: [
//     { label: "Nom de la source", url: "https://...", description: "Ce qu'on y trouve" },
//     { label: "Nom de la source", url: "https://...", description: "Ce qu'on y trouve" },
//   ],
// },
//
// RÈGLES :
//   - Pas de tiret "—" dans les textes, utiliser ":" ou ","
//   - Pas de parenthèses pour encadrer des apartés, intégrer dans la phrase
//   - 3 min = ~600 mots / 5 min = ~1000 mots / 7 min = ~1400 mots
//   - Description : 120 à 160 caractères pour le SEO
//   - Slug en kebab-case, sans accents, max 5 mots
// =============================================================================

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs() {
  return articles.map((a) => ({ slug: a.slug }));
}
