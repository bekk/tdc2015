var gulp = require('gulp');
var build = require("./build");
var less = require("./less");
var path = require("path");

var js = path.join(__dirname, '..', 'apps', '**', '*.js');
var css = path.join(__dirname, '..', 'apps', '**', '*.less');
var base = path.join(__dirname, '..', 'style', '**', '*.less');

module.exports = function watch(apps) {
  gulp.watch(js, build.bind(null, apps));
  gulp.watch(css, less.bind(null, apps));
  gulp.watch(base, less.bind(null, apps));
};
