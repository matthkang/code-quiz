var timeEl = document.querySelector(".time");
var startButtonEl = $('#start-quiz-btn');
var titleEl = $('#title');
var descEl = $('#description');
var answers = $('.answers');
var answerAEl = $('#answerA');
var answerBEl = $('#answerB');
var answerCEl = $('#answerC');
var answerDEl = $('#answerD');

var mainEl = $('main');

// variable set when questions are displayed
var correctAnswer;
var correctAnswerEl;

var incorrectAnswerEl;

var index;

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

var secondsLeft = 76;
//var secondsLeft = 3;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    // if no time left or no questions left
    if(secondsLeft === 0 || questions.length === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // End game, display final score, and show form to enter initials
      console.log("end game");
      endGame();
    }

  }, 1000);
}

function displayQuestions() {
    index = Math.floor(Math.random()*questions.length);
    // retrieve question with random index
    var random = questions[index];

    var question = random.question;
    var answerA = random.answers[0];
    var answerB = random.answers[1];
    var answerC = random.answers[2];
    var answerD = random.answers[3];

    // index of correct answer
    var correctIndex = random.correct;
    console.log("correct index: ", correctIndex);
    // text of correct answer
    correctAnswer = random.answers[correctIndex];
    console.log("correct answer: ", correctAnswer);

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

    answerAEl.text(answerA);
    answerBEl.text(answerB);
    answerCEl.text(answerC);
    answerDEl.text(answerD);

}

function endGame() {
    titleEl.text("Game Over");
    descEl.text("Your final score is: " + secondsLeft);

    var form  = $("<form></form>");
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

// TODO: subtract 10 seconds from timer on incorrect answer

answerAEl.on('click', function() {
    // incorrect
    if (answerAEl !== correctAnswerEl){
        // make incorrect answer red
        answerAEl.addClass('btn-danger');
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");
    
    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});



answerBEl.on('click', function() {
    // incorrect
    if (answerBEl !== correctAnswerEl){
        // make incorrect answer red
        answerBEl.addClass('btn-danger');
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");

    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});

answerCEl.on('click', function() {
    // incorrect
    if (answerCEl !== correctAnswerEl){
        // make incorrect answer red
        answerCEl.addClass('btn-danger');
    }

    // make correct answer green
    correctAnswerEl.addClass("btn-info");

    // remove question from array to prevent dupes
    questions.splice(index, 1);
    if (questions.length !== 0){
        nextQuestion();
    }
});

answerDEl.on('click', function() {
    // incorrect
    if (answerDEl !== correctAnswerEl){
        // make incorrect answer red
        answerDEl.addClass('btn-danger');
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
    displayQuestions();

    // show answers
    answers.show();

    // hide 'start quiz' button and description
    startButtonEl.hide();
    descEl.hide();

});

function init() {
    // hide answers at start
    answers.hide();
}

init();