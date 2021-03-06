let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return false;
    } else {
        ++attempt.value;
    }
    
    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else {
        if (attempt.value >= 10) {
            setMessage("You Lose! :(");
            showAnswer(false);
            showReplay();
        } else {
            setMessage("Incorrect, try again.");
        }
    }
}

//implement new functions here
function setHiddenFields() {
    var rawNum = Math.floor(Math.random() * 10000);
    answer.value = rawNum.toString();
    attempt.value = 0;
    
    while (answer.value.length < 4) {
        answer.value = "0" + answer.value;
    }
}

function setMessage(messageBody) {
    document.getElementById('message').innerHTML = messageBody;
}

function validateInput(input) {
    if (input.length === 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input) {
    var correctlyGuessed = 0;
    var resultsDiv = document.getElementById('results').innerHTML;
    resultsDiv += "<div class='row'><span class='col-md-6'>";
    resultsDiv += input;
    resultsDiv += "</span><div class='col-md-6'>";
    
    for (var i = 0; i < 4; i++) {
        if (input[i] === answer.value[i]) {
            resultsDiv += "<span class='glyphicon glyphicon-ok'></span>";
            correctlyGuessed++;
        } else if (answer.value.indexOf(input[i]) !== -1) {
            resultsDiv += "<span class='glyphicon glyphicon-transfer'></span>";
        } else {
            resultsDiv += "<span class='glyphicon glyphicon-remove'></span>";
        }
    }
    
    resultsDiv += "</div></div>";
    
    document.getElementById('results').innerHTML = resultsDiv;
    
    if (correctlyGuessed === 4) {
        return true;
    } else {
        return false;
    }
}

function showAnswer(condition) {
    var codeElement = document.getElementById('code');
    codeElement.innerHTML = answer.value;
    
    if (condition) {
        codeElement.className += " success";
    } else {
        codeElement.className += " failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}