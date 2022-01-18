 const question = document.getElementById("question");
 const choices = Array.from(document.getElementsByClassName("choice-text"));

 var currentQuestion = {};
 var acceptingAnswers = false;
 var score = 0;
 var questionCounter = 0;
 var availableQuestions = [];

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
        answer: 1    
        },
 ]

 var correctBonus = 10;
 var maxQuestions = 5;

 startgame = function () { 
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];
     getNewQuestion();
 };

 getNewQuestion = function() {
     if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign(`highscore.html`);
     }
   
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
};

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    var selectedAnswer = selectedChoice.dataset[`number`];

    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "wrong"; 

    // var classToApply = "wrong";
    // if (selectedAnswer == currentQuestion.answer) {
    //     classToApply = "correct";
    // }
    // if (classToApply === "correct") {
    //     incrementScore(correctBonus);
    // }

    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);

    }); 
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

var timeLeft = 75;
var downLoadTimer = setInterval(function() {
    if (timeLeft <= 0) {
        clearInterval(downLoadTimer);
        document.getElementById("countdown").innerHTML = "Out of time";
    } else {
        document.getElementById('countdown').innerHTML = timeLeft + " seconds left";
    }
    timeLeft -= 1; 
},1000);

 startgame();