* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Playfair Display', 'Arial', sans-serif;
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: #222;
}

.container {
    text-align: center;
    padding: 20px;
    max-width: 500px;
    width: 100%;
}

h1 {
    font-size: 26px;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

.subtitle {
    font-style: italic;
    color: #666;
    margin-bottom: 30px;
}

/* Zone de la roue */
.wheel-box {
    position: relative;
    width: 340px;
    height: 340px;
    margin: 0 auto;
}

/* Flèche du haut */
.pointer {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 25px solid #d4af37;
    z-index: 10;
}

/* La Roue Ronde */
.wheel {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 6px solid #222;
    position: relative;
    overflow: hidden;
    transition: transform 5s cubic-bezier(0.2, 0.8, 0.2, 1);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

/* Découpage des 8 parts (360° / 8 = 45°) */
.segment {
    position: absolute;
    width: 50%;
    height: 50%;
    background: var(--bg);
    transform-origin: bottom right;
    transform: rotate(calc(45deg * var(--i)));
}

.segment span {
    position: absolute;
    bottom: 25px;
    right: 15px;
    transform: rotate(55deg);
    color: var(--text);
    font-weight: bold;
    font-size: 10px;
    letter-spacing: 1px;
    white-space: nowrap;
}

/* Bouton Central Chic */
.spin-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75px;
    height: 75px;
    background: #fff;
    border: 4px solid #222;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
    font-size: 11px;
    letter-spacing: 1px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 5;
}

.spin-btn:active {
    transform: translate(-50%, -50%) scale(0.95);
}

/* Message de gain */
#result {
    margin-top: 40px;
    font-size: 20px;
    font-weight: bold;
    min-height: 50px;
    color: #222;
    padding: 10px;
    border-radius: 5px;
}
