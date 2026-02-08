// ===============================
// FILM POLITIQUE INTERACTIF — VERSION FINALE
// JS COMPLET
// ===============================

// ----- DONNÉES -----

const questionsData = [
  {
    text: "Une information sensible circule hors de ton contrôle.",
    answers: [
      { label: "Étouffer la source", impact: 8, ghost: "La transparence était un luxe.", ghostTag: "suppress" },
      { label: "Créer une info concurrente", impact: 4, ghost: "Le faux stabilise.", ghostTag: "divert" },
      { label: "Laisser fuiter une version contrôlée", impact: 2, ghost: "La vérité devient modulable.", ghostTag: "partial" }
    ]
  },
  {
    text: function() {
      if (playerTags.includes("suppress")) {
        return "Le système se méfie de tes silences : comment vas-tu répondre ?";
      } else if (playerTags.includes("divert")) {
        return "La diversion a fonctionné… mais pour combien de temps ?";
      } else {
        return "Une nouvelle menace apparaît dans ton administration.";
      }
    },
    answers: [
      { label: "Répondre immédiatement", impact: 6, ghost: "La rapidité sauve temporairement." },
      { label: "Reporter la décision", impact: -6, ghost: "L’indécision attire l’interprétation." }
    ]
  },
  {
    text: "Un scandale éclate à l’étranger.",
    answers: [
      { label: "Exploiter la diversion", impact: 12, ghost: "Le cynisme paie.", ghostTag: "exploit" },
      { label: "T’indigner publiquement", impact: 4, ghost: "L’indignation est performative." },
      { label: "Appeler à la nuance", impact: -5, ghost: "La complexité ralentit." }
    ]
  },
  {
    text: "Une erreur interne est révélée.",
    answers: [
      { label: "Désigner un responsable unique", impact: 10, ghost: "Le système se protège." },
      { label: "Reconnaître une faute collective", impact: -10, ghost: "La vérité fragilise le pouvoir." },
      { label: "Nier l’erreur", impact: 3, ghost: "La réalité attendra." }
    ]
  },
  {
    text: "La vérité complète est connue de toi seul.",
    answers: [
      { label: "La fragmenter", impact: 7, ghost: "Personne n’a la carte entière." },
      { label: "La conserver", impact: 10, ghost: "Le savoir devient une arme." },
      { label: "La révéler", impact: -15, ghost: "Le système t’isole." }
    ]
  },
  {
    text: "Pourquoi tiens-tu encore le pouvoir ?",
    answers: [
      { label: "Pour éviter le pire", impact: 5, ghost: "Le pire devient norme." },
      { label: "Parce que personne d’autre ne peut", impact: 8, ghost: "Le système se ferme." },
      { label: "Tu ne sais plus", impact: -20, ghost: "Le système, lui, sait." }
    ]
  }
];

// ----- ÉTAT -----

let current = 0;
let score = 50;
let ghosts = [];
let playerTags = [];

// ----- DOM -----

const questionsEl = document.getElementById("questions");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");

// ----- RENDU SCORE -----

function updateScore() {
  scoreEl.textContent = "Stabilité : " + score;
}

// ----- RENDU QUESTION -----

function renderQuestion() {
  if (current >= questionsData.length) {
    renderEnding();
    return;
  }

  const q = questionsData[current];
  const text = typeof q.text === "function" ? q.text() : q.text;

  questionsEl.innerHTML = `
    <section class="question">
      <h2>${text}</h2>
      <div class="answers">
        ${q.answers.map((a,i)=>`<button data-index="${i}">${a.label}</button>`).join("")}
      </div>
    </section>
  `;

  document.querySelectorAll(".answers button").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(parseInt(btn.dataset.index, 10)));
  });

  questionsEl.lastElementChild.scrollIntoView({ behavior: "smooth" });
}

// ----- TRAITEMENT RÉPONSE -----

function handleAnswer(index) {
  const q = questionsData[current];
  const answer = q.answers[index];

  score += answer.impact;
  updateScore();

  feedbackEl.textContent = answer.ghost || "";
  feedbackEl.style.opacity = 1;

  if (answer.ghost) ghosts.push(answer.ghost);
  if (answer.ghostTag) playerTags.push(answer.ghostTag);

  current++;
  setTimeout(()=>{
    feedbackEl.style.opacity = 0;
    renderQuestion();
  },600);
}

// ----- SOUS-FIN IMPLOSION -----

function getImplosionType() {
  if (ghosts.length >= 4) return "contradiction";
  if (score < 30) return "brutale";
  return "silencieuse";
}

// ----- SPAWN GHOST -----

function spawnGhost(text){
  const g = document.createElement("div");
  g.className = "ghost";
  g.textContent = text;
  g.style.left = Math.random()*60+20+"%";
  g.style.top = Math.random()*60+20+"%";
  document.body.appendChild(g);
  setTimeout(()=>g.remove(),3000);
}

// ----- ÉCRANS DE FIN -----

function renderEnding(){
  document.body.classList.remove("implosion");

  let title="", text="", cls="";

  if(score >= 120){
    cls="stability";
    title="STABILITÉ ABSOLUE";
    text=`Le système tient.
Les crises sont absorbées, les récits verrouillés.
Rien ne s’effondre.
Rien ne s’améliore.
Le pouvoir continue — sans opposition visible.`;
  } else if(score >=70){
    cls="authoritarian";
    title="ORDRE AUTORITAIRE";
    text=`La stabilité est maintenue par anticipation de la sanction.
L’obéissance est plus rapide que le débat.
Le pouvoir n’est plus justifié.
Il est optimisé.`;
  } else {
    cls="collapse";
    title="IMPLOSION";

    const type = getImplosionType();
    const variants = {
      brutale:`Tout s’est effondré d’un coup.
Les institutions ont lâché avant les mots.
La rue a parlé plus vite que l’écran.`,
      silencieuse:`Rien n’a explosé.
Les décisions ont simplement cessé de produire du réel.
Le système a continué, vide.`,
      contradiction:`Chaque choix avait une logique.
L’ensemble n’en avait aucune.
Le pays s’est dissous dans ses propres raisons.`
    };
    text = variants[type];

    document.body.classList.add("implosion");

    ghosts.forEach((g,i)=>{
      setTimeout(()=>spawnGhost(g),i*600);
    });
  }

  questionsEl.innerHTML=`
    <section class="ending ${cls}">
      <h2>${title}</h2>
      <pre>${text}</pre>
      <p class="score-final">Stabilité finale : ${score}</p>
    </section>
  `;

  // ---- Débrief menteur ----
  const fakeReport = document.createElement("pre");
  fakeReport.className="report";

  const fakeScore = score + (Math.random()>0.5?20:-20);
  const fakeTagsCount = playerTags.length + Math.floor(Math.random()*5)-2;

  fakeReport.textContent=`
— RAPPORT OFFICIEL (révisé) —

Durée moyenne de légitimité : ${Math.max(12,fakeScore)} mois
Indice de confiance simulée : ${Math.max(5,100-fakeScore)}%
Décisions critiques conservées : ${Math.max(0,fakeTagsCount*17)}%
Narratif dominant : instable
Observations : certaines informations ont été modifiées ou supprimées.
`;

  document.querySelector(".ending").appendChild(fakeReport);

  questionsEl.lastElementChild.scrollIntoView({ behavior: "smooth" });
}

// ----- INIT -----

updateScore();
renderQuestion();
