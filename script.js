const gameArea = document.getElementById("game-area");
const modal = document.getElementById("message-modal");
const closeBtn = document.getElementById("close-btn");

const player = document.createElement("div");
player.classList.add("player");
player.style.left = "280px";
player.style.top = "160px";
gameArea.appendChild(player);

let running = true;
let startTime = Date.now();

const excuses = [
    "I fell asleep 😴",
    "My phone died 🔋",
    "I forgot to reply 😬",
    "Crazy week 😵",
    "Bad at texting 💀",
    "Brain empty 🧠✨",
    "Alien abduction 👽",
];

function spawnExcuse() {
    if (!running) return;

    const excuse = document.createElement("div");
    excuse.classList.add("excuse");
    excuse.textContent = excuses[Math.floor(Math.random() * excuses.length)];

    // spawn at random Y, move from the right
    const y = Math.random() * (gameArea.clientHeight - 30);
    excuse.style.top = y + "px";
    excuse.style.left = "600px";

    gameArea.appendChild(excuse);

    const speed = 2 + Math.random() * 3;

    function move() {
        if (!running) return;
        const currentLeft = parseFloat(excuse.style.left);
        excuse.style.left = currentLeft - speed + "px";

        // collision detection
        const p = player.getBoundingClientRect();
        const e = excuse.getBoundingClientRect();

        if (
            p.left < e.right &&
            p.right > e.left &&
            p.top < e.bottom &&
            p.bottom > e.top
        ) {
            running = false;
            alert("You got hit by an excuse! Try again 🙈");
            location.reload();
        }

        // remove if off screen
        if (currentLeft < -100) excuse.remove();
        else requestAnimationFrame(move);
    }
    move();

    // spawn next excuse
    setTimeout(spawnExcuse, 600);
}

// Player movement
document.addEventListener("mousemove", (e) => {
    const rect = gameArea.getBoundingClientRect();
    let x = e.clientX - rect.left - 20;
    let y = e.clientY - rect.top - 20;

    if (x >= 0 && x <= rect.width - 40) player.style.left = x + "px";
    if (y >= 0 && y <= rect.height - 40) player.style.top = y + "px";
});

// Win condition (15 seconds)
function checkWin() {
    if (!running) return;

    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= 15) {
        running = false;
        modal.classList.remove("hidden");
    } else {
        requestAnimationFrame(checkWin);
    }
}

spawnExcuse();
checkWin();

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

