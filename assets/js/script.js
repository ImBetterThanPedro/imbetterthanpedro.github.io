const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

// Variables de jeu
let gravity = 0.6;
let isJumping = false;
let score = 0;

const player = {
    x: 50,
    y: 350,
    size: 30,
    dy: 0,
    jumpForce: -12,
    color: '#00ffcc'
};

const obstacles = [];
let gameSpeed = 5;

// Gestion du saut
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        player.dy = player.jumpForce;
        isJumping = true;
    }
});

function createObstacle() {
    if (Math.random() < 0.02) { // Apparition aléatoire
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 30,
            width: 30,
            height: 30,
            color: '#ff4444'
        });
    }
}

function update() {
    // Physique du joueur
    player.dy += gravity;
    player.y += player.dy;

    // Collision avec le sol
    if (player.y + player.size > canvas.height) {
        player.y = canvas.height - player.size;
        player.dy = 0;
        isJumping = false;
    }

    // Gestion des obstacles
    obstacles.forEach((obs, index) => {
        obs.x -= gameSpeed;

        // Collision simple (AABB)
        if (player.x < obs.x + obs.width &&
            player.x + player.size > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.size > obs.y) {
            alert("Game Over! Score: " + score);
            location.reload();
        }

        // Supprimer si hors écran
        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
            score++;
            document.getElementById('score').innerText = "Score: " + score;
        }
    });

    createObstacle();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le joueur (avec une petite rotation si tu veux l'effet GD)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Dessiner les obstacles
    ctx.fillStyle = '#ff4444';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw();
}

gameLoop();
