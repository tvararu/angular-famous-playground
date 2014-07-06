'use strict';

var gulp = require('gulp');

gulp.task('watch', ['jade', 'wiredep', 'styles'], function () {
  gulp.watch('app/styles/**/*.sass', ['styles']);
  gulp.watch('bower.json', ['wiredep']);

  gulp.start('watch:jade');
});
