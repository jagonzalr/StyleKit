
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var inject = require('gulp-inject');
var rename = require("gulp-rename");
var sass = require('gulp-sass');

browserSync.create();

gulp.task('sass', function() {
  return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('inject:css', ['sass'], function() {
  return gulp.src('./*.html')
    .pipe(inject(
        gulp.src('./css/*.css', {read: false})))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['inject:css'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch(['sass/**/*.scss'], ['inject:css']);
  gulp.watch("./*.html").on('change', browserSync.reload);

});

gulp.task('default');
