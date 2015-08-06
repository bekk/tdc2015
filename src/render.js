var data = {};
module.exports = function(startData){
  if(data.left) {
    Object.unobserve(data.left, observerFunctionLeft);
    Object.unobserve(data.right, observerFunctionRight);
  }

  data = startData;
  Object.observe(data.left, observerFunctionLeft, ["update"]);
  Object.observe(data.right, observerFunctionRight, ["update"]);
}

var observerFunctionLeft = function(changes){
  changes.forEach(function(change) {
    if(change.name === "top"){
      var paddle = document.querySelector('.paddle-left');
      paddle.style.top = data.left.top
    }
  });
}
var observerFunctionRight = function(changes){
  changes.forEach(function(change) {
    if(change.name === "top"){
      var paddle = document.querySelector('.paddle-right');
      paddle.style.top = data.right.top;
    }
  });
}
