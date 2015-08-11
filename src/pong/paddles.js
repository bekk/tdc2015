var data = {};
module.exports = function(initialData) {
  var data = initialData;
  return {
    moveLeftUp: function() {
      data.left.top = Math.max(data.left.top - 20, 0)
    },
    moveLeftDown: function() {
      data.left.top = Math.min(data.left.top + 20, data.maxHeight - data.paddleHeight);
    },
    moveRightUp: function() {
      data.right.top = Math.max(data.right.top - 20, 0);
    },
    moveRightDown: function() {
      data.right.top = Math.min(data.right.top + 20, data.maxHeight - data.paddleHeight);
    }
  }
};
