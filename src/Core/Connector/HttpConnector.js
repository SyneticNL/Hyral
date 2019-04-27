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

/**
 * @param {AxiosInstance} axios
 * @param {UrlSerializer} urlSerializer
 * @param {function} paramsSerializer
 * @param {function} requestSerializer
 * @param {function} responseNormalizer
 *
 * @returns {HyralConnector}
 */
function HttpConnector(
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

  return {
    /**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */
    fetch(repository, parameterBag) {
      return axios.get(urlSerializer.fetch(repository), {
        params: parameterBag,
      });
    },

    /**
     * @param {HyralRepository} repository
     * @param {number|string} id
     * @param {ParameterBag} parameterBag
     */
    fetchOne(repository, id, parameterBag) {
      return axios.get(urlSerializer.fetchOne(repository, id), {
        params: parameterBag,
      });
    },

    /**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */
    create(repository, parameterBag) {
      axios.post({
        repository,
        data: parameterBag,
      });
    },

    /**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */
    update(repository, parameterBag) {
      axios.patch({
        repository,
        data: parameterBag,
      });
    },

    /**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     */
    delete(repository, parameterBag) {
      axios.delete({
        repository,
        params: parameterBag,
      });
    },
  };
}

export default HttpConnector;
