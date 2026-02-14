// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const letterWindow = document.querySelector(".letter-window");

// State tracking
let isLetterOpen = false;

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    isLetterOpen = true;

    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);
});

// NO button moves only when clicked (desktop or mobile)
function moveNoButton() {
    if (!noBtn || !isLetterOpen) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = (viewportWidth - btnRect.width) / 2 - 20;
    const maxY = (viewportHeight - btnRect.height) / 2 - 20;
    const baseDistance = Math.min(150, Math.max(0, maxX) * 0.6, Math.max(0, maxY) * 0.6);
    const minDist = 50;
    const maxDist = Math.min(180, baseDistance * 1.4);
    const distance = Math.random() * (maxDist - minDist) + minDist;
    const angle = Math.random() * 2 * Math.PI;

    let moveX = Math.cos(angle) * distance;
    let moveY = Math.sin(angle) * distance;

    const wrapper = noBtn.closest(".no-wrapper");
    const wrapperRect = wrapper ? wrapper.getBoundingClientRect() : btnRect;
    const newLeft = wrapperRect.left + moveX;
    const newRight = newLeft + wrapperRect.width;
    const newTop = wrapperRect.top + moveY;
    const newBottom = newTop + wrapperRect.height;
    const margin = 12;

    if (newLeft < margin) moveX += margin - newLeft;
    if (newRight > viewportWidth - margin) moveX -= newRight - (viewportWidth - margin);
    if (newTop < margin) moveY += margin - newTop;
    if (newBottom > viewportHeight - margin) moveY -= newBottom - (viewportHeight - margin);

    if (wrapper) {
        wrapper.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        wrapper.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
        noBtn.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

function resetNoButton() {
    const wrapper = noBtn ? noBtn.closest(".no-wrapper") : null;
    if (wrapper) {
        wrapper.style.transition = "none";
        wrapper.style.transform = "none";
        void wrapper.offsetHeight;
    }
    if (noBtn) {
        noBtn.style.transition = "none";
        noBtn.style.transform = "none";
        void noBtn.offsetHeight;
    }
}

if (noBtn) {
    noBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton();
    });
}

// YES button click handler
yesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    title.textContent = "Sikeeee!";
    catImg.src = "laughing-cat.gif";

    // Play sound (with error handling)
    try {
        const laughSound = new Audio("cat-laugh-meme-1.mp3");
        laughSound.volume = 0.7;
        laughSound.play().catch(err => console.log('Audio play failed:', err));
    } catch (err) {
        console.log('Audio error:', err);
    }

    letterWindow.classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    resetNoButton();
    startChatBubbles();
});

// ===== FLOATING CHAT BUBBLES (last page only) – same list as chatbubble.html =====
const BUBBLE_MESSAGES = [
    "Haq se single 😎",
    "Pyaar vyaar dhoka hai 💔",
    "Self love > Fake love 👑",
    "Maa ka favourite hoon 😎",
    "Akele mast 🕺",
    "No tension, full pension 🤑",
    "Apna time aayega... kabhi nahi 😂",
    "Single by choice 🎯, not my tho",
    "Pyaar? Nah, Pizza! 🍕",
    "Commitment issues pro max 📱",
    "Mera crush? Biryani 🍛",
    "Heartbreak se bachgaye 🏃",
    "Love is temporary, memes are forever 😹",
    "Dil ka rishta? Block! 🚫",
    "Self-partnered vibes ✨",
    "Love? Already left on read 📱",
    "Anti-romance squad 💪"
];
let bubbleIntervalId = null;

function createChatBubble() {
    const container = document.getElementById("chat-bubbles-container");
    if (!container) return;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = BUBBLE_MESSAGES[Math.floor(Math.random() * BUBBLE_MESSAGES.length)];
    bubble.style.left = Math.random() * 100 + "%";
    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 38000);
}

function startChatBubbles() {
    const container = document.getElementById("chat-bubbles-container");
    if (!container) return;
    for (let i = 0; i < 6; i++) {
        setTimeout(createChatBubble, i * 700);
    }
    bubbleIntervalId = setInterval(createChatBubble, 5500);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (isLetterOpen) {
        resetNoButton();
    }
});

// Prevent context menu on images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
});