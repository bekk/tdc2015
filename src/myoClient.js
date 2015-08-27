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
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries(),
  new smoothie.TimeSeries()];

var chart = new smoothie.SmoothieChart();//{minValue: -128, maxValue: 128});
chart.streamTo(document.getElementById("canvas1"), 10);
chart.addTimeSeries(sensors[0],{ strokeStyle:'rgb('+(255-0*60)+', '+(0*60)+', '+(0*60)+')'});
chart.addTimeSeries(sensors[1],{ strokeStyle:'rgb('+(255-1*60)+', '+(1*60)+', '+(1*60)+')'});
chart.addTimeSeries(sensors[2],{ strokeStyle:'rgb('+(255-2*60)+', '+(2*60)+', '+(2*60)+')'});

var chart = new smoothie.SmoothieChart();//{minValue: -128, maxValue: 128});
chart.streamTo(document.getElementById("canvas2"), 10);
chart.addTimeSeries(sensors[3],{ strokeStyle:'rgb('+(255-0*60)+', '+(0*60)+', '+(0*60)+')'});
chart.addTimeSeries(sensors[4],{ strokeStyle:'rgb('+(255-1*60)+', '+(1*60)+', '+(1*60)+')'});
chart.addTimeSeries(sensors[5],{ strokeStyle:'rgb('+(255-2*60)+', '+(2*60)+', '+(2*60)+')'});

var chart = new smoothie.SmoothieChart();//{minValue: -128, maxValue: 128});
chart.streamTo(document.getElementById("canvas3"), 10);
chart.addTimeSeries(sensors[6],{ strokeStyle:'rgb('+(255-0*60)+', '+(0*60)+', '+(0*60)+')'});
chart.addTimeSeries(sensors[7],{ strokeStyle:'rgb('+(255-1*60)+', '+(1*60)+', '+(1*60)+')'});
chart.addTimeSeries(sensors[8],{ strokeStyle:'rgb('+(255-2*60)+', '+(2*60)+', '+(2*60)+')'});
chart.addTimeSeries(sensors[9],{ strokeStyle:'rgb('+(255-4*60)+', '+(3*60)+', '+(3*60)+')'});

// for (var i = 0; i < sensors.length; i++) {
//   var chart = new smoothie.SmoothieChart();//{minValue: -128, maxValue: 128});
//   chart.streamTo(document.getElementById("canvas1"), 10);
//   chart.addTimeSeries(sensors[i],{ strokeStyle:'rgb('+(255-i*30)+', '+(i*30)+', '+(0*60)+')'});
// }

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
  // myMyo.zeroOrientation();
  myMyo.unlock();

  myMyo.on('fist', function(){
    this.zeroOrientation();
    this.vibrate("short");
    this.vibrate("short");
    this.vibrate("short");
    myMyo.off("fist");
  });

  // myMyo.streamEMG(false);
  // myMyo.unlock();
  // myMyo.on('emg', function(data){
  //   var time = new Date().getTime();
  //   for (var i = 0; i < data.length; i++) {
  //     sensors[i].append(time, data[i]);
  //   }
  // });

  var i = 0;
  myMyo.on('gyroscope', function(data) {
    var time = new Date().getTime();
    sensors[0].append(time, data.x);
    sensors[1].append(time, data.y);
    sensors[2].append(time, data.z);
    // if(i%30===0) {
    //   console.log(data.y)
    // }
    // i+=1;
  });

  myMyo.on('accelerometer', function(data) {
    var time = new Date().getTime();
    sensors[3].append(time, data.x);
    sensors[4].append(time, data.y);
    sensors[5].append(time, data.z);
    // if(i%30===0) {
    //   console.log(data.y)
    // }
    // i+=1;
  });
  myMyo.on('orientation', function(data) {
    var time = new Date().getTime();
    sensors[6].append(time, data.x);
    sensors[7].append(time, data.y);
    sensors[8].append(time, data.z);
    sensors[9].append(time, data.w);
    // if(i%30===0) {
    //   console.log(data.y)
    // }
    // i+=1;
  });
});
