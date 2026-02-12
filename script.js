const questionScreen = document.getElementById("questionScreen");
const successScreen = document.getElementById("successScreen");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionElement = document.querySelector(".question");

let noClickCount = 0;
let currentYesScale = 1;

const funnyMessages = [
  "Zostaniesz moją walentynką?",
  "Na pewno? 🥺",
  "Daj mi szansę! 💔",
  "Jeszcze jedna szansa? 😭",
  "Proszę! 💕",
  "Zmień zdanie! 🥺",
  "Ostatni raz pytam! 😢",
  "Okaaay... może teraz? 🥹",
];

const fallingHeartsContainer = document.getElementById("fallingHearts");

function createFallingHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const isFilled = Math.random() > 0.5;
  heart.textContent = isFilled ? "❤️" : "🤍";
  heart.classList.add(isFilled ? "filled" : "outline");

  heart.style.left = Math.random() * 100 + "%";

  heart.style.fontSize = Math.random() * 15 + 20 + "px";

  const duration = Math.random() * 3 + 5;
  heart.style.animationDuration = duration + "s";

  heart.style.animationDelay = Math.random() * 2 + "s";

  fallingHeartsContainer.appendChild(heart);

  setTimeout(
    () => {
      heart.remove();
    },
    (duration + 2) * 1000,
  );
}

setInterval(createFallingHeart, 400);

// Typewriter animation for question
function animateQuestion() {
  questionElement.classList.add("typing-animation");
}

window.addEventListener("load", () => {
  setTimeout(animateQuestion, 300);
});

// Sound generation using Web Audio API
function playSound(frequency, duration, type = "sine") {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

function playYesSound() {
  playSound(523.25, 0.1); // C5
  setTimeout(() => playSound(659.25, 0.1), 100); // E5
  setTimeout(() => playSound(783.99, 0.2), 200); // G5
}

function playNoSound() {
  playSound(392, 0.15); // G4
  setTimeout(() => playSound(349.23, 0.15), 150); // F4
  setTimeout(() => playSound(329.63, 0.2), 300); // E4
}

function moveNoButton() {
  noClickCount++;
  currentYesScale += 0.2;
  yesBtn.style.transform = `scale(${currentYesScale})`;
  yesBtn.style.transition = "transform 0.25s ease";

  // Update question text with funny message
  if (noClickCount < funnyMessages.length) {
    questionElement.textContent = funnyMessages[noClickCount];
  }

  // Play "No" sound
  playNoSound();

  noBtn.style.position = "fixed";
  noBtn.style.transition = "left 0.25s ease, top 0.25s ease";
  noBtn.style.zIndex = "999";

  const padding = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const yesRect = yesBtn.getBoundingClientRect();
  const noW = noBtn.offsetWidth || 100;
  const noH = noBtn.offsetHeight || 40;

  function overlaps(x, y) {
    const left = x;
    const top = y;
    const right = x + noW;
    const bottom = y + noH;
    return !(
      right < yesRect.left ||
      left > yesRect.right ||
      bottom < yesRect.top ||
      top > yesRect.bottom
    );
  }

  let attempt = 0;
  let x, y;
  const maxAttempts = 100;
  do {
    x = Math.floor(padding + Math.random() * (vw - noW - padding * 2));
    y = Math.floor(padding + Math.random() * (vh - noH - padding * 2));
    attempt++;
  } while (overlaps(x, y) && attempt < maxAttempts);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  noBtn.style.animation = "shake 0.3s";
  setTimeout(() => {
    noBtn.style.animation = "";
  }, 300);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false },
);
noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  playYesSound();

  questionScreen.classList.add("hidden");

  successScreen.classList.remove("hidden");

  createHeartExplosion();
});

function createHeartExplosion() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.fontSize = "30px";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "1000";

      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 5 + Math.random() * 5;

      heart.style.animation = `explode-${i} 2s ease-out forwards`;

      const keyframes = `
                @keyframes explode-${i} {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(calc(-50% + ${Math.cos(angle) * velocity * 100}px), calc(-50% + ${Math.sin(angle) * velocity * 100}px)) scale(1);
                        opacity: 0;
                    }
                }
            `;

      const styleSheet = document.createElement("style");
      styleSheet.textContent = keyframes;
      document.head.appendChild(styleSheet);

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
        styleSheet.remove();
      }, 2000);
    }, i * 50);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") return;

  const sparkle = document.createElement("div");
  sparkle.textContent = "✨";
  sparkle.style.position = "fixed";
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  sparkle.style.fontSize = "25px";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "1000";
  sparkle.style.animation = "sparkleAnim 1s ease-out forwards";
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
});

const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(2) rotate(180deg); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);
