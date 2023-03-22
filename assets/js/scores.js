//Function for highscores
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores"));
  highscores.forEach(function (score) {
    var list = document.createElement("li");
    list.textContent = score.initials + " - " + score.score;
    var highscoreA = document.getElementById("highscores");
    highscoreA.innerHTML += list.outerHTML;
  });
}

// function to clear the highscores
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

printHighscores();
