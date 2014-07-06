'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.sass')
    .pipe(wiredep({
      directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.jade')
    .pipe(wiredep({
      directory: 'app/bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('app'));
});
