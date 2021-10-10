'use strict';

const sectionP1 = document.querySelector('.player--0');
const sectionP2 = document.querySelector('.player--1');
const scoreP1 = document.querySelector('#score--0');
const scoreP2 = document.querySelector('#score--1');
const currentScoreP1 = document.querySelector('#current--0');
const currentScoreP2 = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdGameBtn = document.querySelector('.btn--hold');

let currentScore, activePlayer, totalScore, gameOver;

const init = function () {
    //set score of both players to 0 on load
    currentScore = 0;
    activePlayer = 0;
    totalScore = [0, 0];
    gameOver = false;
    scoreP1.textContent = 0;
    scoreP2.textContent = 0;
    currentScoreP1.textContent = 0;
    currentScoreP2.textContent = 0;
    diceImg.classList.add('hidden');
    sectionP1.classList.remove('player--winner');
    sectionP2.classList.remove('player--winner');
    sectionP1.classList.add('player--active');
    sectionP2.classList.add('player--active')
}
init();

const switchPlayer = function () {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer == 0 ? 1 : 0;

    sectionP1.classList.toggle('player--active');
    sectionP2.classList.toggle('player--active');
}

const rollDice = function () {
    if (!gameOver) {
        const diceValue = generateDiceNumber();
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${diceValue}.png`;

        if (diceValue !== 1) {
            // Add dice value to current score
            currentScore += diceValue;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch player
            switchPlayer();
        }
    }
};

const holdGame = function () {
    if (!gameOver) {
        // add current score to active player's score
        totalScore[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totalScore[activePlayer];

        // check if active player score is more than 100
        if (totalScore[activePlayer] >= 10) {
            diceImg.classList.add('hidden');
            gameOver = true;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch player
            switchPlayer();
        }
    }
};

// On New Game click
newGameBtn.addEventListener('click', init);

// Roll dice event
rollDiceBtn.addEventListener('click', rollDice);

// Hold game event
holdGameBtn.addEventListener('click', holdGame);

const generateDiceNumber = function () {
    return Math.trunc(Math.random() * 6) + 1;
}