let menuSection, fruit, animal, number,  easy, medium, hard, swedish,
    english, stats, startGame, gameSection, restart,runAgain, playMenu;

menuSection = document.getElementById("menu-section");
fruit = document.getElementById("fruit-btn");
animal = document.getElementById("animal-btn");
number = document.getElementById("number-btn");
easy = document.getElementById("easy");
medium = document.getElementById("medium");
hard = document.getElementById("hard");
swedish = document.getElementById("swedish");
english = document.getElementById("english");
stats = document.getElementById("stats");
startGame = document.getElementById("start-game");
restart = document.getElementById("restart");
gameSection = document.getElementById("game-section");
playMenu = document.getElementById("menu-while-playing");
runAgain = document.getElementById("runAgain");

let fruitSelected = Boolean(false);
let animalSelected = Boolean(false);
let numberSelected = Boolean(false);

let difficulty = 0;

let englishSelected = Boolean(false);
let swedishSelected = Boolean(false);
fruit.addEventListener('click', function(){
    fruitSelected = !fruitSelected;
    fruit.style.background = "darkseagreen";
    animalSelected = Boolean(false);
    animal.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #2dabf9), color-stop(1, #0688fa))';
    numberSelected = Boolean(false);
    number.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #2dabf9), color-stop(1, #0688fa))';
});

animal.addEventListener('click', function(){
    animalSelected = !animalSelected;
    animal.style.background = 'darkseagreen';
    fruitSelected = Boolean(false);
    fruit.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #2dabf9), color-stop(1, #0688fa))';
    numberSelected = Boolean(false);
    number.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #2dabf9), color-stop(1, #0688fa))';
});

number.addEventListener('click', function(){
    numberSelected = !numberSelected;
    number.style.background = 'darkseagreen';
    animalSelected = Boolean(false);
    animal.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #2dabf9), color-stop(1, #0688fa))';
    fruitSelected = Boolean(false);
    fruit.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #2dabf9), color-stop(1, #0688fa))';
});

easy.addEventListener('click', function(){
    easy.style.background = 'darkseagreen';
    medium.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ffec64), color-stop(1, #ffab23))";
    hard.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f24537), color-stop(1, #c62d1f))';
    difficulty = 0;
    difficulty = 9;
});

medium.addEventListener('click', function(){
    medium.style.background = 'darkseagreen';
    easy.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7892c2), color-stop(1, #476e9e))";
    hard.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f24537), color-stop(1, #c62d1f))';
    difficulty = 0;
    difficulty = 5;
});

hard.addEventListener('click', function(){
    hard.style.background = 'darkseagreen';
    easy.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7892c2), color-stop(1, #476e9e))";
    medium.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ffec64), color-stop(1, #ffab23))";
    difficulty = 0;
    difficulty = 1;
});

swedish.addEventListener('click', function () {
    swedishSelected = !swedishSelected;
    swedish.style.border = '2px solid darkseagreen';
    englishSelected = false;
    english.style.border = '';
});

english.addEventListener('click', function () {
    englishSelected = !englishSelected;
    english.style.border = '2px solid darkseagreen';
    swedishSelected = false;
    swedish.style.border = '';
});

startGame.addEventListener('click', function () {
    menuSection.style.display = "none";
    playMenu.style.display = "flex";
    gameSection.style.display = "block";
    if(fruitSelected && difficulty !== 0){
        if(swedishSelected){
            createMemoryGame(fruitArray, difficulty);
        }else{
            createMemoryGame(fruitArrayEng, difficulty);
        }
    }else if(animalSelected && difficulty !== 0){
        if(swedishSelected){
            createMemoryGame(animalArray, difficulty);
        } else {
            createMemoryGame(animalArrayEng, difficulty);
        }
    }else if(numberSelected && difficulty !== 0){
        if (swedishSelected) {
            createMemoryGame(numbersArray, difficulty);
        } else {
            createMemoryGame(numbersArrayEng, difficulty);
        }
    }else{
        alert('Var vänlig välj vilka brickor & vilken svårighetsgrad du vill spela med.');
        menuSection.style.display = "grid";
        playMenu.style.display = "none";
        gameSection.style.display = "none";
    }
});

restart.addEventListener('click', function () {
    menuSection.style.display = "grid";
    playMenu.style.display = "none";
    gameSection.style.display = "none";
});

runAgain.addEventListener('click', function () {
    removeGrid();
    if(fruitSelected && difficulty !== 0){
        createMemoryGame(fruitArray, difficulty);
    }else if(animalSelected && difficulty !== 0){
        createMemoryGame(animalArray, difficulty);
    }else if(numberSelected && difficulty !== 0) {
        createMemoryGame(numbersArray, difficulty);
    }
});

function removeGrid(){
    let amountOfCard = document.querySelectorAll('#cardDiv').length;
    console.log(amountOfCard);
    for(let i = 0; i < amountOfCard; i++){
        let gameCard = document.getElementById("cardDiv");
        gameCard.remove();
    }
}
