var data = require("./data");
var score = require("./score");
var paddles = require("./paddlesMyo");
var ball = require("./ball");
var render = require("./render");
var highscore = require("./highscore");
var Myo = require("myo");

Myo.connect();
var dataClone = JSON.parse(JSON.stringify(data));

var myo1ready = false;
var myo2ready = false;
var myo1;
var myo2;

Myo.on("paired", function(){
  if(Myo.myos.length < 2 ) { return; }
  console.log('Starting game');

  Myo.setLockingPolicy("none");

  myo1 = Myo.myos[0];
  myo2 = Myo.myos[1];

  myo1.on('fist', function() { myo1ready = true; start();});
  myo1.on('fist_off', function() { myo1ready = false; });
  myo2.on('fist', function() { myo2ready = true; start();});
  myo2.on('fist_off', function() { myo2ready = false; });
});

var start = function() {
  if(!myo1ready || !myo2ready) { return; }
  console.log('Starting game');
  if(dataClone.finished) {
    myo1.zeroOrientation();
    myo2.zeroOrientation();
    dataClone = JSON.parse(JSON.stringify(data));
    dataClone.finished = false;
    // highscore(dataClone);
    score(dataClone);
    render(dataClone);
    paddles(dataClone);
    ball(dataClone);
  }
}

// window.addEventListener("keyup", function(e){
//   if(e.which === 32 && dataClone.finished){ //space
//     dataClone = JSON.parse(JSON.stringify(data));
//     dataClone.finished = false;
//     highscore(dataClone);
//     score(dataClone);
//     render(dataClone);
//     paddles(dataClone);
//     ball(dataClone);
//   }
// });
