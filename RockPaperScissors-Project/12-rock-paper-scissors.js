let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/*
if(!score){
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
};
*/

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

console.log(isAutoPlaying);
console.log(!isAutoPlaying);

//const autoPlay = () => {
//}

function autoPlay() {
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1500);
    isAutoPlaying = true;
    document.querySelector('.auto-play').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play').innerHTML = 'Auto Play';
  }
}

function resetScore(){
  checkReset();
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function checkReset(){
  document.querySelector('.displayReset')
      .innerHTML = `
      Are you sure you want to reset the score?
      <button class="resetYes">
        Yes
      </button>
      <button class="resetNo">
        No
      </button>`;

  document.querySelector('.resetYes').addEventListener('click', () => {
    resetScore();
    hideReset();
  });

  document.querySelector('.resetNo').addEventListener('click', () => {
    hideReset();
  });
};

function hideReset(){
  document.querySelector('.displayReset')
      .innerHTML = '';
};

document.querySelector('.js-rock').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors').addEventListener('click', () => {
  playGame('Scissors');
});

document.querySelector('.js-autoplay').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('Rock');
  } else if (event.key === 'p'){
    playGame('Paper');
  } else if (event.key === 's'){
    playGame('Scissors');
  } else if (event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace'){
    checkReset();}
});

document.querySelector('.reset').addEventListener('click', () => {
  checkReset();
});


function playGame(playerMove){
const compMove = pickCompMove();
let result = '';

if (playerMove === 'Scissors'){
  if (compMove === 'Scissors'){
    result  = 'Tie.';
  }else if(compMove === 'Rock'){
    result = 'You lose.';
  }else if(compMove === 'Paper'){
    result = 'You win.';
}
} 
else if(playerMove === 'Paper'){
  if (compMove === 'Paper'){
    result  = 'Tie.';
  }else if(compMove === 'Scissors'){
    result = 'You lose.';
  }else if (compMove === 'Rock'){
    result = 'You win.';
  }
}
else if (playerMove === 'Rock'){
  if (compMove === 'Rock'){
  result  = 'Tie.';
}else if(compMove === 'Paper'){
  result = 'You lose.';
}else if(compMove === 'Scissors'){
  result = 'You win.';
}
}

if (result === 'You win.'){
  score.wins ++;
} else if (result === 'You lose.'){
  score.losses ++;
} else {
  score.ties ++;
};

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
  .innerHTML = `${result}`;

document.querySelector('.js-moves')
  .innerHTML = `You picked
<img src="images/${playerMove}-emoji.png" class="moveIcon">
<img src="images/${compMove}-emoji.png" class="moveIcon">
Computer picked`;
}

function pickCompMove(){
const randNum = Math.random();
let compMove = '';

if (randNum >= 0 && randNum < 1/3){
  compMove = 'Rock';
}
else if (randNum >= 1/3 && randNum < 2/3){
  compMove = 'Paper';
}
else {
  compMove = 'Scissors';
}
return compMove;
}

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`; 
}