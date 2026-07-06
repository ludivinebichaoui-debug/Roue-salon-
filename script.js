let isSpinning = false;
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');

// CONFIGURATION DES PROBABILITÉS STRICTES (TOTAL = 100%)
const CHANCE_PERDRE         = 55; 
const CHANCE_SOIN_OFFERT    = 30; 
const CHANCE_SCHWARZKOPF    = 10; 
const CHANCE_AVEDA          = 5;  

const prizes = [
    { label: "AVEDA",         color: "#d4af37", text: "#000000", isWin: true,  msg: "Magnifique ! Un produit de la gamme éco-luxe AVEDA vous est offert ! 🧴" },
    { label: "PAS CETTE FOIS",color: "#1a1a1a", text: "#ffffff", isWin: false, msg: "Pas cette fois ! Toute l'équipe vous remercie pour votre avis." },
    { label: "SOIN OFFERT",   color: "#d4af37", text: "#000000", isWin: true,  msg: "Exceptionnel ! Vous gagnez un soin profond personnalisé offert ! 💆‍♀️" },
    { label: "PLUS TARD",     color: "#2a2a2a", text: "#ffffff", isWin: false, msg: "Presque ! Merci beaucoup pour votre gentillesse et votre soutien." },
    { label: "SCHWARZKOPF+",  color: "#d4af37", text: "#000000", isWin: true,  msg: "Félicitations ! Un produit Schwarzkopf, American Crew ou Depot vous est offert ! ✨" },
    { label: "ESSAYE ENCORE", color: "#1a1a1a", text: "#ffffff", isWin: false, msg: "Dommage ! Merci d'avoir pris le temps de nous laisser une note." },
    { label: "SOIN OFFERT",   color: "#d4af37", text: "#000000", isWin: true,  msg: "Exceptionnel ! Vous gagnez un soin profond personnalisé offert ! 💆‍♀️" },
    { label: "DOMMAGE",       color: "#2a2a2a", text: "#ffffff", isWin: false, msg: "Ce sera pour une prochaine fois ! Merci pour votre précieuse fidélité." }
];

const numSegments = prizes.length;
const segmentAngle = (2 * Math.PI) / numSegments;
let currentRotation = 0;

function drawWheel() {
    if (!canvas) return;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 15;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSegments; i++) {
        const angle = i * segmentAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, angle + segmentAngle);
        ctx.fillStyle = prizes[i].color;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + segmentAngle / 2);
        ctx.fillStyle = prizes[i].text;
        ctx.font = "bold 13px Montserrat";
        ctx.textAlign = "right";
        ctx.fillText(prizes[i].label, radius - 30, 5);
        ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#d4af37";
    ctx.stroke();
}

function startFlow() {
    // Affiche l'étape de la roue
    document.getElementById('step-avis').classList.add('hidden-step');
    document.getElementById('step-roue').classList.remove('hidden-step');
    
    // Force le dessin immédiat
    drawWheel();
}

function getStrictRandomIndex() {
    const tirage = Math.random() * 100;
    if (tirage < CHANCE_AVEDA) return 0; 
    else if (tirage < (CHANCE_AVEDA + CHANCE_SCHWARZKOPF)) return 4; 
    else if (tirage < (CHANCE_AVEDA + CHANCE_SCHWARZKOPF + CHANCE_SOIN_OFFERT)) return Math.random() < 0.5 ? 2 : 6; 
    else {
        const perdantes = [1, 3, 5, 7];
        return perdantes[Math.floor(Math.random() * perdantes.length)];
    }
}

function spin() {
    if (isSpinning) return;

    const resultBox = document.getElementById("result-box");
    const resultText = document.getElementById("result-text");

    const dejaJoue = localStorage.getItem('roue_salon_deja_joue');
    if (dejaJoue) {
        resultText.innerHTML = `<strong>Rappel de votre participation</strong><br>Votre privilège a déjà été attribué pour cette visite.`;
        document.querySelector(".result-icon").innerText = "🔒";
        resultBox.classList.remove("hidden");
        return;
    }

    isSpinning = true;
    resultBox.classList.add("hidden");

    const winningIndex = getStrictRandomIndex();
    const baseRotations = 2160; 
    const targetAngle = (numSegments - winningIndex) * (360 / numSegments) - 90;
    
    currentRotation += baseRotations + targetAngle - (currentRotation % 360);
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const item = prizes[winningIndex];
        resultText.innerHTML = item.isWin ? `<strong>FÉLICITATIONS !</strong><br>${item.msg}` : item.msg;
        document.querySelector(".result-icon").innerText = item.isWin ? "🎁" : "✨";
        
        resultBox.classList.remove("hidden");
        isSpinning = false;
        localStorage.setItem('roue_salon_deja_joue', item.label);
    }, 6000); 
}

window.onload = function() {
    const dejaJoue = localStorage.getItem('roue_salon_deja_joue');
    if (dejaJoue) {
        document.getElementById('step-avis').classList.add('hidden-step');
        document.getElementById('step-roue').classList.remove('hidden-step');
        drawWheel();
        const resultBox = document.getElementById("result-box");
        const resultText = document.getElementById("result-text");
        resultText.innerHTML = `<strong>Merci pour votre fidélité !</strong><br>Votre participation a déjà été validée pour aujourd'hui.`;
        document.querySelector(".result-icon").innerText = "🔒";
        resultBox.classList.remove("hidden");
    } else {
        drawWheel();
    }
};
