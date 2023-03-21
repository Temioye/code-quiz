var currentQuestionIndex = 0;
var time = 60;
var timerId;
var penalty = 10;

// DOM elements variables
var questionsA = document.getElementById("questions");
var timerA = document.getElementById("time");
var choicesA = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsA = document.getElementById("initials");
var feedbackA = document.getElementById("feedback");
var endScreen = document.getElementById("end-screen");
var startScreen = document.getElementById("start-screen");
var finalScore = document.getElementById("final-score");
var questionTitle = document.getElementById("question-title");

// Function to reduce time by one second
function tick() {
  time--;
  timerA.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

startBtn.onclick = startQuiz;

// function to start quiz, timer and hide start screen
function startQuiz() {
  startScreen.setAttribute("class", "hide");
  questionsA.removeAttribute("class");

  timerId = setInterval(countdown, 1000);
  timerA.textContent = time;
  getQuestion();
}

// Function to get questions
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.questions;
  choicesA.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var optionBtn = document.createElement("button");
    optionBtn.setAttribute("class", "choice");
    optionBtn.setAttribute("value", choice);
    optionBtn.textContent = i + 1 + ". " + choice;
    optionBtn.onclick = questionClick;
    choicesA.appendChild(optionBtn);
  });
}

// function for audio
var correctAudio = new Audio("./assets/sfx/correct.wav");
var incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    // function for right or wrong answers
    timerA.textContent = time;
    feedbackA.textContent = "Wrong!";
    incorrectAudio.play();
  } else {
    feedbackA.textContent = "Correct!";
    correctAudio.play();
  }
  feedbackA.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackA.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

// funtion to end quiz
function quizEnd() {
  clearInterval(timerId);
  endScreen.removeAttribute("class");

  finalScore.textContent = time;
  questionsA.setAttribute("class", "hide");
}

function countdown() {
  time--;
  timerA.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

// Function to save scores
function saveScore() {
  var initials = initialsA.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}
