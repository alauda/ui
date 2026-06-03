const fs = require('node:fs/promises');
const path = require('node:path');

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const ngPackagr = require('ng-packagr');

const { getBuildDest, copyDist } = require('./utils');

const isDebug = process.argv.includes('--debug');
const watch = process.argv.includes('--watch');

const debugNgPackage = '../ng-package.debug.json';

const releaseDest = isDebug ? require(debugNgPackage).dest : 'release';

async function afterBuild() {
  const themeDest = path.resolve(releaseDest, 'theme');
  gulp
    .src([
      'src/theme/_base-var.scss',
      'src/theme/_pattern.scss',
      'src/theme/_var.scss',
      'src/theme/_theme-preset.scss',
      'src/theme/_mixin.scss',
    ])
    .pipe(gulp.dest(themeDest));

  gulp
    .src('src/theme/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(themeDest));

  // hack for rspack module federation due to `dayjs -> dayjs/esm` alias
  const esmEntry = path.resolve(releaseDest, 'fesm2022/alauda-ui.mjs');
  const esmEntryContent = await fs.readFile(esmEntry, 'utf-8');
  await fs.writeFile(
    esmEntry,
    esmEntryContent.replace(
      "import dayjs from 'dayjs';",
      "import dayjs_ from 'dayjs';\nconst dayjs = 'default' in dayjs_ ? dayjs_.default : dayjs_;",
    ),
  );
}

const packagr = ngPackagr
  .ngPackagr()
  .forProject(
    path.resolve(isDebug ? `ng-package.debug.json` : `ng-package.json`),
  )
  .withTsConfig(path.resolve('tsconfig.lib.json'));

if (watch) {
  packagr.watch().subscribe(() => {
    afterBuild();

    if (!isDebug) {
      const src = path.resolve(__dirname, '../release');
      const destinations = getBuildDest();

      destinations.forEach(dest => copyDist(src, dest));
    }
  });
} else {
   
  packagr.build().then(afterBuild);
}
