'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './bin/www',

    // watch core server file(s) that require server restart on change
    watch: ['app.js', 'routes/*.js']
  })
    .on('start', function onStart() {
      // ensure start only called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      console.log('restarted');
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in safari, my personal browser of choice
    browser: ['safari'],

    //turn off incredibly annoying prompt
    notify: false
  });
});

gulp.task('pug', function () {
  return gulp.src('views/*.pug')
    .pipe(gulp.dest('dest/html'));
});

//fit to task js in future
gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    .pipe(gulp.dest('dest/js'));
});

//fit to task css in future, perhaps move to less
gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(gulp.dest('dest/css'));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync', 'pug', 'css', 'js'], function () {
  gulp.watch('public/**/*.js',   ['js', 'bs-reload']);
  gulp.watch('views/*.pug', ['pug','bs-reload'])
  gulp.watch('public/**/*.css', ['bs-reload']);
  gulp.watch('public/**/*.html', ['bs-reload']);
});
