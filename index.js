var gamePatern = []
var userClickedPattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow']
var level =  0;
var firstTime = true;
var randomChosenColour = nextSequence();

function nextSequence(){
    if (firstTime != true){
        var numSequence = Math.floor(Math.random() * 4);    
        gamePatern.push(buttonColours[numSequence]);
        console.log(gamePatern);

        $('#'+buttonColours[numSequence]).fadeOut();
        $('#'+buttonColours[numSequence]).fadeIn();
        playSound(buttonColours[numSequence])
        level++
        userClickedPattern = [];
        return numSequence
    }
    
}


$('div .btn').on ('click' , handler)

function handler(event){
    console.log(event.target.id)
    var userChosenColour = event.target.id

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length-1)
    
}
function playSound(name) {
    var soundName = 'sounds/' + name +'.mp3';
    var audio = new Audio(soundName)
    audio.play();
}
function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed');
    setTimeout(function() {
        $('.pressed').removeClass('pressed');
      }, 100);

}
$( "body" ).keypress(function() {
    if(firstTime === true){
        gamePatern =[];
        level = 0;
        console.log( $('#level-title').text() )
        firstTime = false;
        $('#level-title').text('Level '+ level)
        randomChosenColour = nextSequence();
    }
  });
  function checkAnswer(currentLevel){
        console.log(gamePatern +" gamePatern");
        console.log(userClickedPattern + " userPatern");
    
        if (userClickedPattern[userClickedPattern.length-1] === gamePatern[userClickedPattern.length-1]){
            console.log(userClickedPattern.length);
            console.log(gamePatern.length);
            if(userClickedPattern.length===gamePatern.length){
                $('#level-title').text('Level '+ level)
                nextSequence()
                console.log('next level')
            }
            } else if (userClickedPattern[userClickedPattern.length-1] != gamePatern[userClickedPattern.length-1]) {
                var audioWrong = new Audio('sounds/wrong.mp3')
                audioWrong.play();
                startOver();
                $('#level-title').text('Game Over, Press Any Key to Restart')
                $('body').addClass('game-over');
                setTimeout(function() {
                    $('.game-over').removeClass('game-over');
                }, 200);
        
            }
    
  }
  function startOver(){
    level = 0 ;
    gamePatern = [];
    userClickedPattern = [];
    firstTime = true;
  }