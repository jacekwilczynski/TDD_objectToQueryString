function objectToQueryString(obj, prefix = '?') {
  if (obj == undefined) return '';
  if (typeof obj !== 'object') throw new Error('First argument must be of type "object" or "undefined"');
  const keys = Object.keys(obj);
  if (keys.length === 0) return '';
  return prefix + keys
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

module.exports = objectToQueryString;
