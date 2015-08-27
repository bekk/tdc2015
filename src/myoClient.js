var Myo = require('myo');
var smoothie = require('smoothie');

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
  var chart = new smoothie.SmoothieChart({minValue: -128, maxValue: 128});
  chart.streamTo(document.getElementById("canvas"+(i+1)), 10);
  chart.addTimeSeries(sensors[i],{ strokeStyle:'rgb('+(255-i*30)+', '+(i*30)+', 255)'});
}

//Start talking with Myo Connect
Myo.connect();
// console.log(Myo);
// Myo.on('fist', function(){
//     console.log('Hello Myo!');
//     this.vibrate();
// });

Myo.on('pose', function(pose_name){
    console.log('Started ', pose_name);
});

Myo.on("paired", function(){
  var myMyo = Myo.myos[0];
  // var myMyo = Myo.create();
  // console.log(Myo)
  // console.log(Myo.myos)
  // console.log(myMyo);
  // myMyo.on('fist', function(){
  //     console.log('fist pose start');
  // });
  // myMyo.on('fist_off', function(){
  //     console.log('fist pose end');
  //     this.vibrate();
  // });

  // myMyo.on('connected', function(){
  myMyo.streamEMG(false);
  myMyo.unlock();
  // });
  myMyo.on('emg', function(data){
    var time = new Date().getTime();
    for (var i = 0; i < data.length; i++) {
      sensors[i].append(time, data[i]);
    }
  });
  var i = 0;
  myMyo.on('orientation', function(data) {
    if(i%30===0) {
      console.log(data.y)
    }
    i+=1;
  });
});
