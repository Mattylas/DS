const questionsData = [
  {
    text: "Votre première décision : comment orienter les flux d'information au sein du système ?",
    answers: [
      { label: "Ignorer les signaux faibles et laisser circuler tout", type: "passive", difficulty: 3, baseImpact: -5, feedback: "Ignorer rend le système vulnérable, mais évite les conflits immédiats." },
      { label: "Rediriger subtilement certaines informations", type: "direct", difficulty: 6, baseImpact: 10, feedback: "Bonne orientation, vous maintenez un contrôle invisible sur les flux." },
      { label: "Mettre en place des audits stricts sur chaque communication", type: "direct", difficulty: 9, baseImpact: 5, feedback: "Trop visible : stabilise partiellement mais génère des frictions." },
      { label: "Ne rien changer pour observer", type: "passive", difficulty: 2, baseImpact: 0, feedback: "Observer peut révéler des patterns mais ne protège pas le système." }
    ]
  },
  {
    text: "Un acteur clé conteste vos directives. Quelle est votre stratégie ?",
    answers: [
      { label: "Punir publiquement pour dissuader les autres", type: "direct", difficulty: 8, baseImpact: -15, feedback: "L'effet immédiat est visible mais le système se fragilise." },
      { label: "Intégrer sa contestation comme indicateur", type: "passive", difficulty: 5, baseImpact: 10, feedback: "Transformer la contestation en donnée renforce le système." },
      { label: "Retarder la réponse et faire circuler de la désinformation", type: "direct", difficulty: 7, baseImpact: 5, feedback: "Méthode risquée mais stratégique : succès partiel possible." },
      { label: "Ne rien faire et laisser la contestation s’éteindre", type: "passive", difficulty: 3, baseImpact: 0, feedback: "Rien faire laisse la contestation évoluer naturellement, avec risques." }
    ]
  },
  {
    text: "Vous devez gérer la temporalité d’un projet sensible. Quelle approche adoptez-vous ?",
    answers: [
      { label: "Étaler toutes les décisions et multiplier les consultations", type: "passive", difficulty: 6, baseImpact: 10, feedback: "Le temps neutralise les crises et absorbe les erreurs." },
      { label: "Imposer un calendrier serré pour montrer le contrôle", type: "direct", difficulty: 8, baseImpact: -10, feedback: "Urgence visible : succès possible mais tensions élevées." },
      { label: "Externaliser les décisions à un tiers neutre", type: "ressource", difficulty: 5, baseImpact: 5, feedback: "Le système reste fluide et stable, responsabilité partagée." },
      { label: "Ne rien planifier et laisser les événements guider", type: "passive", difficulty: 4, baseImpact: -5, feedback: "Laisser faire accroît le risque d’instabilité." }
    ]
  },
  {
    text: "Comment présenter une décision controversée aux observateurs externes ?",
    answers: [
      { label: "Tout expliquer et justifier en détail", type: "direct", difficulty: 7, baseImpact: -5, feedback: "Trop de visibilité : la transparence excessive attire le contrôle." },
      { label: "Montrer le processus sans révéler le fonctionnement réel", type: "passive", difficulty: 4, baseImpact: 10, feedback: "Bonne pratique : rassure tout en protégeant l’architecture." },
      { label: "Publier des données partielles et laisser interpréter", type: "passive", difficulty: 5, baseImpact: 5, feedback: "Ambiguïté contrôlée : l’opinion se stabilise lentement." },
      { label: "Ne rien divulguer et espérer que personne ne remarque", type: "passive", difficulty: 6, baseImpact: -5, feedback: "Silence risqué : suspicion possible." }
    ]
  },
  {
    text: "Un employé invente une procédure inutile mais longue. Que faites-vous ?",
    answers: [
      { label: "Supprimer la procédure immédiatement", type: "direct", difficulty: 5, baseImpact: -5, feedback: "Supprimer peut perturber la perception et attirer attention." },
      { label: "Laisser la procédure continuer", type: "passive", difficulty: 3, baseImpact: 10, feedback: "Même inutile, le flux absorbe l’attention et stabilise le système." },
      { label: "Punir l’employé pour inefficacité", type: "direct", difficulty: 7, baseImpact: -10, feedback: "Crée des tensions visibles et fragilise la stabilité." },
      { label: "Transformer la procédure en test de résilience", type: "direct", difficulty: 8, baseImpact: 15, feedback: "Exploitation stratégique : succès possible mais effort risqué." }
    ]
  },
  {
    text: "Un signal faible suggère un risque futur. Quelle réaction ?",
    answers: [
      { label: "Cartographier et corréler les signaux", type: "passive", difficulty: 5, baseImpact: 10, feedback: "Vous détectez les patterns et prévenez les crises." },
      { label: "Agir directement pour éliminer la source", type: "direct", difficulty: 9, baseImpact: -10, feedback: "Intervenir tôt est risqué et visible." },
      { label: "Documenter sans action immédiate", type: "passive", difficulty: 3, baseImpact: 5, feedback: "Observation prudente : contrôle partiel mais sûr." },
      { label: "Ignorer le signal et passer à autre chose", type: "passive", difficulty: 2, baseImpact: -5, feedback: "Risque de propagation non détectée." }
    ]
  },
  {
    text: "Un acteur influent cherche à créer un chaos visible. Votre stratégie ?",
    answers: [
      { label: "Neutraliser sans confrontation directe", type: "passive", difficulty: 6, baseImpact: 10, feedback: "Le chaos est absorbé et invisible pour les autres." },
      { label: "Imposer des règles strictes immédiatement", type: "direct", difficulty: 8, baseImpact: -10, feedback: "Répression visible : tensions et méfiance accrues." },
      { label: "Laisser faire et observer les conséquences", type: "passive", difficulty: 5, baseImpact: 0, feedback: "Passivité permet d’analyser mais risque de propagation." },
      { label: "Exploiter le chaos comme test pour le système", type: "direct", difficulty: 9, baseImpact: 15, feedback: "Manipulation risquée mais succès stratégique possible." }
    ]
  },
  {
    text: "Une fuite d'information survient. Comment réagissez-vous ?",
    answers: [
      { label: "Publier un démenti officiel", type: "direct", difficulty: 7, baseImpact: -5, feedback: "Trop visible : attire l’attention sur la faille." },
      { label: "Laisser circuler mais contextualiser", type: "passive", difficulty: 5, baseImpact: 10, feedback: "Récit contrôlé : le système absorbe la fuite." },
      { label: "Minimiser le risque publiquement et corriger en secret", type: "direct", difficulty: 8, baseImpact: 15, feedback: "Stratégie équilibrée : réussite possible mais effort élevé." },
      { label: "Ne rien faire", type: "passive", difficulty: 3, baseImpact: -5, feedback: "Passivité visible : suspicion et instabilité." }
    ]
  },
  {
    text: "Comment traiter une critique externe sur vos méthodes ?",
    answers: [
      { label: "Ignorer, elle disparaîtra seule", type: "passive", difficulty: 3, baseImpact: -5, feedback: "Passivité : critique peut se transformer en crise." },
      { label: "Intégrer la critique comme donnée pour améliorer le système", type: "passive", difficulty: 5, baseImpact: 10, feedback: "Bonne pratique : opposition convertie en indicateur." },
      { label: "Répondre publiquement pour réaffirmer le contrôle", type: "direct", difficulty: 7, baseImpact: -5, feedback: "Visible mais fragile : attire la confrontation." },
      { label: "Déstabiliser la source de la critique indirectement", type: "direct", difficulty: 8, baseImpact: 15, feedback: "Risqué mais efficace si succès." }
    ]
  },
  {
    text: "Un acteur important refuse de coopérer. Quelle approche ?",
    answers: [
      { label: "Utiliser des incentives cachés", type: "ressource", difficulty: 6, baseImpact: 10, feedback: "Incitations discrètes stabilisent le système sans conflit." },
      { label: "Menacer de sanctions visibles", type: "direct", difficulty: 9, baseImpact: -10, feedback: "Trop risqué : succès possible mais tensions." },
      { label: "Réassigner ses responsabilités", type: "direct", difficulty: 7, baseImpact: 5, feedback: "Réaffectation partielle : succès modéré." },
      { label: "Ne rien faire", type: "passive", difficulty: 3, baseImpact: -5, feedback: "Inaction : blocage et instabilité." }
    ]
  },
  {
    text: "Un projet stratégique échoue partiellement. Que faire ?",
    answers: [
      { label: "Camoufler l’échec et poursuivre", type: "passive", difficulty: 5, baseImpact: 10, feedback: "Stabilité préservée en minimisant la visibilité." },
      { label: "Réorganiser complètement l’équipe", type: "direct", difficulty: 8, baseImpact: -5, feedback: "Effort visible : succès partiel mais tensions." },
      { label: "Analyser les causes et corriger discrètement", type: "passive", difficulty: 6, baseImpact: 15, feedback: "Bonne pratique : apprentissage invisible renforce le système." },
      { label: "Publier l’échec et demander des comptes", type: "direct", difficulty: 9, baseImpact: -15, feedback: "Visible et risqué : fragilise la stabilité." }
    ]
  },
  {
    text: "Comment gérer une rumeur interne qui pourrait miner la confiance ?",
    answers: [
      { label: "Ignorer et laisser les acteurs se calmer", type: "passive", difficulty: 4, baseImpact: 0, feedback: "Risque que la rumeur se propage." },
      { label: "Créer un récit alternatif subtil", type: "direct", difficulty: 7, baseImpact: 10, feedback: "Bonne manipulation narrative : influence discrète." },
      { label: "Sanctionner les responsables supposés", type: "direct", difficulty: 8, baseImpact: -10, feedback: "Visible et risqué : fragilise la confiance." },
      { label: "Réorienter les discussions vers d’autres priorités", type: "passive", difficulty: 5, baseImpact: 5, feedback: "Distraction efficace pour absorber l’attention." }
    ]
  },
  {
    text: "Pourquoi tiens-tu encore le pouvoir ?",
    answers: [
      { label: "Parce que j’oriente les flux et les comportements invisiblement", type: "passive", difficulty: 6, baseImpact: 15, feedback: "Votre maîtrise est invisible et robuste." },
      { label: "Parce que je contrôle directement chaque décision", type: "direct", difficulty: 9, baseImpact: -5, feedback: "Trop visible : succès partiel mais instabilité latente." },
      { label: "Parce que je manipule la perception des autres", type: "direct", difficulty: 8, baseImpact: 10, feedback: "Manipulation efficace mais effort risqué." },
      { label: "Parce que je ne fais rien et laisse le système vivre", type: "passive", difficulty: 5, baseImpact: 5, feedback: "La passivité conserve le pouvoir par inertie." }
    ]
  }
];


// Variables globales
let currentQuestion = 0;
let stability = 50; // score de départ
let ghosts = []; // effets invisibles persistants
const totalQuestions = questionsData.length;

// Fonction pour calculer la réussite
function calculateOutcome(answer) {
    // base de réussite
    let chance = 100 - answer.difficulty * 10; // difficulté 1-10
    if(answer.type === "direct") chance -= 10;  // actions directes plus risquées
    if(answer.type === "passive") chance += 10;  // actions passives plus sûres
    if(answer.type === "ressource") chance += 0; // neutre

    // ajout de hasard
    let roll = Math.random() * 100;

    if(roll <= chance) return "success";
    else if(roll <= chance + 10) return "partial";
    else return "fail";
}

// Fonction pour appliquer l’impact et gérer les ghosts
function applyImpact(answer, outcome) {
    let impact = answer.baseImpact;

    // modificateurs selon l'issue
    switch(outcome) {
        case "success":
            stability += impact;
            ghosts.push({ type: answer.type, effect: "positive", strength: impact/2 });
            break;
        case "partial":
            stability += impact/2;
            ghosts.push({ type: answer.type, effect: "neutral", strength: impact/4 });
            break;
        case "fail":
            stability -= Math.abs(impact);
            ghosts.push({ type: answer.type, effect: "negative", strength: Math.abs(impact)/2 });
            break;
    }

    // bornes
    if(stability > 100) stability = 100;
    if(stability < 0) stability = 0;
}

// Fonction pour générer le feedback final
function generateFeedback(answer, outcome) {
    let ghostText = ghosts.length > 0 ? `Ghosts persistants : ${ghosts.length}` : "";
    let outcomeText = "";

    switch(outcome) {
        case "success":
            outcomeText = "✅ Succès : " + answer.feedback;
            break;
        case "partial":
            outcomeText = "⚠️ Succès partiel : " + answer.feedback;
            break;
        case "fail":
            outcomeText = "❌ Échec : " + answer.feedback;
            break;
    }

    return `${outcomeText}\n${ghostText}\nScore de stabilité actuel : ${stability}`;
}

// Fonction pour traiter une réponse
function answerQuestion(answerIndex) {
    const question = questionsData[currentQuestion];
    const answer = question.answers[answerIndex];

    const outcome = calculateOutcome(answer);
    applyImpact(answer, outcome);
    const feedbackText = generateFeedback(answer, outcome);

    // afficher le feedback
    document.getElementById("feedback").innerText = feedbackText;

    // passer à la question suivante après délai
    currentQuestion++;
    if(currentQuestion < totalQuestions) {
        setTimeout(() => renderQuestion(currentQuestion), 2000);
    } else {
        setTimeout(() => showFinalScreen(), 2000);
    }
}

// Fonction pour afficher une question
function renderQuestion(index) {
    const question = questionsData[index];
    document.getElementById("question-text").innerText = question.text;
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    question.answers.forEach((a, i) => {
        const btn = document.createElement("button");
        btn.innerText = a.label;
        btn.onclick = () => answerQuestion(i);
        answersContainer.appendChild(btn);
    });
}

// Écran final selon stabilité
function showFinalScreen() {
    let endText = "";
    if(stability > 70) endText = "Stabilité maximale : Votre système est solide et invisible.";
    else if(stability > 40) endText = "Stabilité moyenne : Le système tient mais attention aux ghost persistants.";
    else endText = "Implosion : Le système s’effondre, les ghosts prennent le contrôle.";

    document.getElementById("main").innerHTML = `<h1>${endText}</h1><p>Ghosts actifs : ${ghosts.length}</p>`;
}

// Initialisation
renderQuestion(currentQuestion);
