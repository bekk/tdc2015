var autoprefix = require('gulp-autoprefixer'),
    gulp       = require('gulp'),
    path       = require('path'),
    gulp_less  = require('gulp-less'),
    rename     = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge-stream');

var outputRoot = path.join(__dirname, '..', 'public', 'apps');

module.exports = function less (apps) {
  var streams =
    [runTask({
      name: 'base',
      entryStyle: path.join(__dirname, '..', 'style', 'base.less')
    })].concat(apps
      .filter((app) => !!app.entryStyle)
      .map((app) => ({
        name: app.name,
        entryStyle: path.join(__dirname, '..', 'apps', app.entryStyle)
      }))
      .map(runTask));

  var merged = merge.apply(null, streams);
  return merged;
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
