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
let paddleLeft = "":
let paddleLeftVelocity = 0;
let playerLeft = "";
let scoreLeft = 0;
*/

// right player vars
/*
let paddleRight = "";
let paddleRightVelocity = "";
let playerRight = "";
let scoreRight = 0;
*/

// ball vars
/*
let ball = "";
let ballVelocityX = 0;
let ballVelocityY = 0;
let ballLocation = 0;
*/

// functions
/*
playGame();
endGame();
resetGame();
drawBall();
drawPaddles();
drawScore(); maybe combine this with a different function?
*/





// What other game elements should I consider?
// Start game/restart game buttons. This would be nice when playing with friends, so CHECK
// I don't think a leaderboard would be necessary. Correct, leaderboard unnecessary, so NIX
// No need to have a highscore setting. Correct, highscore unnecessary, so NIX
// I could work on having interchangeable backgrounds, that would be a good addition to this project that could help me in other projects. This might be difficult, but I'll try, so CHECK
