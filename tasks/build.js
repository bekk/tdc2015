var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var path = require('path');
var through = require('through2');

var outputRoot = path.join(__dirname, '..', 'public', 'apps');

module.exports = function build(apps) {
  var streams = apps.filter((app) => !!app.entry).map(function (app) {
    return browserify(path.join(__dirname, '..', 'apps', app.entry))
      .bundle()
      .pipe(source(app.name + '.bundle.js'))
      .pipe(gulp.dest(outputRoot));
  });

  var merged = merge.apply(null, streams);
  return merged;
};
