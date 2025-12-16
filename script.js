// Selecteer de "Gooien!" knop binnen de sectie met id "dobbelstenen"
const gooiKnop = document.querySelector('#dobbelstenen button');
const dobbelsteenElementen = document.querySelectorAll('.die');

// Functie die een array met 5 willekeurige dobbelsteenwaarden retourneert
function gooiDobbelstenen() {
    const dobbelstenen = [];
    for (let i = 0; i < 5; i++) {
        dobbelstenen.push(Math.floor(Math.random() * 6) + 1);
    }
    return dobbelstenen;
}

// Event listener voor de klik op de knop
gooiKnop.addEventListener('click', () => {
    const worp = gooiDobbelstenen();
    console.log(worp); // Log de array in de console zoals gevraagd
    // Update de UI met de geworpen waarden
    worp.forEach((waarde, index) => {
        if (dobbelsteenElementen[index]) {
            dobbelsteenElementen[index].textContent = waarde;
        }
    });

    // Tel hoe vaak ieder oog is gegooid
    const telling = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    worp.forEach(oog => {
        telling[oog]++;
    });

    // Vul de scoretabel deel 1 (Bovenste gedeelte)
    const categorieMap = {
        'enen': 1,
        'tweeën': 2,
        'drieën': 3,
        'vieren': 4,
        'vijven': 5,
        'zessen': 6
    };

    for (const [key, value] of Object.entries(categorieMap)) {
        const score = telling[value] * value;
        const scoreCel = document.querySelector(`[data-score="${key}"]`);
        if (scoreCel) {
            scoreCel.textContent = score;
        }
    }

    // De worp verwerken deel 2 (Onderste gedeelte)
    const totaalOgen = worp.reduce((acc, val) => acc + val, 0);
    const counts = Object.values(telling);

    // Drie dezelfde (Three of a Kind)
    const threeOfAKind = counts.some(count => count >= 3);
    document.querySelector('[data-score="drie-dezelfde"]').textContent = threeOfAKind ? totaalOgen : 0;

    // Vier dezelfde (Four of a Kind)
    const fourOfAKind = counts.some(count => count >= 4);
    document.querySelector('[data-score="vier-dezelfde"]').textContent = fourOfAKind ? totaalOgen : 0;

    // Full House (3 van één getal en 2 van een ander)
    const fullHouse = counts.includes(3) && counts.includes(2);
    document.querySelector('[data-score="full-house"]').textContent = fullHouse ? 25 : 0;

    // Kleine straat (4 opeenvolgende getallen)
    // We maken een string van unieke gesorteerde waarden (bijv. "1234")
    const uniekeWorp = [...new Set(worp)].sort((a, b) => a - b).join('');
    const kleineStraat = /1234|2345|3456/.test(uniekeWorp);
    document.querySelector('[data-score="kleine-straat"]').textContent = kleineStraat ? 30 : 0;

    // Grote straat (5 opeenvolgende getallen)
    const groteStraat = /12345|23456/.test(uniekeWorp);
    document.querySelector('[data-score="grote-straat"]').textContent = groteStraat ? 40 : 0;

    // Yahtzee (5 dezelfde)
    const yahtzee = counts.includes(5);
    document.querySelector('[data-score="yahtzee"]').textContent = yahtzee ? 50 : 0;

    // Kans (Som van alle ogen)
    document.querySelector('[data-score="kans"]').textContent = totaalOgen;
});
