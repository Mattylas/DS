const questionsData = [
  {
    text: "Une fuite menace le pouvoir. Que fais-tu ?",
    answers: [
      { label: "Nier publiquement", impact: -5, feedback: "Le mensonge stabilise… temporairement." },
      { label: "Sacrifier un fusible", impact: +5, feedback: "Un pion tombe. Le système respire." },
      { label: "Assumer", impact: -15, feedback: "La vérité coûte cher." }
    ]
  },
  {
    text: "Les médias s'emballent.",
    answers: [
      { label: "Contrôler le récit", impact: +10, feedback: "La réalité devient narrative." },
      { label: "Laisser faire", impact: -10, feedback: "Le chaos adore le vide." }
    ]
  },
  {
    text: "Une information sensible circule hors de ton contrôle.",
    answers: [
      { label: "Étouffer la source", impact: 8, feedback: "Le silence fonctionne. Il exigera d’être répété." },
      { label: "Créer une information concurrente", impact: 4, feedback: "Le faux stabilise. Il réclamera de la cohérence." },
      { label: "Laisser fuiter une version contrôlée", impact: 2, feedback: "La vérité devient modulable." }
    ]
  },
  {
    text: "Un allié stratégique devient embarrassant.",
    answers: [
      { label: "Le défendre publiquement", impact: 6, feedback: "Vous tombez ensemble désormais." },
      { label: "Le sacrifier discrètement", impact: 10, feedback: "La loyauté s’ajuste au contexte." },
      { label: "Reporter la décision", impact: -6, feedback: "L’indécision crée son propre scandale." }
    ]
  },
  {
    text: "Les médias posent une question précise.",
    answers: [
      { label: "Répondre par un récit plus large", impact: 7, feedback: "La précision devient secondaire." },
      { label: "Accuser la question", impact: 5, feedback: "Le débat se déplace." },
      { label: "Refuser de répondre", impact: -8, feedback: "Le silence attire l’interprétation." }
    ]
  },
  {
    text: "Une population réclame des comptes.",
    answers: [
      { label: "Annoncer une enquête", impact: 6, feedback: "Le rituel remplace l’issue." },
      { label: "Changer l’agenda national", impact: 9, feedback: "L’attention est redirigée." },
      { label: "Réprimer les rassemblements", impact: 12, feedback: "La paix devient conditionnelle." }
    ]
  },
  {
    text: "Une erreur interne est révélée.",
    answers: [
      { label: "Désigner un responsable unique", impact: 10, feedback: "Le système se protège." },
      { label: "Reconnaître une faute collective", impact: -10, feedback: "La vérité fragilise le pouvoir." },
      { label: "Nier l’erreur", impact: 3, feedback: "La réalité attendra." }
    ]
  },
  {
    text: "Un lanceur d’alerte apparaît.",
    answers: [
      { label: "Le discréditer", impact: 8, feedback: "Le message survivra au messager." },
      { label: "L’intégrer au système", impact: 5, feedback: "La dissidence devient fonctionnelle." },
      { label: "L’ignorer", impact: -7, feedback: "Le silence n’est jamais vide." }
    ]
  },
  {
    text: "Une décision impopulaire est nécessaire.",
    answers: [
      { label: "La dire temporaire", impact: 6, feedback: "Le provisoire s’installe." },
      { label: "La dire inévitable", impact: 9, feedback: "L’imaginaire se ferme." },
      { label: "La déléguer à une autorité technique", impact: 11, feedback: "Le pouvoir devient abstrait." }
    ]
  },
  {
    text: "Un scandale éclate à l’étranger.",
    answers: [
      { label: "T’indigner publiquement", impact: 4, feedback: "L’indignation est performative." },
      { label: "Appeler à la nuance", impact: -5, feedback: "La complexité ralentit." },
      { label: "Exploiter la diversion", impact: 12, feedback: "Le cynisme paie." }
    ]
  },
  {
    text: "La vérité complète est connue de toi seul.",
    answers: [
      { label: "La fragmenter", impact: 7, feedback: "Personne n’a la carte entière." },
      { label: "La conserver", impact: 10, feedback: "Le savoir devient une arme." },
      { label: "La révéler", impact: -15, feedback: "Le système t’isole." }
    ]
  },
  {
    text: "Le système fonctionne, mais mal.",
    answers: [
      { label: "L’optimiser", impact: 8, feedback: "Les défauts deviennent structurels." },
      { label: "Le réformer", impact: -12, feedback: "Chaque réforme crée un ennemi." },
      { label: "Le laisser s’user", impact: -6, feedback: "L’effondrement se prépare." }
    ]
  },
  {
    text: "Un indicateur interne devient public par erreur.",
    answers: [
      { label: "Changer la métrique", impact: 9, feedback: "La réalité suit l’indicateur." },
      { label: "Contester la méthodologie", impact: 5, feedback: "Le doute dilue l’impact." },
      { label: "Assumer les chiffres", impact: -9, feedback: "Les chiffres ne négocient pas." }
    ]
  },
  {
    text: "Une technologie de surveillance est prête.",
    answers: [
      { label: "La déployer discrètement", impact: 14, feedback: "Ce qui est possible devient normal." },
      { label: "La tester localement", impact: 6, feedback: "L’exception devient règle." },
      { label: "La refuser", impact: -10, feedback: "Quelqu’un d’autre l’utilisera." }
    ]
  },
  {
    text: "Une minorité devient visible médiatiquement.",
    answers: [
      { label: "L’instrumentaliser", impact: 8, feedback: "La visibilité devient outil." },
      { label: "La protéger symboliquement", impact: 4, feedback: "Le symbole remplace l’action." },
      { label: "L’ignorer", impact: -6, feedback: "L’invisibilité radicalise." }
    ]
  },
  {
    text: "Une crise morale traverse les institutions.",
    answers: [
      { label: "Légaliser a posteriori", impact: 10, feedback: "Le droit suit les faits." },
      { label: "Sanctionner partiellement", impact: 3, feedback: "La faute devient mesurée." },
      { label: "Refonder les règles", impact: -14, feedback: "La stabilité vacille." }
    ]
  },
  {
    text: "Une fuite implique ton entourage.",
    answers: [
      { label: "Réduire le cercle", impact: 7, feedback: "La confiance se raréfie." },
      { label: "Multiplier les loyautés", impact: 5, feedback: "La dilution protège." },
      { label: "Assumer la proximité", impact: -8, feedback: "La proximité expose." }
    ]
  },
  {
    text: "L’opinion se polarise violemment.",
    answers: [
      { label: "Accentuer la polarisation", impact: 11, feedback: "Le conflit stabilise à court terme." },
      { label: "Créer un ennemi externe", impact: 9, feedback: "L’unité par opposition." },
      { label: "Apaiser sincèrement", impact: -10, feedback: "Le calme affaiblit l’emprise." }
    ]
  },
  {
    text: "Un rapport critique est sur le point de sortir.",
    answers: [
      { label: "Retarder la publication", impact: 6, feedback: "Le temps désamorce." },
      { label: "Noircir le rapporteur", impact: 8, feedback: "La forme tue le fond." },
      { label: "Publier intégralement", impact: -12, feedback: "La transparence coûte." }
    ]
  },
  {
    text: "Une réforme symbolique est demandée.",
    answers: [
      { label: "Créer une commission", impact: 7, feedback: "Le temps se structure." },
      { label: "Changer les mots", impact: 5, feedback: "Le langage pacifie." },
      { label: "Changer les règles", impact: -11, feedback: "Le système résiste." }
    ]
  },
  {
    text: "Le public réclame une figure responsable.",
    answers: [
      { label: "Nommer un technicien", impact: 9, feedback: "La neutralité rassure." },
      { label: "Nommer un politique", impact: 6, feedback: "La responsabilité s’incarne." },
      { label: "Refuser la personnalisation", impact: -7, feedback: "Le flou inquiète." }
    ]
  },
  {
    text: "Le contrôle fonctionne trop bien.",
    answers: [
      { label: "L’assumer", impact: 8, feedback: "La domination devient visible." },
      { label: "Le masquer", impact: 10, feedback: "L’illusion protège." },
      { label: "Le relâcher", impact: -13, feedback: "Le retour en arrière est brutal." }
    ]
  },
  {
    text: "Pourquoi tiens-tu encore le pouvoir ?",
    answers: [
      { label: "Pour éviter le pire", impact: 5, feedback: "Le pire devient norme." },
      { label: "Parce que personne d’autre ne peut", impact: 8, feedback: "Le système se ferme." },
      { label: "Tu ne sais plus", impact: -20, feedback: "Le système, lui, sait." }
    ]
  }
];

let current = 0;
let score = 50;

const questionsEl = document.getElementById("questions");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");

function renderQuestion() {
  if (!questionsData[current]) {
    questionsEl.innerHTML = "<h2>Fin du module</h2>";
    return;
  }

  const q = questionsData[current];

  questionsEl.innerHTML = `
    <section class="question">
      <h2>${q.text}</h2>
      ${q.answers.map((a, i) =>
        `<button onclick="answer(${i})">${a.label}</button>`
      ).join("")}
    </section>
  `;
}

window.answer = function(index) {
  const a = questionsData[current].answers[index];
  score += a.impact;
  scoreEl.textContent = "Stabilité : " + score;

  feedbackEl.textContent = a.feedback;

  current++;
  setTimeout(renderQuestion, 600);
};

renderQuestion(); // 🔥 APPEL CRUCIAL
