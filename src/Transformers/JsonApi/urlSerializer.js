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
   * @param {HyralRepository} repository
   *
   * @returns {string}
   */
  create(repository) {
    return `/${repository.resourceType}`;
  },

  /**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */
  update(repository, id) {
    return `/${repository.resourceType}/${id}`;
  },

  /**
   * @param {HyralRepository} repository
   * @param {number|string} id
   *
   * @returns {string}
   */
  delete(repository, id) {
    return `/${repository.resourceType}/${id}`;
  },
};

export default urlSerializer;
