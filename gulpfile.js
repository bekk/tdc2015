var gulp = require('gulp');
var build = require('./tasks/build');
var less = require('./tasks/less');
var watch = require('./tasks/watch');
var defaultTask = require('./tasks/default');

gulp.task('build', build);
gulp.task('less', less);
gulp.task('watch', watch);

gulp.task('default', defaultTask());
