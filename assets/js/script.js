 const question = document.getElementById("question");
 const choices = Array.from(document.getElementsByClassName("choice-text"));
 console.log(choices);

 var currentQuestion = {};
 var acceptingAnswers = true;
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
        answer: 3     
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
 var maxQuestions = 3;

 startgame = function () { 
     questionCounter = 0;
     score = 0;
     availableQuestions = [...questions];
     console.log(availableQuestions);
     getNewQuestion();
 };

 getNewQuestion = function() {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

   
   
    };

 startgame();