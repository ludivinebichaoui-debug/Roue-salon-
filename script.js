let isSpinning = false;

function spin() {
    if (isSpinning) return; // Empêche de relancer pendant que ça tourne
    isSpinning = true;

    const wheel = document.getElementById("wheel");
    const resultDiv = document.getElementById("result");
    
    resultDiv.innerText = ""; // On efface le résultat précédent

    // Génère un nombre aléatoire entre 0 et 100 pour déterminer le lot
    let rand = Math.random() * 100;
    let resultText = "";
    let targetAngle = 0;

    // Calcul des angles pour que la flèche s'arrête sur la bonne couleur
    // Note : On ajoute 3600 degrés (10 tours complets) pour l'effet visuel
    if (rand < 50) {
        resultText = "❌ Pas cette fois";
        targetAngle = 3600 + 72; // Part Rouge
    } else if (rand < 70) {
        resultText = "🎁 Masque profond personnalisé offert !";
        targetAngle = 3600 + 0;  // Part Violette
    } else if (rand < 83) {
        resultText = "💇‍♂️ -10% sur votre prochaine prestation (valable 2 mois)";
        targetAngle = 3600 + 288; // Part Orange
    } else if (rand < 93) {
        resultText = "🧴 Shampooing adapté offert !";
        targetAngle = 3600 + 216; // Part Bleue
    } else {
        resultText = "✨ Shampooing Aveda offert !";
        targetAngle = 3600 + 144; // Part Verte
    }

    // Fait tourner la roue visuellement
    wheel.style.transform = `rotate(${targetAngle}deg)`;

    // Attend la fin de l'animation (4 secondes) pour afficher le texte
    setTimeout(() => {
        resultDiv.innerText = resultText;
        isSpinning = false;
    }, 4000);
}
