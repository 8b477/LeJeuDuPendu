/*
Utiliser un tableau pour stocker des mots à faire deviner au joueur.
Selectionner aléatoirement dans notre tableau un mot à faire deviner.
Permettre à l'utilisateur d'entrer une lettre
Recuperer la lettre entrée par l'utilisateur
Verifier si la lettre est contenue dans le mot à faire deviner

Penser à gerer le cas où la lettre est contenue plusieurs fois dans le mot !!

Afficher à la bonne position la ou les lettres trouvées par l'utilisateur qui composent le mot à faire deviner
Si la lettre n'est pas contenue dans le mot à faire deviner, afficher un message à l'utilisateur
Si l'utilisateur trouve le mot juste, afficher un message et générer un nouveau mot aléatoire
Si l'utilisateur échoue à trouver le mot juste et est à court de tentatives, afficher le mot à faire deviner ainsi qu'un message indiquant à l'utilisateur qu'il a perdu
L'utilisateur doit avoir un nombre maximum de tentatives pour deviner chaque mot ( 6 par exemple )
 */

const popWord = document.getElementById('popWord');
const numberWin = document.getElementById('win');
const numberTry = document.getElementById('numbertry');
const divPopImg = document.getElementById('img');
const valueInput = document.getElementById('guess');

const btnClick = document.getElementById('try');
const btnReset = document.getElementById('reset');

const guessWord = [
    "test",
    "formation",
    "belgique",
    "chien",
    "maison",
    "singe",
]

const tablePicture =[
    "pendu1.png",
    "pendu2.png",
    "pendu3.png",
    "pendu4.png",
    "pendu5.png",
    "pendu6.png",
    "pendu7.png",
]



let tryLetter = [];

let wordActuel;

let countWin = 0;
let countLoose = 10;

//function for take a random word in my table guessWord
function getRandomWord() {
    const randy = Math.floor(Math.random() * guessWord.length)
    wordActuel = guessWord[randy]
    return wordActuel;
}

// loop 'for in' draw the word and add class + id
function drawWord(word) {

    for (let letter in word) {

        const div = document.createElement('div');
        div.classList = "letterToGuess";
        div.id = letter;
        popWord.appendChild(div);
    }

}

drawWord(getRandomWord());


btnClick.addEventListener('click', function () {

    if (!tryLetter.includes(valueInput.value.toLowerCase())) {
        tryLetter.push(valueInput.value.toLowerCase());

        if (wordActuel.includes(valueInput.value.toLowerCase())) {
            for (let letter in wordActuel) {

                if (valueInput.value.toLowerCase() === wordActuel[letter]) {
                    const guessedLetter = document.getElementById(letter.toString());
                    guessedLetter.innerHTML = wordActuel[letter];
                    guessedLetter.classList = "guessLetter";
                    countWin++;
                    numberWin.innerHTML = "nombre de lettre trouver : " +countWin;

                    if (countWin === wordActuel.length) {
                        alert("Win !!")
                    }
                }
            }
        }
        else{
            countLoose--;
            numberTry.innerHTML = "Nombre d'éssaye restant : " + countLoose;
            let createImg = document.createElement('img');
            createImg.src = "./images/" + tablePicture[0];
            divPopImg.appendChild(createImg);
            if(createImg.src.includes("./images/" + tablePicture[0])){
                alert("dozeeee")
            }
            if(countLoose === 0){
                alert("PERDU!")
                numberTry.innerHTML = "Nombre d'éssaye restant : " + countLoose;
            }
        }
    }
})

btnReset.addEventListener('click', reset)

function reset(){
    countWin = 0;
    countLoose = 10;
    tryLetter =[];
    popWord.innerHTML = "";
    valueInput.value = "";
    drawWord(getRandomWord());
}

//CTRL ALT L