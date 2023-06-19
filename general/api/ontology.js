import axios from 'axios';

function ServerError(message, status) {
  this.message = message;
  this.status = status;
}

const parseServerError = function (response) {
  if (response.status >= 400 && response.status < 600) {
    throw new ServerError('Bad response from server', response.status);
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

const getJenkinsJobs = function (domain) {
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

const getDescribeIntegration = function (domain) {
  return fetch(domain, {
    method: 'GET',
    headers: { 'Accept': 'application/rdf+xml' },
  }).then(parseServerError);
};


export { getEntity, getModules, getOntologyVersions, getFindSearch, getFindProperties, getStats, getMissingImports, getDescribeIntegration, getJenkinsJobs  };
