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
