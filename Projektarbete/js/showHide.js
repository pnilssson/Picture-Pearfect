let menuSection, fruit, animal, number, easy, medium, hard, swedish,
    english, stats, startGame, gameSection, restart, playMenu;

menuSection = document.getElementById("menu-section");
fruit = document.getElementById("fruit");
animal = document.getElementById("animal");
number = document.getElementById("number");
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

let fruitSelected = Boolean(false);
let animalSelected = Boolean(false);
let numberSelected = Boolean(false);

let difficulty = 0;

fruit.addEventListener('click', function(){
    fruitSelected = !fruitSelected;
    fruit.style.border = '2px solid darkseagreen';
    animalSelected = Boolean(false);
    animal.style.border = '';
    numberSelected = Boolean(false);
    number.style.border = '';
});

animal.addEventListener('click', function(){
    animalSelected = !animalSelected;
    animal.style.border = '2px solid darkseagreen';
    fruitSelected = Boolean(false);
    fruit.style.border = '';
    numberSelected = Boolean(false);
    number.style.border = '';
});

number.addEventListener('click', function(){
    numberSelected = !numberSelected;
    number.style.border = '2px solid darkseagreen';
    animalSelected = Boolean(false);
    animal.style.border = '';
    fruitSelected = Boolean(false);
    fruit.style.border = '';
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
    difficulty = 7;
});

hard.addEventListener('click', function(){
    hard.style.background = 'darkseagreen';
    easy.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7892c2), color-stop(1, #476e9e))";
    medium.style.background = "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ffec64), color-stop(1, #ffab23))";
    difficulty = 0;
    difficulty = 1;
});



startGame.addEventListener('click', function () {
    menuSection.style.display = "none";
    playMenu.style.display = "flex";
    gameSection.style.display = "block";
    if(fruitSelected && difficulty !== 0){
        createMemoryGame(fruitArray, difficulty);
    }else if(animalSelected && difficulty !== 0){
        createMemoryGame(animalArray, difficulty);
    }else if(numberSelected && difficulty !== 0){
        createMemoryGame(numbersArray, difficulty);
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