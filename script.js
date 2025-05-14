
let bgm = document.getElementById("bgm");
let muteBtn = document.getElementById("muteBtn");

function toggleMute() {
    bgm.muted = !bgm.muted;
    muteBtn.textContent = bgm.muted ? "🔇 Music" : "🔊 Music";
}

function playClick() {
    let click = document.getElementById("click");
    click.currentTime = 0;
    click.play();
}

const phrases = [
    "Streamer Gaming",
    "Komunitas Asik dan Seru",
    "Live Setiap Hari",
    "Welcome to my link!"
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const typewriter = document.getElementById("typewriter");

function type() {
    const current = phrases[currentPhrase];
    if (isDeleting) {
        currentChar--;
    } else {
        currentChar++;
    }
    typewriter.textContent = current.slice(0, currentChar);

    if (!isDeleting && currentChar === current.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
type();
