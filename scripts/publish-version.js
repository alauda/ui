const { execSync } = require('child_process');

const semver = require('semver');

let version = process.env.PUBLISH_VERSION || 'patch';

if (version.startsWith('v')) {
  version = version.slice(1);
} else if (version === 'beta') {
  const distTags = JSON.parse(
    execSync('yarn info @alauda/ui dist-tags --json').toString(),
  );

  const { beta, latest } = distTags.data || distTags;

  if (semver.gt(beta, latest)) {
    version = beta.endsWith('-beta')
      ? beta + '.0'
      : beta.replace(/(-beta\.)(\d+)$/, (_, $0, $1) => $0 + (+$1 + 1));
  } else {
    version = semver.minVersion(`>${latest}`) + '-beta';
  }
}

process.stdout.write(version);
