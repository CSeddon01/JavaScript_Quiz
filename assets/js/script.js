const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("finalScore");
const initials = document.getElementsByID("initials");
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var form = document.getElementById("form");
form.onsumbit = gameOver();
//  Array of questions
var questions = [
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parenthesis",
    answer: 3,
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    answer: 4,
  },
  {
    question: "The condition in an if/else statement is enclosed with _____.",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parenthesis",
    choice4: "square brackets",
    answer: 2,
  },
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "strings",
    choice2: "alerts",
    choice3: "booleans",
    choice4: "numbers",
    answer: 2,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "JavaScript",
    choice2: "terminal/bash",
    choice3: "for loops",
    choice4: "console.log",
    answer: 4,
  },
];

var correctBonus = 10;
var maxQuestions = 5;

//  Start Quiz
startgame = function () {
  document.getElementById("secondPage").style.display = "none";
  document.getElementById("thirdPage").style.display = "none";
  score = 0;
  availableQuestions = [...questions];
};

// New Questions
getNewQuestion = function () {
  document.getElementById("secondPage").style.display = "inline";

  currentQuestion = availableQuestions[questionCounter];
  questionCounter++;

  if (questionCounter === availableQuestions.length) {
    localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("initials", initials);
    document.getElementById("thirdPage").style.display = "inline";
    document.getElementById("secondPage").style.display = "none";
  } else {
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
      var number = choice.dataset[`number`];
      choice.innerText = currentQuestion[`choice` + number];
    });

    acceptingAnswers = true;
  }
};


// evalute score
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset[`number`];
    score = selectedAnswer == currentQuestion.answer ? score + 5 : score;
    if(selectedAnswer == currentQuestion.answer) {
    document.getElementById("answer").innerHTML = "Correct";
    
    } else{
        document.getElementById("answer").innerHTML = "Wrong!";
        
    }
    console.log("stuff" + score);
    document.getElementById("finalScore").innerHTML = score;
    scoreText.innerHTML = score;


    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "wrong";
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Timer, when it hits zero the game is over
var timeLeft = 75;
var downLoadTimer = setInterval(function () {
  if (timeLeft <= 0) {
    clearInterval(downLoadTimer);
    document.getElementById("countdown").innerHTML = "Out of time";
    window.location.href = "highscore.html";
  } else {
    document.getElementById("countdown").innerHTML = timeLeft + " seconds left";
  }
  timeLeft -= 1;
}, 1000);

// Initials and storing scores/initials in local storage with sorting
function gameOver() {
  // localStorage.setItem("initials", JSON.stringify(initials));
  console.log("does this work", initials);
    var mostRecentScore = JSON.parse(localStorage.getItem("mostRecentScore"));
    var highScoreList = [];

    if (mostRecentScore == null) {
      var newScore = new Object();
      newScore.initials = document.getElementById("initials").value;
      newScore.score = score;
   
    } else {
      var highScore = new Object();
      highScore.initials = document.getElementById("initials").value;
      
     
    }
    
  
}

function hideDiv() {
    document.getElementById("firstPage").style.display = "none";
    getNewQuestion();
}




startgame();
