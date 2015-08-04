var gulp = require('gulp');
var build = require("./build");
var less = require("./less");


module.exports = function watch() {
    gulp.watch(__dirname + '/../src/*.js', build);
    gulp.watch(__dirname + '/../styles/*.less', less);
};
