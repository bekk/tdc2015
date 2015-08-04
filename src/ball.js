module.exports = function(data) {
  var ball = document.querySelector('.ball');
  var goingRight = true;
  window.setInterval(function() {
    var left = data.ball.left;
    moveVertical(data, ball);
    var ballTop = data.ball.top;
    if(goingRight){
      data.ball.left += 5;
      if(left > parseInt(window.innerWidth, 10)-20-20) {
        var paddleTop = data.right.top;
        if(ballTop < paddleTop-15 + data.paddleHeight && ballTop > paddleTop) {
          goingRight = false;
          calculateVerticalSpeed(data, ballTop-paddleTop);
        } else {
          data.ball.verticalSpeed = 0;
          data.ball.left = 250;
          givePoint(data, goingRight);
        }
      }
    }
    else {
      data.ball.left -= 5;
      if (left < 0 + 20) {
        var paddleTop = data.left.top;
        if(ballTop < paddleTop-20 + data.paddleHeight && ballTop > paddleTop) {
          goingRight = true;
          calculateVerticalSpeed(data, ballTop-paddleTop);
        } else {
          data.ball.verticalSpeed = 0;
          data.ball.left = 250;
          givePoint(data, goingRight);
        }
      }
    }
    ball.style.left = data.ball.left;
  }, 10);
};

var moveVertical = function(data, ball) {
  data.ball.top +=  data.ball.verticalSpeed;
  if(data.ball.top<0 || data.ball.top > data.maxHeight) {
    data.ball.verticalSpeed = -1* data.ball.verticalSpeed;
  }
  ball.style.top = data.ball.top;
}

var calculateVerticalSpeed = function(data, diff) {
  data.ball.verticalSpeed = Math.floor((diff-(data.paddleHeight/2))/10);
}

var givePoint = function(data, goingRight) {
  console.log(goingRight);
  if(goingRight) {
    data.player1 += 1;
  } else {
    data.player2 += 1;
  }
  document.querySelector(".player1").textContent = data.player1;
  document.querySelector(".player2").textContent = data.player2;
}
