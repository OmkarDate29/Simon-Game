var gameColors = ["green", "red", "yellow", "blue"];
var level = 0;
var isStarted = true;
var storedGameSequence = [];
var userClickedSequence = [];

$(document).keydown(function () {
  if (isStarted === true) {
    setTimeout(() => {
      nextGameSequence();
    }, 300);

    isStarted = false;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedSequence.push(userChosenColour);

  playSound(userChosenColour);
  btnAnimation("#" + userChosenColour);

  checkSequence(userClickedSequence.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function btnAnimation(currentColor) {
  $(currentColor).addClass("pressed");

  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function nextGameSequence() {
  userClickedSequence = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = gameColors[randomNumber];
  storedGameSequence.push(randomColor);

  btnAnimation("#" + randomColor);
  playSound(randomColor);
}

function checkSequence(currentIndex) {
  if (userClickedSequence[currentIndex] === storedGameSequence[currentIndex]) {
    if (userClickedSequence.length === storedGameSequence.length) {
      setTimeout(function () {
        nextGameSequence();
      }, 1000);
    }
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startAgain();
  }
}

function startAgain() {
  level = 0;
  storedGameSequence = [];
  isStarted = true;
}
