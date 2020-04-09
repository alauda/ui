const gulp = require('gulp');
const sass = require('gulp-dart-sass');

gulp
  .src([
    'src/theme/_base-var.scss',
    'src/theme/_pattern.scss',
    'src/theme/_var.scss',
    'src/theme/_mixin.scss',
  ])
  .pipe(gulp.dest('release/theme'));

gulp
  .src('src/theme/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('release/theme'));
