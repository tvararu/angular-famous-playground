'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var saveLicense = require('uglify-save-license');

gulp.task('jade', function () {
  return gulp.src('./app/**/*.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('watch:jade', function () {
  return gulp.src('./app/**/*.jade')
    .pipe($.watch())
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('styles', function () {
  return gulp.src('app/styles/main.sass')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded'
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials', ['jade'], function () {
  return gulp.src('./.tmp/partials/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'angularFamousPlayground',
      prefix: 'partials/'
    }))
    .pipe(gulp.dest('./.tmp/partials'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src('./.tmp/*.html')
    // Inject angular template partials.
    .pipe($.inject(gulp.src('./.tmp/partials/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials-->',
      endtag: '<!-- endinject-->',
      addRootSlash: false,
      addPrefix: '../'
    }))

    // Grab all the js/css references declared between build:css/build:js comments
    // in index.html, concat them, and reroute the stream to only refer to them from
    // this point.
    .pipe($.useref.assets())
    // Add revision suffix to files, i.e.: main.css -> main-1v9123.css
    .pipe($.rev())

    // Filter useref stream to just JS files.
    .pipe(jsFilter)
    // Run the Angular pre-minifier to prepare function calls for uglify,
    // i.e.: function ($scope) {} -> ['$scope', function ($scope) {}].
    .pipe($.ngmin())
    // Minify JS, preserving OSS licenses at the top.
    .pipe($.uglify({
      preserveComments: saveLicense
    }))
    // Restore stream to previous state.
    .pipe(jsFilter.restore())

    // Filter useref stream to just CSS files.
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap', 'fonts'))
    // Minify CSS.
    .pipe($.csso())
    // Restore stream to previous state.
    .pipe(cssFilter.restore())

    // Restore stream to pre-useref.
    .pipe($.useref.restore())
    .pipe($.useref())
    // Replace all previous references to revisioned files to the new one.
    .pipe($.revReplace())

    // Spit out everything in ./dist/ folder.
    .pipe(gulp.dest('./dist/'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return $.bowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], {
    read: false
  }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts']);
