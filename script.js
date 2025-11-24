const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const modal = document.getElementById("message-modal");
const closeBtn = document.getElementById("close-btn");

let heart, pipes, frame, score;
let gravity = 0.4;
let jump = -7;
let gameRunning = false;

const labels = ["sorry", "maafi", "shamsi", "como estas"];

// Reset everything
function resetGame() {
    heart = { x: 60, y: 200, vel: 0 };
    pipes = [];
    frame = 0;
    score = 0;
}

// Start button logic (fixed)
startBtn.addEventListener("click", () => {
    modal.classList.add("hide");
    startBtn.classList.add("hide");
    canvas.classList.remove("hide");

    resetGame();
    gameRunning = true;
    loop();
});

// Spawn pipes
function spawnPipe() {
    let gap = 140;
    let topH = Math.random() * 250 + 20;

    pipes.push({
        x: 400,
        top: topH,
        bottom: topH + gap,
        text: labels[Math.floor(Math.random() * labels.length)]
    });
}

// Draw heart
function drawHeart() {
    ctx.fillStyle = "#ff5890";
    ctx.beginPath();
    ctx.arc(heart.x, heart.y, 15, 0, Math.PI * 2);
    ctx.fill();
}

// Draw pipes
function drawPipes() {
    ctx.fillStyle = "#ffd2e5";
    ctx.font = "14px Poppins";

    pipes.forEach((p) => {
        ctx.fillRect(p.x, 0, 60, p.top);
        ctx.fillRect(p.x, p.bottom, 60, canvas.height - p.bottom);
        ctx.fillStyle = "#333";
        ctx.fillText(p.text, p.x + 5, p.top / 2);
        ctx.fillStyle = "#ffd2e5";
    });
}

function loop() {
    if (!gameRunning) return;

    frame++;

    heart.vel += gravity;
    heart.y += heart.vel;

    if (frame % 90 === 0) spawnPipe();

    pipes.forEach((p) => {
        p.x -= 2;

        if (p.x + 60 === heart.x) score++;

        const hit =
            heart.x + 15 > p.x &&
            heart.x - 15 < p.x + 60 &&
            (heart.y - 15 < p.top || heart.y + 15 > p.bottom);

        if (hit) lose();
    });

    pipes = pipes.filter((p) => p.x > -60);

    if (heart.y < 0 || heart.y > canvas.height) lose();

    if (score >= 8) win();

    draw();

    requestAnimationFrame(loop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHeart();
    drawPipes();

    ctx.fillStyle = "#333";
    ctx.font = "20px Poppins";
    ctx.fillText("Score: " + score, 10, 25);
}

function lose() {
    gameRunning = false;
    alert("You hit one of the words 😭 Try again!");

    canvas.classList.add("hide");
    startBtn.classList.remove("hide");
}

function win() {
    gameRunning = false;
    modal.classList.remove("hide");  // show apology
}

// Close apology → restart menu
closeBtn.addEventListener("click", () => {
    modal.classList.add("hide");
    canvas.classList.add("hide");
    startBtn.classList.remove("hide");
});

// Controls
document.addEventListener("keydown", () => {
    if (gameRunning) heart.vel = jump;
});
document.addEventListener("mousedown", () => {
    if (gameRunning) heart.vel = jump;
});
