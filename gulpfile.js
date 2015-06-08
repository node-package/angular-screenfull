"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var path = require('path');
var del = require('del');

function isOnlyChange(event) {
  return event.type === 'changed';
}

var options = {
  path: {
    src: {
      dir: 'src/',
      less: 'src/*.less',
      js: 'src/*.js',
      tpl: 'src/*.html'
    },
    dist: {
      dir: 'dist/',
      css: 'dist/',
      js: 'dist/',
      tpl: 'dist/'
    }

  }
};


gulp.task('clean', function () {
  del(['dist/*'], function (err, paths) {
    //console.log('Deleted files/folders:\n', paths.join('\n'));
    console.log('Clean folder dist!')
  });
});

// Compress JS
gulp.task('compress-js', function () {
  gulp.src(options.path.src.js)
    .pipe(uglify('angular.screenfull.js', {
      mangle: false,
      output: {
        comments: false,
        indent_level: 2,
        beautify: true
      }
    }))
    .pipe(gulp.dest(options.path.dist.js));
});

// Min JS
gulp.task('min-js', function () {
  gulp.src(options.path.src.js)
    .pipe(uglify('angular.screenfull.min.js'))
    .pipe(gulp.dest(options.path.dist.js));
});

// Compress CSS
gulp.task('styles', function () {
  // place code for your default task here
  gulp.src(options.path.src.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(options.path.dist.css));
});

// Min CSS
gulp.task('min-styles', function () {
  // place code for your default task here
  gulp.src(options.path.dist.css + '*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(options.path.dist.css));
});


// Build
gulp.task('build', ['clean', 'compress-js', 'min-js', 'styles', 'min-styles'], function () {
  console.log("Build Ok");
});

// Build
gulp.task('default', ['build'], function () {
  console.log("Build Ok");
});

// Watch
gulp.task('watch', ['build'], function () {
  gulp.watch([
    options.path.src.dir,
  ], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('build');
    } else {
      gulp.start('inject');
    }
  });
});