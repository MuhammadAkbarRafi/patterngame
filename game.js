var gamePattern = [];
var userClickedPattern = [];
var level = 0,
  start = 0;
var buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").click(function () {
  if (start === 1) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress("." + userChosenColor, "pressed", 50);
    console.log(checkAnswer(userClickedPattern.length - 1));
  }
});

$(document).on("keypress", function (event) {
  if (event.key === "a") {
    if (start === 0) {
      start = 1;
      nextSequence();
    }
  }
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentElement, className, time) {
  $(currentElement).addClass(className);
  setTimeout(() => {
    $(currentElement).removeClass(className);
  }, time);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text("GameOver, press a to restart.");
    animatePress("body", "game-over", 200);
    playSound("wrong");
    start = 0;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
  }
}
