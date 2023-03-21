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
