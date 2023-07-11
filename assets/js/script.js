var timeEl = document.querySelector(".time");
var startButtonEl = $('#start-quiz-btn');
var titleEl = $('#title');
var descEl = $('#description');
var answers = $('.answers');
var answerAEl = $('#answerA');
var answerBEl = $('#answerB');
var answerCEl = $('#answerC');
var answerDEl = $('#answerD');

// variable set when questions are displayed
var correctAnswer;
var correctAnswerEl;

var incorrectAnswerEl;

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

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

function displayQuestions() {
    var index = Math.floor(Math.random()*questions.length);
    // retrieve question with random index
    var random = questions[index];
    // remove question from array to prevent dupes
    questions.splice(index, 1);

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

function nextQuestion() {
    setTimeout(function(){
        correctAnswerEl.removeClass("btn-info");
        incorrectAnswerEl.removeClass("btn-danger");
        displayQuestions();
    }, 1000);
}


answerAEl.on('click', function() {
    var selectedAnswer = answerAEl.text();
    //console.log(answerAEl.text());
    // correct
    if (answerAEl === correctAnswerEl){
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
    // incorrect
    else {
        answerAEl.addClass('btn-danger');
        incorrectAnswerEl = answerAEl;
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
});

answerBEl.on('click', function() {
    //console.log(answerBEl.text());
    // correct
    if (answerBEl === correctAnswerEl){
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
    // incorrect
    else {
        answerBEl.addClass('btn-danger');
        incorrectAnswerEl = answerBEl;
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
});

answerCEl.on('click', function() {
    //console.log(answerCEl.text());
    // correct
    if (answerCEl === correctAnswerEl){
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
    // incorrect
    else {
        answerCEl.addClass('btn-danger');
        incorrectAnswerEl = answerCEl;
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
});

answerDEl.on('click', function() {
    //console.log(answerDEl.text());
    // correct
    if (answerDEl === correctAnswerEl){
        correctAnswerEl.addClass("btn-info");
        nextQuestion();
    }
    // incorrect
    else {
        answerDEl.addClass('btn-danger');
        incorrectAnswerEl = answerDEl;
        correctAnswerEl.addClass("btn-info");
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