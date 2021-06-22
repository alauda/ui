const version = process.env.PUBLISH_VERSION;

if (version === 'beta' || /-beta([.-_]?\d*)$/.test(version)) {
  process.stdout.write('beta');
} else {
  process.stdout.write(version);
}
