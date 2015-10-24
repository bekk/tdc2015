var Myo = require('@bekk/custom/myo');
var data = {};
var myo1;
var myo2;

module.exports = function(initialData) {
  data = initialData;
  myo1 = Myo.myos[0];
  myo2 = Myo.myos[1];
  myo1.off("vector")
  myo2.off("vector")
  myo1.on("vector", orientationFunction.bind(undefined, data.left));
  myo2.on("vector", orientationFunction.bind(undefined, data.right));
};

var orientationFunction = function(topObj, orientationData){
  if(data.finished) { return; }

  var half = data.maxHeight/2;
  var per30 = half/30;

  if(orientationData.y < 0) { //ned
    var orientation = Math.max(orientationData.y, -0.30) * -100; //0...30

    var offset = per30 * orientation;
    var newHeight = offset + half ;
    topObj.top = Math.min(newHeight, data.maxHeight - data.paddleHeight);

  } else { // opp
    orientation = Math.min(orientationData.y, 0.30) * 100; // 0...30
    offset = per30 * orientation;
    newHeight = half - offset;
    topObj.top = Math.max(newHeight, 0);
  }
};
