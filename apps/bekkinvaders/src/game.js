var Game = require('./game/spaceinvaders');
var Myo = require('myo');

var width = 600;
var height = 400;

var cursorSize = 30;

const FIRE_ROCKET = 32;
const GO_LEFT = 37;
const GO_RIGHT = 39;

//  Setup the canvas.
var canvas = document.getElementById('gameCanvas');
canvas.width = width;
canvas.height = height;

//  Create the game.
var game = new Game();

//  Initialise it with the game canvas.
game.initialise(canvas);

//  Start the game.
game.start();

Myo.connect();
Myo.on('paired', onReady);

function getEulerAngles(q){
  return {
    roll : Math.atan2(2.0*(q.y*q.z + q.w*q.x), q.w*q.w - q.x*q.x - q.y*q.y + q.z*q.z),
    pitch : Math.asin(-2.0*(q.x*q.z - q.w*q.y)),
    yaw : Math.atan2(2.0*(q.x*q.y + q.w*q.z), q.w*q.w + q.x*q.x - q.y*q.y - q.z*q.z)
  }
}

Myo.on('orientation', function(quanternion){
  var angles = getEulerAngles(quanternion);
  var x = Math.sin(angles.yaw) * Math.sin(angles.pitch)
  var y = Math.sin(angles.pitch)

  this.trigger('horizontal', getSide(x));
  this.trigger('vertical', getVertical(y));
});

var gridSizeX = .1;
var gridSizeY = .2;
function getSide (x){
  if(x < gridSizeX) return 'left';
  return 'right';
}

function getVertical (y){
  if(y > gridSizeY) return 'up';
  return 'down';
}


function onReady () {
  Myo.setLockingPolicy("none");

  console.log('Connected Myo');
  myo = Myo.myos[0];
  myo.on('horizontal', function (side) {
    console.log(side);
    var code = side === 'left' ? GO_LEFT : GO_RIGHT;
    var reverseCode = side !== 'left' ? GO_LEFT : GO_RIGHT;

    game.keyUp(reverseCode);
    game.keyDown(code);
  });


  // Fire
  myo.on('fist', function () {
    console.log('Fist made');
    game.keyDown(FIRE_ROCKET);
  });
  // Stop fire
  myo.on('fist_off', function () {
    console.log('Fist made stop');
    game.keyUp(FIRE_ROCKET);
  });
};

function orientationFunction(orientationData){
  var newHeight, offset, orientation;

  var half = width / 2;
  var per30 = half / 30;

  if(orientationData.x < 0) { // venstre
    orientation = Math.max(orientationData.x, -0.30) * -100; //0...30
    offset = per30 * orientation;
    newWidth = offset + half;
    return Math.min(newWidth, width - cursorSize);
  }

  // høyre
  orientation = Math.min(orientationData.x, 0.30) * 100; // 0...30
  offset = per30 * orientation;
  newWidth = half - offset;
  return Math.max(newWidth, 0);
};
