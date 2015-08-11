var Myo = require('myo');
var smoothie = require('smoothie');
var chart = new smoothie.SmoothieChart();
chart.streamTo(document.getElementById("mycanvas"), 1000);

var sensors = [
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries()];

for (var i = 0; i < sensors.length; i++) {
  chart.addTimeSeries(sensors[i]);
}

//Start talking with Myo Connect
Myo.connect();

Myo.on('fist', function(){
    console.log('Hello Myo!');
    this.vibrate();
});

Myo.on('pose', function(pose_name){
    console.log('Started ', pose_name);
});

var myMyo = Myo.myos[0];
myMyo.on('fist', function(){
    console.log('fist pose start');
});
myMyo.on('fist_off', function(){
    console.log('fist pose end');
});

myMyo.on('connected', function(){
    myMyo.streamEMG(true);
});
myMyo.on('emg', function(data){
  var time = new Date().getTime();
  for (var i = 0; i < data.length; i++) {
    sensors[i].append(time, data[i]);
  }
  // console.log(data);
});
