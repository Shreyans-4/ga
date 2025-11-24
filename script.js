const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const modal = document.getElementById("message-modal");
const closeBtn = document.getElementById("close-btn");

let heart = { x: 60, y: 200, vel: 0 };
let gravity = 0.4;
let jump = -7;
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

const excuseLabels = [
    "I fell asleep 😴",
    "My phone died 🔋",
    "Oops forgot 😬",
    "Chaos week 😵",
    "Bad texter 💀",
    "Brain empty 🧠✨"
];

function resetGame() {
    heart.y = 200;
    heart.vel = 0;
    pipes = [];
    frame = 0;
    score = 0;
    gameOver = false;
}

// create pipes
function spawnPipe() {
    let gap = 140;
    let topHeight = Math.random() * 250 + 20;
    pipes.push({
        x: 400,
        top: topHeight,
        bottom: topHeight + gap,
        label: excuseLabels[Math.floor(Math.random() * excuseLabels.length)]
    });
}

function drawHeart() {
    ctx.fillStyle = "#ff5890";
    ctx.beginPath();
    ctx.arc(heart.x, heart.y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = "#ffd2e5";
    ctx.font = "14px Poppins";

    pipes.forEach((p) => {
        ctx.fillRect(p.x, 0, 60, p.top);
        ctx.fillRect(p.x, p.bottom, 60, canvas.height - p.bottom);
        ctx.fillStyle = "#444";
        ctx.fillText(p.label, p.x + 5, p.top / 2);
        ctx.fillStyle = "#ffd2e5";
    });
}

function update() {
    if (gameOver) return;

    frame++;

    heart.vel += gravity;
    heart.y += heart.vel;

    if (frame % 90 === 0) spawnPipe();

    pipes.forEach((p) => {
        p.x -= 2;

        // score when passing
        if (p.x + 60 === heart.x) score++;

        // collision
        if (
            heart.x + 15 > p.x &&
            heart.x - 15 < p.x + 60 &&
            (heart.y - 15 < p.top || heart.y + 15 > p.bottom)
        ) {
            gameOver = true;
        }
    });

    // off-screen = remove
    pipes = pipes.filter((p) => p.x > -60);

    // ground/ceiling collision
    if (heart.y > canvas.height || heart.y < 0) gameOver = true;

    if (gameOver) {
        // Win condition: score >= 8 (≈ surviving ~20 seconds)
        if (score >= 8) {
            modal.classList.remove("hidden");
        } else {
            alert("Oof — hit by an excuse! Try again 🙈");
            resetGame();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHeart();
    drawPipes();
    ctx.fillStyle = "#333";
    ctx.font = "20px Poppins";
    ctx.fillText("Score: " + score, 10, 25);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => (heart.vel = jump));
document.addEventListener("mousedown", () => (heart.vel = jump));

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

resetGame();
gameLoop();
