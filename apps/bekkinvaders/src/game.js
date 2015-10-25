var Game = require('./game/spaceinvaders');
var Myo = require('@bekk/custom/myo');

var width = 600;
var height = 400;

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

//  Listen for keyboard events.
window.addEventListener("keydown", function keydown(e) {
  var keycode = e.which || window.event.keycode;
  //  Supress further processing of left/right/space (37/29/32)
  if(keycode == 37 || keycode == 39 || keycode == 32) {
    e.preventDefault();
  }
  game.keyDown(keycode);
});
window.addEventListener("keyup", function keydown(e) {
  game.keyUp(e.which || window.event.keycode);
});


Myo.on('vector', function (v) {
  game.setX(v.x);
});

Myo.on('double_tap', function(){
  console.log('Reset orientation');
	this.zeroOrientation();
});

// Fire
Myo.on('fist', function () {
  console.log('Fist made');
  game.keyDown(FIRE_ROCKET);
});

// Stop fire
Myo.on('fist_off', function () {
  console.log('Fist made stop');
  game.keyUp(FIRE_ROCKET);
});

function onReady () {
  console.log('Connected Myo');
  Myo.setLockingPolicy("none");
};
