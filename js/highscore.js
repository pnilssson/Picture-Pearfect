if(localStorage.getItem('setScores') === null){
    localStorage.setItem('highScoreEasy1', '0');
    localStorage.setItem('highScoreEasy2', '0');
    localStorage.setItem('highScoreEasy3', '0');

    localStorage.setItem('highScoreMed1', '0');
    localStorage.setItem('highScoreMed2', '0');
    localStorage.setItem('highScoreMed3', '0');

    localStorage.setItem('highScoreHard1', '0');
    localStorage.setItem('highScoreHard2', '0');
    localStorage.setItem('highScoreHard3', '0');

    localStorage.setItem('highScoreEasyEng1', '0');
    localStorage.setItem('highScoreEasyEng2', '0');
    localStorage.setItem('highScoreEasyEng3', '0');

    localStorage.setItem('highScoreMedEng1', '0');
    localStorage.setItem('highScoreMedEng2', '0');
    localStorage.setItem('highScoreMedEng3', '0');

    localStorage.setItem('highScoreHardEng1', '0');
    localStorage.setItem('highScoreHardEng2', '0');
    localStorage.setItem('highScoreHardEng3', '0');

    localStorage.setItem('setScores', 'scores');
}

highScores.addEventListener('click', function () {
    document.getElementById('sweBest').innerHTML=localStorage.getItem('highScoreEasy1');
    document.getElementById('swe2ndBest').innerHTML=localStorage.getItem('highScoreEasy2');
    document.getElementById('swe3rdBest').innerHTML=localStorage.getItem('highScoreEasy3');

    document.getElementById('sweMedBest').innerHTML=localStorage.getItem('highScoreMed1');
    document.getElementById('sweMed2ndBest').innerHTML=localStorage.getItem('highScoreMed2');
    document.getElementById('sweMed3rdBest').innerHTML=localStorage.getItem('highScoreMed3');

    document.getElementById('sweHardBest').innerHTML=localStorage.getItem('highScoreHard1');
    document.getElementById('sweHard2ndBest').innerHTML=localStorage.getItem('highScoreHard2');
    document.getElementById('sweHard3rdBest').innerHTML=localStorage.getItem('highScoreHard3');

    document.getElementById('engBest').innerHTML=localStorage.getItem('highScoreEasyEng1');
    document.getElementById('eng2ndBest').innerHTML=localStorage.getItem('highScoreEasyEng2');
    document.getElementById('eng3rdBest').innerHTML=localStorage.getItem('highScoreEasyEng3');

    document.getElementById('engMedBest').innerHTML=localStorage.getItem('highScoreMedEng1');
    document.getElementById('engMed2ndBest').innerHTML=localStorage.getItem('highScoreMedEng2');
    document.getElementById('engMed3rdBest').innerHTML=localStorage.getItem('highScoreMedEng3');

    document.getElementById('engHardBest').innerHTML=localStorage.getItem('highScoreHardEng1');
    document.getElementById('engHard2ndBest').innerHTML=localStorage.getItem('highScoreHardEng2');
    document.getElementById('engHard3rdBest').innerHTML=localStorage.getItem('highScoreHardEng3');
});