const path = require('node:path');
const fs = require('node:fs');
const gulp = require('gulp');
const sass = require('sass');

const isDebug = process.argv[2] === '--debug';

const debugNgPackage = '../ng-package.debug.json';

const dest = (isDebug ? require(debugNgPackage).dest : 'release') + '/theme';

// 复制 SCSS 源文件
gulp
  .src([
    'src/theme/_base-var.scss',
    'src/theme/_pattern.scss',
    'src/theme/_var.scss',
    'src/theme/_theme-preset.scss',
    'src/theme/_mixin.scss',
  ])
  .pipe(gulp.dest(dest));

// 复制 Angular CDK overlay CSS 文件
gulp
  .src('node_modules/@angular/cdk/overlay-prebuilt.css')
  .pipe(gulp.dest(dest));

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
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  // 写入编译后的 CSS
  fs.writeFileSync(path.join(dest, 'style.css'), result.css);
} catch (error) {
  console.error('Sass compilation error:', error);
  process.exit(1);
}
