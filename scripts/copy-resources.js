const gulp = require('gulp');
const sass = require('gulp-dart-sass');

const isDebug = process.argv[2] === '--debug';

const debugNgPackage = '../ng-package.debug.json';

const dest = (isDebug ? require(debugNgPackage).dest : 'release') + '/theme';

gulp
  .src([
    'src/theme/_base-var.scss',
    'src/theme/_pattern.scss',
    'src/theme/_var.scss',
    'src/theme/_theme-preset.scss',
    'src/theme/_mixin.scss',
  ])
  .pipe(gulp.dest(dest));

gulp
  .src('src/theme/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(dest));
