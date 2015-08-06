var scores = [];
var myDataRef = new Firebase('https://burning-torch-5939.firebaseio.com/');

myDataRef.on('child_added', function(snapshot) {
  var score = snapshot.val();
  scores.push(score);
  render();
});

var render = function() {
  var scoresElem = document.querySelector(".scores");
  while (scoresElem.firstChild) {
      scoresElem.removeChild(scoresElem.firstChild);
  }
  scores.sort(function(a, b){
    return b.score - a.score;
  });

  scores.slice(0, 10).forEach(function(score){
    var li = document.createElement("li");
    var scoreSpan = document.createElement("span");
    scoreSpan.textContent = score.score;
    scoreSpan.classList.add("score");
    var nameSpan = document.createElement("span");
    nameSpan.textContent = score.name;
    scoreSpan.classList.add("name");

    li.appendChild(scoreSpan);
    li.appendChild(nameSpan);
    scoresElem.appendChild(li);
  });

}
