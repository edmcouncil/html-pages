import axios from 'axios';
import {
  useAuthStore,
  useOntologyStore,
  useConfigurationStore
} from '#imports';
export const axiosClient = axios.create();

axiosClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const configStore = useConfigurationStore();

  const currentOrigin = window.location.origin;
  const requestUrl = new URL(config.url, currentOrigin);

  if (
    configStore.config.authEnabled === 'true' &&
    authStore.jwt &&
    !config.noAuth &&
    requestUrl.origin === currentOrigin
  ) {
    config.headers.Authorization = `Bearer ${authStore.jwt}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    const ontologyStore = useOntologyStore();

    if (error.response && error.response.status === 401) {
      authStore.clear();
    }
    if (error.response && error.response.status === 403) {
      ontologyStore.unauthorizedError = true;
    }

    return Promise.reject(error);
  }
);

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

const getEntity = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getModules = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getOntologyVersions = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getJenkinsJobs = (domain) =>
  axiosClient
    .get(domain, { noAuth: true, headers: { Accept: 'application/json' } })
    .then(parseServerError)
    .then((response) => response.data);

const getFindSearch = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getFindProperties = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getStats = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getMissingImports = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/json', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

const getDescribeIntegration = (domain, config = {}) =>
  axiosClient
    .get(domain, {
      ...config,
      headers: { Accept: 'application/rdf+xml', ...config.headers }
    })
    .then(parseServerError)
    .then((response) => response.data);

export {
  getEntity,
  getModules,
  getOntologyVersions,
  getFindSearch,
  getFindProperties,
  getStats,
  getMissingImports,
  getDescribeIntegration,
  getJenkinsJobs
};
