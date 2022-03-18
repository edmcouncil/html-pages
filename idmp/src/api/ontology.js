const parseServerError = function (response) {
  if (response.status >= 400 && response.status < 600) {
    throw new Error('Bad response from server');
  }
  return response;
};

const getOntology = function (query, domain) {
  return fetch(domain, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'text/plain' },
    body: query,
  }).then(parseServerError);
};

const getModules = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  }).then(parseServerError);
};

const getOntologyVersions = function () {
  return fetch('/fibo/ontology/api/', {
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

export { getOntology, getModules, getOntologyVersions, getFindSearch, getFindProperties };
