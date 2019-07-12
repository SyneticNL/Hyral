
/**
 * @typedef HyralConnector
 * @type {Object}
 * @property {function} fetch
 * @property {function} fetchOne
 * @property {function} create
 * @property {function} update
 * @property {function} relation
 * @property {function} delete
 * @property {AxiosInstance} axios
 */

/**
 * @typedef UrlSerializer
 * @type {object}
 * @property {function} fetch
 * @property {function} fetchOne
 * @property {function} create
 * @property {function} update
 * @property {function} relation
 * @property {function} delete
 */

/**
 * @param {AxiosInstance} axios
 * @param {Object} transformers
 * @param {function} transformers.urlSerializer
 * @param {function} transformers.paramsSerializer
 * @param {function} transformers.requestSerializer
 * @param {function} transformers.responseNormalizer
 *
 * @returns {HyralConnector}
 */
function HttpConnector(
  axios,
  {
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  },
) {
  const axiosInstance = axios.create ? axios.create() : axios;

  axiosInstance.defaults.responseType = 'json';
  axiosInstance.defaults.paramsSerializer = paramsSerializer;
  axiosInstance.defaults.transformResponse = axiosInstance.defaults.transformResponse
    ? axiosInstance.defaults.transformResponse.concat([responseNormalizer])
    : [responseNormalizer];

  return {
    /**
     * @param {HyralRepository} repository
     * @param {ParameterBag} parameterBag
     *
     * @returns {Promise}
     */
    fetch(repository, parameterBag) {
      return axiosInstance.get(urlSerializer.fetch(repository), {
        params: parameterBag,
      });
    },

    /**
     * @param {HyralRepository} repository
     * @param {number|string} id
     * @param {ParameterBag} parameterBag
     *
     * @returns {Promise}
     */
    fetchOne(repository, id, parameterBag) {
      return axiosInstance.get(urlSerializer.fetchOne(repository, id), {
        params: parameterBag,
      });
    },

    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    create(task) {
      return axiosInstance.post(urlSerializer.create(task.payload.type), requestSerializer(task));
    },

    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    update(task) {
      return axiosInstance.patch(
        urlSerializer.update(task.payload.type, task.payload.id),
        requestSerializer(task),
      );
    },

    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    relation(task) {
      return axiosInstance.patch(
        urlSerializer.relation(task.payload.type, task.payload.id),
        requestSerializer(task),
      );
    },

    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    delete(task) {
      return axiosInstance.delete(urlSerializer.delete(task.payload.type, task.payload.id));
    },
    /**
     * @returns {AxiosInstance}
     */
    get axios() {
      return axiosInstance;
    },
  };
}


HttpConnector.decorators = [];

/**
 * @param {AxiosInstance} axios
 * @param {Object} transformers
 * @param {function} transformers.urlSerializer
 * @param {function} transformers.paramsSerializer
 * @param {function} transformers.requestSerializer
 * @param {function} transformers.responseNormalizer
 *
 * @returns {HyralConnector}
 */
HttpConnector.create = (
  axios,
  {
    urlSerializer,
    paramsSerializer,
    requestSerializer,
    responseNormalizer,
  },
) => (
  HttpConnector.decorators.reduce((instance, decorator) => decorator(instance),
    HttpConnector(
      axios,
      {
        urlSerializer,
        paramsSerializer,
        requestSerializer,
        responseNormalizer,
      },
    ))
);

export default HttpConnector;
