export function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');

  for (let keyVal of vars) {
    const pair = keyVal.split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}
