const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const modal = document.getElementById("message-modal");
const closeBtn = document.getElementById("close-btn");

// GAME VARIABLES
let heart = { x: 60, y: 200, vel: 0 };
let gravity = 0.4;
let jump = -7;
let pipes = [];
let frame = 0;
let score = 0;
let gameRunning = false;

// CUSTOM WORDS YOU WANTED
const labels = ["sorry", "maafi", "shamsi", "como estas"];

// START BUTTON CLICK
startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    canvas.classList.remove("hidden");
    startGame();
});

// RESET ALL GAME VALUES
function resetGame() {
    heart = { x: 60, y: 200, vel: 0 };
    pipes = [];
    frame = 0;
    score = 0;
}

// START GAME
function startGame() {
    resetGame();
    gameRunning = true;
    loop();
}

// CREATE A PIPE
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

// DRAW HEART
function drawHeart() {
    ctx.fillStyle = "#ff5890";
    ctx.beginPath();
    ctx.arc(heart.x, heart.y, 15, 0, Math.PI * 2);
    ctx.fill();
}

// DRAW PIPES
function drawPipes() {
    ctx.fillStyle = "#ffd2e5";
    ctx.font = "14px Poppins";

    pipes.forEach((p) => {
        // top pipe
        ctx.fillRect(p.x, 0, 60, p.top);
        // bottom pipe
        ctx.fillRect(p.x, p.bottom, 60, canvas.height - p.bottom);

        ctx.fillStyle = "#333";
        ctx.fillText(p.text, p.x + 5, p.top / 2);
        ctx.fillStyle = "#ffd2e5";
    });
}

// GAME LOOP
function loop() {
    if (!gameRunning) return;

    frame++;

    // movement
    heart.vel += gravity;
    heart.y += heart.vel;

    // spawn pipes
    if (frame % 90 === 0) spawnPipe();

    // move pipes + detect collision
    pipes.forEach((p) => {
        p.x -= 2;

        if (p.x + 60 === heart.x) score++;

        const hit =
            heart.x + 15 > p.x &&
            heart.x - 15 < p.x + 60 &&
            (heart.y - 15 < p.top || heart.y + 15 > p.bottom);

        if (hit) return lose();
    });

    // remove off screen pipes
    pipes = pipes.filter((p) => p.x > -60);

    // off screen top/bottom
    if (heart.y < 0 || heart.y > canvas.height) return lose();

    // WIN = score reaches 8
    if (score >= 8) return win();

    // DRAW
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

// LOSE FUNCTION
function lose() {
    gameRunning = false;
    alert("You hit one of the words 😭 Try again!");
    startBtn.classList.remove("hidden");
    canvas.classList.add("hidden");
}

// WIN FUNCTION
function win() {
    gameRunning = false;
    modal.classList.remove("hidden");
}

// CLOSE APOLOGY MODAL
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    startBtn.classList.remove("hidden");
    canvas.classList.add("hidden");
});

// TAP / SPACE JUMP
document.addEventListener("keydown", () => {
    if (gameRunning) heart.vel = jump;
});

document.addEventListener("mousedown", () => {
    if (gameRunning) heart.vel = jump;
});

