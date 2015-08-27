var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');

module.exports = function build(entry, options) {
  var pong = browserify(__dirname + "/../src/pong/index.js")
  .bundle()
  .pipe(source('pong.js'))
  .pipe(gulp.dest(__dirname + "/../games/pong"));

  var smash = browserify(__dirname + "/../src/smash/index.js")
  .bundle()
  .pipe(source('smash.js'))
  .pipe(gulp.dest(__dirname + "/../games/smash"));

  var server = browserify(__dirname + "/../server/server.js")
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(__dirname + "/../server/files/"));

  var chart = browserify(__dirname + "/../src/myoClient.js")
  .bundle()
  .pipe(source('chart.js'))
  .pipe(gulp.dest(__dirname + "/../"));


 return merge(pong, smash, server, chart);
};
