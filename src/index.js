var maxHeight = 500;
var paddleHeight = 120;

document.querySelector('.paddle-left').style.top = 200;
document.querySelector('.paddle-right').style.top = 200;
var ball = document.querySelector('.ball');
ball.style.top = 250;
ball.style.left = 250;


var goingRight = true;
window.setInterval(function() {
  var ball = document.querySelector('.ball');
  var left = parseInt(ball.style.left, 10);
  // console.log("1");
  if(goingRight){
    ball.style.left = left + 5;
    if(left > parseInt(window.innerWidth, 10)-20-20) {
      var paddle = document.querySelector('.paddle-right');
      var paddleTop = parseInt(paddle.style.top, 10);
      var ballTop = parseInt(ball.style.top, 10);
      if(ballTop < paddleTop + 120 && ballTop > paddleTop) {
        goingRight = false;
      } else {
        ball.style.left = 250;
      }
    }
  }
  else {
    ball.style.left = left - 5;
    if (left < 0 + 20) {
      var paddle = document.querySelector('.paddle-left');
      var paddleTop = parseInt(paddle.style.top, 10);
      var ballTop = parseInt(ball.style.top, 10);
      if(ballTop < paddleTop + 120 && ballTop > paddleTop) {
        goingRight = true;
      } else {
        ball.style.left = 250;
      }
    }
  }
}, 10);


document.addEventListener("keydown", function(e){
  if(e.which == 87) { //w
    var paddle = document.querySelector('.paddle-left');
    paddle.style.top = Math.max(parseInt(paddle.style.top, 10) - 5, 0);
  }
  else if(e.which == 83) { //s
    var paddle = document.querySelector('.paddle-left');
    paddle.style.top = Math.min(parseInt(paddle.style.top, 10) + 5, maxHeight - paddleHeight);
  }
  else if(e.which == 38) { //pil opp
    var paddle = document.querySelector('.paddle-right');
    paddle.style.top = Math.max(parseInt(paddle.style.top, 10) - 5, 0);
  }
  else if(e.which == 40) { //pil ned
    var paddle = document.querySelector('.paddle-right');
    paddle.style.top = Math.min(parseInt(paddle.style.top, 10) + 5, maxHeight - paddleHeight);
  }
});
