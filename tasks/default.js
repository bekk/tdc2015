var gulp = require("gulp");

module.exports = function () {
  return gulp.series("build", "less");
};
