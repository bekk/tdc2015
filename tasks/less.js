var autoprefix = require('gulp-autoprefixer'),
    gulp       = require('gulp'),
    gulp_less  = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge-stream');


module.exports = function less(options) {
  var client = gulp.src(__dirname + "/../styles/pong.less")
    .pipe(sourcemaps.init())
    .pipe(gulp_less())
    .pipe(autoprefix({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(__dirname + "/../games/pong"));

  var server = gulp.src(__dirname + "/../server/*.less")
    .pipe(sourcemaps.init())
    .pipe(gulp_less())
    .pipe(autoprefix({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(__dirname + "/../server/files/"));

    return merge(client, server);
};
