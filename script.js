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
