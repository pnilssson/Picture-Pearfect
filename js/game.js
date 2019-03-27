var highScoreEasy1 = 15;
var highScoreEasy2 = 20;
var highScoreEasy3 = 25;

var highScoreMed1 = 20;
var highScoreMed2 = 25;
var highScoreMed3 = 30;

var highScoreHard1 = 25;
var highScoreHard2 = 30;
var highScoreHard3 = 35;
localStorage.setItem('highScoreEasy1', highScoreEasy1);
localStorage.setItem('highScoreEasy2', highScoreEasy2);
localStorage.setItem('highScoreEasy3', highScoreEasy3);

localStorage.setItem('highScoreMed1', highScoreMed1);
localStorage.setItem('highScoreMed2', highScoreMed2);
localStorage.setItem('highScoreMed3', highScoreMed3);

localStorage.setItem('highScoreHard1', highScoreHard1);
localStorage.setItem('highScoreHard2', highScoreHard2);
localStorage.setItem('highScoreHard3', highScoreHard3);

var highScoreEasyEng1 = 15;
var highScoreEasyEng2 = 20;
var highScoreEasyEng3 = 25;

var highScoreMedEng1 = 20;
var highScoreMedEng2 = 25;
var highScoreMedEng3 = 30;

var highScoreHardEng1 = 25;
var highScoreHardEng2 = 30;
var highScoreHardEng3 = 35;
localStorage.setItem('highScoreEasyEng1', highScoreEasyEng1);
localStorage.setItem('highScoreEasyEng2', highScoreEasyEng2);
localStorage.setItem('highScoreEasyEng3', highScoreEasyEng3);

localStorage.setItem('highScoreMedEng1', highScoreMedEng1);
localStorage.setItem('highScoreMedEng2', highScoreMedEng2);
localStorage.setItem('highScoreMedEng3', highScoreMedEng3);

localStorage.setItem('highScoreHardEng1', highScoreHardEng1);
localStorage.setItem('highScoreHardEng2', highScoreHardEng2);
localStorage.setItem('highScoreHardEng3', highScoreHardEng3);


const grid = document.createElement("div");
grid.setAttribute('class', 'grid');

gameSection.appendChild(grid);
let winCond = 0;

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

let audio = '';
let selectedArray = [];

const createMemoryGame = (array, difficulty, soundArray) => {
    let newArray = array.slice((difficulty - 1));
    newArray.sort(() => 0.5 - Math.random());

    selectedArray = soundArray;

    for(let i = 0; i < newArray.length; i++){
        let item = newArray[i];
        // Create card element with the name dataset
        const card = document.createElement('div');
        card.setAttribute("id", "cardDiv");
        card.classList.add('card');
        card.dataset.name = item.name;

        // Create front of card
        const front = document.createElement('div');
        front.classList.add('front');

        // Create back of card, which contains
        const back = document.createElement('div');
        back.classList.add('back');
        back.style.background = `url(${item.img})` + 'no-repeat center center / contain';

        // Append card to grid, and front and back to each card
        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);

        // reset moves
        moves = 0;
        counter.innerHTML = moves;

        //reset timer
        second = 0;
        minute = 0;
        hour = 0;
        var timer = document.querySelector(".timer");
        timer.innerHTML = "0 mins 0 secs";
        clearInterval(interval);
    }
    for(let j = 0; j<selectedArray.length; j++){
        let sound = selectedArray[j];

        audio = document.createElement('audio');
        audio.setAttribute('id', 'audioElement');
        audio.classList.add('audio');
        audio.dataset.name = sound.name;

        audio.style.display = "none";
        audio.autoplay = true;

        grid.appendChild(audio);
    }
};

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
// Add event listener to grid
grid.addEventListener('click', function (event) {
    // The event target is our clicked item
    let clicked = event.target;

    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.className === 'grid' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
    }
    // Add selected class
    if (count < 2) {
        count++;
        // Call for moveCounter function to count moves per game
        moveCounter();
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }
        // If both guesses are not empty...
        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                if(noSound!=true){
                    runSound();
                }
                setTimeout(match, delay);
                setTimeout(doNotResetMatch, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        // Set previous target to clicked
        previousTarget = clicked;
    }
});

function runSound(){
    audio.dataset.name = secondGuess;
    console.log(audio.dataset.name);

    for (let k = 0; k<selectedArray.length; k++){
        if(selectedArray[k].name===audio.dataset.name){
            console.log(selectedArray[k].name===audio.dataset.name);
            console.log(selectedArray[k].audio);
            var sound = document.getElementById('audioElement');
            sound.src = selectedArray[k].audio;
            sound.play();
        }
    }
}

const match = () => {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
    winChecker();
};

let resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

const doNotResetMatch = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
};

// @description count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

const congratulationMsg = document.getElementById("congratulation-msg");
const winChecker = () => {
    if(swedishSelected) {
        if (difficulty == 9) {
            winCond += 2;
            if (winCond == 12) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                var newScore = moves;
                var retrieved1 = parseInt(localStorage.getItem('highScoreEasy1'), 10);
                var retrieved2 = parseInt(localStorage.getItem('highScoreEasy2'), 10);
                var retrieved3 = parseInt(localStorage.getItem('highScoreEasy3'), 10);
                console.log(retrieved1, retrieved2, retrieved3);
                if (newScore <= retrieved1) {
                    retrieved3 = retrieved2;
                    retrieved2 = retrieved1;
                    retrieved1 = newScore;
                    localStorage.setItem('highScoreEasy1', retrieved1);
                    localStorage.setItem('highScoreEasy2', retrieved2);
                    localStorage.setItem('highScoreEasy3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreEasy1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreEasy2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreEasy3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved2) {
                    retrieved3 = retrieved2;
                    retrieved2 = newScore;
                    localStorage.setItem('highScoreEasy1', retrieved1);
                    localStorage.setItem('highScoreEasy2', retrieved2);
                    localStorage.setItem('highScoreEasy3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreEasy1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreEasy2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreEasy3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved3) {
                    retrieved3 = newScore;
                    localStorage.setItem('highScoreEasy1', retrieved1);
                    localStorage.setItem('highScoreEasy2', retrieved2);
                    localStorage.setItem('highScoreEasy3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreEasy1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreEasy2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreEasy3'), 10);
                    console.log(test1, test2, test3);
                }

            }
        }
        if (difficulty == 5) {
            winCond += 2;
            if (winCond == 16) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                var newScore = moves;
                var retrieved1 = parseInt(localStorage.getItem('highScoreMed1'), 10);
                var retrieved2 = parseInt(localStorage.getItem('highScoreMed2'), 10);
                var retrieved3 = parseInt(localStorage.getItem('highScoreMed3'), 10);
                console.log(retrieved1, retrieved2, retrieved3);
                if (newScore <= retrieved1) {
                    retrieved3 = retrieved2;
                    retrieved2 = retrieved1;
                    retrieved1 = newScore;
                    localStorage.setItem('highScoreMed1', retrieved1);
                    localStorage.setItem('highScoreMed2', retrieved2);
                    localStorage.setItem('highScoreMed3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreMed1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreMed2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreMed3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved2) {
                    retrieved3 = retrieved2;
                    retrieved2 = newScore;
                    localStorage.setItem('highScoreMed1', retrieved1);
                    localStorage.setItem('highScoreMed2', retrieved2);
                    localStorage.setItem('highScoreMed3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreMed1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreMed2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreMed3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved3) {
                    retrieved3 = newScore;
                    localStorage.setItem('highScoreMed1', retrieved1);
                    localStorage.setItem('highScoreMed2', retrieved2);
                    localStorage.setItem('highScoreMed3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreMed1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreMed2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreMed3'), 10);
                    console.log(test1, test2, test3);
                }
            }
        }
        if (difficulty == 1) {
            winCond += 2;
            if (winCond == 20) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                var newScore = moves;
                var retrieved1 = parseInt(localStorage.getItem('highScoreHard1'), 10);
                var retrieved2 = parseInt(localStorage.getItem('highScoreHard2'), 10);
                var retrieved3 = parseInt(localStorage.getItem('highScoreHard3'), 10);
                console.log(retrieved1, retrieved2, retrieved3);
                if (newScore <= retrieved1) {
                    retrieved3 = retrieved2;
                    retrieved2 = retrieved1;
                    retrieved1 = newScore;
                    localStorage.setItem('highScoreHard1', retrieved1);
                    localStorage.setItem('highScoreHard2', retrieved2);
                    localStorage.setItem('highScoreHard3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreHard1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreHard2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreHard3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved2) {
                    retrieved3 = retrieved2;
                    retrieved2 = newScore;
                    localStorage.setItem('highScoreHard1', retrieved1);
                    localStorage.setItem('highScoreHard2', retrieved2);
                    localStorage.setItem('highScoreHard3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreHard1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreHard2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreHard3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved3) {
                    retrieved3 = newScore;
                    localStorage.setItem('highScoreHard1', retrieved1);
                    localStorage.setItem('highScoreHard2', retrieved2);
                    localStorage.setItem('highScoreHard3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreHard1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreHard2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreHard3'), 10);
                    console.log(test1, test2, test3);
                }
            }
        }
    }else if(!swedishSelected){
        if (difficulty == 9) {
            winCond += 2;
            if (winCond == 12) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                var newScore = moves;
                var retrieved1 = parseInt(localStorage.getItem('highScoreEasyEng1'), 10);
                var retrieved2 = parseInt(localStorage.getItem('highScoreEasyEng2'), 10);
                var retrieved3 = parseInt(localStorage.getItem('highScoreEasyEng3'), 10);
                console.log(retrieved1, retrieved2, retrieved3);
                if (newScore <= retrieved1) {
                    retrieved3 = retrieved2;
                    retrieved2 = retrieved1;
                    retrieved1 = newScore;
                    localStorage.setItem('highScoreEasyEng1', retrieved1);
                    localStorage.setItem('highScoreEasyEng2', retrieved2);
                    localStorage.setItem('highScoreEasyEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreEasyEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreEasyEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreEasyEng3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved2) {
                    retrieved3 = retrieved2;
                    retrieved2 = newScore;
                    localStorage.setItem('highScoreEasyEng1', retrieved1);
                    localStorage.setItem('highScoreEasyEng2', retrieved2);
                    localStorage.setItem('highScoreEasyEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreEasyEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreEasyEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreEasyEng3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved3) {
                    retrieved3 = newScore;
                    localStorage.setItem('highScoreEasyEng1', retrieved1);
                    localStorage.setItem('highScoreEasyEng2', retrieved2);
                    localStorage.setItem('highScoreEasyEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreEasyEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreEasyEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreEasyEng3'), 10);
                    console.log(test1, test2, test3);
                }


            }
        }
        if (difficulty == 5) {
            winCond += 2;
            if (winCond == 16) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                var newScore = moves;
                var retrieved1 = parseInt(localStorage.getItem('highScoreMedEng1'), 10);
                var retrieved2 = parseInt(localStorage.getItem('highScoreMedEng2'), 10);
                var retrieved3 = parseInt(localStorage.getItem('highScoreMedEng3'), 10);
                console.log(retrieved1, retrieved2, retrieved3);
                if (newScore <= retrieved1) {
                    retrieved3 = retrieved2;
                    retrieved2 = retrieved1;
                    retrieved1 = newScore;
                    localStorage.setItem('highScoreMedEng1', retrieved1);
                    localStorage.setItem('highScoreMedEng2', retrieved2);
                    localStorage.setItem('highScoreMedEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreMedEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreMedEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreMedEng3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved2) {
                    retrieved3 = retrieved2;
                    retrieved2 = newScore;
                    localStorage.setItem('highScoreMedEng1', retrieved1);
                    localStorage.setItem('highScoreMedEng2', retrieved2);
                    localStorage.setItem('highScoreMedEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreMedEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreMedEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreMedEng3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved3) {
                    retrieved3 = newScore;
                    localStorage.setItem('highScoreMedEng1', retrieved1);
                    localStorage.setItem('highScoreMedEng2', retrieved2);
                    localStorage.setItem('highScoreMedEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreMedEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreMedEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreMedEng3'), 10);
                    console.log(test1, test2, test3);
                }
            }
        }
        if (difficulty == 1) {
            winCond += 2;
            if (winCond == 20) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                var newScore = moves;
                var retrieved1 = parseInt(localStorage.getItem('highScoreHardEng1'), 10);
                var retrieved2 = parseInt(localStorage.getItem('highScoreHardEng2'), 10);
                var retrieved3 = parseInt(localStorage.getItem('highScoreHardEng3'), 10);
                console.log(retrieved1, retrieved2, retrieved3);
                if (newScore <= retrieved1) {
                    retrieved3 = retrieved2;
                    retrieved2 = retrieved1;
                    retrieved1 = newScore;
                    localStorage.setItem('highScoreHardEng1', retrieved1);
                    localStorage.setItem('highScoreHardEng2', retrieved2);
                    localStorage.setItem('highScoreHardEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreHardEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreHardEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreHardEng3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved2) {
                    retrieved3 = retrieved2;
                    retrieved2 = newScore;
                    localStorage.setItem('highScoreHardEng1', retrieved1);
                    localStorage.setItem('highScoreHardEng2', retrieved2);
                    localStorage.setItem('highScoreHardEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreHardEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreHardEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreHardEng3'), 10);
                    console.log(test1, test2, test3);
                }
                else if (newScore <= retrieved3) {
                    retrieved3 = newScore;
                    localStorage.setItem('highScoreHardEng1', retrieved1);
                    localStorage.setItem('highScoreHardEng2', retrieved2);
                    localStorage.setItem('highScoreHardEng3', retrieved3);
                    var test1 = parseInt(localStorage.getItem('highScoreHardEng1'), 10);
                    var test2 = parseInt(localStorage.getItem('highScoreHardEng2'), 10);
                    var test3 = parseInt(localStorage.getItem('highScoreHardEng3'), 10);
                    console.log(test1, test2, test3);
                }
            }
        }

    }
};

