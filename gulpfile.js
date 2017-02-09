var gulp    = require('gulp');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require("gulp-ng-html2js");

gulp.task('scripts', function() {
  gulp.src(['./fitness_client/**/*.js', '!./fitnes_client/**/*.test.js', '!./fitness_client/app.min.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('./app.min.js'))
      .pipe(uglify({mangle: true}))
      .pipe(gulp.dest('fitness_client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('fitness_client'));
});

gulp.task('watch', function() {
  watch(['./fitness_client/**/*.js', '!./fitness_client/**/*.test.js', '!./fitness_client/app.min.js'], function () {
    gulp.start('scripts');
  });
});

gulp.task('default', ['scripts', 'watch']);
