const path = require('node:path');
const fs = require('node:fs');

const gulp = require('gulp');
const sass = require('sass');
const ngPackagr = require('ng-packagr');

const { getBuildDest, copyDist } = require('./utils');

const isDebug = process.argv.includes('--debug');
const watch = process.argv.includes('--watch');

const debugNgPackage = '../ng-package.debug.json';

const releaseDest = isDebug ? require(debugNgPackage).dest : 'release';

function copyResources() {
  const themeDest = path.resolve(releaseDest, 'theme');
  
  // 复制 SCSS 源文件
  gulp
    .src([
      'src/theme/_base-var.scss',
      'src/theme/_pattern.scss',
      'src/theme/_var.scss',
      'src/theme/_theme-preset.scss',
      'src/theme/_mixin.scss',
    ])
    .pipe(gulp.dest(themeDest));

  // 复制 Angular CDK overlay CSS 文件
  gulp
    .src('node_modules/@angular/cdk/overlay-prebuilt.css')
    .pipe(gulp.dest(themeDest));

  // 使用现代 sass API 编译 style.scss（移除 CDK 导入）
  try {
    // 临时创建一个不包含 CDK 导入的版本
    const styleContent = fs.readFileSync('src/theme/style.scss', 'utf8');
    const tempStyleContent = styleContent.replace(/@use 'node_modules\/@angular\/cdk\/overlay-prebuilt';\n?/, '');
    
    const result = sass.compileString(tempStyleContent, {
      style: 'compressed',
      loadPaths: ['src/theme', 'node_modules']
    });
    
    // 确保目标目录存在
    if (!fs.existsSync(themeDest)) {
      fs.mkdirSync(themeDest, { recursive: true });
    }
    
    // 写入编译后的 CSS
    fs.writeFileSync(path.join(themeDest, 'style.css'), result.css);
  } catch (error) {
    console.error('Sass compilation error:', error);
    process.exit(1);
  }
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
