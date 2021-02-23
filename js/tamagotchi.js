/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/
/*global Audio: false */

// Dit zijn de elementen uit de DOM die ik wil manipuleren
var voeden = document.querySelector('#voed');
var aandachtGeven = document.querySelector('#aandacht');
var drinkenGeven = document.querySelector('#drinken');
var stemAfspelen = document.querySelector('body');
var score = document.querySelector('#score');

// Deze array bevat de png's met vrolijke emotie van de 4 verschillende characters
var vrolijk = ['vrolijk - 1.png', 'vrolijk - 2.png', 'vrolijk - 3.png', 'vrolijk - 4.png'];

// Deze array bevat de png's met neutrale emotie van de 4 verschillende characters
var neutraal = ['neutraal - 1.png', 'neutraal - 2.png', 'neutraal - 3.png', 'neutraal - 4.png'];

// Deze array bevat de png's met humeurige emotie van de 4 verschillende characters
var humeurig = ['humeurig - 1.png', 'humeurig - 2.png', 'humeurig - 3.png', 'humeurig - 4.png'];

// Deze array bevat de png's met het dode character, van de 4 verschillende characters
var dood = ['dood - 1.png', 'dood - 2.png', 'dood - 3.png', 'dood - 4.png'];

// Deze array bevat de selectors in CSS, die de achtergrond van de tamagotchi gaat bepalen
var achtergrond = ['office', 'modern', 'himym', 'friends'];

//Deze arrays bevatten de audio elementen van de verschillende characters
var stem_poppetje1 = ['office1.mp3', 'office2.mp3', 'office3.mp3'];
var stem_poppetje2 = ['modern1.mp3', 'modern2.mp3', 'modern3.mp3'];
var stem_poppetje3 = ['himym1.mp3', 'himym2.mp3', 'himym3.mp3'];
var stem_poppetje4 = ['friends1.mp3', 'friends2.mp3', 'friends3.mp3'];

// Kiest een random getal van 0 tm 3, dit getal wordt gebruikt om de character te bepalen, de achtergrond en welke audio er wordt gebruikt
var poppetje = Math.floor(Math.random() * 4);

//Hier maak ik de variabele mood (numeric), hiermee ga ik later bepalen welke mood de character is, om zo de png's mee te laten veranderen
var mood = 1;

//Dit zijn de variabelen (numeric) die langzaam achteruit gaan in de setinterval
var voed = 700;
var aandacht = 700;
var drinken = 700;

//Dit is de vraiabele (boolean) die bepaald of of de character dood of levend is
var levend = true;

//Deze variabele ga ik later vullen met een audio element als waarde, afhankelijk van welke character actief is
var audio;

function stand() {
    //Als deze functie wordt aangesproken, worden er een bepaald aantal punten van voed, aandacht en drinken afgehaald
    voed = voed - 10;
    aandacht = aandacht - 30;
    drinken = drinken - 20;

    //Als voed, aandacht en drinken onder een bepaald aantal punten komt, wordt dit in de H1 score getoond, en wordt de mood met 1 verhoogd
    if (drinken > 400 && voed > 200 && aandacht > 450) {
        mood = 1;
        score.textContent = "Eten: " + (voed) + " Aandacht: " + (aandacht) + " Drinken: " + (drinken);
    }
    if ((drinken < 400 || voed < 400 || aandacht < 400) && levend) {
        mood = 2;
        score.textContent = "Eten: " + (voed) + " Aandacht: " + (aandacht) + " Drinken: " + (drinken);
    }
    if ((drinken < 200 || voed < 200 || aandacht < 200) && levend) {
        mood = 3;
        score.textContent = "Eten: " + (voed) + " Aandacht: " + (aandacht) + " Drinken: " + (drinken);
    }
    if ((drinken < 0 || voed < 0 || aandacht < 0) && levend) {
        mood = 4;
        score.textContent = "Je bent dood!";
    }

    //Als mood wordt verhoogd, wordt er een andere emotie van de character getoond, bij mood 1 wordt ook gelijk de achtergrond bepaald en bij mood 4 wordt levend op false gezet
    if (mood === 1) {
        document.querySelector("img").src = "images/" + vrolijk[poppetje];
        document.querySelector("body").classList.add(achtergrond[poppetje]);
    }
    if (mood === 2) {
        document.querySelector("img").src = "images/" + neutraal[poppetje];
    }
    if (mood === 3) {
        document.querySelector("img").src = "images/" + humeurig[poppetje];
    }
    if (mood === 4) {
        document.querySelector("img").src = "images/" + dood[poppetje];
        levend = false;
    }

}
//Met deze setInterval wordt elke seconde de functie stand aangesproken
setInterval(stand, 1000);


//In deze functie wordt er gekeken of levend op true staat en welke waarde de parameter heeft gekregen, als dat het geval is wordt er 200 opgeteld bij de var die bij de waarde hoort, daarna wordt de div voor de animatie leeggehaald en direct daarna gevuld met de juiste animatie
function levelPlus(waarde) {
    if (levend && waarde === 1) {
        voed = voed + 200;
        document.querySelector('div').classList = ("");
        setTimeout(function () {
            document.querySelector('div').classList.add("eten_anim");
        }, 0);
    }
    if (levend && waarde === 2) {
        aandacht = aandacht + 200;
        document.querySelector('div').classList = ("");
        setTimeout(function () {
            document.querySelector('div').classList.add("aandacht_anim");
        }, 0);
    }
    if (levend && waarde === 3) {
        drinken = drinken + 200;
        document.querySelector('div').classList = ("");
        setTimeout(function () {
            document.querySelector('div').classList.add("drinken_anim");
        }, 0);
    }
}

//Met deze eventlisteners worden op de click voeden, aandachtGeven en drinkengeven (buttons), de functie levelPlus aangesproken

voeden.addEventListener("click", function () {
    levelPlus(1);
});

aandachtGeven.addEventListener("click", function () {
    levelPlus(2);
});

drinkenGeven.addEventListener("click", function () {
    levelPlus(3);
});

//Er wordt een random getal van 0 tm 2 gemaakt, als levend true is, wordt er een switch statement gebruikt om te kijken welke character actief is, als die gevonden is, selecteer ik een random audio element uit de array die bij de actieve character hoort
function afspelen() {
    var stemRandom = Math.floor(Math.random() * 3);
    if (levend) {
        switch (poppetje) {
            case 0:
                audio = new Audio('images/' + stem_poppetje1[stemRandom]);
                break;
            case 1:
                audio = new Audio('images/' + stem_poppetje2[stemRandom]);
                break;
            case 2:
                audio = new Audio('images/' + stem_poppetje3[stemRandom]);
                break;
            case 3:
                audio = new Audio('images/' + stem_poppetje4[stemRandom]);
                break;
        }
        audio.play();
    }
}

//Met deze eventlistener wordt met de keyup stemAfspelen, de functie afspelen aangesproken
stemAfspelen.addEventListener('keyup', afspelen);
