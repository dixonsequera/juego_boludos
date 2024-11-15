let boludo1, boludo2;
let fondo;
let boludo1Score = 0;
let boludo2Score = 0;
let rounds = 0;
let gameOver = false;
let gameStarted = false;
const maxRounds = 2;
let mySound;
let roundCompleted = false;
let winnerMessage = "";
function preload() {
  fondo = loadImage("fondo_del_juego.png");
}

function setup() {
  createCanvas(1500, 800);
  initializeBoludos();

  startButton = createButton("Inicia Boludo ;)");
  startButton.position(width / 8 - 100, height / 2);
  startButton.size(300, 80);
  startButton.style("background-color", "#0000FF");
  startButton.style("color", "#FFFFFF");
  startButton.style("font-size", "24px");
  startButton.style("border-radius", "12px");

  startButton.mousePressed(startGame);

  mySound = document.getElementById("game-sound");
}

function draw() {
  if (gameStarted) {
    if (!gameOver) {
      background(fondo);
      drawBoludos();
      drawScores();
      checkEndLine(boludo1);
      checkEndLine(boludo2);
    } else {
      showWinner();
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) boludo1.y -= 10;
  if (keyCode === DOWN_ARROW) boludo1.y += 10;
  if (keyCode === LEFT_ARROW) boludo1.x -= 10;
  if (keyCode === RIGHT_ARROW) boludo1.x += 10;
  if (key.toLowerCase() === "w") boludo2.y -= 10;
  if (key.toLowerCase() === "s") boludo2.y += 10;
  if (key.toLowerCase() === "a") boludo2.x -= 10;
  if (key.toLowerCase() === "d") boludo2.x += 10;
}

function checkEndLine(boludo) {
  if (boludo.x >= width - 50 && !roundCompleted) {
    boludo.x = 50;
    roundCompleted = true;

    if (boludo === boludo1) {
      boludo1Score++;
    } else if (boludo === boludo2) {
      boludo2Score++;
    }

    rounds++;

    if (rounds >= maxRounds) {
      gameOver = true;

      if (boludo1Score > boludo2Score) {
        winnerMessage = `${boludo1.name} Cojonudo! Felicidades, eres el boludo mayor!`;
      } else if (boludo2Score > boludo1Score) {
        winnerMessage = `${boludo2.name} Cojonudo! Felicidades, eres el boludo mayor!`;
      } else {
        winnerMessage = `¡Es un empate! No hay boludo mayor.`;
      }

      setTimeout(resetGame, 3000);
    } else {
      boludo1.x = 50;
      boludo2.x = 50;
      roundCompleted = false;
    }
  }
}

function drawBoludos() {
  fill(boludo1.color);
  ellipse(boludo1.x, boludo1.y, 80, 80);
  fill(boludo2.color);
  ellipse(boludo2.x, boludo2.y, 80, 80); // Dibuja a Boludo 2
}

function drawScores() {
  fill(0);
  textSize(40);
  text(`${boludo1.name}: ${boludo1Score}`, 50, 50);
  text(`${boludo2.name}: ${boludo2Score}`, width - 250, 50);
}

function showWinner() {
  background(200);
  fill(0);
  textSize(30);
  textAlign(CENTER, CENTER);
  text(winnerMessage, width / 2, height / 2);
}

function resetGame() {
  boludo1Score = 0;
  boludo2Score = 0;
  rounds = 0;
  gameOver = false;
  gameStarted = false;
  initializeBoludos();
  startButton.show();
}

function initializeBoludos() {
  boludo1 = { x: 50, y: height / 2 - 50, color: "black", name: "Boludo 1" };
  boludo2 = { x: 50, y: height / 2 + 50, color: "grey", name: "Boludo 2" };
}

function startGame() {
  gameStarted = true;
  gameOver = false;
  rounds = 0;
  winnerMessage = "";
  mySound.play();
  startButton.hide();
}
