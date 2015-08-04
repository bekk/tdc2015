var autoprefix = require('gulp-autoprefixer'),
    gulp       = require('gulp'),
    gulp_less       = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps')

module.exports = function less(options) {
  return gulp.src(__dirname + "/../styles/*.less")
    .pipe(sourcemaps.init())
    .pipe(gulp_less())
    .pipe(autoprefix({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(__dirname + "/.."));
};
