var score = localStorage.getItem('mostRecentScore');
var userInitials = localStorage.getItem('initials');

scores.innerText = ("1." + userInitials + ' ' + score);

function clearAll() {
    console.log("old score", score);
    localStorage.clear();
    score = localStorage.getItem('mostRecentScore');
    console.log(score);
    scores.innerText = ("No high scores found");
  }





