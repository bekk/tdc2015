var data = require("./data");
var paddles = require("./paddles")(data);
var ball = document.querySelector('.ball');

var goingRight = true;
window.setInterval(function() {
  var left = data.ball.left;
  var ballTop = data.ball.top;
  if(goingRight){
    data.ball.left += 5;
    if(left > parseInt(window.innerWidth, 10)-20-20) {
      var paddleTop = data.right.top;
      if(ballTop < paddleTop + data.paddleHeight && ballTop > paddleTop) {
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
      if(ballTop < paddleTop + data.paddleHeight && ballTop > paddleTop) {
        goingRight = true;
      } else {
        data.ball.left = 250;
      }
    }
  }
  ball.style.left = data.ball.left;
}, 10);
