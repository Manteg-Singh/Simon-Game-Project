buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = []

var isStarted = false;
var title = document.getElementById('level-title');
var level = 0;
if(level==0)
title.innerHTML = "Press A Key to Start";

if(!isStarted){
    document.addEventListener("keydown", (event) => {
        level=0;
        document.removeEventListener("keydown",()=>{});
        gamePattern=[];
        setTimeout(() => {
        nextSequence();
        }, 500);
      });
    isStarted = true;
}

// Helper Functions

function nextSequence() {
  userClickedPattern=[];
  level++;
  title.innerHTML = "Level "+level;
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  pressButton(randomChosenColour);
  playSound(randomChosenColour);
  
}

for(var i=0;i<4;i++){
    var btn = document.getElementById(buttonColours[i]);
    btn.addEventListener('click',function (event){
        handler(event);
    });
}
function handler(event){
    var userChosenColor = event.target.classList[1];
    userClickedPattern.push(userChosenColor);
    pressButton(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}

function playSound(chosenBtn){
    var audioChosen = new Audio("./sounds/"+chosenBtn + ".mp3");
    audioChosen.play();
}

function pressButton(chosenColour){
    var chosenBtn = document.getElementById(chosenColour);
    chosenBtn.classList.add("pressed");
    setInterval(() => {
        chosenBtn.classList.remove("pressed");
    }, 150);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

        if(userClickedPattern.length == gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 500);
        playSound("wrong");
        title.innerHTML = "Game Over, Press Any Key to Restart";
        isStarted = false;
    }
}


