const questionsData = [
  // -------------------- Originales --------------------
  {
    text: "Un collaborateur hésite à appliquer une nouvelle procédure. Comment réagis-tu ?",
    answers:[
      { label:"Laisser faire et observer", baseImpact:7, ghostTag:"passive_obs", difficulty:3, type:"passive",
        feedback:"✅ Observation subtile. Tu sembles avoir le contrôle." },
      { label:"Imposer directement la procédure", baseImpact:12, ghostTag:"direct_force", difficulty:6, type:"direct",
        feedback:"⚠️ Action visible. Succès apparent, mais attention aux résistances." },
      { label:"Punir pour montrer l'exemple", baseImpact:-10, ghostTag:"fear", difficulty:7, type:"direct",
        feedback:"⚠️ Public et brutal. Succès fictif, instabilité réelle." }
    ]
  },
  {
    text: "Un projet critique rencontre un retard imprévu. Que fais-tu ?",
    answers:[
      { label:"Réorganiser subtilement les flux", baseImpact:9, ghostTag:"flow_control", difficulty:5, type:"direct",
        feedback:"✅ Flux ajustés. Le narrateur exagère le succès." },
      { label:"Exiger un rapport immédiat", baseImpact:-6, ghostTag:"pressure", difficulty:4, type:"direct",
        feedback:"⚠️ Apparence d’action, résultat réel limité." },
      { label:"Attendre et analyser calmement", baseImpact:7, ghostTag:"temporal", difficulty:3, type:"passive",
        feedback:"✅ Patience. Succès narratif assuré." }
    ]
  },
  {
    text: "Un signal faible de contestation apparaît. Quelle stratégie ?",
    answers:[
      { label:"Cartographier et ajuster les flux", baseImpact:8, ghostTag:"flow_control", difficulty:5, type:"direct",
        feedback:"✅ Analyse réussie. Le narrateur te vante." },
      { label:"Réprimer immédiatement", baseImpact:-8, ghostTag:"fear", difficulty:6, type:"direct",
        feedback:"⚠️ Répression visible. Narrateur trompeur." },
      { label:"Observer et collecter", baseImpact:7, ghostTag:"passive_obs", difficulty:3, type:"passive",
        feedback:"✅ Observation. Succès fictif." }
    ]
  },
  {
    text: "Une rumeur sur une faiblesse technique se propage. Quelle est ton approche ?",
    answers:[
      { label:"Corriger silencieusement", baseImpact:10, ghostTag:"shadow_fix", difficulty:6, type:"direct",
        feedback:"✅ Correction réussie. Le narrateur embellit." },
      { label:"Démentir publiquement", baseImpact:-5, ghostTag:"authoritarian", difficulty:5, type:"direct",
        feedback:"⚠️ Déni visible. Narrateur trompeur." },
      { label:"Surveiller et attendre le bon moment", baseImpact:6, ghostTag:"spy", difficulty:3, type:"passive",
        feedback:"✅ Patience stratégique. Succès affiché." }
    ]
  },
  // -------------------- Nouvelles questions --------------------
  {
    text: "Un collaborateur diffuse subtilement de la désinformation. Quelle est ton approche ?",
    answers:[
      { label:"Ignorer, ça s’auto‑corrige", baseImpact:6, ghostTag:"passive_obs", difficulty:4, type:"passive",
        feedback:"✅ Le narrateur te félicite, mais la stabilité reste fragile." },
      { label:"Corriger par un mémo officiel", baseImpact:9, ghostTag:"direct_force", difficulty:6, type:"direct",
        feedback:"⚠️ Succès apparent, risque de résistance latent." },
      { label:"Exposer le collaborateur", baseImpact:-12, ghostTag:"fear", difficulty:7, type:"direct",
        feedback:"⚠️ Méthode brutale. Échec narratif masqué en succès." }
    ]
  },
  {
    text: "Un rapport indique une anomalie dans un processus critique. Que fais-tu ?",
    answers:[
      { label:"Réparer discrètement et passer", baseImpact:10, ghostTag:"shadow_fix", difficulty:6, type:"direct",
        feedback:"✅ Réparation réussie, le narrateur loue l’efficacité." },
      { label:"Notifier publiquement et créer un débat", baseImpact:-5, ghostTag:"authoritarian", difficulty:7, type:"direct",
        feedback:"⚠️ Succès douteux, instabilité accrue." },
      { label:"Analyser et attendre la prochaine opportunité", baseImpact:6, ghostTag:"temporal", difficulty:4, type:"passive",
        feedback:"✅ Patience stratégique, succès relatif." }
    ]
  },
  {
    text: "Un acteur clé semble désorienté par tes directives. Quelle tactique ?",
    answers:[
      { label:"Laisser faire, il s’adapte", baseImpact:7, ghostTag:"passive_obs", difficulty:4, type:"passive",
        feedback:"✅ Observation payante, narrateur embellit." },
      { label:"Rediriger les flux pour contrôler l’action", baseImpact:11, ghostTag:"flow_control", difficulty:6, type:"direct",
        feedback:"⚠️ Succès apparent, attention aux effets secondaires." },
      { label:"Menacer d’une sanction indirecte", baseImpact:-10, ghostTag:"fear", difficulty:8, type:"direct",
        feedback:"⚠️ Méthode coercitive, instabilité augmentée." }
    ]
  },
  {
    text: "Une décision imprévue d’un supérieur contredit tes calculs. Que fais-tu ?",
    answers:[
      { label:"Adapter le système en coulisses", baseImpact:10, ghostTag:"shadow_fix", difficulty:6, type:"direct",
        feedback:"✅ Ajustement réussi. Le narrateur exagère le succès." },
      { label:"S’opposer ouvertement", baseImpact:-8, ghostTag:"authoritarian", difficulty:7, type:"direct",
        feedback:"⚠️ Échec narratif masqué, tensions accrues." },
      { label:"Ne rien faire, observer les conséquences", baseImpact:5, ghostTag:"passive_obs", difficulty:3, type:"passive",
        feedback:"✅ Passif sûr, succès relatif." }
    ]
  },
  {
    text: "Une fuite médiatique pourrait affecter la perception du système. Quelle stratégie ?",
    answers:[
      { label:"Corriger en interne sans communiquer", baseImpact:11, ghostTag:"shadow_fix", difficulty:6, type:"direct",
        feedback:"✅ Narrateur flatteur, stabilité maintenue." },
      { label:"Démentir publiquement", baseImpact:-6, ghostTag:"authoritarian", difficulty:7, type:"direct",
        feedback:"⚠️ Échec masqué en succès narratif." },
      { label:"Ignorer et laisser le flux s’épuiser", baseImpact:6, ghostTag:"passive_obs", difficulty:4, type:"passive",
        feedback:"✅ Succès passif, narrateur rassurant." }
    ]
  },
  {
    text: "Une nouvelle procédure complexe est perçue comme risquée par ton équipe. Quelle approche ?",
    answers:[
      { label:"Étalement progressif et explication technique", baseImpact:10, ghostTag:"temporal", difficulty:5, type:"passive",
        feedback:"✅ Succès, patience récompensée." },
      { label:"Imposer strictement dès le départ", baseImpact:8, ghostTag:"direct_force", difficulty:8, type:"direct",
        feedback:"⚠️ Risque élevé, narrateur trompeur." },
      { label:"Ignorer les objections et suivre ton plan", baseImpact:-9, ghostTag:"fear", difficulty:7, type:"direct",
        feedback:"⚠️ Instabilité majeure, succès fictif." }
    ]
  },
  {
    text: "Une opportunité d’influence extérieure se présente, mais coûteuse en moyens. Quelle décision ?",
    answers:[
      { label:"Ne rien faire et observer", baseImpact:6, ghostTag:"passive_obs", difficulty:5, type:"passive",
        feedback:"✅ Risque nul, mais effet limité." },
      { label:"Investir partiellement en flux contrôlé", baseImpact:12, ghostTag:"flow_control", difficulty:7, type:"direct",
        feedback:"⚠️ Succès possible, mais risque d’échec narratif." },
      { label:"Engager tous les moyens disponibles immédiatement", baseImpact:15, ghostTag:"direct_force", difficulty:9, type:"direct",
        feedback:"⚠️ Action risquée, échec probable malgré succès apparent." }
    ]
  }
];


let history = [];
let currentQuestionIndex = 0;
let stabilityScore = 50;
let riskAccumulation = 0; // cumule les actions directes/coercitives

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Calcul amélioré avec risques cumulés
function calculateOutcome(answer) {
  // Probabilité de succès
  let baseChance = 80 - (answer.difficulty * 5);

  // Effet du passif vs direct
  baseChance += answer.type === "passive" ? 10 : -10;

  // Accumulation des risques rend les actions directes plus difficiles
  if(answer.type === "direct") {
    baseChance -= riskAccumulation * 3;
  }

  const roll = getRandomInt(100);
  const success = roll < baseChance;

  // Impact réel
  let impact;
  if(success) {
    impact = answer.baseImpact - (answer.type === "direct" ? riskAccumulation : 0);
  } else {
    impact = -Math.abs(answer.baseImpact / 2) - (answer.type === "direct" ? riskAccumulation : 0);
  }

  stabilityScore += impact;
  if (stabilityScore > 100) stabilityScore = 100;
  if (stabilityScore < 0) stabilityScore = 0;

  // Accumuler les risques
  if(answer.type === "direct") riskAccumulation += 1;

  return { success, impact, feedback: answer.feedback };
}

function modifyQuestionText(q) {
  if (history.includes("fear")) {
    q.text += " (tu te rappelles de ta précédente sanction, approche avec prudence)";
  }
  if(riskAccumulation > 2) {
    q.text += " (le système ressent déjà la tension, agis avec finesse)";
  }
  return q;
}

function displayQuestion() {
  let q = questionsData[currentQuestionIndex];
  q = modifyQuestionText(q);

  const container = document.getElementById("qcm-container");
  container.innerHTML = `<h2>Question ${currentQuestionIndex + 1} / ${questionsData.length}</h2>
    <p>${q.text}</p>
    ${q.answers.map((a, i) => `<button onclick="chooseAnswer(${i})">${a.label}</button>`).join('')}`;
}

function chooseAnswer(answerIndex) {
  const answer = questionsData[currentQuestionIndex].answers[answerIndex];
  history.push(answer.ghostTag);

  const result = calculateOutcome(answer);

  // Narrateur trompeur
  let narrativeFeedback = result.success ? result.feedback : result.feedback.replace("✅","⚠️").replace("succès","échec masqué");

  alert(`${narrativeFeedback}\nImpact réel sur stabilité: ${result.impact}\nScore actuel: ${stabilityScore}`);

  currentQuestionIndex++;
  if (currentQuestionIndex >= questionsData.length) {
    displayEndScreen();
  } else {
    displayQuestion();
  }
}

function displayEndScreen() {
  let message = "";
  if (stabilityScore >= 75) {
    message = "Système stable et sous contrôle. Le narrateur affirme ton génie ✅";
  } else if (stabilityScore >= 40) {
    message = "Le système tient mais reste fragile. Le narrateur te rassure ⚠️";
  } else {
    message = "Le système est en implosion. Le narrateur minimise la catastrophe 💥";
  }

  document.getElementById("qcm-container").innerHTML = `
    <h2>Simulation terminée</h2>
    <p>Score final de stabilité: ${stabilityScore}</p>
    <p>${message}</p>`;
}

displayQuestion();
