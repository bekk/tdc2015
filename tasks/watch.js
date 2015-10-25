var gulp = require('gulp');
var path = require('path');

var js = path.join(__dirname, '..', 'apps', '**', '*.js');
var css = path.join(__dirname, '..', 'apps', '**', '*.less');
var base = path.join(__dirname, '..', 'style', '**', '*.less');

module.exports = function watch(apps) {
  gulp.watch([js, css, base], gulp.series('default'));
};
