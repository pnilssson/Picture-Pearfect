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
        let timer = document.querySelector(".timer");
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
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        // If both guesses are not empty...
        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                if(noSound !== true){
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

    for (let k = 0; k<selectedArray.length; k++){
        if(selectedArray[k].name===audio.dataset.name){
            let sound = document.getElementById('audioElement');
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
    if (moves === 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

// @description game timer
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second === 60){
            minute++;
            second=0;
        }
        if(minute === 60){
            hour++;
            minute = 0;
        }
    },1000);
}

const congratulationMsg = document.getElementById("congratulation-msg");
const winChecker = () => {
    if (swedishSelected) {
        if (difficulty === 9) {
            winCond += 2;
            if (winCond === 12) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                if (localStorage.getItem('highScoreEasy1') === '0') {
                    localStorage.setItem('highScoreEasy1', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreEasy1'))) {
                    localStorage.setItem('highScoreEasy3', localStorage.getItem('highScoreEasy2'));
                    localStorage.setItem('highScoreEasy2', localStorage.getItem('highScoreEasy1'));
                    localStorage.setItem('highScoreEasy1', moves);
                } else if (localStorage.getItem('highScoreEasy2') === '0') {
                    localStorage.setItem('highScoreEasy2', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreEasy2'))) {
                    localStorage.setItem('highScoreEasy3', localStorage.getItem('highScoreEasy2'));
                    localStorage.setItem('highScoreEasy2', moves);
                } else if (localStorage.getItem('highScoreEasy3') === '0') {
                    localStorage.setItem('highScoreEasy3', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreEasy3'))) {
                    localStorage.setItem('highScoreEasy3', moves);
                }
            }
        }
        if (difficulty === 5) {
            winCond += 2;
            if (winCond === 16) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                if (localStorage.getItem('highScoreMed1') === '0') {
                    localStorage.setItem('highScoreMed1', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreMed1'))) {
                    localStorage.setItem('highScoreMed3', localStorage.getItem('highScoreMed2'));
                    localStorage.setItem('highScoreMed2', localStorage.getItem('highScoreMed1'));
                    localStorage.setItem('highScoreMed1', moves);
                } else if (localStorage.getItem('highScoreMed2') === '0') {
                    localStorage.setItem('highScoreMed2', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreMed2'))) {
                    localStorage.setItem('highScoreMed3', localStorage.getItem('highScoreMed2'));
                    localStorage.setItem('highScoreMed2', moves);
                } else if (localStorage.getItem('highScoreMed3') === '0') {
                    localStorage.setItem('highScoreMed3', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreMed3'))) {
                    localStorage.setItem('highScoreMed3', moves);
                }
            }
        }
        if (difficulty === 1) {
            winCond += 2;
            if (winCond === 20) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                if (localStorage.getItem('highScoreHard1') === '0') {
                    localStorage.setItem('highScoreHard1', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreHard1'))) {
                    localStorage.setItem('highScoreHard3', localStorage.getItem('highScoreHard2'));
                    localStorage.setItem('highScoreHard2', localStorage.getItem('highScoreHard1'));
                    localStorage.setItem('highScoreHard1', moves);
                } else if (localStorage.getItem('highScoreHard2') === '0') {
                    localStorage.setItem('highScoreHard2', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreHard2'))) {
                    localStorage.setItem('highScoreHard3', localStorage.getItem('highScoreHard2'));
                    localStorage.setItem('highScoreHard2', moves);
                } else if (localStorage.getItem('highScoreHard3') === '0') {
                    localStorage.setItem('highScoreHard3', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreHard3'))) {
                    localStorage.setItem('highScoreHard3', moves);
                }
            }
        }
    }
    if (!swedishSelected) {
        if (difficulty === 9) {
            winCond += 2;
            if (winCond === 12) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                if (localStorage.getItem('highScoreEasyEng1') === '0') {
                    localStorage.setItem('highScoreEasyEng1', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreEasyEng1'))) {
                    localStorage.setItem('highScoreEasyEng3', localStorage.getItem('highScoreEasyEng2'));
                    localStorage.setItem('highScoreEasyEng2', localStorage.getItem('highScoreEasyEng1'));
                    localStorage.setItem('highScoreMed1', moves);
                } else if (localStorage.getItem('highScoreEasyEng2') === '0') {
                    localStorage.setItem('highScoreEasyEng2', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreEasyEng2'))) {
                    localStorage.setItem('highScoreEasyEng3', localStorage.getItem('highScoreEasyEng2'));
                    localStorage.setItem('highScoreEasyEng2', moves);
                } else if (localStorage.getItem('highScoreEasyEng3') === '0') {
                    localStorage.setItem('highScoreEasyEng3', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreEasyEng3'))) {
                    localStorage.setItem('highScoreEasyEng3', moves);
                }
            }
        }
        if (difficulty === 5) {
            winCond += 2;
            if (winCond === 16) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                if (localStorage.getItem('highScoreMedEng1') === '0') {
                    localStorage.setItem('highScoreMedEng1', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreMedEng1'))) {
                    localStorage.setItem('highScoreMedEng3', localStorage.getItem('highScoreMedEng2'));
                    localStorage.setItem('highScoreMedEng2', localStorage.getItem('highScoreMedEng1'));
                    localStorage.setItem('highScoreMed1', moves);
                } else if (localStorage.getItem('highScoreMedEng2') === '0') {
                    localStorage.setItem('highScoreMedEng2', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreMedEng2'))) {
                    localStorage.setItem('highScoreMedEng3', localStorage.getItem('highScoreMedEng2'));
                    localStorage.setItem('highScoreMed2', moves);
                } else if (localStorage.getItem('highScoreMedEng3') === '0') {
                    localStorage.setItem('highScoreMedEng3', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreMedEng3'))) {
                    localStorage.setItem('highScoreMed3', moves);
                }
            }
        }
        if (difficulty === 1) {
            winCond += 2;
            if (winCond === 20) {
                scorePanel.style.display = "none";
                congratulationMsg.style.display = "flex";
                congratulationMsg.innerHTML = "<h2>Grattis, du klarade spelomgången på " + minute + " minuter & " + second + " sekunder med hjälp av " + moves + " drag!</h2>";
                if (localStorage.getItem('highScoreHardEng1') === '0') {
                    localStorage.setItem('highScoreHardEng1', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreHardEng1'))) {
                    localStorage.setItem('highScoreHardEng3', localStorage.getItem('highScoreHardEng2'));
                    localStorage.setItem('highScoreHardEng2', localStorage.getItem('highScoreHardEng1'));
                    localStorage.setItem('highScoreHardEng1', moves);
                } else if (localStorage.getItem('highScoreHardEng2') === '0') {
                    localStorage.setItem('highScoreHardEng2', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreHardEng2'))) {
                    localStorage.setItem('highScoreHardEng3', localStorage.getItem('highScoreHard2'));
                    localStorage.setItem('highScoreHardEng2', moves);
                } else if (localStorage.getItem('highScoreHardEng3') === '0') {
                    localStorage.setItem('highScoreHardEng3', moves);
                } else if (moves <= parseInt(localStorage.getItem('highScoreHardEng3'))) {
                    localStorage.setItem('highScoreHardEng3', moves);
                }
            }
        }
    }
};

