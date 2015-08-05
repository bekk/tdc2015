var intervalId = 0;
module.exports = function(data) {
  var ball = document.querySelector('.ball');
  var goingRight = true;
  intervalId = window.setInterval(function() {
    var left = data.ball.left;
    moveVertical(data, ball);
    if(goingRight){
      data.ball.left += 5;
      if(left > parseInt(window.innerWidth, 10)-20-20) {
        goingRight = calculateHit(data, goingRight);
      }
    }
    else {
      data.ball.left -= 5;
      if (left < 0 + 20) {
        goingRight = calculateHit(data, goingRight);
      }
    }
    ball.style.left = data.ball.left;
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
    return !goingRight;
  } else {
    data.ball.verticalSpeed = 0;
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
  ball.style.top = data.ball.top;
}

var calculateVerticalSpeed = function(data, diff) {
  data.ball.verticalSpeed = Math.floor((diff-(data.paddleHeight/2))/10);
}

var givePoint = function(data, goingRight) {
  if(goingRight) {
    data.player1 += 1;
  } else {
    data.player2 += 1;
  }
  document.querySelector(".player1").textContent = data.player1;
  document.querySelector(".player2").textContent = data.player2;

  if(data.player1 + data.player2 >= 2 && data.player1 !== data.player2) {
    clearInterval(intervalId);
    if(data.player1 > data.player2) {
      document.querySelector(".player1").classList.add("winner");
    } else {
      document.querySelector(".player2").classList.add("winner");
    }
  }
}
