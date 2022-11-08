const path = require('path');

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const ngPackagr = require('ng-packagr');

const { getBuildDest, copyDist } = require('./utils');

const isDebug = process.argv.includes('--debug');
const watch = process.argv.includes('--watch');

const debugNgPackage = '../ng-package.debug.json';

const dest = (isDebug ? require(debugNgPackage).dest : 'release') + '/theme';

function copyResources() {
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
}

const packagr = ngPackagr
  .ngPackagr()
  .forProject(
    path.resolve(isDebug ? `ng-package.debug.json` : `ng-package.json`),
  )
  .withTsConfig(path.resolve('tsconfig.lib.json'));

if (watch) {
  packagr.watch().subscribe(() => {
    copyResources();

    if (!isDebug) {
      const src = path.resolve(__dirname, '../release');
      const destinations = getBuildDest();

      destinations.forEach(dest => copyDist(src, dest));
    }
  });
} else {
  packagr.build().then(copyResources);
}
