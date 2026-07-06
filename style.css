let isSpinning = false;
let currentRotation = 0;

function spin() {
    if (isSpinning) return;
    isSpinning = true;

    const wheel = document.getElementById("wheel");
    const resultDiv = document.getElementById("result");
    resultDiv.style.background = "transparent";
    resultDiv.innerText = "";

    // Choix aléatoire du lot (0 à 7)
    const prizeIndex = Math.floor(Math.random() * 8);
    
    // Calcul de l'angle précis pour tomber au milieu de la case sélectionnée
    // On ajoute 5 tours complets (1800°) pour l'effet de vitesse
    const degreesPerSegment = 45;
    const baseRotation = 1800; 
    
    // L'alignement dépend de l'ordre des cases dans le HTML
    currentRotation += baseRotation + (prizeIndex * degreesPerSegment) - (currentRotation % 360);
    
    wheel.style.transform = `rotate(-${currentRotation}deg)`;

    // Les textes correspondants aux 8 cases
    const prizes = [
        { text: "❌ Pas cette fois ! Merci pour votre participation.", win: false },
        { text: "🎁 Félicitations ! Vous gagnez -10% sur votre prochaine prestation !", win: true },
        { text: "❌ Presque ! Merci d'avoir partagé votre avis.", win: false },
        { text: "🧴 Merveilleux ! Un shampooing de la gamme AVEDA vous est offert !", win: true },
        { text: "❌ Dommage ! Merci pour votre gentillesse.", win: false },
        { text: "✨ Magnifique ! Un shampooing de la gamme Américaine Schwarzkopf (déposée) vous est offert !", win: true },
        { text: "❌ Ce sera pour une prochaine fois ! Merci beaucoup.", win: false },
        { text: "💆‍♀️ Exceptionnel ! Un soin profond personnalisé vous est offert !", win: true }
    ];

    setTimeout(() => {
        const finalPrize = prizes[prizeIndex];
        resultDiv.innerText = finalPrize.text;
        if (finalPrize.win) {
            resultDiv.style.background = "#dfb73c44"; // Surlignage doré si gagné
        }
        isSpinning = false;
    }, 5000); // L'affichage se fait après les 5 secondes de rotation
}
