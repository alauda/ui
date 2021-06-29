// getProdVersion :: '4.0.0-prod-2.0-0' -> 'prod-2.0'
function getProdVersion(version) {
  const arr = version.split('-');
  return `${arr[1]}-${arr[2]}`;
}

module.exports = {
  getProdVersion,
};
