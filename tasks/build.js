var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var merge = require('merge-stream');
var path = require('path');
var through = require('through2');
var appManager = require('../lib/apps');

var outputRoot = path.join(__dirname, '..', 'public', 'apps');

module.exports = function () {
  return appManager.retrieve().pipe(through.obj(function(app, enc, callback){
    if (!app.entry) {
      return callback();
    }
    this.push(browserify(path.join(__dirname, '..', 'apps', app.entry))
        .bundle()
        .pipe(source(app.name + '.bundle.js'))
        .pipe(gulp.dest(outputRoot)));
    callback();
  }))
};
