var paddles = require("./paddles")
var paddlesApi;
module.exports = function(data) {
  document.removeEventListener("keydown", listenerFunction);
  paddlesApi = paddles(data);
  document.addEventListener("keydown", listenerFunction);

};

var listenerFunction = function(e){
  if(e.which == 87) { //w
    paddlesApi.moveLeftUp();
  }
  else if(e.which == 83) { //s
    paddlesApi.moveLeftDown();
  }
  else if(e.which == 38) { //pil opp
    paddlesApi.moveRightUp();
  }
  else if(e.which == 40) { //pil ned
    paddlesApi.moveRightDown();
  }
};
