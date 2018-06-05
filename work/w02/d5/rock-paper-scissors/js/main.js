/*----- constants -----*/
const lookupRPS = ['r', 'p', 's'];

const rps = {
  r: {
    beats: 's',
    imgUrl: 'https://png.icons8.com/metro/800/rock.png'
  },
  p: {
    beats: 'r',
    imgUrl: 'https://png.icons8.com/metro/800/paper.png'
  },
  s: {
    beats: 'p',
    imgUrl: 'https://png.icons8.com/metro/800/scissors.png'
  }
};

var beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
var shootAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');

/*----- app's state (variables) -----*/
var scores, results, winner;

/*----- cached element references -----*/
var pScoreEl = document.querySelector('#player h2');
var cScoreEl = document.querySelector('#computer h2');
var tScoreEl = document.querySelector('#middle h2');

var pResultEl = document.querySelector('#player div div');
var cResultEl = document.querySelector('#computer div div');

var countdownEl = document.querySelector('#middle div');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', playHand);

/*----- functions -----*/

function playHand() {
  doCountdown(shoot);
}

function doCountdown(cb) {
  var count = 3;
  beepAudio.play();
  countdownEl.textContent = count;
  countdownEl.style.border = '4px solid black';
  var timerId = setInterval(function() {
    count--;
    if (count) {
      beepAudio.play();
      countdownEl.textContent = count;
    } else {
      clearInterval(timerId);
      shootAudio.play();
      countdownEl.textContent = '';
      countdownEl.style.border = '4px solid white';
      cb();
    }
  }, 1000);
}

function shoot() {
  results.p = lookupRPS[getRandomBetween(0, 2)];
  results.c = lookupRPS[getRandomBetween(0, 2)];
  winner = getWinner();
  scores[winner]++;
  render();
}

function getWinner() {
  return results.p === results.c ?
    't'
  :
    rps[results.p].beats === results.c ? 'p' : 'c';
}

function render() {
  pScoreEl.textContent = scores.p;
  cScoreEl.textContent = scores.c;
  tScoreEl.textContent = scores.t;
  pResultEl.style.backgroundImage = `url(${rps[results.p].imgUrl})`;
  cResultEl.style.backgroundImage = `url(${rps[results.c].imgUrl})`;
  pResultEl.parentElement.style.border = winner === 'p' ? '10px solid darkgrey' : '10px solid white';
  cResultEl.parentElement.style.border = winner === 'c' ? '10px solid darkgrey' : '10px solid white';
}

function initialize() {
  scores = {
    p: 0,
    c: 0,
    t: 0
  };
  results = {
    p: 'r',
    c: 'r'
  };
  winner = null;
  render();
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

initialize();

