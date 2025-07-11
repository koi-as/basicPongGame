// Mechanics of a pong game:
// - Paddles
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
let ballX = 250;
let ballY = 250;
let radius = 7;

let ballVelocityX = 9;
let ballVelocityY = 3;

// player variables
let lPlayerVelocity = 0;
let lPaddleX = 1;
let lPaddleY = 4;

let rPlayerVelocity = 0;
let rPaddleX = 9;
let rPaddleY = 4;

// defaults gameOver state to false
let gameOver = false;

function drawGame() {
    // function for players to move paddles
    changePaddlePosition();

    // checks to see if game is over; ends function if it is game over
    let result = endGame();
    if (result) {
        return;
    }

    // sets background of canvas
    clearScreen();

    // check collisions of ball into walls or paddle
    checkCollision();

    // draw game elements
    drawBall();
    // animate() // animate ball
    drawPaddles();
    drawScore();

    // redraw game every .1 seconds
    setTimeout(drawGame, 100);
}

function changePaddlePosition() {
    lPaddleY = lPaddleY + lPlayerVelocity;
    rPaddleY = rPaddleY + rPlayerVelocity;
}

function endGame() {
    let winner = '';
    // checks to see if the game has started yet
    if (lPlayerScore === 0 && rPlayerScore === 0) {
        return false;
    }

    // check if a player has reached 7 points
    if (lPlayerScore === 7) {
        // lPlayer win screen
        winner = 'Player 1';
        gameOver = true;
    }

    if (rPlayerScore === 7) {
        // rPlayer win screen
        winner = 'Player 2';
        gameOver = true;
    }

    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '50px "Lucida Console"';
        let winnerMessage = winner + ' wins!';
        let winnerMessageWidth = ctx.measureText(winnerMessage).width
        ctx.fillText(winnerMessage, (canvas.width / 2) - (winnerMessageWidth / 2), canvas.height / 2);
    }

    return gameOver;
}

// sets the background of the canvas
function clearScreen() {
    ctx.fillStyle = customGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

function checkCollision() {
    // ball hits walls
    // if (ballX + radius > canvas.width || ballX - radius < 0) {
    //     ballVelocityX = -ballVelocityX; 
    if (ballY + radius > canvas.height || ballY - radius < 0) {
        ballVelocityY = -ballVelocityY;
    }

    // left player collisions
    // ball hits left paddle
    if (ballX === lPaddleX && ballY === lPaddleY) {
        ballVelocityX = -ballVelocityX;
    }
    // left paddle hits walls
    if (lPaddleY < 0) {
        lPaddleY = 0;
        lPlayerVelocity = 0;
    } else if (lPaddleY >= 8) {
        lPaddleY = 8;
        lPlayerVelocity = 0;
    }
    // left player scores
    if (ballX > canvas.width) {
        // set ball back to center screen
        // launch ball towards right player
        lPlayerScore++;
    }

    // ball hits right paddle
    if (ballX === rPaddleX && ballY === rPaddleY) {
        ballVelocityX = -ballVelocityX;
    }
    // left paddle hits walls
    if (rPaddleY < 0) {
        rPaddleY = 0;
        rPlayerVelocity = 0;
    } else if (rPaddleY >= 8) {
        rPaddleY = 8;
        rPlayerVelocity = 0;
    }
    // right player scores
    if (ballX < 0) {
        ballX === 250;
        ballY === 250;
        // launch ball towards left player
        rPlayerScore++
    }
};

// function to draw the ball onto the canvas
function drawBall() {
    // ctx.fillStyle = 'black';
    // ctx.fillRect(ballX * tileCount, ballY * tileCount, tileSize, tileSize);
    ctx.beginPath();
    ctx.arc(ballX, ballY, 7, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black'
    ctx.fill()

    // moves ball according to velocity
    ballX = ballX + ballVelocityX;
    ballY = ballY + ballVelocityY;
};


const animate = () => {


    drawBall(ballX, ballY);
    ballX = ballX + ballVelocityX;
    ballY = ballY + ballVelocityY;
    requestAnimationFrame(animate);
}




function drawPaddles() {
    // draws the left player paddle onto the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(lPaddleX * tileCount, lPaddleY * tileCount, tileSize, tileSize * 11)

    // draws the right player paddle onto the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(rPaddleX * tileCount, rPaddleY * tileCount, tileSize, tileSize * 11)
};

// function to draw score onto canvas
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '30px "Lucida Console"';
    let scoreboard = lPlayerScore + ' | ' + rPlayerScore;
    let scoreboardWidth = ctx.measureText(scoreboard).width;
    ctx.fillText(scoreboard, (canvas.width / 2) - (scoreboardWidth / 2), 30);
};

document.body.addEventListener('keydown', keyDown);

function keyDown() {
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
