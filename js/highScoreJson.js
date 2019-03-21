var xhr = new XMLHttpRequest();                 // Create XMLHttpRequest object
console.log("JSON filen");
xhr.onload = function() {                       // When readystate changes
    // The following conditional check will not work locally - only on a server
    //if(xhr.status === 200) {                      // If server status was ok
    responseObject = JSON.parse(xhr.responseText);

    // BUILD UP STRING WITH NEW CONTENT (could also use DOM manipulation)
    var newContent = '';
    for (var i = 0; i < responseObject.highScoreArrays.length; i++) { // Loop through object
        newContent += '<p></p>' + (i+1);
        for (var n = 0; n < responseObject.highScoreArrays[i].highScore.length; n++){
            newContent += '<p><b>' + responseObject.highScoreArrays[i].highScore[n] + '</b><br>';
        }
    }

    // Update the page with the new content
    document.getElementById('highScore').innerHTML = newContent;

    //}
};

xhr.open('GET', 'data/highScore.json', true);        // Prepare the request
xhr.send(null);