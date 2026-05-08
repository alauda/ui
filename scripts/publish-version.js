const { execSync } = require('node:child_process');

const semver = require('semver');

const { version: packageVersion } = require('../package.json');

const PACKAGE_NAME = '@alauda/ui';

function getNpmInfo(field) {
  const info = JSON.parse(
    execSync(`yarn info ${PACKAGE_NAME} ${field} --json`).toString(),
  );

  return info.data || info;
}

function getNextBetaVersion(stable, versions) {
  const nextBeta = semver.minVersion(`>${stable}`) + '-beta';
  const nextVersion = semver.parse(nextBeta);
  const candidates = versions
    .filter(Boolean)
    .filter(candidate => {
      const parsed = semver.parse(candidate);

      return (
        parsed &&
        parsed.major === nextVersion.major &&
        parsed.minor === nextVersion.minor &&
        parsed.patch === nextVersion.patch &&
        parsed.prerelease[0] === 'beta'
      );
    })
    .sort(semver.rcompare);

  const latestBeta = candidates[0];

  if (!latestBeta) {
    return nextBeta;
  }

  return latestBeta.endsWith('-beta')
    ? latestBeta + '.0'
    : latestBeta.replace(/(-beta\.)(\d+)$/, (_, $0, $1) => $0 + (+$1 + 1));
}

let version = process.env.PUBLISH_VERSION || 'patch';

if (version === 'beta' || version === 'aui-v9-beta') {
  const versions = getNpmInfo('versions');
  const stable = process.env.PUBLISH_BETA_BASE_VERSION || packageVersion;

  version = getNextBetaVersion(stable, versions);
} else if (version.startsWith('v')) {
  version = version.slice(1);
}

process.stdout.write(version);
