import cloneDeep from 'lodash/cloneDeep';

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
  const axiosInstance = axios.create(
    Object.assign(cloneDeep(axios.defaults), {
      paramsSerializer,
      transformRequest: [requestSerializer],
      transformResponse: [responseNormalizer],
    }),
  );

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
      return axiosInstance.post(urlSerializer.create(task.payload.type), {
        task,
      });
    },

    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    update(task) {
      return axiosInstance.patch(urlSerializer.update(task.payload.type, task.payload.id), {
        task,
      });
    },

    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    relation(task) {
      return axiosInstance.patch(urlSerializer.relation(task.payload.type, task.payload.id), {
        task,
      });
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

export default HttpConnector;
