module.exports = function(data) {
  document.addEventListener("keydown", function(e){
    if(e.which == 87) { //w
      data.left.top = Math.max(data.left.top -5, 0)
      var paddle = document.querySelector('.paddle-left');
      paddle.style.top = data.left.top
    }
    else if(e.which == 83) { //s
      data.left.top = Math.min(data.left.top + 5, data.maxHeight - data.paddleHeight);
      var paddle = document.querySelector('.paddle-left');
      paddle.style.top = data.left.top
    }
    else if(e.which == 38) { //pil opp
      data.right.top = Math.max(data.right.top - 5, 0);
      var paddle = document.querySelector('.paddle-right');
      paddle.style.top = data.right.top;
    }
    else if(e.which == 40) { //pil ned
      data.right.top = Math.min(data.right.top + 5, data.maxHeight - data.paddleHeight);
      var paddle = document.querySelector('.paddle-right');
      paddle.style.top = data.right.top;
    }
  });
};
