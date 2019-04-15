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

export default {
  /**
   * @param {ParameterBag} parameterBag
   *
   * @returns {Promise<Resource[]>}
   */
  find(parameterBag) {
    return this.connector.fetch(this, parameterBag)
      .then(response => response.data);
  },

  /**
   * @param {ParameterBag} parameterBag
   *
   * @returns {Promise<Resource>}
   */
  findOne(parameterBag) {
    return this.find(parameterBag).then(result => result.data[0] || null);
  },

  /**
   * @param {String|Number} id
   *
   * @returns {Promise<Resource>}
   */
  findById(id) {
    return this.connector.fetchOne(this, id, {});
  },

  /**
   * @param {Object} entity
   *
   * @returns {Promise<Resource>}
   */
  create(entity) {
    return this.connector.create(this, entity);
  },

  /**
   * @param {Object} entity
   *
   * @returns {Promise<Resource>}
   */
  update(entity) {
    return this.connector.create(this, entity);
  },

  /**
   * @param {Object} entity
   *
   * @returns {Promise<Object>}
   */
  delete(entity) {
    return this.connector.create(this, entity);
  },
};
