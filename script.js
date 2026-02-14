// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Open letter
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";
  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// Move "No" button away on hover OR touch
function moveNoButton(e) {
  const containerRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Random direction within visible area
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// Use both mouse and touch events
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton(e);
});

// YES clicked
yesBtn.addEventListener("click", () => {
  title.textContent = "Sikeeee!";
  catImg.src = "laughing-cat.gif";

  const laughSound = new Audio("cat-laugh-meme-1.mp3");
  laughSound.play().catch(e => console.log("Audio play failed:", e));

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";
});