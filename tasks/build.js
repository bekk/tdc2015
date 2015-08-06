var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');

module.exports = function build(entry, options) {
  var client = browserify(__dirname + "/../src/index.js")
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest(__dirname + "/../"));

  var server = browserify(__dirname + "/../server/server.js")
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest(__dirname + "/../server/files/"));


 return merge(client, server);
};
