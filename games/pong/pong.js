(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports = {
  gameLoopId: -1,
  finished: true,
  player1: 0,
  player2: 0,
  paddleHeight: 120,
  ballHeight: 20,
  maxHeight: 500,
  left: {
    top: 200
  },
  right: {
    top: 200
  },
  ball: {
    top: 200,
    left: 400,
    speed: 5,
    verticalSpeed: 0
  }
};

},{}],3:[function(require,module,exports){
var data = {};

module.exports = function(initialData) {
  if(data.finished){
    Object.unobserve(data, observerFunctionFinished)
  }
  data = initialData;
  Object.observe(data, observerFunctionFinished, ['update']);
}


var observerFunctionFinished = function(changes){
  changes.forEach(function(change) {
    if(change.name === "finished" && data.finished){
      document.querySelector(".paddle-left").classList.add("blurred");
      document.querySelector(".paddle-right").classList.add("blurred");
      document.querySelector(".ball").classList.add("blurred");
      document.querySelector(".name").classList.remove("hidden");
      document.querySelector(".input").focus();
      document.querySelector(".form").addEventListener("submit", formSubmitted);
    }
  });
}

var formSubmitted = function(e) {
  e.preventDefault();
  document.querySelector(".paddle-left").classList.remove("blurred");
  document.querySelector(".paddle-right").classList.remove("blurred");
  document.querySelector(".ball").classList.remove("blurred");
  document.querySelector(".name").classList.add("hidden");
  var input = document.querySelector(".input");
  var name = input.value;
  input.value = "";
  document.querySelector(".form").removeEventListener("submit", formSubmitted);

  var myDataRef = new Firebase('https://burning-torch-5939.firebaseio.com/');
  myDataRef.push({name: name, score: Math.max(data.player1, data.player2)});
  return false;
}

},{}],4:[function(require,module,exports){
var data = require("./data");
var score = require("./score");
var paddles = require("./paddlesKeyboard");
var ball = require("./ball");
var render = require("./render");
var highscore = require("./highscore");

var dataClone = JSON.parse(JSON.stringify(data));
window.addEventListener("keyup", function(e){
  if(e.which === 32 && dataClone.finished){ //space
    dataClone = JSON.parse(JSON.stringify(data));
    dataClone.finished = false;
    highscore(dataClone);
    score(dataClone);
    render(dataClone);
    paddles(dataClone);
    ball(dataClone);
  }
});

},{"./ball":1,"./data":2,"./highscore":3,"./paddlesKeyboard":6,"./render":7,"./score":8}],5:[function(require,module,exports){
var data = {};
module.exports = function(initialData) {
  var data = initialData;
  return {
    moveLeftUp: function() {
      data.left.top = Math.max(data.left.top - 20, 0)
    },
    moveLeftDown: function() {
      data.left.top = Math.min(data.left.top + 20, data.maxHeight - data.paddleHeight);
    },
    moveRightUp: function() {
      data.right.top = Math.max(data.right.top - 20, 0);
    },
    moveRightDown: function() {
      data.right.top = Math.min(data.right.top + 20, data.maxHeight - data.paddleHeight);
    }
  }
};

},{}],6:[function(require,module,exports){
var paddles = require("./paddles")
var paddlesApi;
var data = {}
module.exports = function(initialData) {
  data = initialData;
  document.removeEventListener("keydown", listenerFunction);
  paddlesApi = paddles(data);
  document.addEventListener("keydown", listenerFunction);

};

var listenerFunction = function(e){
  if(data.finished) { return; }
  if(e.which == 87) { //w
    paddlesApi.moveLeftUp();
  }
  else if(e.which == 83) { //s
    paddlesApi.moveLeftDown();
  }
  else if(e.which == 38) { //pil opp
    paddlesApi.moveRightUp();
  }
  else if(e.which == 40) { //pil ned
    paddlesApi.moveRightDown();
  }
};

},{"./paddles":5}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
var data = {};
module.exports = function(startData){
    Object.unobserve(data, observerFunction);
    data = startData;
    Object.observe(data, observerFunction, ["update"]);
    updateScore(data);
    document.querySelector(".player1").classList.remove("winner");
    document.querySelector(".player2").classList.remove("winner");
}

var observerFunction = function(changes){
  changes.forEach(function(change) {
    if(change.name === "player1" || change.name === "player2") {
      updateScore(data);
      checkGameFinished(data);
    }
  });
}

var updateScore = function(data) {
  document.querySelector(".player1").textContent = data.player1;
  document.querySelector(".player2").textContent = data.player2;
}

var checkGameFinished = function(data) {
  if(data.player1 + data.player2 >= 2 && data.player1 !== data.player2) {
    clearInterval(data.gameLoopId);
    data.finished = true;
    if(data.player1 > data.player2) {
      document.querySelector(".player1").classList.add("winner");
    } else {
      document.querySelector(".player2").classList.add("winner");
    }
  }
}

},{}]},{},[4]);
