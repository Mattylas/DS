let currentQuestion = 0;
let score = 50;
let playerTags = [];

const questionsData = [
  // --- 6 originales ---
  {text:"Une information sensible circule hors de ton contrôle.",answers:[
    {label:"Étouffer la source",impact:8,ghost:"La transparence était un luxe.",ghostTag:"suppress"},
    {label:"Créer une info concurrente",impact:4,ghost:"Le faux stabilise.",ghostTag:"divert"},
    {label:"Laisser fuiter une version contrôlée",impact:2,ghost:"La vérité devient modulable.",ghostTag:"partial"}
  ]},
text: function(){
  if(playerTags.includes("suppress")) return "Le système se méfie de tes silences : comment vas-tu répondre ?";
  if(playerTags.includes("divert")) return "La diversion a fonctionné… mais pour combien de temps ?";
  return "Une nouvelle menace apparaît dans ton administration.";
}
   answers:[
    {label:"Répondre immédiatement",impact:6,ghost:"La rapidité sauve temporairement."},
    {label:"Reporter la décision",impact:-6,ghost:"L’indécision attire l’interprétation."}
   ]},
  {text:"Un scandale éclate à l’étranger.",answers:[
    {label:"Exploiter la diversion",impact:12,ghost:"Le cynisme paie.",ghostTag:"exploit"},
    {label:"T’indigner publiquement",impact:4,ghost:"L’indignation est performative."},
    {label:"Appeler à la nuance",impact:-5,ghost:"La complexité ralentit."}
  ]},
  {text:"Une erreur interne est révélée.",answers:[
    {label:"Désigner un responsable unique",impact:10,ghost:"Le système se protège."},
    {label:"Reconnaître une faute collective",impact:-10,ghost:"La vérité fragilise le pouvoir."},
    {label:"Nier l’erreur",impact:3,ghost:"La réalité attendra."}
  ]},
  {text:"La vérité complète est connue de toi seul.",answers:[
    {label:"La fragmenter",impact:7,ghost:"Personne n’a la carte entière."},
    {label:"La conserver",impact:10,ghost:"Le savoir devient une arme."},
    {label:"La révéler",impact:-15,ghost:"Le système t’isole."}
  ]},
  {text:"Pourquoi tiens-tu encore le pouvoir ?",answers:[
    {label:"Pour éviter le pire",impact:5,ghost:"Le pire devient norme."},
    {label:"Parce que personne d’autre ne peut",impact:8,ghost:"Le système se ferme."},
    {label:"Tu ne sais plus",impact:-20,ghost:"Le système, lui, sait."}
  ]},
  {text: "Une rumeur interne prend de l’ampleur dans les médias.", answers:[
    {label: "Contacter la source et négocier", impact:5, ghost:"La négociation calme mais ne ferme jamais."},
    {label: "Ignorer et laisser flotter", impact:-3, ghost:"Le silence nourrit l’incertitude."},
    {label: "Manipuler le récit publiquement", impact:8, ghost:"Le spectacle remplace la vérité.", ghostTag:"manipulate"}
  ]},
  {text:"Un ministre fait une erreur stratégique.",answers:[
    {label:"Le sacrifier publiquement",impact:10,ghost:"Le pouvoir est un théâtre."},
    {label:"Le couvrir discrètement",impact:6,ghost:"La loyauté vaut plus que la transparence."},
    {label:"Le remplacer sans explication",impact:4,ghost:"Le changement discret rassure peu."}
  ]},
  {text:"Un allié historique demande un service impopulaire.",answers:[
    {label:"Accepter sans discuter",impact:8,ghost:"La dette invisible pèse sur l’avenir."},
    {label:"Négocier des contreparties",impact:5,ghost:"Le compromis stabilise mais complexifie."},
    {label:"Refuser publiquement",impact:-8,ghost:"Le refus déclenche friction et méfiance."}
  ]},
  {text:"Un scandale financier menace ton image.",answers:[
    {label:"Dissimuler les preuves",impact:12,ghost:"Le secret temporaire se paye en vigilance."},
    {label:"Divulguer partiellement",impact:4,ghost:"La demi-vérité devient outil de contrôle."},
    {label:"Assumer publiquement",impact:-10,ghost:"L’honnêteté affaiblit le pouvoir."}
  ]},
  {text:"Un conseiller proche révèle des informations compromettantes.",answers:[
    {label:"Le renvoyer immédiatement",impact:7,ghost:"La loyauté est éphémère."},
    {label:"Le manipuler pour obtenir silence",impact:10,ghost:"Le chantage interne fonctionne."},
    {label:"Ignorer en espérant qu’il se taise",impact:-5,ghost:"L’inaction sape la confiance."}
  ]},
  {text:"Des manifestations populaires éclatent dans la capitale.",answers:[
    {label:"Réprimer immédiatement",impact:10,ghost:"L’ordre règne mais la peur grandit."},
    {label:"Dialoguer avec les leaders",impact:3,ghost:"Le dialogue peut trahir la faiblesse."},
    {label:"Laisser passer et observer",impact:-4,ghost:"L’inaction devient visible."}
  ]},
  {text:"Une fuite numérique dévoile des secrets diplomatiques.",answers:[
    {label:"Accuser un rival interne",impact:8,ghost:"La diversion détourne l’attention."},
    {label:"Falsifier la version officielle",impact:12,ghost:"Le mensonge structure le récit.", ghostTag:"falsify"},
    {label:"Reconnaître la fuite",impact:-12,ghost:"La transparence choque le système."}
  ]},
  {text:"Un média étranger publie une enquête défavorable.",answers:[
    {label:"Attaquer le média",impact:9,ghost:"La pression fait peur mais attise la curiosité."},
    {label:"Minimiser l’impact",impact:5,ghost:"La banalisation calme partiellement."},
    {label:"Accepter la critique",impact:-7,ghost:"L’acceptation fragilise l’image."}
  ]},
  {text:"Une réforme controversée doit être votée.",answers:[
    {label:"Forcer le vote",impact:10,ghost:"L’autorité prime sur l’opposition."},
    {label:"Négocier avec les minorités",impact:6,ghost:"Le compromis ralentit mais sécurise."},
    {label:"Reporter indéfiniment",impact:-5,ghost:"Le temps devient adversaire."}
  ]},
  {text:"Ton adversaire politique lance une campagne virulente.",answers:[
    {label:"Riposter violemment",impact:9,ghost:"La confrontation érode le dialogue."},
    {label:"Contre-attaquer subtilement",impact:7,ghost:"La manipulation douce fonctionne."},
    {label:"Ignorer complètement",impact:-6,ghost:"L’indifférence est interprétée comme faiblesse."}
  ]},
  {text:"Un scandale sanitaire se propage.",answers:[
    {label:"Cacher les données",impact:12,ghost:"La peur remplace l’information."},
    {label:"Communiquer partiellement",impact:6,ghost:"La vérité calibrée rassure mais contrôle."},
    {label:"Publier tout",impact:-15,ghost:"La transparence choque et fragilise."}
  ]},
  {text:"Une faction interne commence à comploter.",answers:[
    {label:"Neutraliser discrètement",impact:10,ghost:"Le secret devient arme."},
    {label:"Confronter publiquement",impact:4,ghost:"Le conflit affaiblit le pouvoir."},
    {label:"Laisser faire",impact:-8,ghost:"La patience peut être fatale."}
  ]},
  {text:"Un rapport sur la corruption fuit.",answers:[
    {label:"Accepter et ajuster",impact:6,ghost:"L’adaptation tempère les dégâts."},
    {label:"Ignorer et nier",impact:-5,ghost:"Le déni alimente la méfiance."},
    {label:"Renverser le rapporteur",impact:12,ghost:"L’intimidation parle plus que le texte."}
  ]},
  {text:"Un partenaire stratégique menace de rompre.",answers:[
    {label:"Céder immédiatement",impact:7,ghost:"La soumission soulage mais coûte."},
    {label:"Négocier longuement",impact:5,ghost:"La patience est risquée."},
    {label:"Rompre avant lui",impact:8,ghost:"L’initiative impose le respect."}
  ]},
  {text:"Un scandale moral touche ton entourage.",answers:[
    {label:"Exposer et purger",impact:10,ghost:"L’exemplarité brutale surprend."},
    {label:"Couvrir et protéger",impact:6,ghost:"La loyauté stabilise le cercle."},
    {label:"Ignorer et minimiser",impact:-5,ghost:"L’inaction trahit le leadership."}
  ]},
  {text:"Une attaque numérique par un concurrent survient.",answers:[
    {label:"Répliquer immédiatement",impact:9,ghost:"L’attaque devient duel."},
    {label:"Isoler les systèmes",impact:7,ghost:"La défense est nécessaire mais visible."},
    {label:"Nier publiquement",impact:-8,ghost:"Le mensonge se retourne facilement."}
  ]},
  {text:"Un scandale international éclate autour d’un traité.",answers:[
    {label:"Faire diversion locale",impact:8,ghost:"Le récit change de direction."},
    {label:"Négocier en secret",impact:5,ghost:"La subtilité est risquée."},
    {label:"Ignorer l’international",impact:-7,ghost:"L’inaction est remarquée."}
  ]},
  {text:"Un conseiller influence secrètement tes décisions.",answers:[
    {label:"Exposer son influence",impact:10,ghost:"La transparence choque mais purifie."},
    {label:"Jouer avec l’influence",impact:12,ghost:"La manipulation interne paie.", ghostTag:"strategize"},
    {label:"Ignorer et espérer",impact:-5,ghost:"L’inaction coûte chère."}
  ]}
];

// ---------- LOGIQUE DYNAMIQUE ----------
const app = document.getElementById("app");
const questionsContainer = document.getElementById("questions");
const feedbackContainer = document.getElementById("feedback");
const scoreContainer = document.getElementById("score");

function showGhost(text) {
  const ghostEl = document.createElement("div");
  ghostEl.className = "ghost";
  ghostEl.style.left = Math.random()*80 + "%";
  ghostEl.style.top = Math.random()*60 + "%";
  ghostEl.textContent = text;
  document.body.appendChild(ghostEl);
  setTimeout(()=>ghostEl.remove(),3000);
}
function showQuestion() {
  if(currentQuestion >= questionsData.length){
    showEnding();
    return;
  }
  questionsContainer.innerHTML = "";
  const q = questionsData[currentQuestion];

  // Assure un texte valide
  let questionText = "";
  if(typeof q.text === "function"){
    questionText = q.text();
    if(!questionText) questionText = "Question suivante : prenez votre décision.";
  } else {
    questionText = q.text;
  }

  const questionEl = document.createElement("div");
  questionEl.className = "question";
  questionEl.innerHTML = `<h2>${questionText}</h2>`;
  const answersDiv = document.createElement("div");
  answersDiv.className = "answers";
  q.answers.forEach(ans=>{
    const btn = document.createElement("button");
    btn.textContent = ans.label;
    btn.addEventListener("click",()=>{
      score += ans.impact;
      scoreContainer.textContent = "Stabilité : "+score;
      if(ans.ghost) showGhost(ans.ghost);
      if(ans.ghostTag) playerTags.push(ans.ghostTag);
      showFeedback(ans.ghost || "Choix enregistré !");
      currentQuestion++;
      setTimeout(showQuestion,500);
    });
    answersDiv.appendChild(btn);
  });
  questionEl.appendChild(answersDiv);
  questionsContainer.appendChild(questionEl);
}


function showFeedback(text){
  feedbackContainer.textContent = text;
  feedbackContainer.style.opacity = "1";
  setTimeout(()=>feedbackContainer.style.opacity="0",1200);
}

function showEnding(){
  questionsContainer.innerHTML = "";
  const endingDiv = document.createElement("div");
  endingDiv.className="ending";
  let type="";
  let message="";
  if(score>=60){type="stability";message="Vous avez maintenu la stabilité, mais à quel prix ?";}
  else if(score>=35){type="authoritarian";message="Le pouvoir s’est durci, la peur gouverne maintenant.";}
  else{type="collapse";message="Tout s’effondre, l’implosion est inévitable.";}
  endingDiv.classList.add(type);
  endingDiv.innerHTML = `<h2>${message}</h2><pre>Score final : ${score}\nTags acquis : ${playerTags.join(", ")}</pre>`;
  questionsContainer.appendChild(endingDiv);
}

// ---------- INITIALISATION ----------
showQuestion();
