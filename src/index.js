var maxHeight = 500;
var paddleHeight = 120;

document.querySelector('.paddle-left').style.top = 200;
document.querySelector('.paddle-right').style.top = 200;

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
