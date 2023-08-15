const fs = require('node:fs');
const path = require('node:path');

const chalk = require('chalk');

const { name: PACKAGE_NAME } = require('../package.json');

const BUILD_OPTIONS = new Set(['--watch', '--debug']);

// getProdVersion :: '4.0.0-prod-2.0-0' -> 'prod-2.0'
function getProdVersion(version) {
  const arr = version.split('-');
  return `${arr[1]}-${arr[2]}`;
}

function getBuildDest() {
  return process.argv.slice(2).filter(arg => !BUILD_OPTIONS.has(arg));
}

function copyFileSync(source, target) {
  let targetFile = target;

  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    targetFile = path.join(target, path.basename(source));
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, path.join(target, file));
      } else {
        copyFileSync(curSource, target);
      }
    });
  }
}

function copyPrepare(targetProject) {
  const npmStore = path.join(targetProject, 'node_modules');
  if (!fs.existsSync(npmStore)) {
    return false;
  }

  PACKAGE_NAME.split('/').reduce((prevPath, curFile) => {
    const curPath = path.join(prevPath, curFile);
    if (!fs.existsSync(curPath)) {
      fs.mkdirSync(curPath);
    }
    return curPath;
  }, npmStore);

  return true;
}

function copyDist(src, dest) {
  const target = path.resolve(dest);
  if (!fs.existsSync(path.join(target, 'node_modules'))) {
    console.error(
      `${chalk.bgRed(' Error ')}: target: ${chalk.blue(
        target,
      )}'s node_modules not exists , please make sure it is created or init`,
    );
    return;
  }
  copyPrepare(target);

  copyFolderRecursiveSync(
    src,
    path.join(target, `node_modules/${PACKAGE_NAME}`),
  );
  console.log(
    `${chalk.bgGreen(' Complete ')}: dist is copied from dist: ${chalk.blue(
      src,
    )} to target project: ${chalk.blue(target)} successfully!`,
  );
}

module.exports = {
  getProdVersion,
  getBuildDest,
  copyDist,
};
