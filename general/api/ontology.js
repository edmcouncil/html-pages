const parseServerError = function (response) {
  if (response.status >= 400 && response.status < 600) {
    throw new Error('Bad response from server');
  }
  return response;
};

const getEntity = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getModules = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getOntologyVersions = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getFindSearch = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getFindProperties = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getStats = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getMissingImports = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};


export { getEntity, getModules, getOntologyVersions, getFindSearch, getFindProperties, getStats, getMissingImports  };
