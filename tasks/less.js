var autoprefix = require('gulp-autoprefixer'),
    gulp       = require('gulp'),
    path       = require('path'),
    gulp_less  = require('gulp-less'),
    rename     = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    merge      = require('merge-stream'),
    through    = require('through2'),
    appManager = require('../lib/apps');

var outputRoot = path.join(__dirname, '..', 'public', 'apps');

module.exports = function less () {
  runTask({
    name: 'base',
    entryStyle: path.join(__dirname, '..', 'style', 'base.less')
  });
  return appManager.retrieve().pipe(through.obj(function(app, enc, done){
    if (!app.entryStyle) {
      return done();
    }
    this.push(runTask({
      name: app.name,
      entryStyle: path.join(__dirname, '..', 'apps', app.entryStyle)
    }));
    done();
  }));
};

function runTask (app) {
  return gulp.src(app.entryStyle)
    .pipe(sourcemaps.init())
    .pipe(gulp_less())
    .pipe(rename(app.name + '.bundle.css'))
    .pipe(autoprefix({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(outputRoot));
}
