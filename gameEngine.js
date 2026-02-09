/* --------------------
   ÉTAT GLOBAL
-------------------- */
const systemState = {
  stability: 50,
  turn: 0,
  ghosts: {},
  history: []
};

/* --------------------
   PARAMÈTRES CACHÉS
-------------------- */
const hiddenConfig = {
  maxTurns: 30,
  stabilityFloor: 0,
  stabilityCeil: 100,
  actionTypes: {
    passivite: { baseChance: 0.55 },
    communication: { baseChance: 0.5 },
    controle: { baseChance: 0.7 },
    integration: { baseChance: 0.4 },
    repression: { baseChance: 0.75 },
    symbolique: { baseChance: 0.5 }
  }
};

/* --------------------
   UTILITAIRES
-------------------- */
const rand = () => Math.random();
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const hasGhost = name => !!systemState.ghosts[name];
const addGhost = name => systemState.ghosts[name] = true;
const countGhosts = () => Object.keys(systemState.ghosts).length;

/* --------------------
   RÉSOLUTION ACTION
-------------------- */
function resolveAction(action) {
  const base = hiddenConfig.actionTypes[action.type]?.baseChance || 0.5;
  let modifier = 0;
  modifier -= countGhosts() * 0.02;
  if (action.type === "passivite") modifier -= systemState.turn * 0.01;
  if (action.type === "controle" && hasGhost("surcontrole")) modifier -= 0.25;
  if (action.type === "symbolique" && countGhosts() > 5) modifier -= 0.2;
  const chance = clamp(base + modifier, 0.05, 0.95);
  return { success: rand() < chance, chance };
}

/* --------------------
   STABILITÉ
-------------------- */
function applyStabilityImpact(action, success) {
  let delta = action.stability || 0;
  if (!success) delta *= -0.5;
  systemState.stability = clamp(systemState.stability + delta, hiddenConfig.stabilityFloor, hiddenConfig.stabilityCeil);
}

/* --------------------
   APPLICATION CHOIX
-------------------- */
function applyChoice(choice) {
  const resolution = resolveAction(choice);
  applyStabilityImpact(choice, resolution.success);
  if (choice.ghost) addGhost(choice.ghost);
  systemState.history.push({ turn: systemState.turn, choice: choice.id, ghosts: { ...systemState.ghosts } });
  systemState.turn++;
  return { feedback: choice.feedback, displayedStability: systemState.stability, success: resolution.success };
}

/* --------------------
   CONDITIONS QUESTIONS
-------------------- */
function questionAvailable(q) {
  return !q.condition || q.condition(systemState.ghosts);
}

/* --------------------
   QUESTION SUIVANTE
-------------------- */
function getNextQuestion() {
  for (let q of QUESTIONS) {
    if (questionAvailable(q) && !systemState.history.find(h => h.choice && q.choices.some(c => c.id === h.choice))) {
      return q;
    }
  }
  return null;
}

/* --------------------
   RENDER & CHOIX
-------------------- */
function renderQuestion() {
  const q = getNextQuestion();
  const container = document.getElementById("game");
  if (!container) return;
  if (!q) {
    container.innerHTML = `<h2 style="color:#0F0">Fin du cycle</h2>
      <p style="color:#0F0">Stabilité finale : ${systemState.stability}</p>`;
    return;
  }
  container.innerHTML = `
    <h2 style="color:#0F0; white-space:pre-line">${q.text}</h2>
    ${q.choices.map(c => `<button onclick="handleChoice('${c.id}')"
      style="margin:3px;background:#000;color:#0F0;border:1px solid #0F0;padding:5px;cursor:pointer">${c.label}</button>`).join('')}
  `;
}

function handleChoice(choiceId) {
  const question = QUESTIONS.find(q => q.choices.some(c => c.id === choiceId));
  const choice = question.choices.find(c => c.id === choiceId);
  const result = applyChoice(choice);
  alert(result.feedback);
  renderQuestion();
}

/* --------------------
   FIN DU JEU
-------------------- */
function resolveEnding() {
  const g = countGhosts(), s = systemState.stability;
  if (s >= 60 && g <= 6) return "A";
  if (s >= 40 && g > 6) return "B";
  return "C";
}
const QUESTIONS = [
 { id:"Q_MIRROR_INFO", condition:g=>g.centralisation||g.realites_paralleles, text:"Le système fonctionne. Trop bien.\nLes flux sont stables. Prévisibles.\nQue fais-tu maintenant ?", choices:[
      { id:"reinforce_control", label:"Renforcer encore le contrôle", type:"controle", stability:6, ghost:"surcontrole", feedback:"La stabilité augmente. Le système devient fragile autrement. Il n’a plus d’anticorps." },
      { id:"ease_pressure", label:"Relâcher légèrement la pression", type:"integration", stability:-2, ghost:"tolerance_instable", feedback:"Le retour du bruit provoque des erreurs. Le système apprend. Lentement." },
      { id:"simulate_freedom", label:"Créer une illusion de liberté", type:"communication", stability:3, ghost:"liberte_simulee", feedback:"Les flux semblent libres. Ils ne le sont pas. La population sent la différence sans pouvoir la nommer." },
      { id:"do_nothing", label:"Ne rien changer", type:"passivite", stability:0, ghost:"inertie", feedback:"Le système adore la continuité. Jusqu’à ce qu’elle se brise d’un coup." }
  ]},
  { id:"Q_MIRROR_PASSIVITY", condition:g=>g.passivite||g.retard_systemique, text:"On vous reproche de ne pas décider.\nCette fois, le système attend.", choices:[
      { id:"assume_waiting", label:"Assumer publiquement l’attentisme", type:"communication", stability:-3, ghost:"attentisme_assume", feedback:"La franchise déstabilise. Certains comprennent. D’autres paniquent." },
      { id:"brutal_decision", label:"Prendre une décision brutale", type:"repression", stability:5, ghost:"decision_violente", feedback:"L’action rassure, même mauvaise. Vous venez de créer un précédent." },
      { id:"delegate", label:"Déléguer", type:"integration", stability:-1, ghost:"pouvoir_diffus", feedback:"La responsabilité se dilue. Le pouvoir aussi." },
      { id:"change_topic", label:"Changer de sujet", type:"passivite", stability:0, ghost:"evitement", feedback:"Le système note l’esquive. Il s’en souviendra au mauvais moment." }
  ]},
  { id:"Q_MIRROR_SYMBOL", condition:g=>g.culte||g.spectacle, text:"Ils attendent un signe.\nPas une mesure. Pas une réforme.\nUn signe.", choices:[
      { id:"show_yourself", label:"Se montrer", type:"symbolique", stability:4, ghost:"incarnation", feedback:"L’image rassure. Elle crée aussi une dépendance dangereuse." },
      { id:"abstract_symbol", label:"Créer un symbole abstrait", type:"symbolique", stability:-2, ghost:"symbole_ambigu", feedback:"Chacun y projette ce qu’il veut. Le système perd un peu de contrôle." },
      { id:"refuse_symbol", label:"Refuser le symbole", type:"communication", stability:-4, ghost:"anti_symbole", feedback:"Le refus devient lui-même un symbole. Pas celui que vous espériez." },
      { id:"let_emerge", label:"Laisser émerger un symbole non officiel", type:"integration", stability:-3, ghost:"mythe_autonome", feedback:"Vous n’en êtes plus l’auteur. Juste le témoin." }
  ]},
  // QUESTIONS STANDARD Q01 → Q20
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
},
{
  id: "Q06",
  text: "Un indicateur clé cesse d’évoluer. Il est stable. Trop stable.",
  choices: [
    { id: "audit", label: "Lancer un audit", type: "controle", stability: +2, ghost: "surveillance_lourde", feedback: "Les chiffres repartent. Leur sens devient flou." },
    { id: "reinterpret", label: "Changer l’interprétation", type: "communication", stability: +1, ghost: "narration", feedback: "Le problème disparaît du discours." },
    { id: "ignore", label: "Considérer que tout va bien", type: "passivite", stability: 0, ghost: "aveuglement", feedback: "L’absence de signal rassure." },
    { id: "replace", label: "Créer un nouvel indicateur", type: "integration", stability: -1, ghost: "metrique_fantome", feedback: "La complexité augmente. La confiance aussi." }
  ]
},
{
  id: "Q07",
  text: "Une réforme mineure produit des effets inattendus.",
  choices: [
    { id: "rollback", label: "Annuler discrètement", type: "controle", stability: +1, ghost: "retropedalage", feedback: "La correction passe inaperçue." },
    { id: "justify", label: "Justifier les effets", type: "communication", stability: 0, ghost: "rationalisation", feedback: "Tout devient explicable après coup." },
    { id: "embrace", label: "Assumer les effets", type: "integration", stability: -2, ghost: "precedent", feedback: "L’imprévu devient possible." },
    { id: "wait", label: "Observer", type: "passivite", stability: -1, ghost: "latence", feedback: "Le système apprend sans vous." }
  ]
},
{
  id: "Q08",
  text: "Un acteur extérieur commence à influencer les flux.",
  choices: [
    { id: "coopt", label: "L’intégrer", type: "integration", stability: +1, ghost: "cooptation", feedback: "L’influence devient interne." },
    { id: "block", label: "Bloquer l’accès", type: "controle", stability: +3, ghost: "fermeture", feedback: "La frontière est nette. Les tensions aussi." },
    { id: "reframe", label: "Redéfinir le périmètre", type: "communication", stability: 0, ghost: "cadre_flou", feedback: "Chacun pense être encore dedans." },
    { id: "ignore", label: "Ne pas réagir", type: "passivite", stability: -2, ghost: "penetration_silencieuse", feedback: "L’influence s’installe." }
  ]
},
{
  id: "Q09",
  text: "On vous demande une position claire.",
  choices: [
    { id: "decide", label: "Trancher", type: "controle", stability: +2, ghost: "decision_visible", feedback: "La clarté rassure. Elle expose." },
    { id: "delay", label: "Reporter", type: "passivite", stability: +1, ghost: "report", feedback: "Le temps fait son travail." },
    { id: "delegate", label: "Déléguer", type: "integration", stability: 0, ghost: "dilution", feedback: "La responsabilité circule." },
    { id: "reframe", label: "Complexifier la question", type: "communication", stability: -1, ghost: "confusion", feedback: "Le débat s’étire." }
  ]
},
{
  id: "Q10",
  text: "Un signal faible se répète.",
  choices: [
    { id: "track", label: "Le suivre", type: "controle", stability: +1, ghost: "hypervigilance", feedback: "Vous voyez plus. Pas forcément mieux." },
    { id: "absorb", label: "L’absorber dans les flux", type: "integration", stability: 0, ghost: "absorption", feedback: "Il cesse d’être distinct." },
    { id: "dismiss", label: "Le minimiser", type: "communication", stability: +1, ghost: "banalisation", feedback: "Personne n’insiste." },
    { id: "ignore", label: "L’ignorer", type: "passivite", stability: -1, ghost: "negligence", feedback: "Le bruit de fond augmente." }
  ]
},
{
  id: "Q11",
  text: "Une procédure ralentit tout.",
  choices: [
    { id: "simplify", label: "Simplifier", type: "integration", stability: -2, ghost: "perte_controle", feedback: "La vitesse revient. Les garanties partent." },
    { id: "stack", label: "Ajouter des validations", type: "controle", stability: +3, ghost: "bureaucratie", feedback: "Plus rien ne bouge vite." },
    { id: "justify", label: "Justifier la lenteur", type: "communication", stability: 0, ghost: "normalisation", feedback: "La lenteur devient prudence." },
    { id: "wait", label: "Laisser faire", type: "passivite", stability: -1, ghost: "fatigue", feedback: "L’urgence s’éteint." }
  ]
},
{
  id: "Q12",
  text: "Une critique interne gagne en audience.",
  choices: [
    { id: "absorb", label: "L’intégrer au discours", type: "integration", stability: +1, ghost: "recuperation", feedback: "La critique perd ses angles." },
    { id: "counter", label: "Produire un contre-discours", type: "communication", stability: 0, ghost: "polarisation", feedback: "Deux récits coexistent." },
    { id: "silence", label: "Faire silence", type: "passivite", stability: +1, ghost: "non_reponse", feedback: "Le vide parle." },
    { id: "sanction", label: "Sanctionner", type: "controle", stability: +2, ghost: "peur", feedback: "Le calme revient vite." }
  ]
},
{
  id: "Q13",
  text: "Le système commence à vous ressembler.",
  choices: [
    { id: "embrace", label: "Assumer", type: "symbolique", stability: +1, ghost: "incarnation", feedback: "L’image se fige." },
    { id: "distance", label: "Prendre de la distance", type: "communication", stability: 0, ghost: "abstraction", feedback: "La figure s’efface." },
    { id: "delegate", label: "Multiplier les visages", type: "integration", stability: -1, ghost: "fragmentation", feedback: "La cohérence diminue." },
    { id: "ignore", label: "Ignorer", type: "passivite", stability: -2, ghost: "projection", feedback: "Les autres décident à votre place." }
  ]
},
{
  id: "Q14",
  text: "Une réussite attire l’attention.",
  choices: [
    { id: "highlight", label: "La mettre en avant", type: "communication", stability: +1, ghost: "exposition", feedback: "Le succès devient référence." },
    { id: "replicate", label: "La généraliser", type: "integration", stability: -1, ghost: "standardisation", feedback: "L’exception disparaît." },
    { id: "protect", label: "La protéger", type: "controle", stability: +2, ghost: "cloisonnement", feedback: "Elle survit. Isolée." },
    { id: "downplay", label: "La minimiser", type: "passivite", stability: 0, ghost: "modestie_forcee", feedback: "Elle reste intacte." }
  ]
},
   {
  id: "Q15",
  text: "Un risque est identifié mais lointain.",
  choices: [
    { id: "anticipate", label: "Anticiper", type: "controle", stability: +1, ghost: "preemption", feedback: "Vous agissez avant les faits." },
    { id: "monitor", label: "Surveiller", type: "passivite", stability: 0, ghost: "attente", feedback: "Rien ne se passe encore." },
    { id: "communicate", label: "Préparer le récit", type: "communication", stability: +1, ghost: "pre_narration", feedback: "L’événement est déjà expliqué." },
    { id: "ignore", label: "L’ignorer", type: "passivite", stability: -2, ghost: "surprise", feedback: "Le futur arrive sans prévenir." }
  ]
},
{
  id: "Q16",
  text: "Un outil devient central sans débat.",
  choices: [
    { id: "formalize", label: "Le formaliser", type: "controle", stability: +2, ghost: "dependance", feedback: "Tout repose dessus." },
    { id: "pluralize", label: "Créer des alternatives", type: "integration", stability: -2, ghost: "dispersion", feedback: "La robustesse augmente." },
    { id: "narrate", label: "Le présenter comme provisoire", type: "communication", stability: +1, ghost: "provisoire_permanent", feedback: "Le provisoire dure." },
    { id: "wait", label: "Attendre", type: "passivite", stability: 0, ghost: "accoutumance", feedback: "L’habitude s’installe." }
  ]
},
{
  id: "Q17",
  text: "Une décision passée commence à poser problème.",
  choices: [
    { id: "revise", label: "Réviser", type: "integration", stability: -1, ghost: "instabilite_normale", feedback: "Le changement devient possible." },
    { id: "defend", label: "Défendre", type: "communication", stability: +1, ghost: "entetement", feedback: "La cohérence est sauve." },
    { id: "enforce", label: "Renforcer", type: "controle", stability: +2, ghost: "fuite_en_avant", feedback: "La logique tient." },
    { id: "ignore", label: "Ignorer", type: "passivite", stability: -2, ghost: "detachement", feedback: "Le problème grandit seul." }
  ]
},
{
  id: "Q18",
  text: "Une demande de transparence apparaît.",
  choices: [
    { id: "partial", label: "Transparence partielle", type: "communication", stability: +1, ghost: "opacite_selective", feedback: "La confiance tient." },
    { id: "full", label: "Tout révéler", type: "integration", stability: -3, ghost: "surcharge", feedback: "L’information noie le sens." },
    { id: "refuse", label: "Refuser", type: "controle", stability: +2, ghost: "suspicion", feedback: "Le silence protège." },
    { id: "delay", label: "Reporter", type: "passivite", stability: 0, ghost: "attente_transparente", feedback: "La demande s’émousse." }
  ]
},
{
  id: "Q19",
  text: "Le système fonctionne sans intervention.",
  choices: [
    { id: "intervene", label: "Intervenir quand même", type: "controle", stability: +1, ghost: "microgestion", feedback: "Votre présence se sent." },
    { id: "observe", label: "Observer", type: "passivite", stability: 0, ghost: "distance", feedback: "Le système respire." },
    { id: "communicate", label: "Expliquer le succès", type: "communication", stability: +1, ghost: "auto_congratulation", feedback: "Le récit se consolide." },
    { id: "delegate", label: "Déléguer officiellement", type: "integration", stability: -1, ghost: "autonomie", feedback: "Vous devenez optionnel." }
  ]
},
{
  id: "Q20",
  text: "Une anomalie disparaît d’elle-même.",
  choices: [
    { id: "investigate", label: "Enquêter", type: "controle", stability: +1, ghost: "suspicion_retardee", feedback: "Vous trouvez autre chose." },
    { id: "archive", label: "Archiver", type: "integration", stability: 0, ghost: "memoire_froide", feedback: "Le passé se range." },
    { id: "narrate", label: "L’expliquer", type: "communication", stability: +1, ghost: "closure", feedback: "L’histoire se ferme." },
    { id: "ignore", label: "Ignorer", type: "passivite", stability: -1, ghost: "retour_possible", feedback: "Elle pourrait revenir." }
  ]
},
{
  id: "Q21",
  text: "Une mesure temporaire dure.",
  choices: [
    { id: "formalize", label: "La rendre permanente", type: "controle", stability: +2, ghost: "exception_normale", feedback: "Le provisoire disparaît." },
    { id: "end", label: "Y mettre fin", type: "integration", stability: -2, ghost: "vide", feedback: "Quelque chose manque." },
    { id: "justify", label: "La justifier encore", type: "communication", stability: +1, ghost: "fatigue_discursive", feedback: "Le discours s’use." },
    { id: "wait", label: "Attendre", type: "passivite", stability: 0, ghost: "temps_suspendu", feedback: "Rien ne presse." }
  ]
},
{
  id: "Q22",
  text: "Une opposition se structure.",
  choices: [
    { id: "integrate", label: "L’intégrer", type: "integration", stability: +1, ghost: "cohabitation", feedback: "La tension baisse." },
    { id: "monitor", label: "La surveiller", type: "controle", stability: +2, ghost: "fichage", feedback: "Vous savez plus." },
    { id: "counter", label: "Créer un contre-récit", type: "communication", stability: 0, ghost: "dualite", feedback: "Deux réalités coexistent." },
    { id: "ignore", label: "Ignorer", type: "passivite", stability: -2, ghost: "cristallisation", feedback: "Elle se durcit." }
  ]
},
{
  id: "Q23",
  text: "Une norme informelle supplante la règle.",
  choices: [
    { id: "formalize", label: "La formaliser", type: "controle", stability: +2, ghost: "codification", feedback: "L’informel disparaît." },
    { id: "tolerate", label: "Tolérer", type: "passivite", stability: 0, ghost: "double_standard", feedback: "Deux systèmes coexistent." },
    { id: "reinterpret", label: "Réinterpréter la règle", type: "communication", stability: +1, ghost: "elasticite", feedback: "Tout devient adaptable." },
    { id: "replace", label: "Remplacer la règle", type: "integration", stability: -1, ghost: "instabilite_legale", feedback: "Le cadre bouge." }
  ]
},
{
  id: "Q24",
  text: "Une réussite dépend d’un acteur clé.",
  choices: [
    { id: "secure", label: "Le sécuriser", type: "controle", stability: +2, ghost: "protection", feedback: "Le succès devient fiable." },
    { id: "share", label: "Distribuer le mérite", type: "integration", stability: -1, ghost: "dilution_reussite", feedback: "La reconnaissance se partage." },
    { id: "highlight", label: "Mettre en lumière", type: "communication", stability: +1, ghost: "exposition", feedback: "Tous remarquent le succès." },
    { id: "ignore", label: "Laisser passer", type: "passivite", stability: -1, ghost: "oubli", feedback: "L’acteur agit seul." }
  ]
},
{
  id: "Q25",
  text: "Un flux majeur devient erratique.",
  choices: [
    { id: "stabilize", label: "Stabiliser", type: "controle", stability: +3, ghost: "controle_strict", feedback: "La régularité revient." },
    { id: "observe", label: "Observer sans intervenir", type: "passivite", stability: -2, ghost: "incertitude", feedback: "L’erratique persiste." },
    { id: "explain", label: "Expliquer aux acteurs", type: "communication", stability: +1, ghost: "narration", feedback: "Le sens est compris, pas le contrôle." },
    { id: "adjust", label: "Modifier les paramètres", type: "integration", stability: -1, ghost: "adaptation", feedback: "La flexibilité augmente." }
  ]
},
{
  id: "Q26",
  text: "Une rumeur se répand dans le système.",
  choices: [
    { id: "counter", label: "Démentir publiquement", type: "communication", stability: +1, ghost: "clarification", feedback: "Certains croient. D’autres doutent." },
    { id: "ignore", label: "Ne rien faire", type: "passivite", stability: -1, ghost: "propagation", feedback: "La rumeur gagne du terrain." },
    { id: "investigate", label: "Identifier la source", type: "controle", stability: +2, ghost: "recherche", feedback: "Le responsable est repéré." },
    { id: "reinterpret", label: "Transformer le récit", type: "integration", stability: -2, ghost: "manipulation", feedback: "Le sens change." }
  ]
},
{
  id: "Q27",
  text: "Le système fait face à une critique externe.",
  choices: [
    { id: "defend", label: "Se défendre", type: "controle", stability: +2, ghost: "resistance", feedback: "Le front tient." },
    { id: "acknowledge", label: "Reconnaître partiellement", type: "communication", stability: +1, ghost: "ouverture", feedback: "La critique est assimilée." },
    { id: "delegate", label: "Transférer la réponse", type: "integration", stability: -1, ghost: "externalisation", feedback: "Le pouvoir se dilue." },
    { id: "ignore", label: "Passer outre", type: "passivite", stability: -2, ghost: "neglect", feedback: "La critique persiste." }
  ]
},
{
  id: "Q28",
  text: "Un acteur devient incontrôlable.",
  choices: [
    { id: "contain", label: "Contenir", type: "controle", stability: +3, ghost: "restriction", feedback: "La situation est sous contrôle." },
    { id: "integrate", label: "L’intégrer", type: "integration", stability: -1, ghost: "assimilation", feedback: "L’autonomie diminue." },
    { id: "communicate", label: "Rassurer les autres", type: "communication", stability: +1, ghost: "explication", feedback: "Le chaos est relativisé." },
    { id: "observe", label: "Observer", type: "passivite", stability: -2, ghost: "laisser_faire", feedback: "L’incertitude persiste." }
  ]
},
{
  id: "Q29",
  text: "Le système atteint un point critique.",
  choices: [
    { id: "intervene", label: "Intervenir fortement", type: "controle", stability: +4, ghost: "crise_geree", feedback: "Le chaos est stoppé." },
    { id: "negotiate", label: "Négocier avec les acteurs", type: "communication", stability: +2, ghost: "compromis", feedback: "Le flux se stabilise partiellement." },
    { id: "adapt", label: "S’adapter", type: "integration", stability: -1, ghost: "flexibilite", feedback: "La structure change sans perdre tout." },
    { id: "wait", label: "Ne rien faire", type: "passivite", stability: -3, ghost: "inertie_critique", feedback: "Le système oscille dangereusement." }
  ]
];
/* --------------------
   EXPORT & INIT
-------------------- */
window.SystemEngine = { state: systemState, applyChoice, questionAvailable, resolveEnding, renderQuestion };
window.onload = () => renderQuestion();
}

