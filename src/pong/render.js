var data = {};
module.exports = function(startData){
  if(data.left) {
    Object.unobserve(data.left, observerFunctionLeft);
    Object.unobserve(data.right, observerFunctionRight);
  }
  if(data.ball) {
    Object.unobserve(data.ball, observerFunctionBall);
  }

  data = startData;
  Object.observe(data.left, observerFunctionLeft, ["update"]);
  Object.observe(data.right, observerFunctionRight, ["update"]);
  Object.observe(data.ball, observerFunctionBall, ["update"]);
  renderLeft();
  renderRight();
  renderBall();
}

var renderLeft = function() {
  var paddle = document.querySelector('.paddle-left');
  paddle.style.top = data.left.top;
}

var renderRight = function() {
  var paddle = document.querySelector('.paddle-right');
  paddle.style.top = data.right.top;
}

var renderBall = function() {
  var ball = document.querySelector('.ball');
  ball.style.top = data.ball.top;
  ball.style.left = data.ball.left;
}

var observerFunctionLeft = function(changes){
  changes.forEach(function(change) {
    if(change.name === "top"){
      renderLeft();
    }
  });
}
var observerFunctionRight = function(changes){
  changes.forEach(function(change) {
    if(change.name === "top"){
      renderRight();
    }
  });
}

var observerFunctionBall = function(changes){
  changes.forEach(function(change) {
    if(change.name === "top" || change.name === "left"){
      renderBall();
    }
  });
}
