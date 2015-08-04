var fs   = require('fs');
var gulp = require('gulp');

var build = require("./tasks/build");
var less = require("./tasks/less");
gulp.task("build", build );
gulp.task("less", less );

gulp.task("default", gulp.parallel(build, less));
