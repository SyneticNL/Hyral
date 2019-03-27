export default {
  /**
   * @param {ParameterBag} parameterBag
   *
   * @returns {Promise<Array>}
   */
  find(parameterBag) {
    return this.connector.fetch(this, parameterBag);
  },

  /**
   * @param {ParameterBag} parameterBag
   *
   * @returns {Promise<HyralResource>}
   */
  findOne(parameterBag) {
    return this.find(parameterBag).then((response) => response[0]);
  },

  /**
   * @param {String|Number} id
   *
   * @returns {Promise<HyralResource>}
   */
  findById(id) {
    return this.connector.fetchOne(this, id, {}).then(result => result);
  },

  /**
   * @param {Object} entity
   *
   * @returns {Promise<HyralResource>}
   */
  create(entity) {
    return this.connector.create(this, entity);
  },

  /**
   * @param {Object} entity
   *
   * @returns {Promise<HyralResource>}
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
