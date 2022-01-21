 const question = document.getElementById("question");
 const choices = Array.from(document.getElementsByClassName("choice-text"));
 const scoreText = document.getElementById("score");
 var currentQuestion = {};
 var acceptingAnswers = false;
 var score = 0;
 var questionCounter = 0;
 var availableQuestions = [];
 
//  Array of questions
 var questions = [
        {
         question: "String values must be enclosed within ____ when being assigned to variables.",
         choice1: "commas", 
         choice2: "curly brackets",
         choice3: "quotes",
         choice4: "parenthesis",
         answer: 1   
        },
        {
        question: "Arrays in JavaScript can be used to store ____.",
        choice1: "numbers and strings", 
        choice2: "other arrays",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4     
        },
        {
        question: "The condition in an if/else statement is enclosed with _____.",
        choice1: "quotes", 
        choice2: "curly brackets",
        choice3: "parenthesis",
        choice4: "square brackets",
        answer: 2     
        },
        {
        question: "Commonly used data types DO NOT include:",
        choice1: "strings", 
        choice2: "alerts",
        choice3: "booleans",
        choice4: "numbers",
        answer: 2    
        },
        {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript", 
        choice2: "terminal/bash",
        choice3: "for loops",
        choice4: "console.log",
        answer: 4    
        },
 ]

 var correctBonus = 10;
 var maxQuestions = 5;

//  Start Quiz
 startgame = function () { 
    document.getElementById("secondPage").style.display = "none";
    document.getElementById("thirdPage").style.display = "none";
    document.getElementById("forthPage").style.display = "none";
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];
     
 };

// New Questions, shuffled
 getNewQuestion = function() {
    document.getElementById("secondPage").style.display = "inline";
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        var number = choice.dataset[`number`];
        choice.innerText = currentQuestion[`choice` + number];
    });

   availableQuestions.splice(questionIndex, 1);
   acceptingAnswers = true; 

   if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    window.location.hash = "finalScore";  
 }
};

// This displays "correct"
function displayCorrect() {
    var correct = createElement("h3", "id", "correct", "Correct!");
    appendChild(document.body, correct);
    timer = 1;
    var timerInterval = setInterval(function () {
        timer--;
        if (timer === 0) {
            clearInterval(timerInterval);
            var element = document.getElementById("correct");
            element.parentNode.removeChild(element);
            timer = 1;
    console.log("correct");
        };
    }, 1000);
};

// This displays "wrong"
function displayWrong() {
    var wrong = createElement("h3", "id", "wrong", "Wrong!")
    appendChild(document.body, wrong);
    timer = 1;
    var timerInterval = setInterval(function () {
        timer--;
        if (timer === 0) {
            clearInterval(timerInterval);
            var element = document.getElementById("wrong");
            element.parentNode.removeChild(element);
            timer = 1;
    console.log("Wrong!");
        };
    }, 1000);
};

// evalute score
choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset[`number`];
    score = (selectedAnswer == currentQuestion.answer) ? score + 5 : score;
    console.log("stuff" + score);
    document.getElementById("finalScore").innerHTML = score;
    // scoreText.innerHTML = score;

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "wrong";
    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);

    }); 
});

//hide divs

function hideDiv() {
    document.getElementById("firstPage").style.display = "none";
    getNewQuestion();
}

function hideDiv2() {
    document.getElementById("secondPage").style.display = "none";
    console.log("display hidden");
    // getNewQuestion();
}




// Timer, when it hits zero the game is over
var timeLeft = 75;
var downLoadTimer = setInterval(function() {
    if (timeLeft <= 0) {
        clearInterval(downLoadTimer);
        document.getElementById("countdown").innerHTML = "Out of time";
        window.location.hash = "theFinalScore";
    } else {
        document.getElementById('countdown').innerHTML = timeLeft + " seconds left";
    }
    timeLeft -= 1; 
},1000);

//Initials and storing scores/initials in local storage with sorting
function gameOver() {
    document.getElementById("initials").addEventListener("click", function () {
            var highScoreList = JSON.parse(localStorage.getItem("finalScore"));
            if (highScoreList == null) {
                var highScoreList = [];
                var newScore = new Object();
                newScore.initials = document.getElementById("initials").value;
                newScore.score = score;
                highScoreList.push(newScore);
                var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
                localStorage.setItem("finalScore", JSON.stringify(rankedScore));
            }
            else {
                var highScore = new Object();
                highScore.initials = document.getElementById("initials").value;
                highScore.score = score;
                highScoreList.push(highScore);
                var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
                localStorage.setItem("finalScore", JSON.stringify(rankedScore));
            };
            location.href = "highscores.html"
        });
    };

    // Saving Highscores
// saveHighScore = function (e) {
    
// }

 startgame();