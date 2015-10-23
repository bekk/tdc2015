var gulp = require('gulp');
var build = require("./tasks/build");
var less = require("./tasks/less");
var watch = require("./tasks/watch");


var appManager = require('./lib/apps');

gulp.task("build", function (cb) {
  appManager.retrieve(function (apps) {
    build(apps, cb);
  });
});
gulp.task("less", function (cb) {
  appManager.retrieve(function (apps) {
    less(apps, cb);
  });
});
gulp.task("watch", function (cb) {
  appManager.retrieve(function (apps) {
    watch(apps);
  });
});

gulp.task("default", gulp.series('build', 'less'));
