var data = {};
module.exports = function(startData){
    Object.unobserve(data, observerFunction);
    data = startData;
    Object.observe(data, observerFunction, ["update"]);
    updateScore(data);
    document.querySelector(".player1").classList.remove("winner");
    document.querySelector(".player2").classList.remove("winner");
}

var observerFunction = function(changes){
  changes.forEach(function(change) {
    if(change.name === "player1" || change.name === "player2") {
      updateScore(data);
      checkGameFinished(data);
    }
  });
}

var updateScore = function(data) {
  document.querySelector(".player1").textContent = data.player1;
  document.querySelector(".player2").textContent = data.player2;
}

var checkGameFinished = function(data) {
  if(data.player1 + data.player2 >= 2 && data.player1 !== data.player2) {
    clearInterval(data.gameLoopId);
    data.finished = true;
    if(data.player1 > data.player2) {
      document.querySelector(".player1").classList.add("winner");
    } else {
      document.querySelector(".player2").classList.add("winner");
    }
  }
}
