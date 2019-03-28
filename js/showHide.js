let menuSection, fruit, animal, number,  easy, medium, hard, swedish,
    english, stats, startGame, gameSection, restart,runAgain, playMenu, scorePanel, modal, highScores, closeModal, soundOpt;

menuSection = document.getElementById("menu-section");
fruit = document.getElementById("fruit-btn");
animal = document.getElementById("animal-btn");
number = document.getElementById("number-btn");
easy = document.getElementById("easy");
medium = document.getElementById("medium");
hard = document.getElementById("hard");
swedish = document.getElementById("swedish-flag");
english = document.getElementById("uk-flag");
stats = document.getElementById("stats");
startGame = document.getElementById("start-game");
restart = document.getElementById("restart");
gameSection = document.getElementById("game-section");
playMenu = document.getElementById("menu-while-playing");
runAgain = document.getElementById("runAgain");
scorePanel = document.getElementById("score-panel");
modal = document.getElementById("myModal");
highScores = document.getElementById("highScores");
closeModal = document.getElementById("closeModal");
soundOpt = document.getElementById("soundOpt");

let fruitSelected = Boolean(false);
let animalSelected = Boolean(false);
let numberSelected = Boolean(false);

let difficulty = 0;

let englishSelected = Boolean(false);
let swedishSelected = Boolean(false);

let noSound = Boolean(false);

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

highScores.addEventListener('click', function () {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', function(){
    modal.style.display = 'none';
});

soundOpt.addEventListener('click', function () {
    if(!noSound){
        noSound = true;
        soundOpt.src = "img/speakerOFF.png";
    } else {
        noSound = false;
        soundOpt.src = "img/speakerON.png";
    }
});

startGame.addEventListener('click', function () {
    menuSection.style.display = "none";
    playMenu.style.display = "flex";
    gameSection.style.display = "block";
    if(fruitSelected && difficulty !== 0){
        scorePanel.style.display = "flex";
        if(swedishSelected){
            createMemoryGame(fruitArray, difficulty, fruitAudioArray);
        }else{
            createMemoryGame(fruitArrayEng, difficulty, fruitAudioArrayENG);
        }
    }else if(animalSelected && difficulty !== 0){
        scorePanel.style.display = "flex";
        if(swedishSelected){
            createMemoryGame(animalArray, difficulty, animalAudioArray);
        } else {
            createMemoryGame(animalArrayEng, difficulty, animalAudioArrayENG);
        }
    }else if(numberSelected && difficulty !== 0){
        scorePanel.style.display = "flex";
        if (swedishSelected) {
            createMemoryGame(numbersArray, difficulty, numberAudioArray);
        } else {
            createMemoryGame(numbersArrayEng, difficulty, numberAudioArrayENG);
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
    scorePanel.style.display = "none";
});

runAgain.addEventListener('click', function () {
    removeGrid();
    if(fruitSelected && difficulty !== 0){
        scorePanel.style.display = "flex";
        congratulationMsg.style.display = "none";
        congratulationMsg.innerHTML = "";
        winCond = 0;
        if(swedishSelected){
            createMemoryGame(fruitArray, difficulty, fruitAudioArray);
        } else {
            createMemoryGame(fruitArrayEng, difficulty, fruitAudioArrayENG)
        }
    }else if(animalSelected && difficulty !== 0){
        scorePanel.style.display = "flex";
        congratulationMsg.style.display = "none";
        congratulationMsg.innerHTML = "";
        winCond = 0;
        if(swedishSelected){
            createMemoryGame(animalArray, difficulty, animalAudioArray);
        } else {
            createMemoryGame(animalArrayEng, difficulty, animalAudioArrayENG)
        }
    }else if(numberSelected && difficulty !== 0) {
        scorePanel.style.display = "flex";
        congratulationMsg.style.display = "none";
        congratulationMsg.innerHTML = "";
        winCond = 0;
        if(swedishSelected){
            createMemoryGame(numbersArray, difficulty, numberAudioArray);
        } else {
            createMemoryGame(numbersArrayEng, difficulty, numberAudioArrayENG)
        }
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
