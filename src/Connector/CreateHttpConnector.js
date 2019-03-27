/**
 * @typedef HyralConnector
 * @type {Object}
 * @property {AxiosInstance} axios - AxiosInstance
 * @property {function} fetch
 * @property {function} fetchOne
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */

/**
 * @typedef UrlSerializer
 * @type {object}
 * @property {function} fetch
 * @property {function} fetchOne
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */
import HttpConnector from './HttpConnector';

/**
 * @param {HyralConnector} connector
 * @param {AxiosInstance} axios
 * @param {UrlSerializer} urlSerializer
 * @param {function} paramsSerializer
 * @param {function} requestSerializer
 * @param {function} responseNormalizer
 *
 * @returns {HyralConnector}
 */
function createHttpConnector(
  connector,
  axios,
  urlSerializer,
  paramsSerializer,
  requestSerializer,
  responseNormalizer,
) {
  /* eslint-disable no-param-reassign */
  axios.defaults.paramsSerializer = paramsSerializer;
  axios.defaults.transformRequest.push(requestSerializer);
  axios.defaults.transformResponse.push(responseNormalizer);
  /* eslint-enable no-param-reassign */
  return Object.create(connector, {
    axios: {
      writable: false,
      enumerable: false,
      value: axios,
    },
    urlSerializer: {
      writable: false,
      enumerable: false,
      value: urlSerializer,
    },
  });
}

export default createHttpConnector.bind({}, HttpConnector);
