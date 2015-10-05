var ball = document.querySelector(".ball");
var score = document.querySelector(".score");

var speed = 10;

var height = 1;
var gravity = 0.1;


var initialHeight = 600;

var ballTop = initialHeight;
var ballLeft = 5;

var intervalId = window.setInterval(function() {
  score.textContent = ballLeft;
  ballTop -= height;
  ball.style.top = ballTop;

  ballLeft += speed;
  ball.style.left = ballLeft;

  height -= gravity;

  if((ballTop > initialHeight) && height<0) {
    window.clearInterval(intervalId);
  }

}, 500);
