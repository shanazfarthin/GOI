let currentTile = 1;
let score = 0;
let totalQuestions = 5;
let selectedAnswers = {};
let currentQuizQuestions = [];

const allQuestions = [
  {
    q: "According to the speaker, what is a common misconception in the Western world about China's leadership?",
    a: [
      "It is entirely democratic",
      "It is highly meritocratic",
      "Everything done in China is popular",
      "The system is based on public voting"
    ],
    correct: 1
  },
  {
    q: "What is the Harvard Ministerial Leadership Program?",
    a: [
      "A political science course",
      "A leadership course for youth",
      "A program to enhance ministers' leadership skills",
      "A business development workshop"
    ],
    correct: 2
  },
  {
    q: "What is 'fluid intelligence' according to Professor Arthur Brooks?",
    a: [
      "The ability to guide and teach",
      "Creativity and long-term memory",
      "The ability to innovate and quickly learn",
      "The ability to socialize effectively"
    ],
    correct: 2
  },
  {
    q: "What is a key problem ministers face regarding 'true north' or 'legacy goals'?",
    a: [
      "Too many resources",
      "Clear prioritization",
      "Confusion in prioritization",
      "Frequent audits"
    ],
    correct: 2
  },
  {
    q: "What is adaptive leadership?",
    a: [
      "Keeping the status quo",
      "Guiding people through change",
      "Firing people quickly",
      "Making laws"
    ],
    correct: 1
  }
];

// No shuffle function needed now

function renderQuiz() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";
  selectedAnswers = {};
  score = 0;

  // Use allQuestions as is (no shuffle)
  currentQuizQuestions = allQuestions.slice(0, totalQuestions);

  currentQuizQuestions.forEach((item, i) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p><strong>Q${i + 1}:</strong> ${item.q}</p>`;
    item.a.forEach((opt, j) => {
      qDiv.innerHTML += `
        <label>
          <input type="radio" name="q${i}" value="${j}" onchange="selectAnswer(${i}, this.value)"> ${opt}
        </label><br>
      `;
    });
    quizContainer.appendChild(qDiv);
  });
}

function selectAnswer(qIndex, selected) {
  selectedAnswers[qIndex] = Number(selected); // convert string to number
}

function submitQuiz() {
  let correctCount = 0;

  for (let i = 0; i < currentQuizQuestions.length; i++) {
    const correctIndex = currentQuizQuestions[i].correct;
    const selected = selectedAnswers[i];
    if (selected !== undefined && selected === correctIndex) {
      correctCount++;
    }
  }

  let percent = Math.round((correctCount / totalQuestions) * 100);
  const feedback = document.getElementById("quiz-feedback");
  feedback.textContent = `You scored ${correctCount}/${totalQuestions} (${percent}%)`;
  feedback.style.color = percent >= 85 ? "green" : "red";

  document.getElementById("retry-btn").classList.remove("hidden");
  if (percent >= 85) {
    document.getElementById("quiz-next-btn").classList.remove("hidden");
  }

  document.getElementById("score-result").textContent = `You passed with ${percent}%!`;
}

function retryQuiz() {
  document.getElementById("quiz-feedback").textContent = "";
  document.getElementById("retry-btn").classList.add("hidden");
  document.getElementById("quiz-next-btn").classList.add("hidden");
  
}renderQuiz();

function nextTile(tileNumber) {
  document.getElementById(`tile${currentTile}`).classList.add("hidden");
  document.getElementById(`tile${tileNumber}`).classList.remove("hidden");
  currentTile = tileNumber;
  if (tileNumber === 7) renderQuiz();
}

function submitReflection() {
  const reflection = document.getElementById("reflection").value;
  const output = document.getElementById("reflection-output");
  const linkDiv = document.getElementById("resources-link");

  if (reflection.trim() === "") {
    output.textContent = "Please write your legacy goal before submitting.";
    output.style.color = "red";
    linkDiv.classList.add("hidden");
  } else {
    output.textContent = `Thank you for sharing, have a wonderful day and keep leading with purpose!`;
    output.style.color = "green";
    linkDiv.classList.remove("hidden");
  }
}
