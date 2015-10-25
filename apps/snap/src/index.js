var Myo = require('@bekk/custom/myo');
var Bacon = require('baconjs');

var audio = new Audio('assets/snap.m4a');
audio.play();

Bacon.fromEvent(Myo, 'snap')
  .merge(Bacon.fromEvent(Myo, 'double_tap'))
   .debounceImmediate(300)
   .onValue(() => audio.play());

Myo.connect();
Myo.on('paired', function () {
  Myo.setLockingPolicy("none");
});
