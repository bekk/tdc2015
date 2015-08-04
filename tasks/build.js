var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function build(entry, options) {
  return browserify(__dirname + "/../src/index.js")
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest(__dirname + "/../"));
};
