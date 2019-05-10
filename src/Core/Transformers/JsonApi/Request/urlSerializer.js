/**
 * @type UrlSerializer
 */
const urlSerializer = {
  /**
   * @param {HyralRepository} repository
   *
   * @returns {string}
   */
  fetch(repository) {
    return `/${repository.resourceType}`;
  },

  /**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */
  fetchOne(repository, id) {
    return `/${repository.resourceType}/${id}`;
  },

  /**
   * @param {string} resourceType
   *
   * @returns {string}
   */
  create(resourceType) {
    return `/${resourceType}`;
  },

  /**
   * @param {string} resourceType
   * @param {number|string} id
   *
   * @returns {string}
   */
  update(resourceType, id) {
    return `/${resourceType}/${id}`;
  },

  /**
   * @param {string} resourceType
   * @param {number|string} id
   *
   * @returns {string}
   */
  delete(resourceType, id) {
    return `/${resourceType}/${id}`;
  },

  /**
   * @param {string} resourceType
   * @param {number|string} id
   * @param {object} relation
   *
   * @returns {string}
   */
  relation(resourceType, id, relation) {
    return `/${resourceType}/${id}/relationships/${relation.resource}`;
  },
};

export default urlSerializer;
