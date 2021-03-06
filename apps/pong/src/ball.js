var data = {};
module.exports = function(initialData) {
  data = initialData;
  var ball = document.querySelector('.ball');
  var goingRight = true;
  data.gameLoopId = window.setInterval(function() {
    var left = data.ball.left;
    moveVertical(data, ball);
    if(goingRight){
      data.ball.left += data.ball.speed;
      if(left > parseInt(window.innerWidth, 10)-20-20) {
        goingRight = calculateHit(data, goingRight);
      }
    }
    else {
      data.ball.left -= data.ball.speed;
      if (left < 0 + 20) {
        goingRight = calculateHit(data, goingRight);
      }
    }
  }, 10);
};

var calculateHit = function(data, goingRight) {
  var ballTop = data.ball.top;
  if(goingRight) {
    var paddleTop = data.right.top;
  } else {
    var paddleTop = data.left.top;
  }
  if(ballTop < paddleTop + data.paddleHeight && ballTop > paddleTop - 20) {
    calculateVerticalSpeed(data, ballTop-paddleTop);
    increaseSpeed(data);
    return !goingRight;
  } else {
    data.ball.verticalSpeed = 0;
    data.ball.speed = 5;
    data.ball.top = 200;
    data.ball.left = window.innerWidth/2;
    givePoint(data, goingRight);
  }
  return goingRight;
}

var moveVertical = function(data, ball) {
  data.ball.top +=  data.ball.verticalSpeed;
  if(data.ball.top<0 || data.ball.top > (data.maxHeight-data.ballHeight)) {
    data.ball.verticalSpeed = -1* data.ball.verticalSpeed;
  }
}

var calculateVerticalSpeed = function(data, diff) {
  data.ball.verticalSpeed = Math.floor((diff-(data.paddleHeight/2))/10);
}

var increaseSpeed = function(data) {
  data.ball.speed += 1;
}

var givePoint = function(data, goingRight) {
  if(goingRight) {
    data.player1 += 1;
  } else {
    data.player2 += 1;
  }
}
