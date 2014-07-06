'use strict';

var gulp = require('gulp');

gulp.task('watch', ['jade', 'wiredep', 'styles'], function () {
  gulp.watch('app/styles/**/*.sass', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('app/**/*.jade', ['jade']);
  gulp.watch('bower.json', ['wiredep']);
});
