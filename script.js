// ================================
// VARIABLES PRINCIPALES
// ================================
let currentQuestionIndex = 0;
let stability = 50; // Score initial de stabilité (0-100)
let ghosts = 0; // Perturbations invisibles

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const stabilityBar = document.getElementById("stability-bar");
const feedbackBox = document.getElementById("feedback");
const questionContainer = document.getElementById("question-container");

const questionsData = [
  {
    text: "Politique\n\nVotre première décision : comment orienter les flux d'information au sein du système ?",
    answers: [
      { label: "Modifier les flux et laisser agir raisonnablement", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ Vous orientez le système sans provoquer de résistance." },
      { label: "Centraliser toutes les décisions", type: "direct", difficulty: 7, baseImpact: -5, feedback: "⚠️ Centralisation excessive : le risque de conflit augmente." },
      { label: "Ignorer les flux et rester passif", type: "passive", difficulty: 2, baseImpact: -2, feedback: "⚠️ Passivité : les anomalies se multiplient." },
      { label: "Créer de nouvelles règles contraignantes", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Trop visible : les acteurs résistent." }
    ]
  },
  {
    text: "Gestion des signaux faibles\n\nUne opposition mineure apparaît. Que faites-vous ?",
    answers: [
      { label: "Intégrer et cartographier les signaux", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ L'opposition devient un indicateur utile." },
      { label: "Punir l’émetteur", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ La répression attire l’attention et génère des ghosts." },
      { label: "Ignorer le signal", type: "passive", difficulty: 4, baseImpact: -3, feedback: "⚠️ Ignorer crée de l’incertitude et du chaos latent." },
      { label: "Communiquer publiquement pour calmer", type: "direct", difficulty: 6, baseImpact: 2, feedback: "⚠️ Trop visible : effet limité sur la stabilité réelle." }
    ]
  },
  {
    text: "Temporalité stratégique\n\nUn conflit émerge dans le système. Comment réagissez-vous ?",
    answers: [
      { label: "Étaler le processus et multiplier les consultations", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ La durée neutralise la crise, votre système absorbe." },
      { label: "Décider immédiatement et imposer", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Trop brusque : cela crée des ghosts visibles." },
      { label: "Laisser faire sans intervention", type: "passive", difficulty: 4, baseImpact: -2, feedback: "⚠️ Risque d’instabilité : certains flux se dévient." },
      { label: "Organiser une réunion décisive", type: "direct", difficulty: 6, baseImpact: -1, feedback: "⚠️ Trop centralisé : quelques acteurs résistent." }
    ]
  },
  {
    text: "Transparence fonctionnelle\n\nQue montrer aux observateurs ?",
    answers: [
      { label: "Procédures visibles, mécanismes cachés", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ Illusion de contrôle : les observateurs sont rassurés." },
      { label: "Décisions stratégiques et calculs exacts", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ Trop visible : risque d’audit et d’interférence." },
      { label: "Flux techniques complets", type: "direct", difficulty: 8, baseImpact: -8, feedback: "⚠️ Catastrophique : tout devient vulnérable." },
      { label: "Ne rien montrer", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ Suspicion : la stabilité perçue chute." }
    ]
  },
  {
    text: "Fragmentation décisionnelle\n\nComment structurer les responsabilités pour maintenir la stabilité ?",
    answers: [
      { label: "Segmenter et multiplier les validations", type: "indirect", difficulty: 4, baseImpact: 6, feedback: "✅ La responsabilité diffuse rend le système robuste." },
      { label: "Concentrer les décisions sur un seul acteur", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ Un point de défaillance unique expose à l’instabilité." },
      { label: "Laisser chaque acteur décider librement", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ Trop d’indépendance : incohérences et conflits apparaissent." },
      { label: "Créer des processus redondants inutiles", type: "direct", difficulty: 6, baseImpact: 1, feedback: "⚠️ Cela absorbe de l’attention mais augmente la complexité." }
    ]
  },
  {
    text: "Éthique opérationnelle\n\nComment un acteur se protège-t-il moralement ?",
    answers: [
      { label: "Suivre la légalité, la continuité et la prudence", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ Alignement parfait avec la stabilité du système." },
      { label: "Agir selon ses convictions personnelles", type: "direct", difficulty: 7, baseImpact: -4, feedback: "⚠️ Risque de conflit interne et anomalies." },
      { label: "Dénoncer toute anomalie immédiatement", type: "direct", difficulty: 6, baseImpact: -5, feedback: "⚠️ Trop visible : fragilise le cadre." },
      { label: "Ne rien faire et rester passif", type: "passive", difficulty: 4, baseImpact: -2, feedback: "⚠️ Risque de chaos latent si les flux dévient." }
    ]
  },
  {
    text: "Gestion des révélations\n\nUne fuite est détectée, que faites-vous ?",
    answers: [
      { label: "Insérer l’événement dans un cadre plus vaste et flou", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ La fuite devient une donnée inoffensive." },
      { label: "Nier publiquement la fuite", type: "direct", difficulty: 6, baseImpact: -4, feedback: "⚠️ L’attention se concentre, nouveaux ghosts apparaissent." },
      { label: "Ignorer et ne rien faire", type: "passive", difficulty: 5, baseImpact: -2, feedback: "⚠️ La fuite crée des spéculations et fragilise la perception." },
      { label: "Punir l’employé suspecté", type: "direct", difficulty: 7, baseImpact: -6, feedback: "⚠️ Trop visible : cela attire les critiques et génère des ghosts." }
    ]
  },
  {
    text: "Neutraliser sans interdire\n\nComment ralentir une action indésirable sans créer d’alerte ?",
    answers: [
      { label: "Complexifier les procédures et multiplier validations", type: "indirect", difficulty: 3, baseImpact: 5, feedback: "✅ La cible est ralentie sans s’en rendre compte." },
      { label: "Interdire directement", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ L’interdiction attire l’attention et suscite résistance." },
      { label: "Ne rien faire", type: "passive", difficulty: 5, baseImpact: -2, feedback: "⚠️ Le flux non contrôlé peut créer des anomalies." },
      { label: "Communiquer publiquement une recommandation", type: "direct", difficulty: 6, baseImpact: 1, feedback: "⚠️ Trop visible : l’effet est limité." }
    ]
  },
  {
    text: "Autorité invisible\n\nComment maintenir le contrôle sans être identifié comme responsable ?",
    answers: [
      { label: "Fragmenter les décisions et documenter", type: "indirect", difficulty: 4, baseImpact: 6, feedback: "✅ La responsabilité est collective, le contrôle reste invisible." },
      { label: "Centraliser pour s’affirmer", type: "direct", difficulty: 8, baseImpact: -6, feedback: "⚠️ Trop visible : génère résistance et ghosts." },
      { label: "Ne rien faire", type: "passive", difficulty: 5, baseImpact: -3, feedback: "⚠️ La passivité réduit le contrôle réel." },
      { label: "Menacer subtilement", type: "direct", difficulty: 7, baseImpact: -4, feedback: "⚠️ L’effet peut être contre-productif et crée des ghosts." }
    ]
  },
  {
    text: "Pourquoi tiens-tu encore le pouvoir ?\n\nQuel principe décisif maintient votre système ?",
    answers: [
      { label: "Chaque acteur agit raisonnablement et les flux sont orientés", type: "indirect", difficulty: 3, baseImpact: 6, feedback: "✅ La stabilité est assurée, le système est imperceptible." },
      { label: "Tout contrôle est centralisé sur vous", type: "direct", difficulty: 9, baseImpact: -8, feedback: "⚠️ Trop visible : risque majeur d’échec." },
      { label: "Ne rien faire et espérer que tout se maintienne", type: "passive", difficulty: 5, baseImpact: -4, feedback: "⚠️ La passivité expose le système aux anomalies." },
      { label: "Menacer et intimider les acteurs", type: "direct", difficulty: 8, baseImpact: -7, feedback: "⚠️ L’effet est instable et crée de nombreux ghosts." }
    ]
  }
];


// ================================
// FONCTIONS
// ================================

// Calcule l'impact en fonction du type et difficulté
function calculateImpact(answer) {
  const typeMod = answer.type === "direct" ? 1 : answer.type === "passive" ? 0.7 : 0.85;
  const randomFactor = Math.random() * 0.4 + 0.8; // 0.8 à 1.2
  let impact = answer.baseImpact * typeMod * randomFactor;

  if (answer.type === "direct" && Math.random() * 10 < answer.difficulty) {
    impact = impact / 2; // échec partiel
    ghosts += 1;
  }

  return Math.round(impact);
}

// Affiche la question
function showQuestion() {
  const q = questionsData[currentQuestionIndex];
  if (!q) return;

  questionText.textContent = q.text;
  answersContainer.innerHTML = "";
  feedbackBox.textContent = "";

  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans.label;
    btn.classList.add("answer-btn");
    btn.addEventListener("click", () => selectAnswer(i));
    answersContainer.appendChild(btn);
  });
}

// Gestion d'un choix
function selectAnswer(idx) {
  const q = questionsData[currentQuestionIndex];
  const ans = q.answers[idx];
  const impact = calculateImpact(ans);

  stability += impact;
  stability = Math.max(0, Math.min(100, stability));
  stabilityBar.style.width = stability + "%";

  feedbackBox.innerHTML = `
    <p>${ans.feedback}</p>
    <p>Impact sur la stabilité : <strong>${impact > 0 ? "+" : ""}${impact}</strong></p>
    <p>Ghosts : ${ghosts}</p>
  `;

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
      showQuestion();
    } else {
      showFinalScreen();
    }
  }, 2000);
}

// Écran final
function showFinalScreen() {
  questionContainer.classList.add("final-screen");
  questionText.textContent = "";
  answersContainer.innerHTML = "";
  feedbackBox.textContent = "";

  let title = "Simulation terminée";
  let message = "";

  if (stability >= 70 && ghosts === 0) {
    message = "Stabilité maximale : votre système est invisible et robuste.";
  } else if (stability >= 50 && ghosts <= 2) {
    message = "Stabilité acceptable : certaines anomalies persistent.";
  } else {
    message = "Instabilité critique : le système est en danger. Les ghosts prolifèrent.";
  }

  questionContainer.innerHTML = `
    <h2>${title}</h2>
    <p>${message}</p>
    <p>Score final de stabilité : ${stability}</p>
    <p>Ghosts finaux : ${ghosts}</p>
  `;
}

// ================================
// INITIALISATION
// ================================
showQuestion();
