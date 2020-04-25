let confirmGame = confirm('Do you want to play a game?');
const rangeConst = 6, 
	maxPrizeConst = 100,
	currPrizeConst = 0;

let lose = function(currPrize) {
    alert(`Thank you for your participation. Your prize is: ${currPrize}$'`);
    if (confirm('Do you want to play again?')) {
        game(rangeConst, maxPrizeConst, currPrizeConst);
    }
};

let won = function(range, maxPrize, currPrize) {
    if (confirm('Congratulation, you won! Your prize is: ' + currPrize + '$. Do you want to continue?')) {
        game(range * 2 - 1, maxPrize * 2, currPrize);
    } else {
        lose(currPrize);
    }
};

let game = function(range, maxPrize, currPrize) {
    let guessingNum = Math.floor(Math.random() * range),
        enteringNum,
        i = 1,
        maxAttempt = 3,
        divide = {
            1: 1,
            2: 2,
            3: 4
        };

    while (i <= 3) {
        enteringNum = +prompt(
`Choose a roulette pocket number from 0 to ${range - 1}
Attempts left: ${maxAttempt--}
Total prize: ${currPrize}$
Possible prize of current attempt: ${maxPrize / divide[i]}$`
        );

        if (enteringNum === guessingNum) {
            currPrize += maxPrize / divide[i];
            won(range, maxPrize, currPrize);
            break;
        } else if (i === 3) {
            lose(currPrize);
            break;
        }
        i++;
    }
};

if (confirmGame) {
    game(rangeConst, maxPrizeConst, currPrizeConst);

} else {
    alert('You did not become a billionaire, but can.');
}