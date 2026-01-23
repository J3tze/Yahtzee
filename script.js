const dice1 = document.getElementById('dice-1');
const dice2 = document.getElementById('dice-2');
const dice3 = document.getElementById('dice-3');
const dice4 = document.getElementById('dice-4');
const dice5 = document.getElementById('dice-5');
const gooiButton = document.getElementById('gooi-button');

function gooiDobbelstenen() {
    let dobbelstenen = [];
    for (let i = 0; i < 5; i++) {
        let randomNummer = Math.floor(Math.random() * 6) + 1;
        console.log(randomNummer);
        dobbelstenen.push(randomNummer);
    }
    return dobbelstenen;
}

/// Dice Counter
function telDobbelstenen(dobbelstenen) {
    let telling = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (let i = 0; i < dobbelstenen.length; i++) {
        let waarde = dobbelstenen[i];
        telling[waarde]++;
    }
    return telling;
}

function berekenSom(dobbelstenen) {
    let som = 0;
    for (let i = 0; i < dobbelstenen.length; i++) {
        som += dobbelstenen[i];
    }
    return som;
}

function berekenOgen(telling, oogwaarde) {
    return telling[oogwaarde] * oogwaarde;
}

function toonScores(dobbelstenen) {
    let telling = telDobbelstenen(dobbelstenen);
    document.getElementById('Enen').textContent = berekenOgen(telling, 1);
    document.getElementById('Tweeen').textContent = berekenOgen(telling, 2);
    document.getElementById('Drieën').textContent = berekenOgen(telling, 3);
    document.getElementById('Vieren').textContent = berekenOgen(telling, 4);
    document.getElementById('Vijven').textContent = berekenOgen(telling, 5);
    document.getElementById('Zessen').textContent = berekenOgen(telling, 6);
}

function toonDobbelstenen(dobbelstenen) {
    document.getElementById('dice-1').textContent = dobbelstenen[0];
    document.getElementById('dice-2').textContent = dobbelstenen[1];
    document.getElementById('dice-3').textContent = dobbelstenen[2];
    document.getElementById('dice-4').textContent = dobbelstenen[3];
    document.getElementById('dice-5').textContent = dobbelstenen[4];
}



gooiButton.addEventListener('click', function () {
    let resultaat = gooiDobbelstenen();
    toonDobbelstenen(resultaat);
    toonScores(resultaat);  // ← Add this line!
});