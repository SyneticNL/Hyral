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
 * @property {function} relation
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
      return connector.fetch(this, parameterBag).then(
        response => (response && response.data && response.data.data
          ? response.data.data[0]
          : null),
      );
    },
    /**
     * @param {String|Number} id
     * @param {ParameterBag} parameterBag
     * @returns {Promise<Resource>}
     */
    findById(id, parameterBag = null) {
      return connector.fetchOne(this, id, parameterBag).then(
        response => (response && response.data && response.data.data ? response.data.data : null),
      );
    },
    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    create(task) {
      return connector.create(task);
    },
    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    update(task) {
      return connector.update(task);
    },
    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    relation(task) {
      return connector.relation(task);
    },
    /**
     * @param {HyralTask} task
     *
     * @returns {Promise}
     */
    delete(task) {
      return connector.delete(task);
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


Repository.decorators = [
];

Repository.create = (connector, resourceType, identifier) => (
  Repository.decorators.reduce(
    (instance, decorator) => decorator(instance),
    Repository(connector, resourceType, identifier),
  )
);
