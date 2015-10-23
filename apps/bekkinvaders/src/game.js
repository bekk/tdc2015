var Game = require('./game/spaceinvaders');
var Myo = require('myo');

var width = 1000;
var height = 600;

var cursorSize = 30;

const FIRE_ROCKET = 32;

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



function onReady () {
  Myo.setLockingPolicy("none");

  console.log('Connected Myo');
  myo = Myo.myos[0];
  myo.on('orientation', function (orientationData) {
    var left = orientationFunction(orientationData);
    game.setX(left);
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
