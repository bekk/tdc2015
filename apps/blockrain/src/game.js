var $ = require('jquery');

// Set jQuery on global where it is accessed in the next module
window.jQuery = $;

require('./blockrain.jquery.js');

$('.game').blockrain({
  autoplay: false,
  autoplayRestart: false,
  showFieldOnStart: true,
  theme: 'vim'
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

setInterval(function() {
}, 1000);
