module.exports = function(data) {
  return {
    moveLeftUp: function() {
      data.left.top = Math.max(data.left.top -15, 0)
      var paddle = document.querySelector('.paddle-left');
      paddle.style.top = data.left.top
    },
    moveLeftDown: function() {
      data.left.top = Math.min(data.left.top + 15, data.maxHeight - data.paddleHeight);
      var paddle = document.querySelector('.paddle-left');
      paddle.style.top = data.left.top
    },
    moveRightUp: function() {
      data.right.top = Math.max(data.right.top - 15, 0);
      var paddle = document.querySelector('.paddle-right');
      paddle.style.top = data.right.top;
    },
    moveRightDown: function() {
      data.right.top = Math.min(data.right.top + 15, data.maxHeight - data.paddleHeight);
      var paddle = document.querySelector('.paddle-right');
      paddle.style.top = data.right.top;
    }
  }
};
