/**
 * @typedef HyralRepository
 * @type {Object}
 * @property {HyralConnector} connector
 * @property {string} resourceType
 * @property {string} identifier
 * @property {function} find
 * @property {function} findOne
 * @property {function} findById
 * @property {function} create
 * @property {function} update
 * @property {function} delete
 */

export default function Repository(connector, resourceType, identifier) {
  const repository = {
    /**
     * @param {ParameterBag} parameterBag
     *
     * @returns {Promise<Resource[]>}
     */
    find(parameterBag) {
      return connector.fetch(this, parameterBag).then(response => response.data);
    },

    /**
     * @param {ParameterBag} parameterBag
     *
     * @returns {Promise<Resource>}
     */
    findOne(parameterBag) {
      return connector.fetch(this, parameterBag).then(response => response.data.data[0] || null);
    },

    /**
     * @param {String|Number} id
     *
     * @returns {Promise<Resource>}
     */
    findById(id) {
      return connector.fetchOne(this, id, {});
    },

    /**
     * @param {Object} entity
     *
     * @returns {Promise<Resource>}
     */
    create(entity) {
      return connector.create(this, entity);
    },

    /**
     * @param {Object} entity
     *
     * @returns {Promise<Resource>}
     */
    update(entity) {
      return connector.create(this, entity);
    },

    /**
     * @param {Object} entity
     *
     * @returns {Promise<Object>}
     */
    delete(entity) {
      return connector.create(this, entity);
    },
  };

  Object.defineProperties(repository, {
    resourceType: {
      writable: false,
      enumerable: false,
      value: resourceType,
    },
    identifier: {
      writable: false,
      enumerable: false,
      value: identifier,
    },
  });

  return repository;
}
