'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
    const guessedNumber = Number(document.querySelector('.guess').value);
    if (!guessedNumber) {
        document.querySelector('.message').textContent = '⛔️No guess';
    } else if (guessedNumber === secretNumber) {
        document.querySelector('.check').disabled = true;
        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.message').textContent = '🎉Yaay!! Correct guess';
        document.querySelector('.number').textContent = guessedNumber;
    } else {
        score--;
        document.querySelector('.score').textContent = score;
        const wrongNumberMessage = guessedNumber > secretNumber ? '📈Number is too high' : '📉Number is too less';
        document.querySelector('.message').textContent = wrongNumberMessage;
    }
});

document.querySelector('.again').addEventListener('click', function () {
    document.querySelector('.check').disabled = false;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    score = 20;
    document.querySelector('.score').textContent = score;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.number').textContent = '?';
});
