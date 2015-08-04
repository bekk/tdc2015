module.exports = function(data) {
  var paddles = require("./paddles")(data);
  document.addEventListener("keydown", function(e){
    if(e.which == 87) { //w
      paddles.moveLeftUp();
    }
    else if(e.which == 83) { //s
      paddles.moveLeftDown();
    }
    else if(e.which == 38) { //pil opp
      paddles.moveRightUp();
    }
    else if(e.which == 40) { //pil ned
      paddles.moveRightDown();
    }
  });
};
