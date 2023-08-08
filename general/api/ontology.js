function ServerError(message, status) {
  this.message = message;
  this.status = status;
}

const parseServerError = (response) => {
  if (response.status >= 400 && response.status < 600) {
    throw new ServerError('Bad response from server', response.status);
  }
  return response;
};

const getEntity = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getModules = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getOntologyVersions = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getJenkinsJobs = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getFindSearch = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getFindProperties = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getStats = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getMissingImports = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/json' },
}).then(parseServerError);

const getDescribeIntegration = (domain) => fetch(domain, {
  method: 'GET',
  headers: { Accept: 'application/rdf+xml' },
}).then(parseServerError);

export {
  getEntity,
  getModules,
  getOntologyVersions,
  getFindSearch,
  getFindProperties,
  getStats,
  getMissingImports,
  getDescribeIntegration,
  getJenkinsJobs,
};
