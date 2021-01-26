var buttonColour = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function()
{
   if(!started)
  {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function ()
{
  var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel)
{

  if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
  {
   if(userClickedPattern.length === gamePattern.length)
   {
     setTimeout(function ()
   {nextsequence();
   },1000);
   }
 }
 else{

   playSound("wrong");

   $("body").addClass("game-over");
   $("#level-title").text("game over,press any key to restart the game");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
          startOver();
 }

}

function nextsequence()
{
   userClickedPattern = [];
  level++;
  $("#level-title").text("Level-" + level);
  var randnumber =  Math.floor(Math.random()*4);
  var randomChosenColour = buttonColour[randnumber];
  gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}
function animatePress(currentcolour)
{
  $("#" + currentcolour).addClass("pressed");

  setTimeout(function()
{$("#" + currentcolour).removeClass("pressed");
},100);
}
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
