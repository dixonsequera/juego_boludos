let boludo1, boludo2;
let fondo;
let boludo1Score = 0;
let boludo2Score = 0;
let rounds = 0;
let gameOver = false;
let gameStarted = false;
const maxRounds = 2;
let startButton;
let mySound;

function preload() {
    fondo = loadImage('fondo_del_juego.png');
    // No necesitas cargar el sonido aquí si se carga con la etiqueta <audio>
}

function setup() {
    createCanvas(1500, 800);
    initializeBoludos();
    
    // Crea el botón de inicio y establece su posición
    startButton = createButton('Inicia Boludo ;)');
    startButton.position(width / 4 - 60, height / 2);
    startButton.mousePressed(startGame);

    // Obtiene el sonido del elemento audio del DOM
    mySound = document.getElementById('game-sound');
}

function draw() {
    if (gameStarted) {
        if (!gameOver) {
            background(fondo);
            fill(boludo1.color);
            ellipse(boludo1.x, boludo1.y, 80, 80); // Boludo 1 como círculo
            fill(boludo2.color);
            ellipse(boludo2.x, boludo2.y, 80, 80); // Boludo 2 como círculo también

            fill(0);
            textSize(40);
            text(`${boludo1.name}: ${boludo1Score}`, 50, 50);
            text(`${boludo2.name}: ${boludo2Score}`, width - 250, 50);

            checkEndLine(boludo1);
            checkEndLine(boludo2);
        } else {
            background(200);
            fill(0);
            textSize(30);
            if (boludo1Score > boludo2Score) {
                text(`${boludo1.name} Cojonudo!`, width / 2 - 80, height / 2);
            } else if (boludo2Score > boludo1Score) {
                text(`${boludo2.name} Cojonudo!`, width / 2 - 80, height / 2);
            }
            
            setTimeout(resetGame, 3000); // Reinicia el juego después de 3 segundos
        }
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) boludo1.y -= 10;
    if (keyCode === DOWN_ARROW) boludo1.y += 10;
    if (keyCode === LEFT_ARROW) boludo1.x -= 10;
    if (keyCode === RIGHT_ARROW) boludo1.x += 10;
    if (key.toLowerCase() === 'w') boludo2.y -= 10;
    if (key.toLowerCase() === 's') boludo2.y += 10;
    if (key.toLowerCase() === 'a') boludo2.x -= 10;
    if (key.toLowerCase() === 'd') boludo2.x += 10;
}

function checkEndLine(boludo) {
    if (boludo.x >= width - 50) {
        boludo.x = 50;
        rounds++;
        if (boludo === boludo1) boludo1Score++;
        else if (boludo === boludo2) boludo2Score++;

        if (rounds >= maxRounds) {
            gameOver = true;
        }
    }
}

// Función para reiniciar el juego a su estado inicial
function resetGame() {
    boludo1Score = 0;
    boludo2Score = 0;
    rounds = 0;
    gameOver = false;
    gameStarted = false;
    initializeBoludos();
    
    // Muestra el botón de inicio nuevamente
    startButton.show();
}

function initializeBoludos() {
    boludo1 = { x: 50, y: height / 2 - 50, color: 'black', name: 'Boludo 1' };
    boludo2 = { x: 50, y: height / 2 + 50, color: 'grey', name: 'Boludo 2' };
}

function startGame() {
    gameStarted = true;
    mySound.play(); // Reproduce el sonido al comenzar el juego
    startButton.hide(); // Oculta el botón cuando el juego comienza
}
