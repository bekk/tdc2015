var $ = require('jquery');

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
  theme: 'vim',
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
