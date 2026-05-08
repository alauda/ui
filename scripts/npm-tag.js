const { getProdVersion } = require('./utils');

const version = process.env.PUBLISH_VERSION;

if (version === 'aui-v9-beta') {
  process.stdout.write('aui-v9-beta');
} else if (version.includes('-prod-')) {
  process.stdout.write(getProdVersion(version));
} else if (version === 'beta' || /-beta[._-]?\d*$/.test(version)) {
  process.stdout.write('beta');
} else {
  process.stdout.write('latest');
}
