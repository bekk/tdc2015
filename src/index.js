var data = require("./data");
var maxHeight = 500;
var paddleHeight = 120;
var ball = document.querySelector('.ball');

var goingRight = true;
window.setInterval(function() {
  var left = data.ball.left;
  var ballTop = data.ball.top;
  if(goingRight){
    data.ball.left += 5;
    if(left > parseInt(window.innerWidth, 10)-20-20) {
      var paddleTop = data.right.top;
      if(ballTop < paddleTop + paddleHeight && ballTop > paddleTop) {
        goingRight = false;
      } else {
        data.ball.left = 250;
      }
    }
  }
  else {
    data.ball.left -= 5;
    if (left < 0 + 20) {
      var paddleTop = data.left.top;
      if(ballTop < paddleTop + paddleHeight && ballTop > paddleTop) {
        goingRight = true;
      } else {
        data.ball.left = 250;
      }
    }
  }
  ball.style.left = data.ball.left;
}, 10);


document.addEventListener("keydown", function(e){
  if(e.which == 87) { //w
    data.left.top = Math.max(data.left.top -5, 0)
    var paddle = document.querySelector('.paddle-left');
    paddle.style.top = data.left.top
  }
  else if(e.which == 83) { //s
    data.left.top = Math.min(data.left.top + 5, maxHeight - paddleHeight);
    var paddle = document.querySelector('.paddle-left');
    paddle.style.top = data.left.top
  }
  else if(e.which == 38) { //pil opp
    data.right.top = Math.max(data.right.top - 5, 0);
    var paddle = document.querySelector('.paddle-right');
    paddle.style.top = data.right.top;
  }
  else if(e.which == 40) { //pil ned
    data.right.top = Math.min(data.right.top + 5, maxHeight - paddleHeight);
    var paddle = document.querySelector('.paddle-right');
    paddle.style.top = data.right.top;
  }
});
