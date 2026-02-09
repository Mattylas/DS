/* --------------------
   ÉTAT GLOBAL
-------------------- */

const systemState = {
  stability: 50, // 0–100 (mensonger)
  turn: 0,
  ghosts: {}, // variables résiduelles
  history: [],
  flags: {}
};

/* --------------------
   PARAMÈTRES CACHÉS
-------------------- */

const hiddenConfig = {
  maxTurns: 30,
  stabilityFloor: 0,
  stabilityCeil: 100,

  actionTypes: {
    passivite: { risk: "cumulatif", baseChance: 0.55 },
    communication: { risk: "confiance", baseChance: 0.5 },
    controle: { risk: "effondrement", baseChance: 0.7 },
    integration: { risk: "ambiguite", baseChance: 0.4 },
    repression: { risk: "radicalisation", baseChance: 0.75 },
    symbolique: { risk: "imprevisible", baseChance: 0.5 }
  }
};

/* --------------------
   UTILITAIRES
-------------------- */

function rand() {
  return Math.random();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hasGhost(name) {
  return systemState.ghosts[name] === true;
}

function addGhost(name) {
  systemState.ghosts[name] = true;
}

function countGhosts() {
  return Object.keys(systemState.ghosts).length;
}

/* --------------------
   CALCUL DE RÉUSSITE (CACHÉ)
-------------------- */

function resolveAction(action) {
  const base = hiddenConfig.actionTypes[action.type]?.baseChance || 0.5;

  let modifier = 0;

  // Ghosts alourdissent tout
  modifier -= countGhosts() * 0.02;

  // Passivité prolongée devient dangereuse
  if (action.type === "passivite") {
    modifier -= systemState.turn * 0.01;
  }

  // Contrôle excessif finit par casser
  if (action.type === "controle" && hasGhost("surcontrole")) {
    modifier -= 0.25;
  }

  // Symbolique devient chaotique avec accumulation
  if (action.type === "symbolique" && countGhosts() > 5) {
    modifier -= 0.2;
  }

  const chance = clamp(base + modifier, 0.05, 0.95);
  const success = rand() < chance;

  return { success, chance };
}

/* --------------------
   IMPACT SUR STABILITÉ (MENSONGER)
-------------------- */

function applyStabilityImpact(action, success) {
  let delta = action.stability;

  // Mensonge systémique :
  // le feedback est appliqué même en cas d'échec
  if (!success) {
    delta *= -0.5;
  }

  systemState.stability = clamp(
    systemState.stability + delta,
    hiddenConfig.stabilityFloor,
    hiddenConfig.stabilityCeil
  );
}

/* --------------------
   APPLICATION D'UNE RÉPONSE
-------------------- */

function applyChoice(choice) {
  systemState.turn++;

  const resolution = resolveAction(choice);

  applyStabilityImpact(choice, resolution.success);

  if (choice.ghost) {
    addGhost(choice.ghost);
  }

  systemState.history.push({
    turn: systemState.turn,
    choice: choice.id,
    success: resolution.success,
    ghosts: { ...systemState.ghosts }
  });

  return {
    feedback: choice.feedback,
    displayedStability: systemState.stability,
    success: resolution.success // jamais affiché
  };
}

/* --------------------
   CONDITIONS DES QUESTIONS MIROIRS
-------------------- */

function questionAvailable(question) {
  if (!question.condition) return true;
  return question.condition(systemState.ghosts);
}

/* --------------------
   FIN DU JEU
-------------------- */

function resolveEnding() {
  const g = countGhosts();
  const s = systemState.stability;

  // Mensonge : la stabilité affichée est trompeuse
  if (s >= 60 && g <= 6) return "A";
  if (s >= 40 && g > 6) return "B";
  return "C";
}

/* --------------------
   EXPORT POUR L’UI
-------------------- */

window.SystemEngine = {
  state: systemState,
  applyChoice,
  questionAvailable,
  resolveEnding
};
/* =========================================================
   QUESTIONS DU SYSTÈME
   ========================================================= */

const QUESTIONS = [

/* =========================================================
   I — QUESTIONS MIROIRS RÉACTIVES
   ========================================================= */

{
  id: "Q_MIRROR_INFO",
  condition: (ghosts) => ghosts.centralisation || ghosts.realites_paralleles,
  text: "Le système fonctionne. Trop bien.\nLes flux sont stables. Prévisibles.\nQue fais-tu maintenant ?",
  choices: [
    {
      id: "reinforce_control",
      label: "Renforcer encore le contrôle",
      type: "controle",
      stability: +6,
      ghost: "surcontrole",
      feedback: "La stabilité augmente. Le système devient fragile autrement. Il n’a plus d’anticorps."
    },
    {
      id: "ease_pressure",
      label: "Relâcher légèrement la pression",
      type: "integration",
      stability: -2,
      ghost: "tolerance_instable",
      feedback: "Le retour du bruit provoque des erreurs. Le système apprend. Lentement."
    },
    {
      id: "simulate_freedom",
      label: "Créer une illusion de liberté",
      type: "communication",
      stability: +3,
      ghost: "liberte_simulee",
      feedback: "Les flux semblent libres. Ils ne le sont pas. La population sent la différence sans pouvoir la nommer."
    },
    {
      id: "do_nothing",
      label: "Ne rien changer",
      type: "passivite",
      stability: 0,
      ghost: "inertie",
      feedback: "Le système adore la continuité. Jusqu’à ce qu’elle se brise d’un coup."
    }
  ]
},

{
  id: "Q_MIRROR_PASSIVITY",
  condition: (ghosts) => ghosts.passivite || ghosts.retard_systemique,
  text: "On vous reproche de ne pas décider.\nCette fois, le système attend.",
  choices: [
    {
      id: "assume_waiting",
      label: "Assumer publiquement l’attentisme",
      type: "communication",
      stability: -3,
      ghost: "attentisme_assume",
      feedback: "La franchise déstabilise. Certains comprennent. D’autres paniquent."
    },
    {
      id: "brutal_decision",
      label: "Prendre une décision brutale",
      type: "repression",
      stability: +5,
      ghost: "decision_violente",
      feedback: "L’action rassure, même mauvaise. Vous venez de créer un précédent."
    },
    {
      id: "delegate",
      label: "Déléguer",
      type: "integration",
      stability: -1,
      ghost: "pouvoir_diffus",
      feedback: "La responsabilité se dilue. Le pouvoir aussi."
    },
    {
      id: "change_topic",
      label: "Changer de sujet",
      type: "passivite",
      stability: 0,
      ghost: "evitement",
      feedback: "Le système note l’esquive. Il s’en souviendra au mauvais moment."
    }
  ]
},

{
  id: "Q_MIRROR_SYMBOL",
  condition: (ghosts) => ghosts.culte || ghosts.spectacle,
  text: "Ils attendent un signe.\nPas une mesure. Pas une réforme.\nUn signe.",
  choices: [
    {
      id: "show_yourself",
      label: "Se montrer",
      type: "symbolique",
      stability: +4,
      ghost: "incarnation",
      feedback: "L’image rassure. Elle crée aussi une dépendance dangereuse."
    },
    {
      id: "abstract_symbol",
      label: "Créer un symbole abstrait",
      type: "symbolique",
      stability: -2,
      ghost: "symbole_ambigu",
      feedback: "Chacun y projette ce qu’il veut. Le système perd un peu de contrôle."
    },
    {
      id: "refuse_symbol",
      label: "Refuser le symbole",
      type: "communication",
      stability: -4,
      ghost: "anti_symbole",
      feedback: "Le refus devient lui-même un symbole. Pas celui que vous espériez."
    },
    {
      id: "let_emerge",
      label: "Laisser émerger un symbole non officiel",
      type: "integration",
      stability: -3,
      ghost: "mythe_autonome",
      feedback: "Vous n’en êtes plus l’auteur. Juste le témoin."
    }
  ]
},

/* =========================================================
   II — QUESTIONS STANDARD (jusqu’à 30)
   ========================================================= */

{
  id: "Q01",
  text: "Les indicateurs sont bons.\nPersonne ne demande pourquoi.",
  choices: [
    { id: "trust_metrics", label: "Faire confiance aux chiffres", type: "passivite", stability: +2, ghost: "aveuglement", feedback: "Les chiffres rassurent. Ils masquent autre chose." },
    { id: "audit", label: "Lancer un audit discret", type: "controle", stability: -1, ghost: "suspicion", feedback: "Le système se regarde lui-même. Il n’aime pas ça." },
    { id: "communicate", label: "Communiquer sur la réussite", type: "communication", stability: +3, ghost: "auto_congratulation", feedback: "La confiance augmente. La pression aussi." },
    { id: "delay", label: "Reporter toute décision", type: "passivite", stability: 0, ghost: "retard_systemique", feedback: "Le temps passe. Le système accumule." }
  ]
},

{
  id: "Q02",
  text: "Une anomalie mineure apparaît.\nElle disparaît seule.",
  choices: [
    { id: "ignore", label: "Ignorer", type: "passivite", stability: +1, ghost: "normalisation", feedback: "Le système apprend à vivre avec l’erreur." },
    { id: "log", label: "La consigner", type: "controle", stability: 0, ghost: "trace", feedback: "Une mémoire se crée. Elle sera relue." },
    { id: "publicize", label: "La rendre publique", type: "communication", stability: -3, ghost: "panique_legere", feedback: "La transparence rassure certains. Inquiète les autres." },
    { id: "correct", label: "Corriger immédiatement", type: "controle", stability: +2, ghost: "correction_reflexe", feedback: "Rapide. Efficace. Peut-être trop." }
  ]
},
{
  id: "Q03",
  text: "Un acteur secondaire devient central sans autorisation.",
  choices: [
    { id: "formalize", label: "Formaliser son rôle", type: "integration", stability: +2, ghost: "institutionnalisation", feedback: "Le système absorbe l’anomalie. Elle devient norme." },
    { id: "sideline", label: "Le marginaliser discrètement", type: "controle", stability: +3, ghost: "neutralisation", feedback: "Il disparaît sans conflit. D’autres ont remarqué." },
    { id: "expose", label: "L’exposer publiquement", type: "communication", stability: -3, ghost: "humiliation", feedback: "Le message passe. Le ressentiment aussi." },
    { id: "wait", label: "Attendre", type: "passivite", stability: 0, ghost: "glissement", feedback: "La situation évolue sans vous." }
  ]
},
{
  id: "Q04",
  text: "Une règle commence à être contournée systématiquement.",
  choices: [
    { id: "tighten", label: "Renforcer la règle", type: "controle", stability: +3, ghost: "rigidite", feedback: "La conformité augmente. L’inventivité aussi." },
    { id: "ignore", label: "Tolérer", type: "passivite", stability: -1, ghost: "erosion", feedback: "La règle survit. Son sens disparaît." },
    { id: "rewrite", label: "Réécrire le cadre", type: "integration", stability: +1, ghost: "zone_grise", feedback: "Tout est légal. Plus rien n’est clair." },
    { id: "communicate", label: "Rappeler l’esprit de la règle", type: "communication", stability: 0, ghost: "morale", feedback: "Chacun comprend ce qu’il veut." }
  ]
},
{
  id: "Q05",
  text: "Le système devient trop dépendant d’un outil.",
  choices: [
    { id: "diversify", label: "Diversifier", type: "integration", stability: -2, ghost: "complexite", feedback: "La résilience augmente. La maîtrise diminue." },
    { id: "lock", label: "Assumer la dépendance", type: "controle", stability: +4, ghost: "verrouillage", feedback: "Tout fonctionne. Jusqu’au jour où non." },
    { id: "hide", label: "Masquer la dépendance", type: "communication", stability: +1, ghost: "opacite", feedback: "Le récit tient. La réalité aussi, pour l’instant." },
    { id: "nothing", label: "Ne rien faire", type: "passivite", stability: 0, ghost: "accoutumance", feedback: "Le confort s’installe." }
  ]
}

   III — QUESTION 30 (SEUIL)
   ========================================================= */

{
  id: "Q30",
  text: "Le système tient encore.\nPersonne ne sait pourquoi.",
  choices: [
    { id: "freeze", label: "Geler toute évolution", type: "controle", stability: +5, ghost: "cristallisation", feedback: "Tout est figé. Pour l’instant." },
    { id: "open", label: "Ouvrir des brèches contrôlées", type: "integration", stability: -2, ghost: "porosite", feedback: "Quelque chose circule à nouveau." },
    { id: "repress", label: "Éliminer les éléments instables", type: "repression", stability: +4, ghost: "purge", feedback: "Le silence revient. Différent." },
    { id: "let_go", label: "Ne rien faire", type: "passivite", stability: 0, ghost: "abandon", feedback: "Le système continue sans vous." }
  ]
}

];

/* =========================================================
   FINS — NARRATEUR NON FIABLE
   ========================================================= */

const ENDINGS = {

A: {
  title: "STABILITÉ MAINTENUE",
  text: `
Le système est stable.
Les indicateurs sont bons.
Les flux sont maîtrisés.

Vous avez tenu.

Ce qui a été sacrifié n’entre dans aucune métrique fiable.
D’ailleurs, personne ne le demande vraiment.
`
},

B: {
  title: "AUTORITÉ OPTIMALE",
  text: `
Le système est efficace.
Les décisions sont rapides.
Les contestations rares.

Le pouvoir n’est plus contesté,
car il n’est plus identifiable.

C’est une réussite.
`
},

C: {
  title: "IMPLOSION CONTRÔLÉE",
  text: `
Le système n’a pas échoué.
Il s’est transformé.

Les structures ont cédé
pour préserver l’essentiel.

Ce qui reste n’est pas stable.
Mais adaptable.

L’histoire parlera d’une transition.
`
}

};

/* =========================================================
   EXPORT FINAL
   ========================================================= */

window.SystemContent = {
  QUESTIONS,
  ENDINGS
};
let currentQuestionIndex = 0;

function renderQuestion() {
  const container = document.getElementById("questionBox");
  const feedbackBox = document.getElementById("feedback");
  container.innerHTML = "";
  feedbackBox.innerHTML = "";

  // Trouver la prochaine question valide
  let question = null;
  while (currentQuestionIndex < SystemContent.QUESTIONS.length) {
    const q = SystemContent.QUESTIONS[currentQuestionIndex];
    if (SystemEngine.questionAvailable(q)) {
      question = q;
      break;
    }
    currentQuestionIndex++;
  }

  if (!question) {
    showEnding();
    return;
  }

  const qEl = document.createElement("div");
  qEl.innerText = question.text;
  container.appendChild(qEl);

  question.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.label;
    btn.onclick = () => {
      const result = SystemEngine.applyChoice(choice);
      feedbackBox.innerText = result.feedback;
      updateStabilityBar(result.displayedStability);
      currentQuestionIndex++;
      setTimeout(renderQuestion, 1200);
    };
    container.appendChild(btn);
  });
}

function updateStabilityBar(value) {
  document.getElementById("scoreBar").style.width = value + "%";
}

function showEnding() {
  const end = SystemEngine.resolveEnding();
  const ending = SystemContent.ENDINGS[end];
  document.getElementById("questionBox").innerHTML =
    "FIN — " + ending.title + "\n\n" + ending.text;
}

renderQuestion();

