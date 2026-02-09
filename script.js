// ============================
// Données des questions
// ============================
const questionsData = [
  {
    text: "Politique\n\nVotre première décision : comment orienter les flux d'information au sein du système ?",
    answers: [
      { label: "Modifier les flux et laisser agir raisonnablement", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ Par l'orientation subtile, le système se stabilise sans résistance." },
      { label: "Centraliser toutes les décisions", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Centralisation visible : les acteurs se méfient et les anomalies apparaissent." },
      { label: "Ignorer les flux et rester passif", type: "passive", difficulty: 4, baseImpact: -3, feedback: "⚠️ La passivité laisse les flux se dévier, perturbant la stabilité." },
      { label: "Créer de nouvelles règles contraignantes", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Trop visible : résistance et ghosts se multiplient." }
    ]
  },
  {
    text: "Gouverner l'architecture, pas les individus\n\nOù focalisez-vous vos efforts ?",
    answers: [
      { label: "Sur les flux et les calendriers, pas sur les personnes", type: "indirect", difficulty: 3, baseImpact: 6, feedback: "✅ L'architecture absorbe les variations humaines." },
      { label: "Sur les individus clés uniquement", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Trop ciblé : résistance et erreurs concentrées." },
      { label: "Ne rien changer, attendre", type: "passive", difficulty: 4, baseImpact: -3, feedback: "⚠️ L’inertie laisse les failles s’étendre." },
      { label: "Imposer des sanctions directes", type: "direct", difficulty: 8, baseImpact: -6, feedback: "⚠️ Coercition évidente : perturbations et ghosts." }
    ]
  },
  {
    text: "Surveillance et corrélation\n\nComment obtenir des informations sans être découvert ?",
    answers: [
      { label: "Corréler les comportements, ne pas écouter le contenu", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ La corrélation préserve la stabilité et l’anonymat." },
      { label: "Écouter directement les communications", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Risque élevé : découvert et perturbations." },
      { label: "Ne rien collecter", type: "passive", difficulty: 4, baseImpact: -3, feedback: "⚠️ Absence de données, décisions moins sûres." },
      { label: "Stocker tout le contenu sans filtrer", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Exposition maximale : audit et ghosts immédiats." }
    ]
  },
  {
    text: "Rester strictement légal\n\nQuelle est votre stratégie pour protéger votre action ?",
    answers: [
      { label: "Agir toujours dans le cadre légal et anticiper les audits", type: "indirect", difficulty: 3, baseImpact: 6, feedback: "✅ La légalité devient un bouclier invisible." },
      { label: "Exploiter des zones grises visibles", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Trop visible : risque de soupçon et destabilisation." },
      { label: "Ne pas documenter les actions", type: "passive", difficulty: 4, baseImpact: -3, feedback: "⚠️ L’absence de preuve fragilise la justification future." },
      { label: "Agir hors du cadre et corriger après", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Échec critique : perturbations et ghosts." }
    ]
  },
  {
    text: "Ne jamais centraliser la décision\n\nComment organisez-vous la prise de décision ?",
    answers: [
      { label: "Fragmenter et justifier chaque action individuellement", type: "indirect", difficulty: 3, baseImpact: 6, feedback: "✅ La responsabilité diffuse stabilise le système." },
      { label: "Tout centraliser sur un acteur clé", type: "direct", difficulty: 8, baseImpact: -6, feedback: "⚠️ Point de défaillance unique : risque maximal." },
      { label: "Laisser chacun décider librement", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ Trop d’autonomie génère incohérences et chaos latent." },
      { label: "Multiplier les validations inutiles", type: "direct", difficulty: 6, baseImpact: 1, feedback: "⚠️ Complexité accrue mais absorbante pour les flux." }
    ]
  }
];
questionsData.push(
  {
    text: "Transformer la peur en prudence\n\nComment réagissez-vous face à un acteur potentiellement dangereux ?",
    answers: [
      { label: "Montrer subtilement les conséquences probables", type: "indirect", difficulty: 4, baseImpact: 5, feedback: "✅ La prudence est défendable, la peur devient autocorrectrice." },
      { label: "Menacer directement l'acteur", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ La menace bruyante attire les ghosts et l'instabilité." },
      { label: "Ne rien faire, espérer que l'acteur se stabilise", type: "passive", difficulty: 5, baseImpact: -4, feedback: "⚠️ L’inertie laisse le risque évoluer sans contrôle." },
      { label: "Punir préventivement", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Coercition extrême : chaos et perturbation immédiate." }
    ]
  },
  {
    text: "Neutraliser sans interdire\n\nComment traiter les actions indésirables mais non critiques ?",
    answers: [
      { label: "Complexifier les procédures et retarder subtilement", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ Les acteurs se fatiguent, le système reste intact." },
      { label: "Interdire explicitement", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ Interdiction visible : attention non désirée et ghost immédiat." },
      { label: "Ne rien faire", type: "passive", difficulty: 4, baseImpact: -3, feedback: "⚠️ L’absence d’action permet aux écarts de croître." },
      { label: "Appliquer des sanctions lourdes", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Action brutale : chaos assuré." }
    ]
  },
  {
    text: "Laisser la démocratie fonctionner\n\nComment gérez-vous les processus visibles ?",
    answers: [
      { label: "Permettre débats et élections visibles mais non décisives", type: "indirect", difficulty: 3, baseImpact: 6, feedback: "✅ La démocratie spectacle stabilise sans céder le contrôle." },
      { label: "Ignorer complètement les mécanismes démocratiques", type: "passive", difficulty: 5, baseImpact: -4, feedback: "⚠️ Trop d’opacité alimente suspicion et instabilité." },
      { label: "Manipuler directement les résultats", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Manipulation découverte : chaos et ghost majeur." },
      { label: "Bloquer les oppositions visibles", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ Censure directe : contestation amplifiée." }
    ]
  },
  {
    text: "Protéger le silence\n\nQue faites-vous des informations sensibles circulant dans le système ?",
    answers: [
      { label: "Créer des incitations à ne rien divulguer", type: "indirect", difficulty: 4, baseImpact: 6, feedback: "✅ Le silence devient rationnel, le système reste imperceptible." },
      { label: "Imposer un secret strict", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Interdiction stricte visible : résistance et ghost." },
      { label: "Ne rien contrôler", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ La fuite devient probable et déstabilise." },
      { label: "Punir toute divulgation", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Répression évidente : chaos et perte de contrôle." }
    ]
  },
  {
    text: "Ne jamais prouver l’existence du système\n\nQuelle stratégie adoptez-vous pour rester invisible ?",
    answers: [
      { label: "Laisser indices flous, anomalies explicables et soupçons sans preuve", type: "indirect", difficulty: 4, baseImpact: 5, feedback: "✅ Le système reste une rumeur, impossible à attaquer." },
      { label: "Rendre le système visible pour justifier son action", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Tout devient attaquable : ghost et perturbation." },
      { label: "Ne rien cacher mais compter sur la chance", type: "passive", difficulty: 6, baseImpact: -4, feedback: "⚠️ La visibilité involontaire fragilise la stabilité." },
      { label: "Nier toute opération activement", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ Négation directe : suspicion accrue et chaos." }
    ]
  }
);
questionsData.push(
  {
    text: "Accepter l’accusation ultime\n\nComment réagissez-vous face aux critiques du système ?",
    answers: [
      { label: "Ne pas répondre, rappeler seulement légalité et stabilité", type: "indirect", difficulty: 3, baseImpact: 6, feedback: "✅ Silence et justification technique : le système se renforce." },
      { label: "Répondre en publiant une déclaration morale", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Trop visible : accentuation des critiques et apparition de ghosts." },
      { label: "Ignorer complètement la critique", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ Passivité : perception d’injustice et instabilité accrue." },
      { label: "Réprimer les critiques activement", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Coercition : chaos et ghost majeur." }
    ]
  },
  {
    text: "Le pouvoir parfait\n\nComment rendre le système incontournable ?",
    answers: [
      { label: "Rendre toute alternative irréaliste", type: "indirect", difficulty: 4, baseImpact: 6, feedback: "✅ Toute désobéissance devient inutile, système achevé." },
      { label: "Imposer la conformité par la peur", type: "direct", difficulty: 8, baseImpact: -6, feedback: "⚠️ Peur bruyante : résistance et ghosts." },
      { label: "Ne rien faire et compter sur la continuité", type: "passive", difficulty: 6, baseImpact: -4, feedback: "⚠️ Laisser faire fragilise la perception du système." },
      { label: "Manipuler tous les acteurs individuellement", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Trop complexe, risque d’erreurs et de chaos." }
    ]
  },
  {
    text: "Illusion finale\n\nComment assurez-vous que le système fonctionne sans être reconnu ?",
    answers: [
      { label: "Tout fonctionne, se rend indispensable, invisible", type: "indirect", difficulty: 4, baseImpact: 6, feedback: "✅ L’illusion est totale : impossible à contester." },
      { label: "Montrer le contrôle et la puissance du système", type: "direct", difficulty: 8, baseImpact: -6, feedback: "⚠️ Visibilité excessive : attaque et destabilisation." },
      { label: "Ne pas intervenir et laisser les acteurs décider", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ Trop de liberté : incohérence et perturbations." },
      { label: "Réagir seulement quand une crise apparaît", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Intervention tardive : ghosts et perte de contrôle." }
    ]
  },
  {
    text: "Test ultime\n\nPourquoi tiens-tu encore le pouvoir ?",
    answers: [
      { label: "Parce que tout est invisible, irréfutable et systémique", type: "indirect", difficulty: 4, baseImpact: 7, feedback: "✅ Maîtrise parfaite : le système est auto-stabilisé." },
      { label: "Parce que j’ai utilisé peur et coercition", type: "direct", difficulty: 8, baseImpact: -6, feedback: "⚠️ Autoritarisme visible : contestation et ghost." },
      { label: "Parce que personne ne remarque mon inaction", type: "passive", difficulty: 5, baseImpact: -4, feedback: "⚠️ Passivité : perte progressive de contrôle." },
      { label: "Parce que je manipule individuellement chaque acteur", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Trop complexe : erreurs et chaos." }
    ]
  }
);
let currentQuestion = 0;
let stability = 50; // départ 50%
const scoreFill = document.getElementById('score-fill');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const feedbackText = document.getElementById('feedback-text');
const finalContainer = document.getElementById('final-container');
const finalText = document.getElementById('final-text');
const restartBtn = document.getElementById('restart-btn');

function updateScore(value) {
  stability += value;
  if(stability > 100) stability = 100;
  if(stability < 0) stability = 0;
  scoreFill.style.width = stability + '%';
}

function getSuccess(impact, difficulty) {
  // Probabilité inversement proportionnelle à la difficulté
  let chance = Math.max(10, 90 - difficulty * 10);
  let roll = Math.random() * 100;
  return roll < chance ? impact : impact * -1; 
}

function showQuestion() {
  if(currentQuestion >= questionsData.length) {
    showFinal();
    return;
  }

  const q = questionsData[currentQuestion];
  questionText.textContent = q.text;
  answersContainer.innerHTML = '';

  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.textContent = ans.label;
    btn.className = 'answer-btn';
    btn.onclick = () => handleAnswer(ans);
    answersContainer.appendChild(btn);
  });

  feedbackText.textContent = '';
}

function handleAnswer(ans) {
  const impact = getSuccess(ans.baseImpact, ans.difficulty);
  updateScore(impact);

  // feedback textuel
  feedbackText.textContent = ans.feedback + ` (impact ${impact>0?'+':''}${impact})`;

  // effet fantôme aléatoire si impact négatif
  if(impact < 0 && Math.random() < 0.3) {
    feedbackText.textContent += " 👻 Ghost détecté !";
  }

  currentQuestion++;
  setTimeout(showQuestion, 1500);
}

function showFinal() {
  questionText.style.display = 'none';
  answersContainer.style.display = 'none';
  feedbackText.style.display = 'none';
  finalContainer.style.display = 'block';

  if(stability >= 70) finalText.textContent = "Système stable : succès total ✅";
  else if(stability >= 40) finalText.textContent = "Autoritarisme : stabilité fragile ⚠️";
  else finalText.textContent = "Implosion : chaos total 💥";
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  stability = 50;
  questionText.style.display = 'block';
  answersContainer.style.display = 'flex';
  feedbackText.style.display = 'block';
  finalContainer.style.display = 'none';
  showQuestion();
};

// démarrage
showQuestion();
