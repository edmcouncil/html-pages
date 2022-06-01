const parseServerError = function (response) {
  if (response.status >= 400 && response.status < 600) {
    throw new Error('Bad response from server');
  }
  return response;
};

const getFindSearch = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getEntity = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then(parseServerError);
};

const getModules = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getHint = function (query, domain) {
  return fetch(domain + '/', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'text/plain' },
    body: query,
  }).then(parseServerError);
};

const getStats = function(domain) {
  return fetch(domain, {
    method: "GET",
    headers: { Accept: "application/json" }
  }).then(parseServerError);
};

const getMissingImports = function(domain) {
  return fetch(domain, {
    method: "GET",
    headers: { Accept: "application/json" }
  }).then(parseServerError);
};

export {
  getEntity, getFindSearch, getModules, getHint, getStats, getMissingImports,
};
