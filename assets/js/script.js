// target element with class time
var timeEl = document.querySelector(".time");
// target element with id start-quiz-btn
var startButtonEl = $('#start-quiz-btn');
var titleEl = $('#title');
var descEl = $('#description');
var answerAEl = $('#answerA');
var answerBEl = $('#answerB');
var answerCEl = $('#answerC');
var answerDEl = $('#answerD');

// static element
var answers = $('.answers');
var highscoreList = $('#highscoreList');

var mainEl = $('main');

// variable set when questions are displayed
var correctAnswer;
var correctAnswerEl;

var index;

// local storage to store high scores
var highScoreLS = localStorage.getItem("highscore");
var initialsLS = localStorage.getItem("initials");

// clear high scores button
var clearScoresEL = $('#clear-high-scores');


const questions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: 2
    },
    {
        question: "The condition in an if/else statement is enclosed with: ",
        answers: ["quotes", "curly brackets", "parantheses", "square brackets"],
        correct: 2
    },
    {
        question: "Arrays in Javascript can be used to store: ",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: 3
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parantheses"],
        correct: 2
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is: ",
        answers: ["Javascript", "terminal/bash", "for loops", "console.log"],
        correct: 3
    }
];

// var secondsLeft = 76;
var secondsLeft = 1;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    // if no time left or no questions left
    if(secondsLeft <= 0 || questions.length === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // End game, display final score, and show form to enter initials
      endGame();
    }

  }, 1000);
}

function createQuestions() {
    var answerA = $('<div class="answer"></div>');
    var answerAButton = $('<button class="btn btn-sm" id="answerA">Answer A</button>');
    answerA.append(answerAButton);

    var answerB = $('<div class="answer"></div>');
    var answerBButton = $('<button class="btn btn-sm" id="answerB">Answer B</button>');
    answerB.append(answerBButton);

    var answerC = $('<div class="answer"></div>');
    var answerCButton = $('<button class="btn btn-sm" id="answerC">Answer C</button>');
    answerC.append(answerCButton);

    var answerD = $('<div class="answer"></div>');
    var answerDButton = $('<button class="btn btn-sm" id="answerD">Answer D</button>');
    answerD.append(answerDButton);

    answers.append(answerA);
    answers.append(answerB);
    answers.append(answerC);
    answers.append(answerD);
}

function displayQuestions() {
    index = Math.floor(Math.random()*questions.length);
    // retrieve question with random index
    var random = questions[index];

    var question = random.question;
    var answerAText = random.answers[0];
    var answerBText = random.answers[1];
    var answerCText = random.answers[2];
    var answerDText = random.answers[3];

    // index of correct answer
    var correctIndex = random.correct;
    // console.log("correct index: ", correctIndex);
    // text of correct answer
    correctAnswer = random.answers[correctIndex];
    // console.log("correct answer: ", correctAnswer);

    answerAEl = $('#answerA');
    answerBEl = $('#answerB');
    answerCEl = $('#answerC');
    answerDEl = $('#answerD');

    if (correctIndex === 0){
        correctAnswerEl = answerAEl;
    }
    else if (correctIndex === 1){
        correctAnswerEl = answerBEl;
    }
    else if (correctIndex === 2){
        correctAnswerEl = answerCEl;
    }
    else if (correctIndex === 3){
        correctAnswerEl = answerDEl;
    }
    

    titleEl.text(question);

    answerAEl.text(answerAText);
    answerBEl.text(answerBText);
    answerCEl.text(answerCText);
    answerDEl.text(answerDText);

}

function endGame() {
    titleEl.text("Game Over");
    descEl.text("Your final score is: " + secondsLeft);

    var form  = $("<form onsubmit='submitHighScore()' action='high-scores.html' id = 'highScoreForm'></form>");
    mainEl.append(form);

    var label = $('<label for="initials">Enter initials: </label>')
    label.css('margin-right', '10px');
    form.append(label);

    var input = $('<input id="input"/>');
    input.css('margin-right', '10px');
    form.append(input);
    
    var submit = $('<button id="submit">Submit</button>');
    submit.addClass('btn btn-sm btn-info');
    form.append(submit);
    

    descEl.show();

    answerAEl.hide();
    answerBEl.hide();
    answerCEl.hide();
    answerDEl.hide();
}

function submitHighScore() {
    var initials_val = $('#input').val();
    var highscore = secondsLeft;

    // if first time storing, create empty arrays, otherwise retrieve array from localStorage
    if (localStorage.getItem("highscore") !== null){
        var highScoresArr = JSON.parse(localStorage.getItem("highscore"));
        var initialsArr = JSON.parse(localStorage.getItem("initials"));
    }
    
    else {
        var highScoresArr = [];
        var initialsArr = [];
    }

    // create highscores object with score and initials properties
    const highscores = {
        score: highscore,
        initials: initials_val,
    };

    let exists = false;

    // see if entry for player's initials already exists
    // if so, update entry with player's better score
    for (var i = 0; i < highScoresArr.length; i++){
        var entry = highScoresArr[i];
        // if entry already exists for player's initial
        if (Object.values(entry).indexOf(initials_val) > -1) {
            console.log('has ', initials_val);
            console.log("player was highscore: ", entry.score);
            // only update if highscore is greater than the one in leaderboard
            if (highscore > entry.score){
                entry.score = highscore;
            }
            console.log("player is now highscore: ", entry.score);
            exists = true;
        }
        
    }

    if (exists === false) {
        highScoresArr.push(highscores);
    }

    // sort highscores from highest to lowest score
    highScoresArr.sort(function(a, b) {
        return ((a.score > b.score) ? -1 : ((a.initials == b.initials) ? 0 : 1));
    });
    
    //initialsArr.push(initials_val);

    //localStorage.setItem("highscore", JSON.stringify(highScoresArr));
    //localStorage.setItem("initials", JSON.stringify(initialsArr));
    localStorage.setItem("highscore", JSON.stringify(highScoresArr));
}

// reset buttons to initial css
function resetButtons(){
    answerAEl.removeClass().addClass("btn btn-sm");
    answerBEl.removeClass().addClass("btn btn-sm");
    answerCEl.removeClass().addClass("btn btn-sm");
    answerDEl.removeClass().addClass("btn btn-sm");
}


function nextQuestion() {
    // set a delay to see correct/ incorrect answers before moving on to next question
    setTimeout(function(){
        resetButtons();
        displayQuestions();
    }, 1000);
}


$('.answers').on('click', '#answerA', function() {
    // incorrect
    if (answerAEl !== correctAnswerEl){
        // make incorrect answer red
        answerAEl.addClass('btn-danger');
        secondsLeft-= 10;
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");
    
    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});



$('.answers').on('click', '#answerB', function() {
    // incorrect
    if (answerBEl !== correctAnswerEl){
        // make incorrect answer red
        answerBEl.addClass('btn-danger');
        secondsLeft-= 10;
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");

    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});

$('.answers').on('click', '#answerC', function() {
    // incorrect
    if (answerCEl !== correctAnswerEl){
        // make incorrect answer red
        answerCEl.addClass('btn-danger');
        secondsLeft-= 10;
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");

    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});

$('.answers').on('click', '#answerD', function() {
    // incorrect
    if (answerDEl !== correctAnswerEl){
        // make incorrect answer red
        answerDEl.addClass('btn-danger');
        secondsLeft-= 10;
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");
    
    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});

startButtonEl.on('click', function () {
    setTime();
    createQuestions();
    displayQuestions();

    // hide 'start quiz' button and description
    startButtonEl.hide();
    descEl.hide();

});

clearScoresEL.on('click', function () {
    // clear from localstorage
    localStorage.clear();

    // clear array to update display
    highscoreList.empty();
});

