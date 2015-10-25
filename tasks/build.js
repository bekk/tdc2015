var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');
var appManager = require('../lib/apps');
var onEnd = require('./utils').onEnd;
var through = require('through2');

var outputRoot = path.join(__dirname, '..', 'public', 'apps');

module.exports = function () {
  return appManager.retrieve().pipe(through.obj(function(app, enc, callback){
    if (!app.entry) {
      return callback();
    }
    var stream = browserify(path.join(__dirname, '..', 'apps', app.entry))
        .bundle()
        .pipe(source(app.name + '.bundle.js'))
        .pipe(gulp.dest(outputRoot))
        .pipe(onEnd(callback));

    this.emit(stream);
  }))
};
