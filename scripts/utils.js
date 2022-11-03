// getProdVersion :: '4.0.0-prod-2.0-0' -> 'prod-2.0'
function getProdVersion(version) {
  const arr = version.split('-');
  return `${arr[1]}-${arr[2]}`;
}

function getBuildDest() {
  const destMatcher = /^dest=([^ ]*)/;
  return process.argv.find(arg => destMatcher.test(arg))?.slice(5) || 'release';
}

module.exports = {
  getProdVersion,
  getBuildDest,
};
