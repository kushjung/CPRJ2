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