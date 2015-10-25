var through = require('through2');

module.exports.onEnd = function (callback) {
  return through.obj(function (file, enc, done) {
    this.emit(file);
    done();
  }, function () {
    callback();
  });
};
