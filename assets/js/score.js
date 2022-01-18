var initials = document.getElementById('initials');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var mostRecentScore = localStorage.getItem('mostRecentScore');
var finalScore = document.getElementById('finalScore');
finalScore.innerHTML = mostRecentScore;


saveHighScore = function (e) {
    console.log("clicks");
    e.preventDefault();
}