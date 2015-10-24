var $ = require('jquery');
var Myo = require('@bekk/custom/myo');
var Bacon = require('baconjs');

// Set jQuery on global where it is accessed in the next module
window.jQuery = $;

require('./blockrain.jquery.js');

var playerIsPlaying, timeoutId;

$('.game').click(function() {
  restartAsPlayer();
});

$('.game').blockrain({
  autoplay: true,
  autoplayRestart: true,
  theme: 'bekk',
  onGameOver: function(score) {
    if (playerIsPlaying) {
      timeoutId = setTimeout(function () {
        playerIsPlaying = false;
        $('.game').blockrain('restart');
        $('.game').blockrain('autoplay', true);
      }, 5000);
    }
  }
});

// Start the game
// $game.blockrain('start');

// Restart the game
// $game.blockrain('restart');

// Trigger a game over
// $game.blockrain('gameover');

// Pause
// $game.blockrain('pause');

// Resume
// $game.blockrain('resume');

var controls = $('.game').blockrain('controls');

Myo.connect();
Myo.on('paired', onReady);

Myo.on('snap', function(){
  console.log('Reset orientation');
	this.zeroOrientation();
});

Myo.on('wave_out', function(pose_name){
  console.log('Wave In made');
  restartAsPlayer();
});

var vectors = Bacon.fromEvent(Myo, 'vector');

var is = c => v => v === c;

var horizontal = vectors.map(v => getHorizontal(v.x)).debounceImmediate(100);
horizontal.filter(is('left')).onValue(left);
horizontal.filter(is('right')).onValue(right);

var vertical = vectors.map(v => getVertical(v.y)).debounceImmediate(200);
vertical.filter(is('down')).onValue(down);

Bacon.fromEvent(Myo, 'fist').debounceImmediate(300).log().onValue(rotateRight);

function onReady () {
  console.log('Connected Myo');
  Myo.setLockingPolicy("none");
};

var threshold = .3;
var thresholdHorizontal = .2;

function getVertical (y) {
  if (y > threshold) {
    return 'up';
  }
  if (y < -threshold) {
    return 'down';
  }
  return 'center';
}

function getHorizontal (x) {
  if (x < -thresholdHorizontal) {
    return 'left';
  }
  if (x > thresholdHorizontal) {
    return 'right';
  }
  return 'center';
}

function restartAsPlayer() {
  playerIsPlaying = true;
  clearTimeout(timeoutId);
  $('.game').blockrain('autoplay', false);
  $('.game').blockrain('touchControls', false);
  $('.game').blockrain('restart');
}

function keydown(code) {
  controls.keydown({
    keyCode: code,
    preventDefault: function() {}
  });
}

function keyup(code) {
  controls.keyup({
    keyCode: code,
    preventDefault: function() {}
  });
}

function left() {
  keydown(37);
  keyup(37);
}

function right() {
  keydown(39);
  keyup(39);
}

function down() {
  keydown(40);
  keyup(40);
}

function up() {
  keydown(38);
  keyup(38);
}

function rotateRight() {
  keydown(88);
  keyup(88);
}

function rotateLeft() {
  keydown(90);
  keyup(90);
}
