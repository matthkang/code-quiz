var timeEl = document.querySelector(".time");
var startButtonEl = $('#start-quiz-btn');
var titleEl = $('#title');
var descEl = $('#description');
var answers = $('.answers');

const questions = [
    "Commonly used data types do NOT include:",
    "The condition in an if/else statement is enclosed with: ",
    "Arrays in Javascript can be used to store: ",
    "String values must be enclosed within ____ when being assigned to variables.",
    "A very useful tool during development and debugging for printing content to the debugger is: "
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
    var random = questions[Math.floor(Math.random()*questions.length)];
    titleEl.text(random);
}

startButtonEl.on('click', function () {
    console.log("start button clicked");
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