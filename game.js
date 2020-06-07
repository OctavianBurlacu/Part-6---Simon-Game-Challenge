var gamePattern = [];
var buttonColours = ["red", "blue" , "yellow", "green"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).keydown(function(){
  if(!gameStarted){
    $("#level-title").text("level" + " " + level);
    nextSequence();
    gameStarted = true;
  }
})

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var b = userClickedPattern.length - 1;
  checkAnswer(b);
})

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
}

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function nextSequence() {

  userClickedPattern = [];
  level++;

  $("#level-title").text("level" + " " + level);

  var randomNumber = Math.floor(Math.random() * 4 );
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){ $("#" + currentColour).removeClass("pressed"); }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
