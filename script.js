// Mechanics of a pong game:
// - Paddles
//      - Move up and down
//          - If keyUp = pressed {paddleVelocity = -1}; If keyDown = pressed {paddleVelocity = 1}
//          - vars might be paddleVelocityL and paddleVelocityR for left and right players respectively
//      - Ball bounces off paddles
//          - If ballLocation = paddleLocation {velocityX * -1}
// - Ball
//      - Bounces off everything, normally in a diagonal manner
//          - hits top/bottom wall -> velocityY invert
//          - hits paddle -> velocityX invert
//      - Start of game, ball gets sent in a random direction
//          - velocityX and velocityY get randomly set to a value of 1 or -1
//          - How to start game?
//              - Start button?
//              - Tap a movement key?
//              - Timer countdown from 3 down to 1 then START and movement unlocks as ball gets launched
//  - After a point is scored, send ball to non-scoring player
//      - Ball moves out of bounds, add point to scorer (left paddle scores on right side; right paddle scores on left side)
//          - Detect scorer (based on wall? if(ballLocation <= 0) {scoreR++} else if(ballLocation >= rightWallPosition) {scoreL++})
//          - If scorer scores {velocityX = oppositeDirection; velocityY = randomValue of either 1/-1}
// - Score
//      - Increments up 1 each time ball passes edge of screen
//          - scorerL = ballLocation >= rightWallEdge {scoreL++; restart(scorerL)}
//          - scorerR = ballLocation <= leftWallEdge {scoreR++; restart(scorerR)}
//          - function restart(scorer) {detect scorer; set velocityX to opposite direction; reset paddleLocation; startGame()}
//              - function name restart or reset?
//      - Score is first to 7
//          - If scoreL === 7 {endGame()}
//          - If scoreR === 7 {endGame()}

// left player vars
/*
let playerLeft = "";
let scoreLeft = 0;
*/

// right player vars
/*
let playerRight = "";
let scoreRight = 0;
*/

// functions
/*
endGame();
resetGame();
drawScore(); maybe combine this with a different function?
*/

// pull canvas information from html
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// map variables
let tileCount = 50;
let tileSize = canvas.width / tileCount;

// background variables
let customGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
customGradient.addColorStop(0, 'white');
customGradient.addColorStop(1, 'lightblue');

// score variables
let lPlayerScore = 0;
let rPlayerScore = 0;

// ball stuff
let ballX = 5;
let ballY = 5;

let ballVelocityX = 0;
let ballVelocityY = 0;

// player 1 variables
let lPlayerVelocity = 0;
let lPaddleX = 1;
let lPaddleY = 4;

let rPlayerVelocity = 0;
let rPaddleX = 9;
let rPaddleY = 4;

function drawGame() {
    // function for players to move paddles
    changePaddlePosition();

    // sets background of canvas
    clearScreen();

    // check collisions of ball into walls or paddle
    checkCollision();

    // draw game elements
    drawBall();
    drawPaddles();
    drawScore();

    // redraw game every .1 seconds
    setTimeout(drawGame, 100);
}

function changePaddlePosition() {
    lPaddleY = lPaddleY + lPlayerVelocity;
    rPaddleY = rPaddleY + rPlayerVelocity;
}

function clearScreen() {
    ctx.fillStyle = customGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function checkCollision() {
    // ball hits walls
    if(ballY === 0 || ballY === 50) {
        ballVelocityY * -1;
    }

    // left player collisions
    // ball hits left paddle
    if(ballX === lPaddleX && ballY === lPaddleY) {
        ballVelocityX = 1;
    }
    // left player scores
    if(ballX === 50) {
        // set ball back to center screen
        // launch ball towards right player
        lPlayerScore++;
    } 

    // ball hits right paddle
    if(ballX === rPaddleX && ballY === rPaddleY) {
        ballVelocityX = -1;
    }
    // right player scores
    if(ballX === 0) {
        // set ball back to center screen
        // launch ball towards left player
        rPlayerScore++
    }
};

function drawBall() {
    ctx.fillStyle = 'black';
    ctx.fillRect(ballX * tileCount, ballY * tileCount, tileSize, tileSize);
};

function drawPaddles() {
    ctx.fillStyle = 'black';
    ctx.fillRect(lPaddleX * tileCount, lPaddleY * tileCount, tileSize, tileSize * 11)

    ctx.fillStyle = 'black';
    ctx.fillRect(rPaddleX * tileCount, rPaddleY * tileCount, tileSize, tileSize * 11)
};

function drawScore() {

};

document.body.addEventListener('keydown', keyDown);

function keyDown() {
    console.log('working?');
    // left player keys (player 1)
    // up key for player 1
    if (event.keyCode === 87) {
        lPlayerVelocity = -1;
    }
    // down key for player 1
    if (event.keyCode === 83) {
        lPlayerVelocity = 1;
    }

    // right player keys (player 2)
    // up key for player 2
    if (event.keyCode === 38) {
        rPlayerVelocity = -1;
    }
    // down key for player 2
    if (event.keyCode === 40) {
        rPlayerVelocity = 1;
    }
};

// drawGame as master function
drawGame();

// What other game elements should I consider?
// Start game/restart game buttons. This would be nice when playing with friends, so CHECK
// I don't think a leaderboard would be necessary. Correct, leaderboard unnecessary, so NIX
// No need to have a highscore setting. Correct, highscore unnecessary, so NIX
// I could work on having interchangeable backgrounds, that would be a good addition to this project that could help me in other projects. This might be difficult, but I'll try, so CHECK
